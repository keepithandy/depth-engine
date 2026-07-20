// Optional Depth Engine extension example.
//
// Disabled by default: index.html does not load this file. To try it, add this
// script after js/engine/hooks.js and before js/engine/render.js, then remove the
// script tag to disable the extension again.
(function registerAfterStateLoadStatusExtension() {
  if (typeof window.registerDepthEngineHook !== "function") return;

  window.registerDepthEngineHook("afterStateLoad", (payload) => {
    const message = document.createElement("p");
    message.className = "extension-status muted";
    message.setAttribute("role", "status");
    message.textContent = `Extension observed ${payload.exampleId} at stage ${payload.stateSnapshot?.currentStage ?? "?"}.`;
    document.querySelector(".hero")?.append(message);
  });
})();
