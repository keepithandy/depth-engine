// Minimal local hook registry for optional read-only extensions.
//
// Hooks are never required by the core game loop. The starter remains fully
// playable when no extension registers a listener.
(function createDepthEngineHookRuntime() {
  const listeners = new Map();

  function clonePayload(payload) {
    if (payload === undefined) return undefined;
    return JSON.parse(JSON.stringify(payload));
  }

  window.registerDepthEngineHook = function registerDepthEngineHook(name, listener) {
    if (typeof name !== "string" || !name.trim() || typeof listener !== "function") {
      return function noopUnsubscribe() {};
    }

    const hookName = name.trim();
    const hookListeners = listeners.get(hookName) || new Set();
    hookListeners.add(listener);
    listeners.set(hookName, hookListeners);

    return function unregisterDepthEngineHook() {
      hookListeners.delete(listener);
      if (hookListeners.size === 0) listeners.delete(hookName);
    };
  };

  window.runDepthEngineHook = function runDepthEngineHook(name, payload = {}) {
    const hookListeners = listeners.get(name);
    if (!hookListeners || hookListeners.size === 0) return [];

    const safePayload = Object.freeze({
      ...clonePayload(payload),
      event: name,
      readOnly: true
    });

    return Array.from(hookListeners).map((listener) => {
      try {
        return listener(safePayload);
      } catch (error) {
        console.error(`Depth Engine hook ${name} failed.`, error);
        return undefined;
      }
    });
  };

  window.getDepthEngineHookCount = function getDepthEngineHookCount(name) {
    return listeners.get(name)?.size || 0;
  };
})();
