// Local-first example script loader.
//
// This loader keeps the no-server startup path intact by writing the selected
// example scripts during normal HTML parsing. It does not fetch remote content.
(function loadSelectedDepthEngineExample() {
  const SELECTION_KEY = "depth-engine-selected-example-id";
  const registry = Array.isArray(window.DEPTH_ENGINE_EXAMPLE_REGISTRY)
    ? window.DEPTH_ENGINE_EXAMPLE_REGISTRY
    : [];
  const defaultExampleId = registry[0]?.id || "example";

  function findExampleById(id) {
    return registry.find((entry) => entry && entry.id === id) || null;
  }

  function readStoredExampleId() {
    try {
      return window.localStorage?.getItem(SELECTION_KEY) || "";
    } catch {
      return "";
    }
  }

  function writeStoredExampleId(id) {
    try {
      window.localStorage?.setItem(SELECTION_KEY, id);
    } catch {
      // Storage can be unavailable in strict browser modes. Runtime still falls
      // back to the default example in that case.
    }
  }

  function getRequestedExampleId() {
    try {
      const fromUrl = new URLSearchParams(window.location.search).get("example");
      if (fromUrl) return fromUrl;
    } catch {
      // Older or restricted browser contexts can skip URL parsing.
    }
    return readStoredExampleId() || defaultExampleId;
  }

  function resolveSelectedExample() {
    const requestedId = getRequestedExampleId();
    const requestedExample = findExampleById(requestedId);
    const selectedExample = requestedExample || findExampleById(defaultExampleId) || registry[0] || null;

    if (selectedExample) {
      writeStoredExampleId(selectedExample.id);
    }

    return {
      requestedId,
      activeId: selectedExample?.id || "",
      fallbackUsed: Boolean(requestedId && selectedExample && requestedId !== selectedExample.id),
      example: selectedExample
    };
  }

  function writeScript(src) {
    document.write(`<script src="${src}"><\/script>`);
  }

  window.DEPTH_ENGINE_EXAMPLE_SELECTION_KEY = SELECTION_KEY;

  window.selectDepthEngineExample = function selectDepthEngineExample(id) {
    const example = findExampleById(id);
    if (!example || !example.playable || !example.bundled) {
      return false;
    }

    writeStoredExampleId(example.id);
    window.location.reload();
    return true;
  };

  const selection = resolveSelectedExample();
  window.DEPTH_ENGINE_SELECTED_EXAMPLE_ID = selection.activeId;
  window.DEPTH_ENGINE_EXAMPLE_SELECTION_STATUS = {
    requestedId: selection.requestedId,
    activeId: selection.activeId,
    fallbackUsed: selection.fallbackUsed
  };

  if (!selection.example) {
    throw new Error("Depth Engine could not resolve a bundled example to load.");
  }

  writeScript(selection.example.entry);
  writeScript("js/engine/content-loader.js");
  selection.example.contentFiles.forEach((file) => {
    writeScript(`${selection.example.path}/${file}`);
  });
})();
