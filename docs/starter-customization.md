# Starter Customization Guide

This guide explains the safest path for turning Depth Engine into a new small RPG while keeping generic engine files reusable.

## Rule Of Thumb

Edit example content first. Avoid editing `js/engine/` unless you are changing reusable engine behavior for every example.

## Two Customization Paths

### Path A: Edit A Bundled Example

Use this when you only want to experiment quickly.

1. Pick a bundled example under `examples/`.
2. Edit its theme labels, items, enemies, zones, rewards, and config values.
3. Keep the same content file order.
4. Open `index.html` directly in a browser.
5. Run the smoke checks before committing.

This is fastest, but it changes an existing bundled example.

### Path B: Create A New Bundled Example

Use this when the new RPG should stand on its own.

1. Copy `examples/rat-cellar/` into a new folder under `examples/`.
2. Rename the folder with a lowercase, hyphenated id, such as `crystal-mines`.
3. Update `example.meta.js`.
4. Update `game.config.js`.
5. Replace item, enemy, and zone data.
6. Add the new example to `examples/examples.manifest.js`.
7. Keep the content file order consistent.
8. Open `index.html?example=<example-id>` directly through a `file://` path.
9. Run the complete smoke list.
10. Add a focused smoke when the example proves a named checkpoint.

Crystal Mines follows this exact path as the v0.7 documentation-driven proof.

## Files That Own Theme Identity

Theme-specific identity belongs in the example folder:

- `examples/<example-id>/example.meta.js`
- `examples/<example-id>/game.config.js`
- `examples/<example-id>/items.js`
- `examples/<example-id>/enemies.js`
- `examples/<example-id>/zones.js`

The registry entry belongs in:

- `examples/examples.manifest.js`

Generic behavior belongs in:

- `js/engine/`

## Required Example Metadata

Every bundled example must have a unique:

- `id`
- `name`
- `path`
- `GAME_CONFIG.saveKey`
- `GAME_CONFIG.exportFileName`

Example:

```js
saveKey: "depth-engine-crystal-mines-save-v1",
exportFileName: "crystal-mines-save.json"
```

## Required Content File Order

Bundled examples must use:

```js
[
  "game.config.js",
  "items.js",
  "enemies.js",
  "zones.js"
]
```

The order matters because later files may depend on earlier config or data.

## Engine Files To Avoid For Theme Work

Do not put theme-specific content into:

- `js/engine/state.js`
- `js/engine/save.js`
- `js/engine/loot.js`
- `js/engine/inventory.js`
- `js/engine/combat.js`
- `js/engine/render.js`
- `js/engine/content-loader.js`
- `js/engine/example-loader.js`

Those files must stay reusable across every example.

## Smoke Checks

Run these from the repository root after changing or adding an example:

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

At minimum, new bundled example work must pass:

```bash
node smoke_registered_examples_content.mjs
```

A named proof example should also have its own focused smoke.

## Safe Starter Checklist

Before treating the customized starter as ready:

- Start from a clean checkout or source archive.
- `index.html` opens directly through `file://`.
- The intended example loads without console errors.
- The active example name and progression label are visible.
- The save slot is unique to the example.
- The export filename is unique to the example.
- Every stage from `1` through `GAME_CONFIG.maxStage` has one zone.
- Every zone references a valid enemy.
- Every loot id references a valid item.
- Engine files still avoid theme-specific lore.
- The full smoke workflow passes after a fresh checkout.
