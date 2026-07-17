// Example registry for Depth Engine.
//
// Bundled examples are loaded locally by js/engine/example-loader.js so the
// starter keeps its no-server, no-build-step browser path intact.
window.DEPTH_ENGINE_EXAMPLE_REGISTRY = [
  {
    id: "rat-cellar",
    name: "Rat Cellar",
    path: "examples/rat-cellar",
    description: "Minimal stage-based RPG example used to demonstrate Depth Engine content files.",
    entry: "examples/rat-cellar/example.meta.js",
    contentFiles: [
      "game.config.js",
      "items.js",
      "enemies.js",
      "zones.js"
    ],
    playable: true,
    bundled: true
  },
  {
    id: "arena-waves",
    name: "Arena Waves",
    path: "examples/arena-waves",
    description: "Compact wave-based arena RPG example that reuses the generic stage engine.",
    entry: "examples/arena-waves/example.meta.js",
    contentFiles: [
      "game.config.js",
      "items.js",
      "enemies.js",
      "zones.js"
    ],
    playable: true,
    bundled: true
  },
  {
    id: "sewer-patrol",
    name: "Sewer Patrol",
    path: "examples/sewer-patrol",
    description: "Short patrol-route RPG example that proves another theme can reuse the generic Depth Engine stage loop.",
    entry: "examples/sewer-patrol/example.meta.js",
    contentFiles: [
      "game.config.js",
      "items.js",
      "enemies.js",
      "zones.js"
    ],
    playable: true,
    bundled: true
  },
  {
    id: "depth-kit-lab",
    name: "Depth Kit Lab",
    path: "examples/depth-kit-lab",
    description: "Short pocket-loop prototype that proves prepare, delve, loot, upgrade, repeat using the generic Depth Engine stage loop.",
    entry: "examples/depth-kit-lab/example.meta.js",
    contentFiles: [
      "game.config.js",
      "items.js",
      "enemies.js",
      "zones.js"
    ],
    playable: true,
    bundled: true
  },
  {
    id: "crystal-mines",
    name: "Crystal Mines",
    path: "examples/crystal-mines",
    description: "Documentation-driven example proving a new RPG theme can be added without editing generic engine files.",
    entry: "examples/crystal-mines/example.meta.js",
    contentFiles: [
      "game.config.js",
      "items.js",
      "enemies.js",
      "zones.js"
    ],
    playable: true,
    bundled: true
  }
];
