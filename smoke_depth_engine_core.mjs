import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const originalRandom = Math.random;

const engineFiles = [
  "./js/engine/content-loader.js",
  "./js/engine/state.js",
  "./js/engine/save.js",
  "./js/engine/loot.js",
  "./js/engine/inventory.js",
  "./js/engine/combat.js",
  "./js/engine/render.js"
];

function readLocal(path) {
  return readFileSync(new URL(path, import.meta.url), "utf8");
}

function loadScript(path) {
  const source = readLocal(path);
  vm.runInThisContext(source, { filename: path });
}

function installBrowserStubs() {
  globalThis.window = globalThis;
  const storage = new Map();
  globalThis.localStorage = {
    getItem(key) {
      return storage.has(key) ? storage.get(key) : null;
    },
    setItem(key, value) {
      storage.set(key, String(value));
    },
    removeItem(key) {
      storage.delete(key);
    },
    clear() {
      storage.clear();
    }
  };
  globalThis.render = function renderStub() {};
}

function installMockContent() {
  window.DEPTH_ENGINE_EXAMPLE_META = {
    id: "smoke-example",
    name: "Smoke Example",
    path: "examples/smoke-example",
    description: "Synthetic content used by the core smoke test.",
    contentFiles: ["game.config.js", "items.js", "enemies.js", "zones.js"]
  };

  window.GAME_CONFIG = {
    title: "Depth Engine Smoke Test",
    currencyName: "Test Coins",
    maxStage: 3,
    stageLabel: "Stage",
    saveKey: "depth-engine-smoke-save",
    startLog: "Smoke test started.",
    completionLog: "Smoke test complete.",
    basePlayer: {
      level: 1,
      xp: 0,
      hp: 30,
      maxHp: 30,
      attack: 5,
      defense: 2,
      currency: 0
    },
    levelCurve: {
      xpBase: 20,
      xpGrowth: 1.35
    }
  };

  window.ITEMS = [
    { id: "practice-sword", name: "Practice Sword", slot: "weapon", attack: 5, defense: 0, price: 10, description: "Smoke weapon." },
    { id: "training-helm", name: "Training Helm", slot: "head", attack: 0, defense: 2, price: 8, description: "Smoke armor." },
    { id: "old-coin", name: "Old Coin", slot: "trinket", attack: 0, defense: 0, price: 6, description: "Smoke sellable." }
  ];

  window.ENEMIES = [
    { id: "dummy", name: "Training Dummy", stage: 1, hp: 8, attack: 1, defense: 0, xp: 5, currency: 2, loot: ["practice-sword"] },
    { id: "guard", name: "Smoke Guard", stage: 2, hp: 10, attack: 2, defense: 1, xp: 7, currency: 3, loot: ["training-helm"] },
    { id: "boss", name: "Smoke Boss", stage: 3, hp: 12, attack: 2, defense: 1, xp: 9, currency: 4, loot: ["old-coin"] }
  ];

  window.ZONES = [
    { stage: 1, enemy: "dummy", title: "Smoke Yard" },
    { stage: 2, enemy: "guard", title: "Smoke Hall" },
    { stage: 3, enemy: "boss", title: "Smoke Arena" }
  ];
}

function assertEngineContentBoundary() {
  const forbiddenEngineTerms = [
    "Rat Cellar",
    "rat-cellar",
    "Moldy Entryway",
    "Rat King",
    "Sewer Ring",
    "idleforge-save.json"
  ];

  engineFiles.forEach((path) => {
    const source = readLocal(path);
    forbiddenEngineTerms.forEach((term) => {
      assert.ok(!source.includes(term), `${path} must not contain example-specific or old-brand term: ${term}`);
    });
  });
}

function loadEngine() {
  loadScript("./js/engine/content-loader.js");
  loadScript("./js/engine/state.js");
  loadScript("./js/engine/save.js");
  loadScript("./js/engine/loot.js");
  loadScript("./js/engine/inventory.js");
  loadScript("./js/engine/combat.js");
}

try {
  assertEngineContentBoundary();
  installBrowserStubs();
  installMockContent();
  loadEngine();

  assert.equal(window.getActiveExampleName(), "Smoke Example", "content-loader reads metadata supplied by content");
  assert.equal(window.getActiveExamplePath(), "examples/smoke-example", "content-loader exposes active example path");
  assert.deepEqual(window.getActiveExample().contentFiles, ["game.config.js", "items.js", "enemies.js", "zones.js"], "content-loader copies content file metadata");
  assert.equal(window.getSaveExportFileName(), "depth-engine-save.json", "export filename no longer uses old IdleForge branding");

  const fresh = window.createNewState();
  assert.equal(fresh.currentStage, 1, "createNewState starts at stage 1");
  assert.equal(fresh.maxStage, 3, "createNewState reads configured maxStage");
  assert.deepEqual(fresh.player, window.GAME_CONFIG.basePlayer, "createNewState copies base player stats");

  const repaired = window.normalizeSaveState({
    currentFloor: 99,
    maxFloor: 3,
    player: { level: 2, currency: 12 },
    inventory: ["practice-sword", 42, "old-coin"],
    equipment: { weapon: "training-helm" },
    log: ["legacy save"],
    completed: true,
    version: 1
  });
  assert.equal(repaired.currentStage, 3, "normalizeSaveState repairs and clamps legacy currentFloor");
  assert.equal(repaired.maxStage, 3, "normalizeSaveState repairs legacy maxFloor");
  assert.equal(repaired.version, 3, "normalizeSaveState upgrades old saves to version 3");
  assert.deepEqual(repaired.inventory, ["practice-sword", "old-coin"], "normalizeSaveState filters invalid inventory ids");
  assert.equal(repaired.completed, true, "normalizeSaveState preserves completed only at max stage");

  assert.equal(window.clampStage(-5), 1, "clampStage clamps below minimum");
  assert.equal(window.clampStage(2.9), 2, "clampStage floors fractional stages");
  assert.equal(window.clampStage(999), 3, "clampStage clamps above configured maxStage");

  Math.random = () => 0.1;
  assert.deepEqual(window.rollLoot(window.ENEMIES[0]).map((item) => item.id), ["practice-sword"], "rollLoot returns valid drops when the roll passes");
  Math.random = () => 0.9;
  assert.deepEqual(window.rollLoot(window.ENEMIES[0]), [], "rollLoot returns no drops when the roll fails");

  window.GameState = window.createNewState();
  window.GameState.inventory = ["practice-sword", "old-coin"];
  window.equipItem("practice-sword");
  assert.equal(window.GameState.equipment.weapon, "practice-sword", "equipItem equips the selected item");
  assert.deepEqual(window.GameState.inventory, ["old-coin"], "equipItem removes the equipped item from inventory");

  window.sellItem("old-coin");
  assert.equal(window.GameState.player.currency, 3, "sellItem adds half item price, floored with minimum one");
  assert.deepEqual(window.GameState.inventory, [], "sellItem removes the sold item from inventory");

  window.GameState = window.createNewState();
  window.GameState.currentStage = window.GameState.maxStage;
  window.GameState.player.attack = 100;
  window.GameState.player.defense = 100;
  Math.random = () => 0;
  window.resolveFight();
  assert.equal(window.GameState.completed, true, "resolveFight marks the run complete after final stage victory");
  assert.equal(window.GameState.currentStage, window.GameState.maxStage, "resolveFight does not advance beyond maxStage");

  console.log("Depth Engine core smoke passed.");
} finally {
  Math.random = originalRandom;
}
