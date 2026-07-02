# Loader Mode Decision

Depth Engine uses a hybrid loader path for the next phase:

- direct-script loading remains the default runtime path
- the example registry is the source of truth for known examples
- the UI can show registered examples before dynamic switching exists
- bundled secondary examples can exist before runtime switching exists
- dynamic script loading is deferred until save identity and hosted/direct startup rules are ready

## Current Default

`index.html` still loads Rat Cellar directly so the project works from a local file path without a server.

This preserves the no-build, no-install starter promise.

## Registry Role

`examples/examples.manifest.js` defines the registered examples.

Current bundled examples:

- Rat Cellar
- Arena Waves

`js/engine/content-loader.js` normalizes the registry and active example metadata. The active example must be present in the registry.

## Active Example Rule

For now, the active example is chosen by the script tags in `index.html`.

That means Rat Cellar remains the default active example until a later issue adds real runtime switching.

Arena Waves is bundled and validated, but it is not the active direct-load example unless `index.html` script paths are manually changed in a focused test branch.

## Selection Surface

The app may show a small registered-example surface that reads from the registry. This proves the UI no longer treats Rat Cellar as the hidden engine identity.

The selector/status surface is read-only until dynamic loading and save identity rules exist.

## Dynamic Loading Deferred

Do not add dynamic script injection yet.

Before dynamic loading ships, the repo still needs:

- save identity rules for example switching
- a clear local-file versus hosted-mode decision
- smoke coverage proving Rat Cellar remains the default direct-load example
- smoke coverage proving every bundled registered example has valid content

## Guardrails

- Keep Rat Cellar opening directly from `index.html`.
- Keep the registry generic.
- Keep Arena Waves content-owned under `examples/arena-waves/`.
- Do not add a build step.
- Do not load remote third-party content.
- Do not add plugin hooks here.
