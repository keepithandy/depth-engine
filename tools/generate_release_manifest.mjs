import { createHash } from "node:crypto";
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const targetArg = process.argv[2];
if (!targetArg) {
  console.error("Usage: node tools/generate_release_manifest.mjs <release-folder-or-zip>");
  process.exit(1);
}

const target = path.resolve(targetArg);
const targetStats = await stat(target).catch(() => null);
if (!targetStats) {
  console.error(`Release target not found: ${target}`);
  process.exit(1);
}

const excludedNames = new Set([
  ".DS_Store",
  "Thumbs.db",
  "release-manifest.json",
  "SHA256SUMS.txt"
]);
const excludedDirectories = new Set([".git", "node_modules", ".idea", ".vscode"]);

function shouldExclude(relativePath, directoryEntry) {
  const parts = relativePath.split(path.sep);
  if (parts.some((part) => excludedDirectories.has(part))) return true;
  if (excludedNames.has(directoryEntry.name)) return true;
  if (/\.local(save)?\.json$/i.test(directoryEntry.name)) return true;
  if (/^depth-engine-selected-example/i.test(directoryEntry.name)) return true;
  return false;
}

async function collectFiles(root, current = root) {
  const entries = await readdir(current, { withFileTypes: true });
  const files = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const absolutePath = path.join(current, entry.name);
    const relativePath = path.relative(root, absolutePath);
    if (shouldExclude(relativePath, entry)) continue;
    if (entry.isDirectory()) files.push(...await collectFiles(root, absolutePath));
    if (entry.isFile()) files.push(absolutePath);
  }
  return files;
}

async function describeFile(absolutePath, relativeTo) {
  const bytes = await readFile(absolutePath);
  return {
    path: path.relative(relativeTo, absolutePath).split(path.sep).join("/"),
    bytes: bytes.length,
    sha256: createHash("sha256").update(bytes).digest("hex")
  };
}

let entries;
let outputDirectory;
if (targetStats.isDirectory()) {
  const files = await collectFiles(target);
  entries = await Promise.all(files.map((file) => describeFile(file, target)));
  outputDirectory = target;
} else {
  entries = [await describeFile(target, path.dirname(target))];
  outputDirectory = path.dirname(target);
}

entries.sort((a, b) => a.path.localeCompare(b.path));
const manifest = {
  format: "depth-engine-release-manifest-v1",
  target: path.basename(target),
  fileCount: entries.length,
  totalBytes: entries.reduce((total, entry) => total + entry.bytes, 0),
  files: entries
};

const manifestPath = path.join(outputDirectory, "release-manifest.json");
const sumsPath = path.join(outputDirectory, "SHA256SUMS.txt");
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
await writeFile(sumsPath, `${entries.map((entry) => `${entry.sha256}  ${entry.path}`).join("\n")}\n`, "utf8");

console.log(`Release manifest written: ${manifestPath}`);
console.log(`SHA-256 checksums written: ${sumsPath}`);
console.log(`${manifest.fileCount} files, ${manifest.totalBytes} bytes.`);
