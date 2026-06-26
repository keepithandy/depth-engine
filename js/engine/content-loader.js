// Generic active-example helpers. Example metadata should be loaded before this file
// from the active example folder. For now, index.html still loads example scripts
// directly to avoid fetch() and keep file:// startup working.
const DEPTH_ENGINE_FALLBACK_EXAMPLE = {
  id: "example",
  name: "Example Content",
  path: "examples/",
  description: "Loaded example content.",
  entry: "",
  contentFiles: [],
  playable: false,
  bundled: false
};

window.normalizeActiveExampleMetadata = function normalizeActiveExampleMetadata(meta = {}) {
  const source = meta && typeof meta === "object" ? meta : {};
  const stringOr = (value, fallback) => {
    return typeof value === "string" && value.trim() ? value.trim() : fallback;
  };
  const contentFiles = Array.isArray(source.contentFiles)
    ? source.contentFiles.filter((file) => typeof file === "string" && file.trim()).map((file) => file.trim())
    : [];

  return {
    id: stringOr(source.id, DEPTH_ENGINE_FALLBACK_EXAMPLE.id),
    name: stringOr(source.name, DEPTH_ENGINE_FALLBACK_EXAMPLE.name),
    path: stringOr(source.path, DEPTH_ENGINE_FALLBACK_EXAMPLE.path),
    description: stringOr(source.description, DEPTH_ENGINE_FALLBACK_EXAMPLE.description),
    entry: stringOr(source.entry, DEPTH_ENGINE_FALLBACK_EXAMPLE.entry),
    contentFiles,
    playable: Boolean(source.playable),
    bundled: Boolean(source.bundled)
  };
};

window.normalizeExampleRegistry = function normalizeExampleRegistry(registry = []) {
  const list = Array.isArray(registry) ? registry : [];
  return list
    .map((entry) => window.normalizeActiveExampleMetadata(entry))
    .filter((entry) => entry.id !== DEPTH_ENGINE_FALLBACK_EXAMPLE.id);
};

window.DEPTH_ENGINE_EXAMPLE_REGISTRY = window.normalizeExampleRegistry(window.DEPTH_ENGINE_EXAMPLE_REGISTRY);
window.DEPTH_ENGINE_ACTIVE_EXAMPLE = window.normalizeActiveExampleMetadata(window.DEPTH_ENGINE_EXAMPLE_META);

window.getExampleRegistry = function getExampleRegistry() {
  return window.DEPTH_ENGINE_EXAMPLE_REGISTRY.map((entry) => ({
    ...entry,
    contentFiles: [...entry.contentFiles]
  }));
};

window.getRegisteredExampleById = function getRegisteredExampleById(id) {
  return window.getExampleRegistry().find((entry) => entry.id === id) || null;
};

window.isActiveExampleRegistered = function isActiveExampleRegistered() {
  return Boolean(window.getRegisteredExampleById(window.DEPTH_ENGINE_ACTIVE_EXAMPLE.id));
};

window.getActiveExample = function getActiveExample() {
  return {
    ...window.DEPTH_ENGINE_ACTIVE_EXAMPLE,
    contentFiles: [...(window.DEPTH_ENGINE_ACTIVE_EXAMPLE.contentFiles || [])]
  };
};

window.getActiveExamplePath = function getActiveExamplePath() {
  return window.DEPTH_ENGINE_ACTIVE_EXAMPLE.path;
};

window.getActiveExampleName = function getActiveExampleName() {
  return window.DEPTH_ENGINE_ACTIVE_EXAMPLE.name;
};

window.getStageLabel = function getStageLabel() {
  return window.GAME_CONFIG?.stageLabel || "Stage";
};
