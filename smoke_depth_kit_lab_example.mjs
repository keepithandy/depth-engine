import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

function readLocal(path) {
  return readFileSync(new URL(path, import.meta.url), "utf8");
}

function loadScriptInContext(context, path) {
  const source = readLocal(path);
  vm.runInContext(source, context, { filename: path });
}

function createBrowserContext() {
  const context = { console, window: null };
  context.window = context;
  return vm.createContext(context);
}

function assertString(value, label) {
  assert.equal(typeof value, "string", `${label} must be a string`);
  assert.ok(value.trim().length > 0, `${label} must not be empty`);
}

function assertPositiveNumber(value, label) {
  assert.equal(typeof value, "number", `${label} must be a number`);
  assert.ok(Number.isFinite(value), `${label} must be finite`);
  assert.ok(value > 0, `${label} must be positive`);
}

const context = createBrowserContext();
loadScriptInContext(context, "./examples/examples.manifest.js");

const registryEntry = context.DEPTH_ENGINE_EXAMPLE_REGISTRY.find((entry) => entry.id === "depth-kit-lab");
assert.ok(registryEntry, "Depth Kit Lab must be registered");
assert.equal(registryEntry.playable, true, "Depth Kit Lab must be selectable as a playable example");
assert.equal(registryEntry.bundled, true, "Depth Kit Lab must be bundled for local file startup");
assert.equal(registryEntry.path, "examples/depth-kit-lab", "Depth Kit Lab registry path must point to its example folder");
assert.deepEqual(Array.from(registryEntry.contentFiles), ["game.config.js", "items.js", "enemies.js", "zones.js"], "Depth Kit Lab must use the standard content file order");

loadScriptInContext(context, registryEntry.entry);
loadScriptInContext(context, "./examples/depth-kit-lab/game.config.js");
loadScriptInContext(context, "./examples/depth-kit-lab/items.js");
loadScriptInContext(context, "./examples/depth-kit-lab/enemies.js");
loadScriptInContext(context, "./examples/depth-kit-lab/zones.js");

assert.equal(context.DEPTH_ENGINE_EXAMPLE_META.id, registryEntry.id, "metadata id must match registry id");
assert.equal(context.DEPTH_ENGINE_EXAMPLE_META.name, registryEntry.name, "metadata name must match registry name");
assert.equal(context.DEPTH_ENGINE_EXAMPLE_META.path, registryEntry.path, "metadata path must match registry path");
assert.equal(context.GAME_CONFIG.stageLabel, "Depth", "Depth Kit Lab must use Depth as its progression label");
assert.equal(context.GAME_CONFIG.currencyName, "Shards", "Depth Kit Lab must prove the shard pocket-loop currency");
assert.equal(context.GAME_CONFIG.maxStage, 6, "Depth Kit Lab must stay short enough to test manually");
assert.equal(context.GAME_CONFIG.saveKey, "depth-engine-depth-kit-lab-save-v1", "Depth Kit Lab must use its own save slot");
assert.equal(context.GAME_CONFIG.exportFileName, "depth-kit-lab-save.json", "Depth Kit Lab must use its own export filename");

const itemIds = new Set();
const allowedSlots = new Set(["weapon", "head", "body", "feet", "offhand", "trinket"]);
context.ITEMS.forEach((item) => {
  assertString(item.id, `item ${item.name} id`);
  assert.ok(!itemIds.has(item.id), `${item.id} must be unique`);
  itemIds.add(item.id);
  assert.ok(allowedSlots.has(item.slot), `${item.id} must use a valid equipment slot`);
  assert.equal(typeof item.attack, "number", `${item.id} attack must be numeric`);
  assert.equal(typeof item.defense, "number", `${item.id} defense must be numeric`);
  assertPositiveNumber(item.price, `${item.id} price`);
  assertString(item.description, `${item.id} description`);
});

const requiredUpgradeItems = ["depth-kit-mki", "depth-kit-mkii", "depth-kit-mkiii"];
requiredUpgradeItems.forEach((id) => {
  assert.ok(itemIds.has(id), `Depth Kit Lab must include ${id}`);
});

const enemyIds = new Set();
let totalCurrency = 0;
context.ENEMIES.forEach((enemy) => {
  assertString(enemy.id, `enemy ${enemy.name} id`);
  assert.ok(!enemyIds.has(enemy.id), `${enemy.id} must be unique`);
  enemyIds.add(enemy.id);
  assert.ok(enemy.stage >= 1 && enemy.stage <= context.GAME_CONFIG.maxStage, `${enemy.id} stage must stay inside maxStage`);
  assertPositiveNumber(enemy.hp, `${enemy.id} hp`);
  assertPositiveNumber(enemy.attack, `${enemy.id} attack`);
  assert.equal(typeof enemy.defense, "number", `${enemy.id} defense must be numeric`);
  assertPositiveNumber(enemy.xp, `${enemy.id} xp`);
  assertPositiveNumber(enemy.currency, `${enemy.id} currency`);
  totalCurrency += enemy.currency;
  enemy.loot.forEach((itemId) => assert.ok(itemIds.has(itemId), `${enemy.id} loot references missing item ${itemId}`));
});
assert.ok(totalCurrency >= 45, "Depth Kit Lab must provide enough shard flow to prove repeated reward loops");

const zoneStages = new Set();
context.ZONES.forEach((zone) => {
  assert.ok(!zoneStages.has(zone.stage), `Depth ${zone.stage} must have only one zone`);
  zoneStages.add(zone.stage);
  assert.ok(enemyIds.has(zone.enemy), `${zone.title} references a real enemy`);
  assertString(zone.title, `Depth ${zone.stage} title`);
});
for (let stage = 1; stage <= context.GAME_CONFIG.maxStage; stage += 1) {
  assert.ok(zoneStages.has(stage), `Depth Kit Lab must define Depth ${stage}`);
}

const lootSequence = context.ENEMIES.flatMap((enemy) => enemy.loot);
requiredUpgradeItems.forEach((id) => {
  assert.ok(lootSequence.includes(id), `${id} must appear in the pocket-loop loot path`);
});

assert.ok(context.GAME_CONFIG.startLog.includes("pocket loop"), "start log should identify the pocket-loop prototype purpose");
assert.ok(context.GAME_CONFIG.completionLog.includes("prototype"), "completion log should keep the example framed as a prototype");

console.log("Depth Kit Lab example smoke passed.");
