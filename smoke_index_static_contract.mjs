import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");

const requiredIds = [
  "mainContent",
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
  "js/engine/example-loader.js",
  "js/engine/hooks.js",
  "js/engine/state.js",
  "js/engine/save.js",
  "js/engine/loot.js",
  "js/engine/inventory.js",
  "js/engine/combat.js",
  "js/engine/render.js"
], "index.html script order must preserve registry, selected-example loading, optional hooks, engine startup, and render bootstrap");

assert.ok(html.includes("Registered Examples"), "index.html must expose the registered examples surface");
assert.ok(html.includes("Loaded Example"), "index.html must expose active example copy");
assert.ok(html.includes("separate save slot"), "index.html must warn that example switching keeps separate saves");
assert.ok(html.includes("class=\"skip-link\""), "index.html must include a keyboard skip link");
assert.ok(html.includes("role=\"log\""), "combat status must use a semantic live log");
assert.ok(html.includes("aria-live=\"polite\""), "status changes must expose polite live regions");

const exampleLoader = readFileSync(new URL("./js/engine/example-loader.js", import.meta.url), "utf8");
assert.ok(exampleLoader.includes("document.write"), "example-loader must write selected local scripts during HTML parsing");
assert.ok(exampleLoader.includes("selectDepthEngineExample"), "example-loader must expose a selection action");
assert.ok(!exampleLoader.includes("fetch("), "example-loader must not require fetch for local startup");

console.log("Index static startup, hook, and accessibility contract smoke passed.");
