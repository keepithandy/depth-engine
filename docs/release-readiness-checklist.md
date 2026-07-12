# Release Readiness Checklist

Use this checklist before recommending, tagging, or sharing a named Depth Engine starter snapshot.

This checklist does not create a release, add package publishing, or change the no-build startup model.

## 1. Direct Startup

Confirm the starter still works without infrastructure:

- Open `index.html` directly in a browser.
- Confirm no install step is required.
- Confirm no local server is required.
- Confirm no package manager is required.
- Confirm the default example loads cleanly.

## 2. Bundled Example Selector

Confirm the Registered Examples panel is clear:

- Rat Cellar default state is readable.
- Arena Waves selection state is readable.
- Sewer Patrol selection state is readable.
- Invalid stored example ids fall back safely to Rat Cellar.
- UI copy does not imply remote loading, package installation, or server-hosted content.
- Each example keeps a separate save slot.

## 3. Core Play Loop

Confirm the starter loop still works:

- Fight can be started.
- XP updates.
- Currency updates.
- Loot can enter inventory.
- Equipment can be changed.
- Duplicate item ids remain safe when equipping one inventory entry.
- Save/load works from browser storage.
- Export works.
- Import works.
- Reset works.

## 4. Smoke Commands

Run all current smoke checks from the repo root:

```bash
node smoke_index_static_contract.mjs
node smoke_example_selection_contract.mjs
node smoke_depth_engine_core.mjs
node smoke_rat_cellar_content.mjs
node smoke_registered_examples_content.mjs
```

Do not mark a starter snapshot ready if any smoke check fails.

## 5. Documentation Accuracy

Review public-facing docs before release:

- `README.md` accurately describes the current examples.
- `docs/examples.md` matches the current example workflow.
- `docs/starter-customization.md` explains how to create a new theme safely.
- `docs/public-starter-release.md` does not overpromise packaging or publishing.
- `docs/hooks.md` describes future hooks as a boundary, not a completed plugin system.
- `AGENTS.md` still matches the current owner lanes.

## 6. Engine And Content Boundary

Confirm the engine/content split is intact:

- `js/engine/` stays generic.
- Example-specific names, items, enemies, rewards, zones, labels, save keys, and export filenames stay under `examples/`.
- No bundled example requires remote loading.
- No build tooling is required for the starter.

## 7. Save And Export Safety

Confirm every bundled example has a unique:

- example id
- save key
- export filename

Confirm the release notes identify any save compatibility risk.

## 8. Release Notes Minimum

A named snapshot should state:

- what changed
- whether the change is engine, example, docs, save, smoke, or release workflow
- what smoke checks passed
- whether direct `index.html` startup still works
- whether save compatibility changed
- what intentionally did not change

## Release Gate

A starter snapshot is ready only when the direct browser check, bundled example selector check, save/export/import/reset check, and smoke commands all pass.
