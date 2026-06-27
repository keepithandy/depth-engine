window.getItemStats = function getItemStats(item) {
  return {
    attack: item?.attack || 0,
    defense: item?.defense || 0
  };
};

window.getEquippedStats = function getEquippedStats() {
  return Object.values(window.GameState.equipment).reduce((total, id) => {
    const item = window.getItemById(id);
    if (!item) return total;
    total.attack += item.attack || 0;
    total.defense += item.defense || 0;
    return total;
  }, { attack: 0, defense: 0 });
};

window.addItemToInventory = function addItemToInventory(item) {
  window.GameState.inventory.push(item.id);
};

window.equipItem = function equipItem(itemId) {
  const item = window.getItemById(itemId);
  if (!item) return;
  const inventoryIndex = window.GameState.inventory.indexOf(item.id);
  if (inventoryIndex >= 0) {
    window.GameState.inventory.splice(inventoryIndex, 1);
  }
  const currentlyEquipped = window.GameState.equipment[item.slot];
  if (currentlyEquipped) {
    window.GameState.inventory.push(currentlyEquipped);
  }
  window.GameState.equipment[item.slot] = item.id;
  window.GameState.log.unshift(`Equipped ${item.name}.`);
  window.saveGame();
  window.render();
};

window.sellItem = function sellItem(itemId) {
  const item = window.getItemById(itemId);
  if (!item) return;
  const equippedIds = Object.values(window.GameState.equipment);
  if (equippedIds.includes(item.id)) {
    window.GameState.log.unshift(`Unequip ${item.name} before selling it.`);
    window.render();
    return;
  }
  const index = window.GameState.inventory.indexOf(item.id);
  if (index < 0) return;
  window.GameState.inventory.splice(index, 1);
  window.GameState.player.currency += Math.max(1, Math.floor((item.price || 1) / 2));
  window.GameState.log.unshift(`Sold ${item.name}.`);
  window.saveGame();
  window.render();
};