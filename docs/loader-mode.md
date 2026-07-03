# Loader Mode Decision

Depth Engine uses a local-first selected-example loader:

- `examples/examples.manifest.js` remains the source of truth for known examples
- `js/engine/example-loader.js` chooses the selected bundled example before engine systems load
- selected example scripts are written during normal HTML parsing
- the app still runs from `index.html` without npm, a build step, a server, or fetch-based content loading
- the registered-examples UI can switch between bundled playable examples by storing the selected example id and reloading

## Current Default

Rat Cellar remains the default example because it is the first bundled registry entry.

`index.html` still works from a local file path without a server. It now loads the manifest, then the local example-loader, then the generic engine systems.

This preserves the no-build, no-install starter promise.

## Registry Role

`examples/examples.manifest.js` defines the registered examples.

Current bundled examples:

- Rat Cellar
- Arena Waves

`js/engine/content-loader.js` normalizes the registry and active example metadata after the selected example metadata script has loaded. The active example must be present in the registry.

## Active Example Rule

For now, the active example is chosen by:

1. `?example=<example-id>` in the URL, when present
2. stored selected example id from `depth-engine-selected-example-id`
3. the first bundled registry entry, currently Rat Cellar

Invalid selections fall back to Rat Cellar and repair the stored selected example id.

## Selection Surface

The Registered Examples panel shows bundled examples and exposes a Load Example action for selectable examples.

Switching examples stores the requested example id, reloads the page, and loads that example's local content scripts before the engine starts.

The panel warns that each example uses a separate save slot.

## Save Separation

The selected example id is not player progress. It only controls which scripts load.

Player progress still uses the active example's `GAME_CONFIG.saveKey`:

- Rat Cellar uses `depth-engine-demo-save-v1`
- Arena Waves uses `depth-engine-arena-waves-save-v1`

## Dynamic Loading Deferred

Depth Engine still does not load remote examples or arbitrary third-party content.

This selector uses local script loading only. A hosted fetch/import loader remains deferred until the repo has stronger content validation, save migration rules, and a clear trust policy.

## Guardrails

- Keep Rat Cellar as the default registry entry.
- Keep the registry generic.
- Keep Arena Waves content-owned under `examples/arena-waves/`.
- Do not add a build step.
- Do not load remote third-party content.
- Do not add plugin hooks here.
