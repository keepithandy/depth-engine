window.normalizeSaveState = function normalizeSaveState(data) {
  const base = window.createNewState();
  const source = data && typeof data === "object" ? data : {};
  // Legacy saves may contain floor/currentFloor/maxFloor; repair them into stage fields.
  const { currentFloor, floor, maxFloor, ...sourceWithoutLegacyStage } = source;
  const activeExample = window.getActiveExample?.() || { id: "example" };
  const player = { ...window.GAME_CONFIG.basePlayer, ...(source.player || {}) };
  // The active example configuration owns the progression cap. Saved maxStage/maxFloor
  // values are compatibility inputs only and must not redefine the current route.
  const maxStage = base.maxStage;
  const stageSource = source.currentStage ?? currentFloor ?? floor ?? base.currentStage;
  const currentStage = window.clampStage(stageSource, maxStage);
  const itemExists = (id) => typeof id === "string" && Boolean(window.getItemById(id));
  const equipmentSlots = ["weapon", "head", "body", "feet", "offhand", "trinket"];
  const repairedEquipment = equipmentSlots.reduce((equipment, slot) => {
    const itemId = source.equipment?.[slot];
    const item = itemExists(itemId) ? window.getItemById(itemId) : null;
    equipment[slot] = item && item.slot === slot ? item.id : null;
    return equipment;
  }, {});

  return {
    ...base,
    ...sourceWithoutLegacyStage,
    exampleId: activeExample.id,
    player,
    currentStage,
    maxStage,
    equipment: repairedEquipment,
    inventory: Array.isArray(source.inventory) ? source.inventory.filter(itemExists) : [],
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
  window.GameState.exampleId = window.getActiveExample?.().id || window.GameState.exampleId || "example";
  localStorage.setItem(window.GAME_CONFIG.saveKey, JSON.stringify(window.GameState));
};

window.getSaveExportFileName = function getSaveExportFileName() {
  return window.GAME_CONFIG?.exportFileName || "depth-engine-save.json";
};

window.exportSave = function exportSave() {
  const blob = new Blob([JSON.stringify(window.GameState, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = window.getSaveExportFileName();
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