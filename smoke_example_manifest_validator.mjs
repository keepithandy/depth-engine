import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import vm from "node:vm";

function loadManifest() {
  const context = vm.createContext({ window: null });
  context.window = context;
  const source = readFileSync(new URL("./examples/examples.manifest.js", import.meta.url), "utf8");
  vm.runInContext(source, context, { filename: "examples/examples.manifest.js" });
  return context.DEPTH_ENGINE_EXAMPLE_REGISTRY;
}

function validateManifest(registry, fileExists = existsSync) {
  const errors = [];
  const requiredFiles = ["game.config.js", "items.js", "enemies.js", "zones.js"];

  if (!Array.isArray(registry) || registry.length === 0) {
    return ["Manifest must contain at least one registered example."];
  }

  const seenIds = new Set();
  registry.forEach((example, index) => {
    const label = example?.id || `entry ${index + 1}`;
    if (!example || typeof example !== "object") {
      errors.push(`entry ${index + 1}: manifest entry must be an object`);
      return;
    }
    if (typeof example.id !== "string" || !example.id.trim()) errors.push(`${label}: id must be a non-empty string`);
    if (seenIds.has(example.id)) errors.push(`${label}: duplicate example id`);
    seenIds.add(example.id);
    if (typeof example.name !== "string" || !example.name.trim()) errors.push(`${label}: name must be a non-empty string`);
    if (typeof example.description !== "string" || !example.description.trim()) errors.push(`${label}: description must be a non-empty string`);
    if (typeof example.path !== "string" || !example.path.trim()) errors.push(`${label}: path must be a non-empty string`);
    if (typeof example.entry !== "string" || !example.entry.trim()) errors.push(`${label}: entry must be a non-empty string`);
    if (!Array.isArray(example.contentFiles) || example.contentFiles.join("|") !== requiredFiles.join("|")) {
      errors.push(`${label}: contentFiles must use the required order ${requiredFiles.join(", ")}`);
    }

    const paths = [example.entry, ...(example.contentFiles || []).map((file) => `${example.path}/${file}`)];
    paths.forEach((path) => {
      if (typeof path === "string" && !fileExists(new URL(`./${path}`, import.meta.url))) {
        errors.push(`${label}: missing file ${path}`);
      }
    });
  });

  if (!registry[0]?.playable || !registry[0]?.bundled) {
    errors.push("Default example must be playable and bundled.");
  }

  return errors;
}

const registry = loadManifest();
assert.deepEqual(validateManifest(registry), [], "current registered example manifest should be valid");

const duplicateFixture = structuredClone(registry);
duplicateFixture[1].id = duplicateFixture[0].id;
assert.ok(validateManifest(duplicateFixture).some((error) => error.includes("duplicate example id")), "duplicate ids should fail clearly");

const missingMetadataFixture = structuredClone(registry);
missingMetadataFixture[0].entry = "examples/missing/example.meta.js";
assert.ok(validateManifest(missingMetadataFixture).some((error) => error.includes("missing file")), "missing metadata paths should fail clearly");

const missingContentFixture = structuredClone(registry);
missingContentFixture[0].contentFiles = ["game.config.js", "items.js", "zones.js"];
assert.ok(validateManifest(missingContentFixture).some((error) => error.includes("required order")), "missing content files should fail clearly");

const malformedLabelFixture = structuredClone(registry);
malformedLabelFixture[0].name = "";
assert.ok(validateManifest(malformedLabelFixture).some((error) => error.includes("name must be")), "malformed labels should fail clearly");

console.log(`Example manifest validator passed for ${registry.length} registered examples and invalid fixtures.`);
