# Example Games

Example games are small playable content sets that demonstrate how Depth Engine can run a specific RPG theme. The engine is the reusable code in `js/engine/`; an example is the data and labels the engine consumes.

## Rat Cellar

Rat Cellar exists as the first included example. It proves the starter loop with config, items, enemies, zones, rewards, saves, and stage progression while staying small enough to read quickly.

Rat Cellar is not the engine identity. It is only the currently loaded example game.

## Examples vs Engine Code

Examples belong under `examples/`. They can define their own theme, names, labels, item balance, enemy rewards, zone titles, progression labels, and active example metadata.

Engine code belongs under `js/engine/`. It should stay generic and handle reusable behavior such as state, combat, loot, inventory, saving, rendering, and content helpers.

Do not put engine architecture, shared systems, browser boot logic, or reusable helpers inside an example folder.

## Current Loading Approach

`examples/examples.manifest.js` defines the known example registry in `window.DEPTH_ENGINE_EXAMPLE_REGISTRY`.

`examples/rat-cellar/example.meta.js` defines the active example metadata in `window.DEPTH_ENGINE_EXAMPLE_META`.

`js/engine/content-loader.js` reads that registry and metadata, then exposes generic helper functions such as `getExampleRegistry()`, `getRegisteredExampleById()`, `getActiveExampleName()`, and `getActiveExamplePath()`.

`index.html` still loads the Rat Cellar scripts directly:

- `examples/examples.manifest.js`
- `examples/rat-cellar/example.meta.js`
- `examples/rat-cellar/game.config.js`
- `examples/rat-cellar/items.js`
- `examples/rat-cellar/enemies.js`
- `examples/rat-cellar/zones.js`

This direct-script approach is intentional for now. It avoids `fetch()` and keeps the app working when `index.html` is opened directly from a local file path.

For the future loader plan, see `docs/multi-example-loading.md`.

## Create A New Example Manually

Until a fuller loader exists, create a new example by hand:

1. Copy `examples/rat-cellar` to `examples/my-example`.
2. Rename or edit `example.meta.js`, `game.config.js`, `items.js`, `enemies.js`, and `zones.js`.
3. Add the new example to `examples/examples.manifest.js`.
4. Update the example script paths in `index.html` if you want it to be the active direct-load example for now.
5. Test by opening `index.html` directly.

Keep the engine files generic while you edit the example data.

## Before Committing A New Example

- Opens from `index.html`.
- Has `example.meta.js`.
- Has `game.config.js`.
- Has `items.js`.
- Has `enemies.js`.
- Has `zones.js`.
- Is listed in `examples/examples.manifest.js`.
- Has no engine code inside the example folder.
- Does not require a server.
- Uses generic engine fields correctly.
- Passes the content-boundary smoke checks.

## Future Loader Support

A later pass may add cleaner multi-example support. That could include a small selector, a manifest-backed loader, or safer script loading for hosted pages.

Any future loader should preserve the no-build-step project shape and avoid breaking direct-file startup unless the project explicitly chooses a new runtime requirement.

## What Not To Put In Examples

Do not put reusable engine systems, shared save migration code, DOM boot logic, cross-example helpers, build tooling, or framework dependencies inside examples.

Examples should contain content data and theme-specific presentation values, not core architecture.
