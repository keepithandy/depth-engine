# Depth Engine

Depth Engine is a lightweight open-source browser RPG engine built with plain HTML, CSS, and JavaScript.

It is designed as a bare HTML starter foundation for small RPGs: simple to run, easy to read, and structured so reusable engine logic stays separate from example game content. The goal is to give people a clean core they can copy, study, and reshape into their own RPG.

## Try It First

Open `index.html` directly in a browser. No install step, build step, package manager, or local server is required.

The default example is **Rat Cellar**. Use the Registered Examples panel to switch to **Arena Waves**, **Sewer Patrol**, or **Depth Kit Lab**.

Run the current smoke checks from the repo root with:

```bash
node smoke_index_static_contract.mjs
node smoke_example_selection_contract.mjs
node smoke_depth_engine_core.mjs
node smoke_save_stage_cap_contract.mjs
node smoke_save_player_repair_contract.mjs
node smoke_rat_cellar_content.mjs
node smoke_registered_examples_content.mjs
node smoke_depth_kit_lab_example.mjs
```

Current status: active reusable-engine prototype. The project is proving bundled examples, per-example save identity, and short-loop prototype readiness without remote content loading or a build step.

## What Depth Engine Is

- A browser-first RPG engine foundation.
- A plain HTML/CSS/JS project with no build step.
- A content-driven starter that can power different RPG themes.
- A working example game that proves the engine loop, save flow, and UI structure.
- A reusable core inspired by the system-first lessons from DungeonDex.

## Current Prototype Status

- Current checkpoint: v0.6 Depth Kit Lab Pocket Loop Example.
- The default loaded example is Rat Cellar.
- The bundled example registry includes Rat Cellar, Arena Waves, Sewer Patrol, and Depth Kit Lab.
- Arena Waves, Sewer Patrol, and Depth Kit Lab are selectable from the Registered Examples panel.
- Depth Kit Lab is a short six-depth prototype for prepare, delve, loot, upgrade, repeat pacing.
- The selected example id is stored locally and the page reloads into that bundled example.
- Each example keeps its own save slot through its own `GAME_CONFIG.saveKey`.
- Exported save files come from the active example's `GAME_CONFIG.exportFileName`.
- The stage-based combat loop, XP gain, currency, loot, equipment, selling, save, export/import, and reset flows are working.
- Equipment changes remove one selected inventory entry at a time, so duplicate item ids remain safe.
- GitHub Actions now runs all smoke scripts on pushes to `main` and on pull requests.
- Save schema rules, trusted rendering assumptions, foundation hardening checks, loader mode, hooks, content authoring, release workflow, example-pack rules, and Depth Kit Lab guidance are documented under `docs/`.
- Agent owner lanes for future work are documented in [`AGENTS.md`](AGENTS.md).
- Validated by the smoke commands listed in this README and run by `.github/workflows/smoke.yml`.
- This repo is still a prototype foundation, not a full content pack.
- The current focus is proving reusable bundled examples without remote content loading or a build step.
- Phase 4 public starter release strategy is documented, but publishing and package management are not part of the current prototype.

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
- Registered example selector powered by `examples/examples.manifest.js`.
- Four bundled content examples: Rat Cellar, Arena Waves, Sewer Patrol, and Depth Kit Lab.
- Separate save slots per bundled example.

## Smoke Checks

Run these from the repo root:

```bash
node smoke_index_static_contract.mjs
node smoke_example_selection_contract.mjs
node smoke_depth_engine_core.mjs
node smoke_save_stage_cap_contract.mjs
node smoke_save_player_repair_contract.mjs
node smoke_rat_cellar_content.mjs
node smoke_registered_examples_content.mjs
node smoke_depth_kit_lab_example.mjs
```

The index static smoke guards required DOM ids and the selected-example loader contract. The example selection smoke guards default Rat Cellar startup, Arena Waves selection, invalid-selection fallback, and reload behavior. The save smokes guard configured stage-cap ownership and repair of malformed player fields. The registered-example smoke validates every bundled example listed in `examples/examples.manifest.js`. The Depth Kit Lab smoke guards the pocket-loop example's registry entry, save identity, export filename, short route map, reward flow, and upgrade-flavored Depth Kit item path.

## Starter And Release Guidance

- Use [`docs/starter-customization.md`](docs/starter-customization.md) when turning the starter into a new RPG theme.
- Use [`docs/release-readiness-checklist.md`](docs/release-readiness-checklist.md) before tagging, recommending, or sharing a named starter snapshot.
- Use [`docs/hooks.md`](docs/hooks.md) to understand the first safe hook boundary before adding extension code.
- Use [`docs/depth-kit-lab.md`](docs/depth-kit-lab.md) to understand the short-loop prototype example.

