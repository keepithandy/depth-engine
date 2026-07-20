# Depth Engine

Depth Engine is a lightweight open-source browser RPG engine built with plain HTML, CSS, and JavaScript.

It is designed as a bare HTML starter foundation for small RPGs: simple to run, easy to read, and structured so reusable engine logic stays separate from example game content. The goal is to give people a clean core they can copy, study, and reshape into their own RPG.

## Try It First

Open `index.html` directly in a browser. No install step, build step, package manager, or local server is required.

The default example is **Rat Cellar**. Use the Registered Examples panel to switch to **Arena Waves**, **Sewer Patrol**, or **Depth Kit Lab**.

Run the full deterministic smoke suite from the repo root:

```bash
node run_smokes.mjs
```

Individual smoke scripts remain usable for focused checks.

Current status: active reusable-engine prototype. The project is proving bundled examples, per-example save identity, starter accessibility, release auditability, and a minimal optional hook boundary without remote content loading or a build step.

## What Depth Engine Is

- A browser-first RPG engine foundation.
- A plain HTML/CSS/JS project with no build step.
- A content-driven starter that can power different RPG themes.
- A working example game that proves the engine loop, save flow, and UI structure.
- A reusable core inspired by the system-first lessons from DungeonDex.

## Current Prototype Status

- Current checkpoint: v0.6 Starter Validation And QoL Pass.
- The default loaded example is Rat Cellar.
- The bundled example registry includes Rat Cellar, Arena Waves, Sewer Patrol, and Depth Kit Lab.
- Arena Waves, Sewer Patrol, and Depth Kit Lab are selectable from the Registered Examples panel.
- Depth Kit Lab is a short six-depth prototype for prepare, delve, loot, upgrade, repeat pacing.
- The selected example id is stored locally and the page reloads into that bundled example.
- Each example keeps its own save slot through its own `GAME_CONFIG.saveKey`.
- Exported save files come from the active example's `GAME_CONFIG.exportFileName`.
- The stage-based combat loop, XP gain, currency, loot, equipment, selling, save, export/import, and reset flows are working.
- Equipment changes remove one selected inventory entry at a time, so duplicate item ids remain safe.
- Save versions are classified as legacy, current, future, or malformed without blocking load or import behavior.
- Manifest validation now covers duplicate ids, missing files, malformed labels, and default-example registration.
- Save smokes now cover deterministic export/import round trips and per-example save-slot isolation.
- The starter includes keyboard skip navigation, visible focus styles, live status regions, and narrow-phone layout rules.
- A minimal read-only `afterStateLoad` hook runtime exists, with one disabled-by-default extension example.
- Release folders or ZIPs can receive deterministic file manifests and SHA-256 checksums.
- GitHub Actions runs the full smoke suite on pushes to `main` and on pull requests.
- Agent owner lanes for future work are documented in [`AGENTS.md`](AGENTS.md).
- This repo is still a prototype foundation, not a full content pack.
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
- Keyboard and narrow-phone QoL support.
- Optional local read-only extension hooks.

## Smoke Checks

Run everything in fixed order:

```bash
node run_smokes.mjs
```

The runner stops at the first failure, preserves that script's exit code, and prints a concise final summary.

Current focused scripts:

```bash
node smoke_index_static_contract.mjs
node smoke_example_selection_contract.mjs
node smoke_depth_engine_core.mjs
node smoke_save_stage_cap_contract.mjs
node smoke_save_player_repair_contract.mjs
node smoke_save_version_compatibility_contract.mjs
node smoke_rat_cellar_content.mjs
node smoke_registered_examples_content.mjs
node smoke_depth_kit_lab_example.mjs
node smoke_example_manifest_validator.mjs
node smoke_save_export_import_roundtrip.mjs
node smoke_example_save_isolation.mjs
node smoke_extension_hook_example.mjs
```

## Starter And Release Guidance

