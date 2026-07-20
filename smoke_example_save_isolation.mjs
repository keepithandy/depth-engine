import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

function readLocal(path) {
  return readFileSync(new URL(path, import.meta.url), "utf8");
}

function loadScript(context, path) {
  vm.runInContext(readLocal(path), context, { filename: path });
}

const manifestContext = vm.createContext({ window: null });
manifestContext.window = manifestContext;
loadScript(manifestContext, "./examples/examples.manifest.js");
const registry = manifestContext.DEPTH_ENGINE_EXAMPLE_REGISTRY.filter((example) => example.bundled && example.playable);

const identities = registry.map((example) => {
  const context = vm.createContext({ window: null });
  context.window = context;
  loadScript(context, `./${example.path}/game.config.js`);
  return {
    id: example.id,
    saveKey: context.GAME_CONFIG.saveKey,
    exportFileName: context.GAME_CONFIG.exportFileName
  };
});

assert.equal(new Set(identities.map((entry) => entry.saveKey)).size, identities.length, "every bundled example must have a unique saveKey");
assert.equal(new Set(identities.map((entry) => entry.exportFileName)).size, identities.length, "every bundled example must have a unique export filename");

const localStorage = new Map();
identities.forEach((identity, index) => {
  localStorage.set(identity.saveKey, JSON.stringify({ exampleId: identity.id, marker: index + 1 }));
});

identities.forEach((identity, index) => {
  const ownState = JSON.parse(localStorage.get(identity.saveKey));
  assert.equal(ownState.exampleId, identity.id, `${identity.id} should read only its own save slot`);
  assert.equal(ownState.marker, index + 1, `${identity.id} should preserve its own marker`);
  identities.filter((other) => other.id !== identity.id).forEach((other) => {
    const otherState = JSON.parse(localStorage.get(other.saveKey));
    assert.notEqual(otherState.exampleId, identity.id, `${identity.id} should not leak into ${other.id}`);
  });
});

const duplicateSaveKeys = structuredClone(identities);
duplicateSaveKeys[1].saveKey = duplicateSaveKeys[0].saveKey;
assert.notEqual(new Set(duplicateSaveKeys.map((entry) => entry.saveKey)).size, duplicateSaveKeys.length, "duplicate save-key fixture should fail uniqueness");

const duplicateExports = structuredClone(identities);
duplicateExports[1].exportFileName = duplicateExports[0].exportFileName;
assert.notEqual(new Set(duplicateExports.map((entry) => entry.exportFileName)).size, duplicateExports.length, "duplicate export filename fixture should fail uniqueness");

console.log(`Per-example save isolation smoke passed for ${identities.length} bundled examples.`);
