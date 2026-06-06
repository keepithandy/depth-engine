window.normalizeSaveState = function normalizeSaveState(data) {
  const base = window.createNewState();
  const source = data && typeof data === "object" ? data : {};
  // Legacy saves may contain floor/currentFloor/maxFloor; repair them into stage fields.
  const { currentFloor, floor, maxFloor, ...sourceWithoutLegacyStage } = source;
  const player = { ...window.GAME_CONFIG.basePlayer, ...(source.player || {}) };
  const maxStageSource = source.maxStage ?? maxFloor ?? base.maxStage;
  const maxStageValue = Number(maxStageSource);
  const maxStage = Number.isFinite(maxStageValue) ? Math.max(1, Math.floor(maxStageValue)) : base.maxStage;
  const stageSource = source.currentStage ?? currentFloor ?? floor ?? base.currentStage;
  const currentStage = window.clampStage(stageSource, maxStage);
  return {
    ...base,
    ...sourceWithoutLegacyStage,
    player,
    currentStage,
    maxStage,
    equipment: { weapon: null, head: null, body: null, feet: null, offhand: null, trinket: null, ...(source.equipment || {}) },
    inventory: Array.isArray(source.inventory) ? source.inventory.filter((id) => typeof id === "string") : [],
    log: Array.isArray(source.log) ? source.log.filter((entry) => typeof entry === "string") : base.log,
    completed: Boolean(source.completed) && currentStage >= maxStage,
    version: Math.max(3, Number(source.version) || 0)
  };
};

window.loadGame = function loadGame() {
  const raw = localStorage.getItem(window.GAME_CONFIG.saveKey);
  if (!raw) return window.createNewState();
  try {
    const parsed = JSON.parse(raw);
    return window.normalizeSaveState(parsed);
  } catch {
    return window.createNewState();
  }
};

window.saveGame = function saveGame() {
  localStorage.setItem(window.GAME_CONFIG.saveKey, JSON.stringify(window.GameState));
};

window.exportSave = function exportSave() {
  const blob = new Blob([JSON.stringify(window.GameState, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "idleforge-save.json";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
};

window.importSave = async function importSave(file) {
  const text = await file.text();
  const data = JSON.parse(text);
  window.GameState = window.normalizeSaveState({ ...data, log: Array.isArray(data.log) ? data.log : ["Save imported."] });
  window.saveGame();
  window.render();
};

window.resetSave = function resetSave() {
  window.GameState = window.createNewState();
  window.saveGame();
  window.render();
};
