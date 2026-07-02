// Example registry for Depth Engine.
//
// This is Phase 2 preparation only. The current browser-file startup path still
// loads the active example scripts directly from index.html.
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
  }
];
