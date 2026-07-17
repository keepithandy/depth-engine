# Depth Engine

Depth Engine is a lightweight open-source browser RPG starter built with plain HTML, CSS, and JavaScript.

It is designed for small RPG projects that need a readable engine/content split without a package manager, build step, framework, or local server.

## Current Checkpoint

**v0.7 — Stable Starter Release Candidate**

This checkpoint focuses on release confidence rather than adding engine systems:

- synchronized release-readiness rules;
- fresh-checkout smoke validation;
- direct `file://` browser validation;
- five locally bundled examples;
- Crystal Mines as a documentation-driven customization proof;
- named release notes with save and compatibility status.

Depth Engine is a starter engine foundation, not a full framework, hosted content platform, plugin marketplace, or complete game.

## Start Immediately

1. Clone or download the repository.
2. Open `index.html` directly in a browser.
3. No install command is required.
4. No local server is required.
5. No package manager is required.

The default example is **Rat Cellar**. Use the Registered Examples panel to switch examples. Each example keeps a separate browser save slot.

## Bundled Examples

- **Rat Cellar** — default stage-based example.
- **Arena Waves** — wave-based combat presentation.
- **Sewer Patrol** — patrol-route theme using the same engine loop.
- **Depth Kit Lab** — six-depth prepare, delve, loot, upgrade, repeat prototype.
- **Crystal Mines** — v0.7 proof that the public customization guide can produce a new theme without engine edits.

Crystal Mines owns its own metadata, progression label, currency, route, items, enemies, save key, and export filename under `examples/crystal-mines/`.

## Current Engine Capabilities

- Turn-based fight resolution.
- Stage progression with example-owned labels.
- XP and level progression.
- Currency rewards and selling.
- Loot and inventory.
- Equipment slots and stat aggregation.
- Browser-storage save/load.
- JSON export/import.
- Save normalization and migration repair.
- Read-only save-version compatibility classification.
- Reset to a clean current-version state.
- Manifest-backed local example selection.
- Separate save and export identity per example.

## Smoke Checks

Run all checks from the repository root:

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
node smoke_crystal_mines_example.mjs
```

GitHub Actions runs the same checks after a fresh `actions/checkout` on pull requests and pushes to `main`.

## Save Contract

- The active example owns its save key.
- The active example configuration owns its progression cap.
- Missing or malformed known player fields are repaired against the active example baseline.
- Inventory and equipment ids are validated against active content.
- The canonical engine save version is `3`.
- Save versions classify as `legacy`, `current`, `future`, or `malformed`.
- Future-version saves are detectable but are not currently blocked or deleted.

See [`docs/save-schema.md`](docs/save-schema.md).

## Engine vs Example Content

Generic reusable behavior belongs under `js/engine/`:

- state
- save normalization
- combat
- loot
- inventory and equipment
- example loading
- rendering

Theme-specific content belongs under `examples/<example-id>/`:

- `example.meta.js`
- `game.config.js`
- `items.js`
- `enemies.js`
- `zones.js`

A new theme should not require editing generic engine files.

## Create Your Own Example

Use:

- [`docs/starter-customization.md`](docs/starter-customization.md)
- [`docs/examples.md`](docs/examples.md)

The documented path is:

1. Copy an example folder.
2. assign a lowercase hyphenated id;
3. update metadata and configuration;
4. replace items, enemies, and zones;
5. assign a unique save key and export filename;
6. register the example in `examples/examples.manifest.js`;
7. open it directly through `index.html?example=<id>`;
8. run the smoke workflow.

Crystal Mines is the repository-owned proof that this path works.

## Repository Structure

- `index.html` — direct browser entry point.
- `styles/` — shared presentation.
- `js/engine/` — generic runtime code.
- `examples/examples.manifest.js` — bundled example registry.
- `examples/` — theme-specific content sets.
- `docs/` — architecture, save, customization, and release guidance.
- `.github/workflows/smoke.yml` — clean-checkout validation workflow.
- `AGENTS.md` — work ownership lanes.

## Release Guidance

Before tagging or recommending a snapshot, use:

- [`docs/release-readiness-checklist.md`](docs/release-readiness-checklist.md)
- [`docs/releases/v0.7-stable-starter-release-candidate.md`](docs/releases/v0.7-stable-starter-release-candidate.md)
- [`docs/public-starter-release.md`](docs/public-starter-release.md)

The project remains clone-first. npm publishing, CLI scaffolding, remote example loading, visual editing, and mutation-capable plugins are not part of the v0.7 release candidate.

## Work Tracking

Use [`ROADMAP.md`](ROADMAP.md) for checkpoints and [`AGENTS.md`](AGENTS.md) for owner lanes.
