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
  id: "player-repair-smoke",
  name: "Player Repair Smoke",
  path: "examples/player-repair-smoke"
};

window.getActiveExample = function getActiveExample() {
  return window.DEPTH_ENGINE_EXAMPLE_META;
};

window.GAME_CONFIG = {
  maxStage: 3,
  saveKey: "depth-engine-player-repair-smoke",
  exportFileName: "depth-engine-player-repair-smoke.json",
  startLog: "Player repair smoke started.",
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

const repairedMalformed = window.normalizeSaveState({
  player: {
    level: "9",
    xp: null,
    hp: 999,
    maxHp: 40,
    attack: "12",
    defense: {},
    currency: -5,
    title: "Scout"
  }
});

assert.deepEqual(repairedMalformed.player, {
  level: 1,
  xp: 0,
  hp: 40,
  maxHp: 40,
  attack: 5,
  defense: 2,
  currency: 0,
  title: "Scout"
}, "malformed known fields repair while unknown extension fields survive");

const repairedNumeric = window.normalizeSaveState({
  player: {
    level: 3.9,
    xp: 12.8,
    hp: -4,
    maxHp: 25.9,
    attack: -2.5,
    defense: 0,
    currency: 9.9
  }
});

assert.equal(repairedNumeric.player.level, 3, "level normalizes to an integer at least 1");
assert.equal(repairedNumeric.player.xp, 12, "xp normalizes to a non-negative integer");
assert.equal(repairedNumeric.player.hp, 0, "hp clamps to the lower bound");
assert.equal(repairedNumeric.player.maxHp, 25, "maxHp normalizes to a positive integer");
assert.equal(repairedNumeric.player.attack, -2.5, "valid finite attack values remain unchanged");
assert.equal(repairedNumeric.player.defense, 0, "valid finite defense values remain unchanged");
assert.equal(repairedNumeric.player.currency, 9, "currency normalizes to a non-negative integer");

const repairedArrayPlayer = window.normalizeSaveState({ player: [99, 100] });
assert.deepEqual(repairedArrayPlayer.player, window.GAME_CONFIG.basePlayer, "array player payloads fall back to the active example baseline");

console.log("Depth Engine save player repair smoke passed.");