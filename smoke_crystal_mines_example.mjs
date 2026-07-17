import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

function readLocal(path) {
  return readFileSync(new URL(path, import.meta.url), "utf8");
}

function loadScript(context, path) {
  vm.runInContext(readLocal(path), context, { filename: path });
}

function createBrowserContext() {
  const context = { console, window: null };
  context.window = context;
  return vm.createContext(context);
}

function assertString(value, label) {
  assert.equal(typeof value, "string", `${label} must be a string`);
  assert.ok(value.trim(), `${label} must not be empty`);
}

function assertPositiveNumber(value, label) {
  assert.equal(typeof value, "number", `${label} must be numeric`);
  assert.ok(Number.isFinite(value) && value > 0, `${label} must be positive and finite`);
}

const context = createBrowserContext();
loadScript(context, "./examples/examples.manifest.js");

const registryEntry = context.DEPTH_ENGINE_EXAMPLE_REGISTRY.find((entry) => entry.id === "crystal-mines");
assert.ok(registryEntry, "Crystal Mines must be registered");
assert.equal(registryEntry.playable, true, "Crystal Mines must be selectable");
assert.equal(registryEntry.bundled, true, "Crystal Mines must remain local-first");
assert.equal(registryEntry.path, "examples/crystal-mines", "registry path must point to the example folder");
assert.deepEqual(
  Array.from(registryEntry.contentFiles),
  ["game.config.js", "items.js", "enemies.js", "zones.js"],
  "Crystal Mines must follow the documented content order"
);

loadScript(context, registryEntry.entry);
registryEntry.contentFiles.forEach((file) => loadScript(context, `./${registryEntry.path}/${file}`));

assert.equal(context.DEPTH_ENGINE_EXAMPLE_META.id, registryEntry.id, "metadata id must match the registry");
assert.equal(context.DEPTH_ENGINE_EXAMPLE_META.path, registryEntry.path, "metadata path must match the registry");
assert.equal(context.GAME_CONFIG.stageLabel, "Mine Level", "the example must own its progression label");
assert.equal(context.GAME_CONFIG.currencyName, "Crystals", "the example must own its currency label");
assert.equal(context.GAME_CONFIG.maxStage, 5, "the documentation proof must remain a short manual route");
assert.equal(context.GAME_CONFIG.saveKey, "depth-engine-crystal-mines-save-v1", "the example must use a unique save key");
assert.equal(context.GAME_CONFIG.exportFileName, "crystal-mines-save.json", "the example must use a unique export filename");

const allowedSlots = new Set(["weapon", "head", "body", "feet", "offhand", "trinket"]);
const itemIds = new Set();
context.ITEMS.forEach((item) => {
  assertString(item.id, `item ${item.name} id`);
  assert.ok(!itemIds.has(item.id), `${item.id} must be unique`);
  itemIds.add(item.id);
  assert.ok(allowedSlots.has(item.slot), `${item.id} must use a supported slot`);
  assert.equal(typeof item.attack, "number", `${item.id} attack must be numeric`);
  assert.equal(typeof item.defense, "number", `${item.id} defense must be numeric`);
  assertPositiveNumber(item.price, `${item.id} price`);
  assertString(item.description, `${item.id} description`);
});

const enemyIds = new Set();
context.ENEMIES.forEach((enemy) => {
  assertString(enemy.id, `enemy ${enemy.name} id`);
  assert.ok(!enemyIds.has(enemy.id), `${enemy.id} must be unique`);
  enemyIds.add(enemy.id);
  assert.ok(enemy.stage >= 1 && enemy.stage <= context.GAME_CONFIG.maxStage, `${enemy.id} must stay inside the route`);
  assertPositiveNumber(enemy.hp, `${enemy.id} hp`);
  assertPositiveNumber(enemy.attack, `${enemy.id} attack`);
  assertPositiveNumber(enemy.xp, `${enemy.id} xp`);
  assertPositiveNumber(enemy.currency, `${enemy.id} currency`);
  enemy.loot.forEach((itemId) => assert.ok(itemIds.has(itemId), `${enemy.id} references missing loot ${itemId}`));
});

const zoneStages = new Set();
context.ZONES.forEach((zone) => {
  assert.ok(!zoneStages.has(zone.stage), `Mine Level ${zone.stage} must be unique`);
  zoneStages.add(zone.stage);
  assertString(zone.title, `Mine Level ${zone.stage} title`);
  assert.ok(enemyIds.has(zone.enemy), `${zone.title} must reference a real enemy`);
});
for (let stage = 1; stage <= context.GAME_CONFIG.maxStage; stage += 1) {
  assert.ok(zoneStages.has(stage), `Crystal Mines must define Mine Level ${stage}`);
}

assert.ok(context.GAME_CONFIG.startLog.includes("documentation proof"), "start log must identify the documentation proof");
assert.ok(context.GAME_CONFIG.completionLog.includes("documentation proof"), "completion log must identify the documentation proof");

console.log("Crystal Mines documentation-driven example smoke passed.");
