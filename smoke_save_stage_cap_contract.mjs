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
  id: "save-cap-smoke",
  name: "Save Cap Smoke",
  path: "examples/save-cap-smoke"
};

window.getActiveExample = function getActiveExample() {
  return window.DEPTH_ENGINE_EXAMPLE_META;
};

window.GAME_CONFIG = {
  maxStage: 3,
  saveKey: "depth-engine-save-cap-smoke",
  exportFileName: "depth-engine-save-cap-smoke.json",
  startLog: "Save cap smoke started.",
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

const inflatedModernCap = window.normalizeSaveState({
  currentStage: 99,
  maxStage: 99,
  completed: true,
  version: 3
});

assert.equal(inflatedModernCap.maxStage, 3, "saved maxStage cannot extend the active example cap");
assert.equal(inflatedModernCap.currentStage, 3, "currentStage clamps to the active example cap");
assert.equal(inflatedModernCap.completed, true, "completion remains valid at the configured final stage");

const inflatedLegacyCap = window.normalizeSaveState({
  currentFloor: 99,
  maxFloor: 99,
  completed: true,
  version: 1
});

assert.equal(inflatedLegacyCap.maxStage, 3, "legacy maxFloor cannot extend the active example cap");
assert.equal(inflatedLegacyCap.currentStage, 3, "legacy currentFloor clamps to the active example cap");
assert.equal(inflatedLegacyCap.version, 3, "legacy saves still normalize to the current save version");

const shortenedCap = window.normalizeSaveState({
  currentStage: 1,
  maxStage: 1,
  completed: true,
  version: 3
});

assert.equal(shortenedCap.maxStage, 3, "saved maxStage cannot shorten the active example cap");
assert.equal(shortenedCap.currentStage, 1, "valid currentStage remains unchanged");
assert.equal(shortenedCap.completed, false, "a shortened saved cap cannot claim early completion");

console.log("Depth Engine save stage-cap smoke passed.");