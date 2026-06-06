// Active example metadata lives here so engine files can identify the loaded
// example without pulling theme data from the example's game config.
//
// For now, index.html still loads the active example scripts directly. That
// avoids fetch() and keeps the prototype working when opened from file://.
window.IDLEFORGE_ACTIVE_EXAMPLE = {
  id: "rat-cellar",
  name: "Rat Cellar",
  path: "examples/rat-cellar",
  description: "Minimal stage-based RPG example used to demonstrate IdleForge content files."
};

window.getActiveExample = function getActiveExample() {
  return { ...window.IDLEFORGE_ACTIVE_EXAMPLE };
};

window.getActiveExamplePath = function getActiveExamplePath() {
  return window.IDLEFORGE_ACTIVE_EXAMPLE.path;
};

window.getActiveExampleName = function getActiveExampleName() {
  return window.IDLEFORGE_ACTIVE_EXAMPLE.name;
};

window.getStageLabel = function getStageLabel() {
  return window.GAME_CONFIG?.stageLabel || "Stage";
};
