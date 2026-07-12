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
8. Open `index.html` directly and verify the selected example loads.
9. Run the smoke checks.

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

Every bundled example should have a unique:

- `id`
- `name`
- `path`
- `GAME_CONFIG.saveKey`
- `GAME_CONFIG.exportFileName`

Use a save key and export filename that cannot collide with another example.

Example:

```js
saveKey: "depth-engine-crystal-mines-save",
exportFileName: "crystal-mines-save.json"
```

## Required Content File Order

Bundled examples should use this content file order:

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

Those files should stay reusable across every example.

## Smoke Checks

Run these from the repo root after changing or adding an example:

```bash
node smoke_index_static_contract.mjs
node smoke_example_selection_contract.mjs
node smoke_depth_engine_core.mjs
node smoke_rat_cellar_content.mjs
node smoke_registered_examples_content.mjs
```

At minimum, new bundled example work must pass:

```bash
node smoke_registered_examples_content.mjs
```

## Safe Starter Checklist

Before treating the customized starter as ready:

- `index.html` opens directly in a browser.
- The intended example loads.
- The active example name is visible in the UI.
- The save slot is unique to the example.
- Exported save filename is unique to the example.
- Every stage from `1` through `GAME_CONFIG.maxStage` has a zone.
- Engine files still avoid theme-specific lore.
- Smoke checks pass.
