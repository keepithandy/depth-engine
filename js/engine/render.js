window.render = function render() {
  const state = window.GameState;
  const enemy = window.getEnemyForStage(state.currentStage);
  const stats = window.getTotalPlayerStats();
  const xpThreshold = window.getXpThreshold(state.player.level);
  const activeExample = window.getActiveExample();
  const stageLabel = window.getStageLabel();

  document.title = window.GAME_CONFIG.title;
  document.getElementById("loadedExampleText").textContent = `Loaded Example: ${activeExample.name}`;
  document.getElementById("goalStageHeadline").textContent = state.maxStage;
  document.getElementById("footerLoadedExample").textContent = `Loaded Example: ${activeExample.name}`;
  document.getElementById("footerExamplePath").textContent = activeExample.path;
  document.getElementById("playerStats").innerHTML = [
    ["Level", state.player.level],
    ["HP", `${state.player.hp} / ${state.player.maxHp}`],
    ["Attack", stats.attack],
    ["Defense", stats.defense],
    [window.GAME_CONFIG.currencyName, state.player.currency]
  ].map(([label, value]) => `<div class="stat-row"><span>${label}</span><strong>${value}</strong></div>`).join("");

  document.getElementById("xpText").textContent = `${state.player.xp} / ${xpThreshold}`;
  document.getElementById("xpBar").style.width = `${Math.min(100, (state.player.xp / xpThreshold) * 100)}%`;
  document.getElementById("stageText").textContent = state.completed
    ? `Cleared ${stageLabel} ${state.maxStage}`
    : `${state.currentStage} / ${state.maxStage}`;
  document.getElementById("stageBar").style.width = `${(state.currentStage / state.maxStage) * 100}%`;
  const zone = window.getZoneByStage(state.currentStage);
  document.getElementById("zoneText").textContent = zone ? `${zone.title}` : "Unknown Zone";

  document.getElementById("enemyPreview").innerHTML = `
    <div class="enemy-card">
      <div class="details">
        <strong>${enemy.name}</strong>
        <span class="muted">${stageLabel} ${state.currentStage} · ${zone?.title || "Unknown Zone"}</span>
        <span>HP ${enemy.hp} · ATK ${enemy.attack} · DEF ${enemy.defense}</span>
        <span>Rewards: ${enemy.xp} XP, ${enemy.currency} ${window.GAME_CONFIG.currencyName}</span>
      </div>
    </div>`;

  document.getElementById("combatLog").textContent = state.log.slice(0, 8).join("\n");

  document.getElementById("equipmentSlots").innerHTML = Object.entries(state.equipment).map(([slot, id]) => {
    const item = window.getItemById(id);
    return `<div class="slot-row"><span>${slot}</span><strong>${item ? item.name : "Empty"}</strong></div>`;
  }).join("");

  document.getElementById("inventoryList").innerHTML = state.inventory.length ? state.inventory.map((itemId, index) => {
    const item = window.getItemById(itemId);
    if (!item) return "";
    return `
      <div class="item-row">
        <div class="details">
          <strong>${item.name}</strong>
          <span class="muted">${item.description}</span>
          <span>Slot: ${item.slot} · ATK +${item.attack || 0} · DEF +${item.defense || 0}</span>
        </div>
        <div class="actions">
          <button type="button" data-action="equip" data-index="${index}">Equip</button>
          <button type="button" data-action="sell" data-index="${index}">Sell</button>
        </div>
      </div>`;
  }).join("") : `<div class="muted">No items yet.</div>`;

  document.getElementById("fightBtn").disabled = state.completed || state.player.hp <= 0;
};

function boot() {
  window.GameState = window.loadGame();
  const fightBtn = document.getElementById("fightBtn");
  const exportBtn = document.getElementById("exportSaveBtn");
  const resetBtn = document.getElementById("resetSaveBtn");
  const importInput = document.getElementById("importSaveInput");
  const inventoryList = document.getElementById("inventoryList");

  fightBtn.addEventListener("click", () => {
    window.resolveFight();
  });

  exportBtn.addEventListener("click", () => window.exportSave());
  resetBtn.addEventListener("click", () => window.resetSave());
  importInput.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (file) await window.importSave(file);
    event.target.value = "";
  });

  inventoryList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const index = Number(button.dataset.index);
    const itemId = window.GameState.inventory[index];
    if (!itemId) return;
    if (button.dataset.action === "equip") window.equipItem(itemId);
    if (button.dataset.action === "sell") window.sellItem(itemId);
  });

  window.render();
  window.saveGame();
}

window.addEventListener("DOMContentLoaded", boot);
