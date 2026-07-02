// Example game config for the Arena Waves sample content.
window.GAME_CONFIG = {
  title: "Depth Engine",
  currencyName: "Medals",
  maxStage: 12,
  stageLabel: "Wave",
  saveKey: "depth-engine-arena-waves-save-v1",
  exportFileName: "depth-engine-arena-waves-save.json",
  startLog: "Arena Waves example loaded. Survive Wave 1.",
  completionLog: "Arena Waves cleared. The crowd remembers your run.",
  basePlayer: {
    level: 1,
    xp: 0,
    hp: 34,
    maxHp: 34,
    attack: 6,
    defense: 2,
    currency: 0
  },
  levelCurve: {
    xpBase: 18,
    xpGrowth: 1.32
  }
};
