# IdleForge RPG Engine

IdleForge RPG Engine is a lightweight open-source browser RPG and incremental RPG engine built with plain HTML, CSS, and JavaScript.

It is designed as a starter foundation for small browser RPGs: simple to run, easy to read, and structured so reusable engine logic stays separate from example game content.

## What IdleForge Is

- A browser-first RPG engine foundation.
- A plain HTML/CSS/JS project with no build step.
- A content-driven starter that can power different RPG themes.
- A working example game that proves the engine loop, save flow, and UI structure.

## Current Prototype Status

- The current loaded example is Rat Cellar.
- The stage-based combat loop, XP gain, currency, loot, equipment, selling, save, export/import, and reset flows are working.
- This repo is still a prototype foundation, not a full content pack.
- The current focus is engine identity, documentation, and repo structure.

## How To Run Locally

1. Open `index.html` directly in a browser.
2. No server is required.
3. No package install is required.
4. The game should load and play from a local file path.

## Current Features

- Turn-based fight resolution.
- XP and level progression.
- Currency rewards and spending through selling.
- Loot drops and item inventory.
- Equipment slots and stat aggregation.
- Save/load using browser storage.
- Export/import for moving saves between browsers.
- Reset for starting fresh.

## Folder Structure

- `index.html` is the entry point and visible shell.
- `styles/` contains the shared presentation layer.
- `js/engine/` contains generic engine logic.
- `examples/` contains example games.
- `examples/rat-cellar/` contains the currently loaded example game data.
- `js/content/` is deprecated and only documents the old content location.
- `docs/` contains engine rules and contributor guidance.
- `README.md` explains the repo at a high level.
- `LICENSE` defines the open-source terms.

## Engine Vs Example Content

The engine stays generic. Example content defines the playable theme the engine consumes.

- `js/engine/` handles state, combat, loot, inventory, saves, and rendering.
- `examples/rat-cellar/game.config.js` sets the title, currency label, stage cap, save key, and base player stats.
- `examples/rat-cellar/items.js` defines equipment and sellable items.
- `examples/rat-cellar/enemies.js` defines encounters, rewards, and loot tables.
- `examples/rat-cellar/zones.js` maps stages to zone names and enemy ids.
- `js/engine/content-loader.js` exposes active example metadata and generic helpers for the currently loaded example.

These files are the main place to build a new RPG theme without rewriting the engine.

IdleForge engine code uses `currentStage` and `maxStage` for progression. Example content can present stages as floors, waves, rooms, jobs, days, areas, or another label that fits the game.

For the current manual example workflow, see [`docs/examples.md`](docs/examples.md). `index.html` still loads example scripts directly so the app can run without a server.

## Loaded Example

- Loaded example: Rat Cellar
- Example path: `examples/rat-cellar`
- Example name: Rat Cellar

Rat Cellar is included as Example Game #1 only. It is not the identity of the engine.

For more detail, see:

- [`docs/engine-principles.md`](docs/engine-principles.md)
- [`docs/content-vs-engine.md`](docs/content-vs-engine.md)
- [`docs/examples.md`](docs/examples.md)

## How To Edit The Rat Cellar Example

If you want to make a new RPG theme, start here:

1. Edit `examples/rat-cellar/game.config.js` to change the example title, currency name, stage label, and stage cap.
2. Edit `examples/rat-cellar/items.js` to replace the item list.
3. Edit `examples/rat-cellar/enemies.js` to replace the encounter list.
4. Edit `examples/rat-cellar/zones.js` to rename the stage map.
5. Refresh the browser and test a few fights.
6. Use Reset Save if you want a clean run.

Keep ids stable when you can, and update any references if you rename content ids.

## How To Add Future Examples

1. Create a new folder under `examples/`, such as `examples/new-game-name/`.
2. Add `game.config.js`, `items.js`, `enemies.js`, and `zones.js`.
3. Update `IDLEFORGE_ACTIVE_EXAMPLE` metadata in `js/engine/content-loader.js`.
4. Update `index.html` to load the new example scripts for now.
5. Keep engine code in `js/engine/` generic and reusable.
6. Keep example-specific lore, names, and data inside the example folder.

## Contribution Note

This is an open-source starter project. Contributions should keep the engine generic, preserve the working example, and keep content separated from core logic.

Before opening a change, run the test checklist in `CONTRIBUTING.md`.

## Current Limitations

- Only one example game is loaded right now.
- Active example metadata is centralized, but script loading is still manual.
- There is no build system.
- There is no plugin system yet.
- There is a small save repair path, not a formal migration framework yet.
- There is no formal multi-example switcher yet.
- The project is intentionally small and focused on the starter engine loop.

## Next Roadmap Steps

See [`ROADMAP.md`](ROADMAP.md) for the planned phases:

- v0.3 content separation
- v0.4 multi-example loading
- v0.5 save migration docs
- v0.6 hooks/plugin foundation
- v1.0 stable starter release
