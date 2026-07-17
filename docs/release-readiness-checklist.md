# Release Readiness Checklist

Use this checklist before recommending, tagging, or sharing a named Depth Engine starter snapshot.

This checklist does not create a release, add package publishing, or change the no-build startup model.

## 1. Clean Checkout

Validate the remote repository rather than an existing development folder:

- Start from a fresh clone, downloaded source archive, or GitHub Actions checkout.
- Confirm the checkout has no generated dependencies or untracked runtime requirements.
- Confirm the tested commit SHA is recorded in the release notes.
- Do not treat results from an older local folder as release evidence.

## 2. Direct Startup

Confirm the starter still works without infrastructure:

- Open `index.html` directly through a `file://` path.
- Confirm no install step is required.
- Confirm no local server is required.
- Confirm no package manager is required.
- Confirm the default Rat Cellar example loads cleanly.
- Confirm the active example name, stage label, enemy preview, inventory, equipment, and log render without console errors.

## 3. Bundled Example Selector

Confirm every registered example can load from the local selector or `?example=<id>` query:

- Rat Cellar
- Arena Waves
- Sewer Patrol
- Depth Kit Lab
- Crystal Mines

Also confirm:

- Invalid stored or requested example ids fall back safely to Rat Cellar.
- UI copy does not imply remote loading, package installation, or server-hosted content.
- Each example keeps a separate save slot.
- Each example uses a unique export filename.

## 4. Core Play Loop

Confirm the starter loop still works:

- Fight can be started.
- XP updates.
- Currency updates.
- Loot can enter inventory.
- Equipment can be changed.
- Duplicate item ids remain safe when equipping one inventory entry.
- Save/load works from browser storage.
- Export works and uses the active example filename.
- Import works through normalization.
- Reset creates a clean current-version state.

## 5. Smoke Commands

Run all current smoke checks from the repository root:

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

GitHub Actions must run the same list after a fresh `actions/checkout` step. Do not mark a starter snapshot ready if any smoke check fails or is skipped.

## 6. Documentation-Driven Customization Proof

Before calling the starter reusable, prove the public guide works:

- Create or inspect a fifth example by following `docs/starter-customization.md` and `docs/examples.md`.
- Keep all theme-specific metadata, configuration, items, enemies, and zones inside its example folder.
- Register it only through `examples/examples.manifest.js`.
- Do not edit generic engine files to make the example playable.
- Confirm the example has complete stages, valid enemy references, valid loot references, a unique save key, and a unique export filename.
- Add focused smoke coverage for the proof example.

For v0.7, **Crystal Mines** is the documentation-driven proof.

## 7. Documentation Accuracy

Review public-facing docs before release:

- `README.md` identifies the current checkpoint and all bundled examples.
- `docs/examples.md` matches the current example workflow.
- `docs/starter-customization.md` lists the current smoke commands.
- `docs/save-schema.md` matches current save repair and compatibility behavior.
- `docs/public-starter-release.md` does not overpromise packaging or publishing.
- `docs/hooks.md` describes hooks as a boundary, not a completed plugin system.
- `ROADMAP.md` distinguishes completed checkpoints from future lanes.
- `AGENTS.md` still matches the current owner lanes.

## 8. Engine And Content Boundary

Confirm the engine/content split is intact:

- `js/engine/` stays generic.
- Example-specific names, items, enemies, rewards, zones, labels, save keys, and export filenames stay under `examples/`.
- No bundled example requires remote loading.
- No example contains shared migration, loader, DOM bootstrap, or build logic.
- No build tooling is required for the starter.

## 9. Save And Export Safety

Confirm every bundled example has a unique:

- example id
- save key
- export filename

Confirm the release notes state:

- the canonical save version
- whether normalization changed
- whether old saves remain compatible
- whether future-version saves are blocked, warned, or only classified
- any known save risk

## 10. Release Notes Minimum

A named snapshot must state:

- the exact version and checkpoint name
- the tested commit SHA
- what changed
- whether each change is engine, example, docs, save, smoke, or release workflow
- every automated check that passed
- the direct `file://` browser validation result
- the clean-checkout validation method
- whether save compatibility changed
- known limitations and intentionally unchanged behavior

## Release Gate

A starter snapshot is ready only when all of the following are true:

1. Fresh-checkout smoke workflow passes completely.
2. Direct `file://` browser startup passes without console errors.
3. All five examples resolve and render.
4. Core play, storage save/load, export/import, and reset checks pass.
5. Crystal Mines proves the documented customization path without engine edits.
6. Public documentation and named release notes match the tested commit.
