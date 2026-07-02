# Depth Engine

Depth Engine is a lightweight open-source browser RPG engine built with plain HTML, CSS, and JavaScript.

It is designed as a bare HTML starter foundation for small RPGs: simple to run, easy to read, and structured so reusable engine logic stays separate from example game content. The goal is to give people a clean core they can copy, study, and reshape into their own RPG.

## What Depth Engine Is

- A browser-first RPG engine foundation.
- A plain HTML/CSS/JS project with no build step.
- A content-driven starter that can power different RPG themes.
- A working example game that proves the engine loop, save flow, and UI structure.
- A reusable core inspired by the system-first lessons from DungeonDex.

## Current Prototype Status

- Current checkpoint: v0.4 Multi-Example Loader Plan.
- The current loaded example is Rat Cellar.
- The bundled example registry now includes Rat Cellar and Arena Waves.
- Arena Waves is bundled and smoke-validated, but it is not the active direct-load example yet.
- The stage-based combat loop, XP gain, currency, loot, equipment, selling, save, export/import, and reset flows are working.
- Exported save files use `depth-engine-save.json`; import compatibility and the browser storage key are unchanged.
- Equipment changes remove one selected inventory entry at a time, so duplicate item ids remain safe.
- GitHub Actions now runs all smoke scripts on pushes to `main` and on pull requests.
- Save schema rules, trusted rendering assumptions, foundation hardening checks, loader mode, hooks, content authoring, release workflow, and example-pack rules are documented under `docs/`.
- Validated by `node smoke_depth_engine_core.mjs`, `node smoke_rat_cellar_content.mjs`, and `node smoke_registered_examples_content.mjs`.
- This repo is still a prototype foundation, not a full content pack.
- The current focus is light Phase 2 preparation: a registry-backed multi-example plan without replacing direct startup.
- Phase 4 public starter release strategy is documented, but publishing and package management are not part of the current prototype.
- Rat Cellar still opens directly from `index.html`; the registered-examples UI is read-only and there is no dynamic loader yet.

## How To Run Locally

1. Open `index.html` directly in a browser.
2. No server is required.
3. No package install is required.
4. The game should load and play from a local file path.

## Current Features

- Turn-based fight resolution.
- XP and level progression.
- Currency rewards and selling.
- Loot drops and item inventory.
- Equipment slots and stat aggregation.
- Save/load using browser storage.
- Export/import for moving saves between browsers.
- Reset for starting fresh.
- Read-only registered example surface powered by `examples/examples.manifest.js`.
- Two bundled content examples: Rat Cellar and Arena Waves.

## Smoke Checks

Run these from the repo root:

```bash
node smoke_depth_engine_core.mjs
node smoke_rat_cellar_content.mjs
node smoke_registered_examples_content.mjs
```

The registered-example smoke validates every bundled example listed in `examples/examples.manifest.js`.

## Folder Structure

- `index.html` is the entry point and visible shell.
- `styles/` contains the shared presentation layer.
- `js/engine/` contains generic engine logic.
- `examples/` contains example games and the example registry.
- `examples/examples.manifest.js` lists registered example entries for future loader work.
- `examples/rat-cellar/` contains the currently loaded example game data and metadata.
- `examples/arena-waves/` contains a secondary bundled example that is registered and smoke-validated, but not direct-loaded by default.
- `examples/rat-cellar/example.meta.js` defines Rat Cellar's active example identity.
- `js/content/` is deprecated and only documents the old content location.
- `docs/` contains engine rules and contributor guidance.
- `.github/workflows/smoke.yml` runs the smoke checks in GitHub Actions.
- `README.md` explains the repo at a high level.
- `LICENSE` defines the open-source terms.

## Engine Vs Example Content

The engine stays generic. Example content defines the playable theme the engine consumes.

- `js/engine/` handles state, combat, loot, inventory, saves, and rendering.
- `js/engine/content-loader.js` exposes generic helpers for the active example and registered examples.
- `examples/examples.manifest.js` lists available examples without switching them yet.
- `examples/rat-cellar/example.meta.js` sets Rat Cellar's id, name, path, description, and content file list.
- `examples/rat-cellar/game.config.js` sets the title, currency label, stage cap, save key, export filename, and base player stats.
- `examples/rat-cellar/items.js` defines equipment and sellable items.
- `examples/rat-cellar/enemies.js` defines encounters, rewards, and loot tables.
- `examples/rat-cellar/zones.js` maps stages to zone names and enemy ids.
- `examples/arena-waves/` proves the same engine fields can present stages as combat waves instead of cellar rooms.

