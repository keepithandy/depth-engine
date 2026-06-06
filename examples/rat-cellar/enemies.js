// Example enemy data for Rat Cellar.
// Keep ids stable because zones point to enemies by id.
window.ENEMIES = [
  { id: "rat", name: "Rat", stage: 1, hp: 10, attack: 3, defense: 0, xp: 8, currency: 3, loot: ["stick"] },
  { id: "big-rat", name: "Big Rat", stage: 2, hp: 14, attack: 4, defense: 1, xp: 11, currency: 4, loot: ["cloth-cap", "stick"] },
  { id: "sewer-bat", name: "Sewer Bat", stage: 4, hp: 18, attack: 5, defense: 1, xp: 15, currency: 6, loot: ["rusty-knife"] },
  { id: "cellar-spider", name: "Cellar Spider", stage: 6, hp: 22, attack: 6, defense: 2, xp: 20, currency: 8, loot: ["old-boots", "splintered-shield"] },
  { id: "rat-king", name: "Rat King", stage: 10, hp: 34, attack: 8, defense: 3, xp: 34, currency: 15, loot: ["sewer-ring", "rusty-knife"] },
  { id: "cave-slime", name: "Cave Slime", stage: 11, hp: 24, attack: 6, defense: 2, xp: 22, currency: 8, loot: ["mossy-dagger"] },
  { id: "moss-beetle", name: "Moss Beetle", stage: 13, hp: 28, attack: 7, defense: 3, xp: 26, currency: 10, loot: ["beetle-shell-helm"] },
  { id: "glow-bat", name: "Glow Bat", stage: 15, hp: 30, attack: 8, defense: 2, xp: 29, currency: 11, loot: ["glowstone-ring"] },
  { id: "stone-grub", name: "Stone Grub", stage: 17, hp: 34, attack: 8, defense: 4, xp: 32, currency: 13, loot: ["stonehide-vest"] },
  { id: "cavern-brute", name: "Cavern Brute", stage: 20, hp: 42, attack: 10, defense: 5, xp: 40, currency: 18, loot: ["cavern-club"] }
];
