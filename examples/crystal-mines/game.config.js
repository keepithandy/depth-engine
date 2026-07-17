// Crystal Mines configuration created through the documented bundled-example path.
window.GAME_CONFIG = {
  title: "Depth Engine",
  currencyName: "Crystals",
  maxStage: 5,
  stageLabel: "Mine Level",
  saveKey: "depth-engine-crystal-mines-save-v1",
  exportFileName: "crystal-mines-save.json",
  startLog: "Crystal Mines documentation proof loaded. Begin at Mine Level 1.",
  completionLog: "Crystal Mines documentation proof complete.",
  basePlayer: {
    level: 1,
    xp: 0,
    hp: 28,
    maxHp: 28,
    attack: 5,
    defense: 2,
    currency: 0
  },
  levelCurve: {
    xpBase: 18,
    xpGrowth: 1.3
  }
};
