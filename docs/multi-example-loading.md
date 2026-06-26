# Multi-Example Loading Plan

Depth Engine should eventually support more than one playable example without becoming a hardcoded single-theme app.

This document is the v0.4 planning checkpoint for Issue #1. It prepares the shape for future loading work without replacing the current direct-script startup path.

## Current Decision

Use a simple browser-friendly example registry.

The registry lives at `examples/examples.manifest.js` and defines `window.DEPTH_ENGINE_EXAMPLE_REGISTRY` as an array of example entries. Each entry describes an example folder, its metadata entry file, and the content files that belong to that example.

This keeps the project:

- plain HTML/CSS/JS
- no-build-step
- readable for beginners
- compatible with direct `index.html` startup
- ready for a future selector or loader

## Current Runtime Shape

The current runtime still loads Rat Cellar directly from `index.html`:

1. `examples/examples.manifest.js`
2. `examples/rat-cellar/example.meta.js`
3. `js/engine/content-loader.js`
4. Rat Cellar content files
5. shared engine files
6. renderer/bootstrap

The registry is available to generic engine helpers, but it does not switch examples yet.

## Registry Entry Shape

A registry entry should use this shape:

```js
{
  id: "example-id",
  name: "Example Name",
  path: "examples/example-id",
  description: "Short description.",
  entry: "examples/example-id/example.meta.js",
  contentFiles: [
    "game.config.js",
    "items.js",
    "enemies.js",
    "zones.js"
  ],
  playable: true,
  bundled: true
}
```

`id`, `name`, `path`, `description`, `entry`, and `contentFiles` describe the content pack. `playable` marks whether the example is expected to run. `bundled` marks whether the repo includes the files.

## What v0.4 Does Not Do Yet

This checkpoint does not add:

- a UI selector
- dynamic script injection
- async loading
- remote content loading
- build tooling
- a plugin system
- save migration rules for switching examples

That restraint is intentional. Rat Cellar should keep opening directly from `index.html`.

## Future Loader Direction

A later implementation can build from this plan by:

1. reading the registry
2. showing a small list of registered examples
3. loading the selected example's metadata and content files
4. using the same generic engine helpers
5. keeping local-file compatibility or clearly documenting any new runtime requirement

Any future loader should be introduced behind smoke tests that prove Rat Cellar still works.

## Acceptance Checks For This Plan

- Registry exists under `examples/`.
- Registry includes Rat Cellar as Example Game #1.
- `js/engine/content-loader.js` exposes registry helpers without hardcoding Rat Cellar.
- `index.html` still loads Rat Cellar directly.
- Smokes guard the registry and active example relationship.
- No build system is introduced.
