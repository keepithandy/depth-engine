import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

function readLocal(path) {
  return readFileSync(new URL(path, import.meta.url), "utf8");
}

const stored = new Map();
let rendered = 0;
let clickedDownload = null;
let exportedBlob = null;

const context = vm.createContext({
  console,
  setTimeout(callback) { callback(); },
  Blob,
  URL: {
    createObjectURL(blob) {
      exportedBlob = blob;
      return "blob:depth-engine-smoke";
    },
    revokeObjectURL() {}
  },
  document: {
    createElement(tag) {
      assert.equal(tag, "a");
      return {
        href: "",
        download: "",
        click() { clickedDownload = this.download; }
      };
    }
  },
  localStorage: {
    getItem(key) { return stored.get(key) ?? null; },
    setItem(key, value) { stored.set(key, value); }
  },
  window: null
});
context.window = context;
context.render = () => { rendered += 1; };
context.DEPTH_ENGINE_EXAMPLE_META = { id: "roundtrip-fixture", name: "Round Trip Fixture", path: "examples/roundtrip-fixture" };
context.getActiveExample = () => context.DEPTH_ENGINE_EXAMPLE_META;
context.GAME_CONFIG = {
  title: "Round Trip Fixture",
  maxStage: 3,
  saveKey: "depth-engine-roundtrip-fixture-save",
  exportFileName: "roundtrip-fixture-save.json",
  startLog: "Round trip started.",
  basePlayer: { level: 1, xp: 0, hp: 30, maxHp: 30, attack: 5, defense: 2, currency: 0 }
};
context.ITEMS = [{ id: "fixture-blade", name: "Fixture Blade", slot: "weapon", attack: 2, defense: 0 }];

vm.runInContext(readLocal("./js/engine/state.js"), context, { filename: "state.js" });
vm.runInContext(readLocal("./js/engine/save.js"), context, { filename: "save.js" });

const knownState = context.createNewState();
knownState.player.level = 3;
knownState.player.xp = 7;
knownState.player.currency = 19;
knownState.currentStage = 2;
knownState.inventory = ["fixture-blade"];
knownState.equipment.weapon = "fixture-blade";
knownState.log = ["Known fixture state."];
context.GameState = knownState;

context.exportSave();
assert.equal(clickedDownload, "roundtrip-fixture-save.json", "export should use the active example filename");
assert.ok(exportedBlob, "export should create a JSON blob");
const exportedText = await exportedBlob.text();
const exportedData = JSON.parse(exportedText);
assert.equal(exportedData.player.level, 3);
assert.equal(exportedData.currentStage, 2);
assert.deepEqual(exportedData.inventory, ["fixture-blade"]);

context.GameState = context.createNewState();
await context.importSave({ text: async () => exportedText });
assert.equal(context.GameState.exampleId, "roundtrip-fixture");
assert.equal(context.GameState.player.level, 3);
assert.equal(context.GameState.player.currency, 19);
assert.equal(context.GameState.currentStage, 2);
assert.deepEqual(Array.from(context.GameState.inventory), ["fixture-blade"]);
assert.equal(stored.has(context.GAME_CONFIG.saveKey), true, "import should save normalized state");
assert.equal(rendered, 1, "import should render once");

await assert.rejects(
  () => context.importSave({ text: async () => "{bad json" }),
  (error) => error?.name === "SyntaxError",
  "malformed JSON should reject"
);

await context.importSave({ text: async () => JSON.stringify({ ...exportedData, exampleId: "wrong-example" }) });
assert.equal(context.GameState.exampleId, "roundtrip-fixture", "wrong example identity should normalize to the active example");

await context.importSave({ text: async () => JSON.stringify({ ...exportedData, version: context.DEPTH_ENGINE_SAVE_VERSION + 1 }) });
assert.equal(context.GameState.version, context.DEPTH_ENGINE_SAVE_VERSION + 1, "future numeric save version should remain preserved");

console.log("Save export/import round-trip smoke passed.");
