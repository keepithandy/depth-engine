# Loader Mode Decision

Depth Engine uses a hybrid loader path for the next phase:

- direct-script loading remains the default runtime path
- the example registry is the source of truth for known examples
- the UI can show registered examples before dynamic switching exists
- dynamic script loading is deferred until there is at least one second bundled example and save identity is ready

## Current Default

`index.html` still loads Rat Cellar directly so the project works from a local file path without a server.

This preserves the no-build, no-install starter promise.

## Registry Role

`examples/examples.manifest.js` defines the registered examples.

`js/engine/content-loader.js` normalizes the registry and active example metadata. The active example must be present in the registry.

## Active Example Rule

For now, the active example is chosen by the script tags in `index.html`.

That means Rat Cellar remains the default active example until a later issue adds real runtime switching.

## Selection Surface

The app may show a small registered-example surface that reads from the registry. This is allowed even with one example because it proves the UI no longer treats Rat Cellar as the hidden engine identity.

The selector/status surface should be read-only until dynamic loading and save identity rules exist.

## Dynamic Loading Deferred

Do not add dynamic script injection yet.

Before dynamic loading ships, the repo needs:

- at least one second bundled example
- save identity rules for example switching
- smoke coverage for every registered bundled example
- a decision on whether hosted mode is required

## Guardrails

- Keep Rat Cellar opening directly from `index.html`.
- Keep the registry generic.
- Do not add a build step.
- Do not load remote third-party content.
- Do not add plugin hooks here.
