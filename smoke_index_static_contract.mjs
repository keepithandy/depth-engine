import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");

const requiredIds = [
  "loadedExampleText",
  "goalStageHeadline",
  "exportSaveBtn",
  "importSaveInput",
  "resetSaveBtn",
  "playerStats",
  "zoneText",
  "xpText",
  "xpBar",
  "stageText",
  "stageBar",
  "exampleRegistryList",
  "enemyPreview",
  "fightBtn",
  "combatLog",
  "equipmentSlots",
  "inventoryList",
  "footerLoadedExample",
  "footerExamplePath"
];

requiredIds.forEach((id) => {
  assert.ok(html.includes(`id="${id}"`), `index.html must include #${id}`);
});

const scriptSources = [...html.matchAll(/<script\s+src="([^"]+)"\s*><\/script>/g)].map((match) => match[1]);

assert.deepEqual(scriptSources, [
  "examples/examples.manifest.js",
  "examples/rat-cellar/example.meta.js",
  "js/engine/content-loader.js",
  "examples/rat-cellar/game.config.js",
  "examples/rat-cellar/items.js",
  "examples/rat-cellar/enemies.js",
  "examples/rat-cellar/zones.js",
  "js/engine/state.js",
  "js/engine/save.js",
  "js/engine/loot.js",
  "js/engine/inventory.js",
  "js/engine/combat.js",
  "js/engine/render.js"
], "index.html script order must preserve direct Rat Cellar startup");

assert.ok(html.includes("Registered Examples"), "index.html must expose the registered examples surface");
assert.ok(html.includes("Loaded Example"), "index.html must expose active example copy");

console.log("Index static startup contract smoke passed.");
