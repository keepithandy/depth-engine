import { readFile, stat } from "node:fs/promises";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const readLocal = (path) => readFile(new URL(path, root), "utf8");

const indexSource = await readLocal("index.html");
const staticScriptPaths = Array.from(indexSource.matchAll(/<script\s+src="([^"]+)"/g), (match) => match[1]);
const stylesheetPaths = Array.from(indexSource.matchAll(/<link\s+rel="stylesheet"\s+href="([^"]+)"/g), (match) => match[1]);

const manifestContext = vm.createContext({ window: null });
manifestContext.window = manifestContext;
vm.runInContext(await readLocal("examples/examples.manifest.js"), manifestContext, { filename: "examples/examples.manifest.js" });
const registry = manifestContext.DEPTH_ENGINE_EXAMPLE_REGISTRY.filter((example) => example.bundled && example.playable);

async function bytesFor(paths) {
  let total = 0;
  for (const path of paths) {
    total += (await stat(new URL(path, root))).size;
  }
  return total;
}

const sharedBytes = await bytesFor([...staticScriptPaths, ...stylesheetPaths]);
const rows = [];

for (const example of registry) {
  const dynamicPaths = [
    example.entry,
    "js/engine/content-loader.js",
    ...example.contentFiles.map((file) => `${example.path}/${file}`)
  ];
  rows.push({
    example: example.name,
    staticScripts: staticScriptPaths.length,
    dynamicScripts: dynamicPaths.length,
    totalScripts: staticScriptPaths.length + dynamicPaths.length,
    stylesheets: stylesheetPaths.length,
    sharedBytes,
    exampleBytes: await bytesFor(dynamicPaths),
    totalSourceBytes: sharedBytes + await bytesFor(dynamicPaths)
  });
}

console.table(rows);
console.log("\nRuntime timing must be measured in a browser using docs/browser-performance-baseline.md.");
