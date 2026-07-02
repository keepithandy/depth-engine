# Foundation Hardening Checklist

Use this checklist before adding loader complexity, hooks, plugins, new examples, or release packaging.

## Direct Startup Contract

Depth Engine must keep the starter easy to run:

- Open `index.html` directly in a browser.
- Do not require npm install.
- Do not require a dev server.
- Do not require a build step.
- Keep Rat Cellar playable from a fresh clone.

## Startup Script Order

`index.html` currently loads scripts in this order:

1. `examples/examples.manifest.js`
2. `examples/rat-cellar/example.meta.js`
3. `js/engine/content-loader.js`
4. `examples/rat-cellar/game.config.js`
5. `examples/rat-cellar/items.js`
6. `examples/rat-cellar/enemies.js`
7. `examples/rat-cellar/zones.js`
8. `js/engine/state.js`
9. `js/engine/save.js`
10. `js/engine/loot.js`
11. `js/engine/inventory.js`
12. `js/engine/combat.js`
13. `js/engine/render.js`

Do not reorder these casually. The registry and active example metadata must exist before generic content-loader helpers run. Example config and content must exist before the engine initializes game state and rendering.

## Required Smoke Checks

Run these checks before merging foundation changes:

```bash
node smoke_depth_engine_core.mjs
node smoke_rat_cellar_content.mjs
```

The GitHub Actions smoke workflow should also run these commands on pushes to `main` and on pull requests.

## Core Behavior To Preserve

Rat Cellar should still support:

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

## Engine Boundary

Engine files under `js/engine/` should stay generic.

Do not add Rat Cellar-specific lore, enemy names, item names, zone names, or content ids to generic engine files.

Example-specific data belongs under `examples/`.

## Save Boundary

Before changing save behavior, review `docs/save-schema.md`.

Do not change the browser storage key, export format, or save repair behavior without an explicit issue and smoke coverage.

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
- replace direct startup
- rewrite Rat Cellar balance
- move theme data into engine files
- introduce remote content loading
- introduce account or cloud save behavior
