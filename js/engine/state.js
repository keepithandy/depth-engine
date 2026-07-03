window.GameState = {
  exampleId: "example",
  player: null,
  // currentStage is generic progression; examples decide how to label it.
  currentStage: 1,
  // maxStage is the active example's progression cap.
  maxStage: 1,
  inventory: [],
  equipment: { weapon: null, head: null, body: null, feet: null, offhand: null, trinket: null },
  log: [],
  completed: false,
  version: 3
};

window.cloneState = function cloneState(state) {
  return JSON.parse(JSON.stringify(state));
};

window.getItemById = function getItemById(id) {
  return (window.ITEMS || []).find((item) => item.id === id) || null;
};

window.getEnemyById = function getEnemyById(id) {
  return (window.ENEMIES || []).find((enemy) => enemy.id === id) || null;
};

window.getConfiguredMaxStage = function getConfiguredMaxStage() {
  // maxFloor is accepted only to keep older configs from failing.
  const configuredMaxStage = window.GAME_CONFIG?.maxStage ?? window.GAME_CONFIG?.maxFloor ?? 1;
  const maxStage = Number(configuredMaxStage);
  return Number.isFinite(maxStage) ? Math.max(1, Math.floor(maxStage)) : 1;
};

window.clampStage = function clampStage(stage, maxStage = window.getConfiguredMaxStage()) {
  const value = Number(stage);
  return Number.isFinite(value) ? Math.min(Math.max(1, Math.floor(value)), maxStage) : 1;
};

window.getContentStage = function getContentStage(entry) {
  // Legacy examples may still use floor; new content should prefer stage.
  const stage = Number(entry?.stage ?? entry?.floor);
  return Number.isFinite(stage) ? Math.floor(stage) : null;
};

window.getZoneByStage = function getZoneByStage(stage, maxStage = window.GameState?.maxStage ?? window.getConfiguredMaxStage()) {
  const currentStage = window.clampStage(stage, maxStage);
  return (window.ZONES || []).find((zone) => window.getContentStage(zone) === currentStage) || null;
};

window.createNewState = function createNewState() {
  const maxStage = window.getConfiguredMaxStage();
  const activeExample = window.getActiveExample?.() || { id: "example" };
  return {
    exampleId: activeExample.id,
    player: { ...window.GAME_CONFIG.basePlayer },
    currentStage: 1,
    maxStage,
    inventory: [],
    equipment: { weapon: null, head: null, body: null, feet: null, offhand: null, trinket: null },
    completed: false,
    log: [window.GAME_CONFIG.startLog || "Run started."],
    version: 3
  };
};
