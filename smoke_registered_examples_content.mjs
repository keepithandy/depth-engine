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
  const context = {
    console,
    window: null
  };
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

function assertUniqueIds(entries, label, exampleId) {
  const ids = entries.map((entry) => entry.id);
  assert.equal(new Set(ids).size, ids.length, `${exampleId}: ${label} ids must be unique`);
}

function assertUniqueExampleValue(seenValues, value, label, exampleId) {
  if (seenValues.has(value)) {
    assert.fail(`${exampleId}: ${label} must be unique; already used by ${seenValues.get(value)}`);
  }

  seenValues.set(value, exampleId);
}

function validateMetadata(example, activeExample, registryEntry) {
  assert.equal(activeExample.id, example.id, `${example.id}: active metadata id must match registry id`);
  assert.equal(activeExample.name, example.name, `${example.id}: active metadata name must match registry name`);
  assert.equal(activeExample.path, example.path, `${example.id}: active metadata path must match registry path`);
  assert.deepEqual([...activeExample.contentFiles], [...registryEntry.contentFiles], `${example.id}: active metadata content files must match registry content files`);
}

function validateConfig(context, example) {
  const config = context.GAME_CONFIG;
  assert.ok(config, `${example.id}: GAME_CONFIG must exist`);
  assertString(config.title, `${example.id}: GAME_CONFIG.title`);
  assertString(config.currencyName, `${example.id}: GAME_CONFIG.currencyName`);
  assertPositiveNumber(config.maxStage, `${example.id}: GAME_CONFIG.maxStage`);
  assertString(config.stageLabel, `${example.id}: GAME_CONFIG.stageLabel`);
  assertString(config.saveKey, `${example.id}: GAME_CONFIG.saveKey`);
  assertString(config.exportFileName, `${example.id}: GAME_CONFIG.exportFileName`);
  assertString(config.startLog, `${example.id}: GAME_CONFIG.startLog`);
  assertString(config.completionLog, `${example.id}: GAME_CONFIG.completionLog`);
  assert.ok(config.basePlayer && typeof config.basePlayer === "object", `${example.id}: basePlayer must exist`);
  assertPositiveNumber(config.basePlayer.level, `${example.id}: basePlayer.level`);
  assert.equal(typeof config.basePlayer.xp, "number", `${example.id}: basePlayer.xp must be a number`);
  assertPositiveNumber(config.basePlayer.hp, `${example.id}: basePlayer.hp`);
  assertPositiveNumber(config.basePlayer.maxHp, `${example.id}: basePlayer.maxHp`);
  assertPositiveNumber(config.basePlayer.attack, `${example.id}: basePlayer.attack`);
  assert.equal(typeof config.basePlayer.defense, "number", `${example.id}: basePlayer.defense must be a number`);
  assert.equal(typeof config.basePlayer.currency, "number", `${example.id}: basePlayer.currency must be a number`);
  assert.ok(config.levelCurve && typeof config.levelCurve === "object", `${example.id}: levelCurve must exist`);
  assertPositiveNumber(config.levelCurve.xpBase, `${example.id}: levelCurve.xpBase`);
  assertPositiveNumber(config.levelCurve.xpGrowth, `${example.id}: levelCurve.xpGrowth`);
}

function validateItems(context, example) {
  const items = context.ITEMS;
  assert.ok(Array.isArray(items), `${example.id}: ITEMS must be an array`);
  assertUniqueIds(items, "Item", example.id);
  const allowedSlots = new Set(["weapon", "head", "body", "feet", "offhand", "trinket"]);

  items.forEach((item) => {
    assertString(item.id, `${example.id}: item id`);
    assertString(item.name, `${example.id}: ${item.id} name`);
    assert.ok(allowedSlots.has(item.slot), `${example.id}: ${item.id} must use a valid equipment slot`);
    assert.equal(typeof item.attack, "number", `${example.id}: ${item.id} attack must be a number`);
    assert.equal(typeof item.defense, "number", `${example.id}: ${item.id} defense must be a number`);
    assertPositiveNumber(item.price, `${example.id}: ${item.id} price`);
    assertString(item.description, `${example.id}: ${item.id} description`);
  });
}

