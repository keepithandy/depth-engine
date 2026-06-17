import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

function loadScript(path) {
  const source = readFileSync(new URL(path, import.meta.url), "utf8");
  vm.runInThisContext(source, { filename: path });
}

function assertUniqueIds(entries, label) {
  const ids = entries.map((entry) => entry.id);
  assert.equal(new Set(ids).size, ids.length, `${label} ids must be unique`);
}

function assertPositiveNumber(value, label) {
  assert.equal(typeof value, "number", `${label} must be a number`);
  assert.ok(Number.isFinite(value), `${label} must be finite`);
  assert.ok(value > 0, `${label} must be positive`);
}

globalThis.window = globalThis;

loadScript("./examples/rat-cellar/game.config.js");
loadScript("./examples/rat-cellar/items.js");
loadScript("./examples/rat-cellar/enemies.js");
loadScript("./examples/rat-cellar/zones.js");

assert.ok(window.GAME_CONFIG, "GAME_CONFIG must exist");
assert.equal(window.GAME_CONFIG.maxStage, 20, "Rat Cellar maxStage should remain 20");
assert.equal(window.GAME_CONFIG.stageLabel, "Stage", "Rat Cellar should use the generic Stage label");
assert.ok(Array.isArray(window.ITEMS), "ITEMS must be an array");
assert.ok(Array.isArray(window.ENEMIES), "ENEMIES must be an array");
assert.ok(Array.isArray(window.ZONES), "ZONES must be an array");

assertUniqueIds(window.ITEMS, "Item");
assertUniqueIds(window.ENEMIES, "Enemy");

const itemIds = new Set(window.ITEMS.map((item) => item.id));
const enemyIds = new Set(window.ENEMIES.map((enemy) => enemy.id));
const zoneStages = new Set();
const allowedSlots = new Set(["weapon", "head", "body", "feet", "offhand", "trinket"]);

window.ITEMS.forEach((item) => {
  assert.equal(typeof item.id, "string", "Item id must be a string");
  assert.ok(item.id.length > 0, "Item id must not be empty");
  assert.equal(typeof item.name, "string", `${item.id} name must be a string`);
  assert.ok(allowedSlots.has(item.slot), `${item.id} must use a valid equipment slot`);
  assert.equal(typeof item.description, "string", `${item.id} description must be a string`);
  assertPositiveNumber(item.price, `${item.id} price`);
  assert.equal(typeof item.attack, "number", `${item.id} attack must be a number`);
  assert.equal(typeof item.defense, "number", `${item.id} defense must be a number`);
});

window.ENEMIES.forEach((enemy) => {
  assert.equal(typeof enemy.id, "string", "Enemy id must be a string");
  assert.ok(enemy.id.length > 0, "Enemy id must not be empty");
  assert.equal(typeof enemy.name, "string", `${enemy.id} name must be a string`);
  assertPositiveNumber(enemy.stage, `${enemy.id} stage`);
  assertPositiveNumber(enemy.hp, `${enemy.id} hp`);
  assertPositiveNumber(enemy.attack, `${enemy.id} attack`);
  assert.equal(typeof enemy.defense, "number", `${enemy.id} defense must be a number`);
  assertPositiveNumber(enemy.xp, `${enemy.id} xp`);
  assertPositiveNumber(enemy.currency, `${enemy.id} currency`);
  assert.ok(Array.isArray(enemy.loot), `${enemy.id} loot must be an array`);
  enemy.loot.forEach((itemId) => {
    assert.ok(itemIds.has(itemId), `${enemy.id} loot references missing item ${itemId}`);
  });
});

window.ZONES.forEach((zone) => {
  assertPositiveNumber(zone.stage, `Zone ${zone.title} stage`);
  assert.ok(zone.stage <= window.GAME_CONFIG.maxStage, `${zone.title} stage must not exceed maxStage`);
  assert.ok(!zoneStages.has(zone.stage), `Stage ${zone.stage} must have only one zone`);
  zoneStages.add(zone.stage);
  assert.ok(enemyIds.has(zone.enemy), `${zone.title} references missing enemy ${zone.enemy}`);
  assert.equal(typeof zone.title, "string", `Stage ${zone.stage} title must be a string`);
  assert.ok(zone.title.length > 0, `Stage ${zone.stage} title must not be empty`);
});

for (let stage = 1; stage <= window.GAME_CONFIG.maxStage; stage += 1) {
  assert.ok(zoneStages.has(stage), `Rat Cellar must define a zone for stage ${stage}`);
}

console.log("Rat Cellar content smoke passed.");
