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

function createLoaderContext({ search = "", storedExampleId = "" } = {}) {
  const storage = new Map();
  if (storedExampleId) storage.set("depth-engine-selected-example-id", storedExampleId);

  const writtenScripts = [];
  const context = {
    URLSearchParams,
    window: null,
    document: {
      write(markup) {
        const src = markup.match(/src=\"([^\"]+)\"/)?.[1];
        if (src) writtenScripts.push(src);
      }
    },
    location: {
      search,
      reloadCalled: false,
      reload() {
        this.reloadCalled = true;
      }
    },
    localStorage: {
      getItem(key) {
        return storage.has(key) ? storage.get(key) : null;
      },
      setItem(key, value) {
        storage.set(key, String(value));
      },
      removeItem(key) {
        storage.delete(key);
      }
    }
  };
  context.window = context;
  return { context: vm.createContext(context), storage, writtenScripts };
}

function loadSelectionScenario(options) {
  const scenario = createLoaderContext(options);
  loadScriptInContext(scenario.context, "./examples/examples.manifest.js");
  loadScriptInContext(scenario.context, "./js/engine/example-loader.js");
  return scenario;
}

const defaultScenario = loadSelectionScenario();
assert.equal(defaultScenario.context.DEPTH_ENGINE_SELECTED_EXAMPLE_ID, "rat-cellar", "default selection should be Rat Cellar");
assert.deepEqual(defaultScenario.writtenScripts, [
  "examples/rat-cellar/example.meta.js",
  "js/engine/content-loader.js",
  "examples/rat-cellar/game.config.js",
  "examples/rat-cellar/items.js",
  "examples/rat-cellar/enemies.js",
  "examples/rat-cellar/zones.js"
], "default startup should write Rat Cellar scripts in order");
assert.equal(defaultScenario.storage.get("depth-engine-selected-example-id"), "rat-cellar", "default startup should persist Rat Cellar as selected example");

const storedArenaScenario = loadSelectionScenario({ storedExampleId: "arena-waves" });
assert.equal(storedArenaScenario.context.DEPTH_ENGINE_SELECTED_EXAMPLE_ID, "arena-waves", "stored selection should load Arena Waves");
assert.deepEqual(storedArenaScenario.writtenScripts, [
  "examples/arena-waves/example.meta.js",
  "js/engine/content-loader.js",
  "examples/arena-waves/game.config.js",
  "examples/arena-waves/items.js",
  "examples/arena-waves/enemies.js",
  "examples/arena-waves/zones.js"
], "stored Arena Waves selection should write Arena Waves scripts in order");

const queryArenaScenario = loadSelectionScenario({ search: "?example=arena-waves", storedExampleId: "rat-cellar" });
assert.equal(queryArenaScenario.context.DEPTH_ENGINE_SELECTED_EXAMPLE_ID, "arena-waves", "query string should override stored selected example");
assert.equal(queryArenaScenario.storage.get("depth-engine-selected-example-id"), "arena-waves", "query selection should persist selected example");

const invalidScenario = loadSelectionScenario({ storedExampleId: "missing-example" });
assert.equal(invalidScenario.context.DEPTH_ENGINE_SELECTED_EXAMPLE_ID, "rat-cellar", "invalid stored selection should fall back to Rat Cellar");
assert.equal(invalidScenario.context.DEPTH_ENGINE_EXAMPLE_SELECTION_STATUS.fallbackUsed, true, "invalid stored selection should report fallback use");
assert.equal(invalidScenario.storage.get("depth-engine-selected-example-id"), "rat-cellar", "fallback should repair stored selected example");

assert.equal(defaultScenario.context.selectDepthEngineExample("arena-waves"), true, "selectDepthEngineExample should accept bundled playable examples");
assert.equal(defaultScenario.storage.get("depth-engine-selected-example-id"), "arena-waves", "selectDepthEngineExample should persist the requested example");
assert.equal(defaultScenario.context.location.reloadCalled, true, "selectDepthEngineExample should reload the page after selection");
assert.equal(defaultScenario.context.selectDepthEngineExample("missing-example"), false, "selectDepthEngineExample should reject unknown examples");

console.log("Example selection contract smoke passed.");
