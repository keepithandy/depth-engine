import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

function readLocal(path) {
  return readFileSync(new URL(path, import.meta.url), "utf8");
}

const appended = [];
const context = vm.createContext({
  console,
  window: null,
  document: {
    createElement() {
      return {
        className: "",
        textContent: "",
        attributes: {},
        setAttribute(name, value) { this.attributes[name] = value; }
      };
    },
    querySelector(selector) {
      assert.equal(selector, ".hero");
      return { append(node) { appended.push(node); } };
    }
  }
});
context.window = context;

vm.runInContext(readLocal("./js/engine/hooks.js"), context, { filename: "hooks.js" });
assert.equal(context.getDepthEngineHookCount("afterStateLoad"), 0, "core should have zero hook listeners by default");
assert.deepEqual(Array.from(context.runDepthEngineHook("afterStateLoad", { exampleId: "none" })), [], "core behavior should be unchanged with no extension");

vm.runInContext(readLocal("./extensions/after-state-load-status.js"), context, { filename: "after-state-load-status.js" });
assert.equal(context.getDepthEngineHookCount("afterStateLoad"), 1, "optional extension should register one listener");

const mutableState = { currentStage: 2 };
context.runDepthEngineHook("afterStateLoad", {
  exampleId: "rat-cellar",
  stateSnapshot: mutableState
});
mutableState.currentStage = 9;

assert.equal(appended.length, 1, "extension should append one read-only status message");
assert.equal(appended[0].attributes.role, "status");
assert.equal(appended[0].textContent, "Extension observed rat-cellar at stage 2.");

console.log("Optional extension hook example smoke passed.");
