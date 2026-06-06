window.getEnemyForStage = function getEnemyForStage(stage) {
  const maxStage = window.GameState?.maxStage ?? window.getConfiguredMaxStage();
  const zone = window.getZoneByStage(stage, maxStage);
  return window.getEnemyById(zone?.enemy) || window.ENEMIES[0];
};

window.getTotalPlayerStats = function getTotalPlayerStats() {
  const gear = window.getEquippedStats();
  return {
    attack: window.GameState.player.attack + gear.attack,
    defense: window.GameState.player.defense + gear.defense
  };
};

window.getXpThreshold = function getXpThreshold(level) {
  return Math.floor(window.GAME_CONFIG.levelCurve.xpBase * Math.pow(window.GAME_CONFIG.levelCurve.xpGrowth, level - 1));
};

window.applyLevelUps = function applyLevelUps() {
  let leveled = false;
  while (window.GameState.player.xp >= window.getXpThreshold(window.GameState.player.level)) {
    const threshold = window.getXpThreshold(window.GameState.player.level);
    window.GameState.player.xp -= threshold;
    window.GameState.player.level += 1;
    window.GameState.player.maxHp += 6;
    window.GameState.player.attack += 2;
    window.GameState.player.defense += 1;
    window.GameState.player.hp = window.GameState.player.maxHp;
    window.GameState.log.unshift(`Level up! You reached level ${window.GameState.player.level}.`);
    leveled = true;
  }
  return leveled;
};

window.resolveFight = function resolveFight() {
  const enemy = window.getEnemyForStage(window.GameState.currentStage);
  const player = window.GameState.player;
  const stats = window.getTotalPlayerStats();
  const playerDamage = Math.max(1, stats.attack - enemy.defense + Math.floor(Math.random() * 3));
  const enemyDamage = Math.max(1, enemy.attack - stats.defense + Math.floor(Math.random() * 3));
  const playerPower = player.hp + playerDamage * 2 + Math.random() * 5;
  const enemyPower = enemy.hp + enemyDamage * 2 + Math.random() * 5;

  if (playerPower >= enemyPower) {
    player.xp += enemy.xp;
    player.currency += enemy.currency;
    window.rollLoot(enemy).forEach((item) => window.addItemToInventory(item));
    const clearedFinalStage = window.GameState.currentStage >= window.GameState.maxStage;
    if (clearedFinalStage) {
      window.GameState.completed = true;
    } else {
      window.GameState.currentStage = Math.min(window.GameState.currentStage + 1, window.GameState.maxStage);
    }
    window.GameState.log.unshift(`You defeated ${enemy.name}.`);
    window.GameState.log.unshift(`Reward: ${enemy.xp} XP and ${enemy.currency} ${window.GAME_CONFIG.currencyName}.`);
    if (window.GameState.completed) {
      window.GameState.log.unshift(window.GAME_CONFIG.completionLog || `You cleared Stage ${window.GameState.maxStage}.`);
    }
    window.applyLevelUps();
    window.saveGame();
    window.render();
    return;
  }

  player.hp = player.maxHp;
  window.GameState.log.unshift(`You were defeated by ${enemy.name}.`);
  window.GameState.log.unshift("You recover and stay on the current stage.");
  window.saveGame();
  window.render();
};
