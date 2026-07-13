# Example Games

Example games are small playable content sets that demonstrate how Depth Engine can run a specific RPG theme. The engine is the reusable code in `js/engine/`; an example is the data and labels the engine consumes.

## Bundled Examples

Depth Engine currently includes four bundled examples:

- **Rat Cellar** — the default stage-based RPG sample.
- **Arena Waves** — a compact wave-based arena sample.
- **Sewer Patrol** — a short patrol-route sample.
- **Depth Kit Lab** — a six-depth pocket-loop prototype focused on prepare, delve, loot, upgrade, repeat.

Rat Cellar is not the engine identity. It is only the default loaded example game.

## Examples vs Engine Code

Examples belong under `examples/`. They can define their own theme, names, labels, item balance, enemy rewards, zone titles, progression labels, save key, export filename, and active example metadata.

Engine code belongs under `js/engine/`. It should stay generic and handle reusable behavior such as state, combat, loot, inventory, saving, rendering, and content helpers.

Do not put engine architecture, shared systems, browser boot logic, or reusable helpers inside an example folder.

## Current Loading Approach

`examples/examples.manifest.js` defines the known example registry in `window.DEPTH_ENGINE_EXAMPLE_REGISTRY`.

`js/engine/example-loader.js` resolves the selected bundled example, writes its local scripts during normal HTML parsing, and preserves the no-server startup path.

`js/engine/content-loader.js` reads the active example registry and metadata, then exposes generic helper functions such as `getExampleRegistry()`, `getRegisteredExampleById()`, `getActiveExampleName()`, and `getActiveExamplePath()`.

`index.html` loads the registry, selected-example loader, generic engine systems, and renderer. The loader writes the active example's `example.meta.js`, `game.config.js`, `items.js`, `enemies.js`, and `zones.js` before the generic engine systems boot.

This direct-script approach is intentional for now. It avoids `fetch()` and keeps the app working when `index.html` is opened directly from a local file path.

For the future loader plan, see `docs/multi-example-loading.md`.

## Create A New Example Manually

Create a new example by hand:

1. Copy an existing folder under `examples/` to `examples/my-example`.
2. Rename or edit `example.meta.js`, `game.config.js`, `items.js`, `enemies.js`, and `zones.js`.
3. Give the example its own `GAME_CONFIG.saveKey` and `GAME_CONFIG.exportFileName`.
4. Add the new example to `examples/examples.manifest.js`.
5. Test by opening `index.html` directly and loading the example from the Registered Examples panel.
6. Add or update a smoke test when the example is important enough to guard directly.

Keep the engine files generic while you edit the example data.

## Before Committing A New Example

- Opens from `index.html`.
- Has `example.meta.js`.
- Has `game.config.js`.
- Has `items.js`.
- Has `enemies.js`.
- Has `zones.js`.
- Is listed in `examples/examples.manifest.js`.
- Has a unique save key.
- Has a unique export filename.
- Has no engine code inside the example folder.
- Does not require a server.
- Uses generic engine fields correctly.
- Passes the content-boundary smoke checks.

## Future Loader Support

A later pass may add cleaner multi-example support. That could include a more advanced selector, a manifest-backed loader, or safer script loading for hosted pages.

Any future loader should preserve the no-build-step project shape and avoid breaking direct-file startup unless the project explicitly chooses a new runtime requirement.

## What Not To Put In Examples

Do not put reusable engine systems, shared save migration code, DOM boot logic, cross-example helpers, build tooling, or framework dependencies inside examples.

Examples should contain content data and theme-specific presentation values, not core architecture.