- Use [`docs/starter-customization.md`](docs/starter-customization.md) when turning the starter into a new RPG theme.
- Use [`docs/starter-copy-run-checklist.md`](docs/starter-copy-run-checklist.md) to prove the copy-and-run workflow with a fixture.
- Use [`docs/accessibility-checklist.md`](docs/accessibility-checklist.md) for keyboard, focus, and status-announcement validation.
- Use [`docs/mobile-viewport-checklist.md`](docs/mobile-viewport-checklist.md) for narrow-phone validation across all bundled examples.
- Use [`docs/browser-performance-baseline.md`](docs/browser-performance-baseline.md) to record static and browser runtime measurements.
- Use [`docs/release-readiness-checklist.md`](docs/release-readiness-checklist.md) before tagging, recommending, or sharing a named starter snapshot.
- Use [`docs/release-artifact-verification.md`](docs/release-artifact-verification.md) to generate and verify SHA-256 manifests.
- Use [`docs/hooks.md`](docs/hooks.md) to understand and try the optional read-only hook example.
- Use [`docs/depth-kit-lab.md`](docs/depth-kit-lab.md) to understand the short-loop prototype example.

## Utility Commands

Static bundled-example size report:

```bash
node tools/measure_static_baseline.mjs
```

Release folder or ZIP manifest:

```bash
node tools/generate_release_manifest.mjs <release-folder-or-zip>
```

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
- `js/engine/hooks.js` contains the optional local read-only hook registry.
- `extensions/` contains disabled-by-default extension examples.
- `examples/` contains example games and the example registry.
- `examples/examples.manifest.js` lists registered example entries.
- `examples/rat-cellar/` contains the default bundled example game data and metadata.
- `examples/arena-waves/` contains the secondary bundled example.
- `examples/sewer-patrol/` contains the third bundled example.
- `examples/depth-kit-lab/` contains the short-loop pocket prototype example.
- `docs/` contains engine rules and contributor guidance.
- `tools/` contains manual validation and release utilities.
- `.github/workflows/smoke.yml` runs `node run_smokes.mjs` in GitHub Actions.
- `AGENTS.md` defines owner lanes for future issues.

## Engine Vs Example Content

The engine stays generic. Example content defines the playable theme the engine consumes.

- `js/engine/` handles state, combat, loot, inventory, saves, hooks, and rendering.
- `js/engine/example-loader.js` chooses which bundled example scripts load.
- `js/engine/content-loader.js` exposes generic helpers for the active example and registered examples.
- `examples/examples.manifest.js` lists available examples.
- `examples/rat-cellar/`, `examples/arena-waves/`, `examples/sewer-patrol/`, and `examples/depth-kit-lab/` own their theme-specific config, items, enemies, zones, save keys, and export filenames.

These files are the main place to build a new RPG theme without rewriting the engine.

Depth Engine uses `currentStage` and `maxStage` for progression. Example content can present stages as floors, waves, rooms, jobs, days, areas, depths, or another label that fits the game.

## Loaded Examples

- Default example: Rat Cellar
- Secondary selectable example: Arena Waves
- Third selectable example: Sewer Patrol
- Fourth selectable example: Depth Kit Lab

Rat Cellar is included as Example Game #1 only. It is not the identity of the engine. Arena Waves, Sewer Patrol, and Depth Kit Lab are additional bundled examples for selection and validation coverage.

For more detail, see:

- [`docs/engine-principles.md`](docs/engine-principles.md)
- [`docs/content-vs-engine.md`](docs/content-vs-engine.md)
- [`docs/examples.md`](docs/examples.md)
- [`docs/depth-kit-lab.md`](docs/depth-kit-lab.md)
- [`docs/starter-customization.md`](docs/starter-customization.md)
- [`docs/starter-copy-run-checklist.md`](docs/starter-copy-run-checklist.md)
- [`docs/multi-example-loading.md`](docs/multi-example-loading.md)
- [`docs/hooks.md`](docs/hooks.md)
- [`docs/accessibility-checklist.md`](docs/accessibility-checklist.md)
- [`docs/mobile-viewport-checklist.md`](docs/mobile-viewport-checklist.md)
- [`docs/browser-performance-baseline.md`](docs/browser-performance-baseline.md)
- [`docs/public-starter-release.md`](docs/public-starter-release.md)
- [`docs/release-readiness-checklist.md`](docs/release-readiness-checklist.md)
- [`docs/release-artifact-verification.md`](docs/release-artifact-verification.md)