## Work Tracking

Use [`AGENTS.md`](AGENTS.md) to assign future issues to a primary owner lane before implementation.

Current lanes:

- Architect
- Core Runtime
- Content Systems
- Rendering UI
- Testing Warden
- Documentation
- Release Manager

## Folder Structure

- `index.html` is the entry point and visible shell.
- `styles/` contains the shared presentation layer.
- `js/engine/` contains generic engine logic.
- `js/engine/example-loader.js` chooses the active bundled example before engine systems load.
- `examples/` contains example games and the example registry.
- `examples/examples.manifest.js` lists registered example entries.
- `examples/rat-cellar/` contains the default bundled example game data and metadata.
- `examples/arena-waves/` contains the secondary bundled example.
- `examples/sewer-patrol/` contains the third bundled example.
- `examples/depth-kit-lab/` contains the short-loop pocket prototype example.
- `js/content/` is deprecated and only documents the old content location.
- `docs/` contains engine rules and contributor guidance.
- `.github/workflows/smoke.yml` runs the smoke checks in GitHub Actions.
- `README.md` explains the repo at a high level.
- `AGENTS.md` defines owner lanes for future issues.
- `LICENSE` defines the open-source terms.

## Engine Vs Example Content

The engine stays generic. Example content defines the playable theme the engine consumes.

- `js/engine/` handles state, combat, loot, inventory, saves, and rendering.
- `js/engine/example-loader.js` chooses which bundled example scripts load.
- `js/engine/content-loader.js` exposes generic helpers for the active example and registered examples.
- `examples/examples.manifest.js` lists available examples.
- `examples/rat-cellar/example.meta.js` sets Rat Cellar's id, name, path, description, and content file list.
- `examples/rat-cellar/game.config.js` sets the title, currency label, stage cap, save key, export filename, and base player stats.
- `examples/rat-cellar/items.js` defines equipment and sellable items.
- `examples/rat-cellar/enemies.js` defines encounters, rewards, and loot tables.
- `examples/rat-cellar/zones.js` maps stages to zone names and enemy ids.
- `examples/arena-waves/` proves the same engine fields can present stages as combat waves instead of cellar rooms.
- `examples/sewer-patrol/` proves another theme can use the same engine fields without engine-specific rewrites.
- `examples/depth-kit-lab/` proves a short pocket-loop prototype can use the same engine fields for Depth labels, Shards currency, short-route pacing, and upgrade-flavored equipment rewards.

These files are the main place to build a new RPG theme without rewriting the engine.

Depth Engine uses `currentStage` and `maxStage` for progression. Example content can present stages as floors, waves, rooms, jobs, days, areas, depths, or another label that fits the game.

For the current manual example workflow, see [`docs/examples.md`](docs/examples.md). For the Depth Kit Lab prototype, see [`docs/depth-kit-lab.md`](docs/depth-kit-lab.md). For the future loader plan, see [`docs/multi-example-loading.md`](docs/multi-example-loading.md). `index.html` still loads local example scripts so the app can run without a server.

## Loaded Examples

- Default example: Rat Cellar
- Secondary selectable example: Arena Waves
- Third selectable example: Sewer Patrol
- Fourth selectable example: Depth Kit Lab
- Default example path: `examples/rat-cellar`
- Secondary example path: `examples/arena-waves`
- Third example path: `examples/sewer-patrol`
- Fourth example path: `examples/depth-kit-lab`

Rat Cellar is included as Example Game #1 only. It is not the identity of the engine. Arena Waves, Sewer Patrol, and Depth Kit Lab are additional bundled examples for selection and validation coverage.

For more detail, see:

- [`docs/engine-principles.md`](docs/engine-principles.md)
- [`docs/content-vs-engine.md`](docs/content-vs-engine.md)
- [`docs/examples.md`](docs/examples.md)
- [`docs/depth-kit-lab.md`](docs/depth-kit-lab.md)
- [`docs/starter-customization.md`](docs/starter-customization.md)
- [`docs/multi-example-loading.md`](docs/multi-example-loading.md)
- [`docs/hooks.md`](docs/hooks.md)
- [`docs/public-starter-release.md`](docs/public-starter-release.md)
- [`docs/release-readiness-checklist.md`](docs/release-readiness-checklist.md)