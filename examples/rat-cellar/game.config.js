// Example game config for the currently loaded sample content.
// Keep the engine title generic and let the example only define data values.
window.GAME_CONFIG = {
  title: "IdleForge RPG Engine",
  currencyName: "Coins",
  // maxStage is this example's progression cap; the engine tracks currentStage.
  maxStage: 20,
  stageLabel: "Stage",
  saveKey: "idleforge-demo-save-v2",
  startLog: "Rat Cellar example loaded. Begin at Stage 1.",
  completionLog: "Rat Cellar example complete.",
  basePlayer: {
    level: 1,
    xp: 0,
    hp: 30,
    maxHp: 30,
    attack: 5,
    defense: 2,
    currency: 0
  },
  levelCurve: {
    xpBase: 20,
    xpGrowth: 1.35
  }
};
