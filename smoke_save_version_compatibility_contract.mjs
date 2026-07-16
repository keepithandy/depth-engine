import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

function readLocal(path) {
  return readFileSync(new URL(path, import.meta.url), "utf8");
}

function loadScript(path) {
  vm.runInThisContext(readLocal(path), { filename: path });
}

globalThis.window = globalThis;
globalThis.localStorage = {
  getItem() {
    return null;
  },
  setItem() {}
};
globalThis.render = function renderStub() {};

window.DEPTH_ENGINE_EXAMPLE_META = {
  id: "save-version-smoke",
  name: "Save Version Smoke",
  path: "examples/save-version-smoke"
};

window.getActiveExample = function getActiveExample() {
  return window.DEPTH_ENGINE_EXAMPLE_META;
};

window.GAME_CONFIG = {
  maxStage: 3,
  saveKey: "depth-engine-save-version-smoke",
  exportFileName: "depth-engine-save-version-smoke.json",
  startLog: "Save version smoke started.",
  basePlayer: {
    level: 1,
    xp: 0,
    hp: 30,
    maxHp: 30,
    attack: 5,
    defense: 2,
    currency: 0
  }
};

window.ITEMS = [];

loadScript("./js/engine/state.js");
loadScript("./js/engine/save.js");

assert.equal(window.DEPTH_ENGINE_SAVE_VERSION, 3, "the current save version should have one canonical value");
assert.equal(window.GameState.version, window.DEPTH_ENGINE_SAVE_VERSION, "the initial state should use the canonical save version");
assert.equal(window.createNewState().version, window.DEPTH_ENGINE_SAVE_VERSION, "new saves should use the canonical save version");

assert.deepEqual(window.getSaveVersionCompatibility(1), {
  status: "legacy",
  sourceVersion: 1,
  currentVersion: 3,
  knownCompatible: true
}, "version 1 should classify as a known-compatible legacy save");

assert.deepEqual(window.getSaveVersionCompatibility(3), {
  status: "current",
  sourceVersion: 3,
  currentVersion: 3,
  knownCompatible: true
}, "version 3 should classify as the current save version");

assert.deepEqual(window.getSaveVersionCompatibility(4), {
  status: "future",
  sourceVersion: 4,
  currentVersion: 3,
  knownCompatible: false
}, "a higher version should classify as future and not known-compatible");

[undefined, null, "3", 0, -1, 2.5, Infinity, {}, []].forEach((value) => {
  const compatibility = window.getSaveVersionCompatibility(value);
  assert.equal(compatibility.status, "malformed", `${String(value)} should classify as malformed`);
  assert.equal(compatibility.sourceVersion, null, "malformed versions should not expose a numeric source version");
  assert.equal(compatibility.currentVersion, 3, "malformed classifications should still report the current version");
  assert.equal(compatibility.knownCompatible, false, "malformed versions should not claim known compatibility");
});

assert.equal(window.normalizeSaveState({ version: 1 }).version, 3, "legacy version 1 should still normalize to the current version");
assert.equal(window.normalizeSaveState({ version: 3 }).version, 3, "current version 3 should remain current");
assert.equal(window.normalizeSaveState({ version: 4 }).version, 4, "future numeric versions should remain preserved for read-only detection");
assert.equal(window.normalizeSaveState({ version: "3" }).version, 3, "existing permissive normalization of numeric strings should remain unchanged");

console.log("Depth Engine save version compatibility smoke passed.");
