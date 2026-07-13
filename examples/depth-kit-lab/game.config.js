// Example game config for Depth Kit Lab.
window.GAME_CONFIG = {
  title: "Depth Engine",
  currencyName: "Shards",
  maxStage: 6,
  stageLabel: "Depth",
  saveKey: "depth-engine-depth-kit-lab-save-v1",
  exportFileName: "depth-kit-lab-save.json",
  startLog: "Depth Kit Lab loaded. Enter Depth 1 and prove the pocket loop.",
  completionLog: "Depth Kit Lab complete. The loop is ready for another prototype pass.",
  basePlayer: {
    level: 1,
    xp: 0,
    hp: 28,
    maxHp: 28,
    attack: 6,
    defense: 2,
    currency: 0
  },
  levelCurve: {
    xpBase: 16,
    xpGrowth: 1.28
  }
};