These files are the main place to build a new RPG theme without rewriting the engine.

Depth Engine uses `currentStage` and `maxStage` for progression. Example content can present stages as floors, waves, rooms, jobs, days, areas, or another label that fits the game.

For the current manual example workflow, see [`docs/examples.md`](docs/examples.md). For the future loader plan, see [`docs/multi-example-loading.md`](docs/multi-example-loading.md). `index.html` still loads example scripts directly so the app can run without a server.

## Loaded Example

- Loaded example: Rat Cellar
- Example path: `examples/rat-cellar`
- Example name: Rat Cellar

Rat Cellar is included as Example Game #1 only. It is not the identity of the engine. Arena Waves is included as a secondary bundled example for registry and validation coverage.

For more detail, see:

- [`docs/engine-principles.md`](docs/engine-principles.md)
- [`docs/content-vs-engine.md`](docs/content-vs-engine.md)
- [`docs/examples.md`](docs/examples.md)
- [`docs/multi-example-loading.md`](docs/multi-example-loading.md)
- [`docs/loader-mode.md`](docs/loader-mode.md)
- [`docs/save-schema.md`](docs/save-schema.md)
- [`docs/trusted-content-rendering.md`](docs/trusted-content-rendering.md)
- [`docs/foundation-checklist.md`](docs/foundation-checklist.md)
- [`docs/extension-hooks.md`](docs/extension-hooks.md)
- [`docs/content-authoring.md`](docs/content-authoring.md)
- [`docs/release-workflow.md`](docs/release-workflow.md)
- [`docs/example-pack-program.md`](docs/example-pack-program.md)
- [`docs/public-starter-release.md`](docs/public-starter-release.md)

## How To Edit The Rat Cellar Example

If you want to make a new RPG theme, start here:

1. Edit `examples/rat-cellar/example.meta.js` to change the example id, name, path, description, and content file list.
2. Edit `examples/rat-cellar/game.config.js` to change the example title, currency name, stage label, stage cap, and export filename.
3. Edit `examples/rat-cellar/items.js` to replace the item list.
4. Edit `examples/rat-cellar/enemies.js` to replace the encounter list.
5. Edit `examples/rat-cellar/zones.js` to rename the stage map.
6. Refresh the browser and test a few fights.
7. Use Reset Save if you want a clean run.

Keep ids stable when you can, and update any references if you rename content ids.

## How To Add Future Examples

1. Create a new folder under `examples/`, such as `examples/new-game-name/`.
2. Add `example.meta.js`, `game.config.js`, `items.js`, `enemies.js`, and `zones.js`.
3. Add the example to `examples/examples.manifest.js`.
4. Update the example script paths in `index.html` for now if you want it to be the active direct-load example.
5. Keep engine code in `js/engine/` generic and reusable.
6. Keep example-specific lore, names, labels, and data inside the example folder.
7. Run all three smoke scripts after the change.

## Contribution Note

This is an open-source starter project. Contributions should keep the engine generic, preserve the working example, and keep content separated from core logic.

Before opening a change, run the test checklist in `CONTRIBUTING.md`.

## Current Limitations

- Rat Cellar is the only direct-loaded playable example in `index.html`.
- Arena Waves is bundled and smoke-validated, but runtime switching is not implemented yet.
- The example registry exists, but runtime switching is not implemented yet.
- Active example metadata is content-owned, but script loading is still manual.
- There is no build system.
- There is no plugin system yet.
- There is a small save repair path, not a formal migration framework yet.
- Public starter packaging is documented as a future direction, not implemented yet.
- The project is intentionally small and focused on the starter engine loop.

## Next Roadmap Steps

See [`ROADMAP.md`](ROADMAP.md) for the planned phases:

- v0.4 loader implementation follow-up
- v0.5 save migration docs
- v0.6 hooks/plugin foundation
- v1.0 stable starter release strategy
- v1.0 stable starter release