function validateEnemies(context, example) {
  const enemies = context.ENEMIES;
  const itemIds = new Set(context.ITEMS.map((item) => item.id));
  assert.ok(Array.isArray(enemies), `${example.id}: ENEMIES must be an array`);
  assertUniqueIds(enemies, "Enemy", example.id);

  enemies.forEach((enemy) => {
    assertString(enemy.id, `${example.id}: enemy id`);
    assertString(enemy.name, `${example.id}: ${enemy.id} name`);
    assertPositiveNumber(enemy.stage, `${example.id}: ${enemy.id} stage`);
    assertPositiveNumber(enemy.hp, `${example.id}: ${enemy.id} hp`);
    assertPositiveNumber(enemy.attack, `${example.id}: ${enemy.id} attack`);
    assert.equal(typeof enemy.defense, "number", `${example.id}: ${enemy.id} defense must be a number`);
    assertPositiveNumber(enemy.xp, `${example.id}: ${enemy.id} xp`);
    assertPositiveNumber(enemy.currency, `${example.id}: ${enemy.id} currency`);
    assert.ok(Array.isArray(enemy.loot), `${example.id}: ${enemy.id} loot must be an array`);
    enemy.loot.forEach((itemId) => {
      assert.ok(itemIds.has(itemId), `${example.id}: ${enemy.id} loot references missing item ${itemId}`);
    });
  });
}

function validateZones(context, example) {
  const zones = context.ZONES;
  const enemyIds = new Set(context.ENEMIES.map((enemy) => enemy.id));
  const zoneStages = new Set();
  assert.ok(Array.isArray(zones), `${example.id}: ZONES must be an array`);

  zones.forEach((zone) => {
    assertPositiveNumber(zone.stage, `${example.id}: zone ${zone.title} stage`);
    assert.ok(zone.stage <= context.GAME_CONFIG.maxStage, `${example.id}: ${zone.title} stage must not exceed maxStage`);
    assert.ok(!zoneStages.has(zone.stage), `${example.id}: stage ${zone.stage} must have only one zone`);
    zoneStages.add(zone.stage);
    assert.ok(enemyIds.has(zone.enemy), `${example.id}: ${zone.title} references missing enemy ${zone.enemy}`);
    assertString(zone.title, `${example.id}: stage ${zone.stage} title`);
  });

  for (let stage = 1; stage <= context.GAME_CONFIG.maxStage; stage += 1) {
    assert.ok(zoneStages.has(stage), `${example.id}: must define a zone for stage ${stage}`);
  }
}

const manifestContext = createBrowserContext();
loadScriptInContext(manifestContext, "./examples/examples.manifest.js");
const registry = manifestContext.DEPTH_ENGINE_EXAMPLE_REGISTRY;

assert.ok(Array.isArray(registry), "Example registry must be an array");
assert.ok(registry.length > 0, "Example registry must include at least one example");
assertUniqueIds(registry, "Example", "registry");

const bundledExamples = registry.filter((example) => example.bundled);
assert.ok(bundledExamples.length > 0, "Example registry must include at least one bundled example");

const saveKeys = new Map();
const exportFileNames = new Map();

bundledExamples.forEach((example) => {
  assertString(example.id, "registry example id");
  assertString(example.name, `${example.id}: registry name`);
  assertString(example.path, `${example.id}: registry path`);
  assertString(example.description, `${example.id}: registry description`);
  assertString(example.entry, `${example.id}: registry entry`);
  assert.ok(Array.isArray(example.contentFiles), `${example.id}: registry contentFiles must be an array`);
  assert.deepEqual([...example.contentFiles], ["game.config.js", "items.js", "enemies.js", "zones.js"], `${example.id}: registry contentFiles must use the required example file order`);

  const context = createBrowserContext();
  context.DEPTH_ENGINE_EXAMPLE_REGISTRY = registry;
  loadScriptInContext(context, example.entry);
  loadScriptInContext(context, "./js/engine/content-loader.js");
  example.contentFiles.forEach((file) => {
    loadScriptInContext(context, `./${example.path}/${file}`);
  });

  const activeExample = context.getActiveExample();
  const registryEntry = context.getRegisteredExampleById(example.id);
  assert.ok(registryEntry, `${example.id}: active example must be present in registry`);
  assert.equal(context.isActiveExampleRegistered(), true, `${example.id}: active example should be registered`);

  validateMetadata(example, activeExample, registryEntry);
  validateConfig(context, example);
  assertUniqueExampleValue(saveKeys, context.GAME_CONFIG.saveKey, "GAME_CONFIG.saveKey", example.id);
  assertUniqueExampleValue(exportFileNames, context.GAME_CONFIG.exportFileName, "GAME_CONFIG.exportFileName", example.id);
  validateItems(context, example);
  validateEnemies(context, example);
  validateZones(context, example);
});

console.log(`Registered example content smoke passed for ${bundledExamples.length} bundled example(s).`);
