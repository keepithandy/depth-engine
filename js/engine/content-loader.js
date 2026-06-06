// Direct-file builds load example scripts from index.html instead of fetch().
window.getActiveExample = function getActiveExample() {
  const configured = window.ACTIVE_EXAMPLE || window.GAME_CONFIG?.example || {};
  return {
    id: configured.id || "example",
    name: configured.name || "Example Content",
    path: configured.path || "examples/"
  };
};

window.getStageLabel = function getStageLabel() {
  return window.GAME_CONFIG?.stageLabel || "Stage";
};
