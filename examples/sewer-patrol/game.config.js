// Example game config for Sewer Patrol.
window.GAME_CONFIG = {
  title: "Depth Engine",
  currencyName: "Tokens",
  maxStage: 8,
  stageLabel: "Patrol",
  saveKey: "depth-engine-sewer-patrol-save-v1",
  exportFileName: "sewer-patrol-save.json",
  startLog: "Sewer Patrol example loaded. Begin at Patrol 1.",
  completionLog: "Sewer Patrol route complete.",
  basePlayer: {
    level: 1,
    xp: 0,
    hp: 32,
    maxHp: 32,
    attack: 6,
    defense: 2,
    currency: 0
  },
  levelCurve: {
    xpBase: 18,
    xpGrowth: 1.3
  }
};
