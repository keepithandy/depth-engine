# Foundation Hardening Checklist

Use this checklist before adding loader complexity, hooks, plugins, new examples, or release packaging.

## Direct Startup Contract

Depth Engine must keep the starter easy to run:

- Open `index.html` directly in a browser.
- Do not require npm install.
- Do not require a dev server.
- Do not require a build step.
- Keep Rat Cellar playable as the default example from a fresh clone.
- Keep bundled example selection local-only.

## Startup Script Order

`index.html` currently loads scripts in this order:

1. `examples/examples.manifest.js`
2. `js/engine/example-loader.js`
3. `js/engine/state.js`
4. `js/engine/save.js`
5. `js/engine/loot.js`
6. `js/engine/inventory.js`
7. `js/engine/combat.js`
8. `js/engine/render.js`

`js/engine/example-loader.js` writes the selected bundled example scripts during HTML parsing before the generic engine systems initialize. Do not replace this with fetch-based loading without a dedicated hosted-mode and trust-policy issue.

## Required Smoke Checks

Run these checks before merging foundation changes:

```bash
node smoke_index_static_contract.mjs
node smoke_example_selection_contract.mjs
node smoke_depth_engine_core.mjs
node smoke_rat_cellar_content.mjs
node smoke_registered_examples_content.mjs
```

The GitHub Actions smoke workflow should also run these commands on pushes to `main` and on pull requests.

## Core Behavior To Preserve

Rat Cellar should still support:

- loading as the default example
- fighting
- gaining XP
- earning currency
- receiving loot
- equipping loot
- selling inventory items
- saving
- exporting saves
- importing saves
- resetting saves
- refreshing and reloading state
- completing the final stage

Arena Waves should still support:

- loading from the Registered Examples panel
- using its own save key
- using its own export filename
- validating through registered-example smoke coverage

## Engine Boundary

Engine files under `js/engine/` should stay generic.

Do not add example-specific lore, enemy names, item names, zone names, or content ids to generic engine files.

Example-specific data belongs under `examples/`.

## Save Boundary

Before changing save behavior, review `docs/save-schema.md`.

Do not change browser storage keys, export formats, or save repair behavior without an explicit issue and smoke coverage.

The selected-example key chooses which bundled example loads. It is not a player-progress save slot.

## Rendering Boundary

Before changing rendering assumptions, review `docs/trusted-content-rendering.md`.

The current renderer assumes bundled local example content is trusted. Third-party or remote content needs a separate safety pass before support.

## Deprecated Path Review

`js/content/` is deprecated and should not receive new content.

Future cleanup can decide whether to retain it as a migration note, archive it, or remove it. That should be a focused cleanup issue, not an accidental side effect of loader work.

## PR Report Template

Every foundation PR should report:

- Baseline behavior checked
- Files changed
- Behavior changed
- Behavior intentionally not changed
- Smoke checks run
- Remaining risks
- Suggested next issue

## Guardrails

Foundation work must not:

- add npm or package tooling
- add a framework
- replace local-file startup
- rewrite Rat Cellar balance
- move theme data into engine files
- introduce remote content loading
- introduce account or cloud save behavior
