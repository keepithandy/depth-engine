# Save Schema And Migration Rules

This document defines the current Depth Engine save contract.

## Current Save Owner

The active example owns the save key through `window.GAME_CONFIG.saveKey`.

Current bundled example save keys:

```js
// Rat Cellar
depth-engine-demo-save-v1

// Arena Waves
depth-engine-arena-waves-save-v1
```

Do not change an example's save key casually. Changing the key makes existing browser saves look missing unless a separate migration or compatibility plan exists.

## Example Selection Save Rule

The selected example id is stored separately from game progress under:

```js
depth-engine-selected-example-id
```

This key only decides which bundled example scripts load on the next page startup.

It must not be used for player progress. Player progress remains owned by the active example's `GAME_CONFIG.saveKey`, so Rat Cellar and Arena Waves do not share a save slot.

## Current Save Shape

A normalized save contains these top-level fields:

```js
{
  version: 3,
  exampleId: "rat-cellar",
  currentStage: 1,
  maxStage: 20,
  player: {
    level: 1,
    xp: 0,
    hp: 30,
    maxHp: 30,
    attack: 5,
    defense: 2,
    currency: 0
  },
  inventory: [],
  equipment: {
    weapon: null,
    head: null,
    body: null,
    feet: null,
    offhand: null,
    trinket: null
  },
  log: [],
  completed: false
}
```

## Required Fields

The engine expects these fields after normalization:

- `version`
- `exampleId`
- `currentStage`
- `maxStage`
- `player`
- `inventory`
- `equipment`
- `log`
- `completed`

Runtime save loading should call `normalizeSaveState(data)` before using saved data.

## Repairable Fields

The current repair path accepts older stage names and converts them into the current stage contract:

- `currentFloor` repairs into `currentStage`
- `floor` repairs into `currentStage`
- `maxFloor` repairs into `maxStage`

The engine clamps repaired stage values so saves do not start below stage 1 or above the active example's max stage.

## Example Identity Repair

`exampleId` is stamped from the currently loaded example during new-state creation, save normalization, and save writes.

If an imported or old save contains a missing, stale, or different `exampleId`, normalization rewrites it to the active example id. Content ids are still validated against the active example before inventory or equipment is used.

This keeps the current starter forgiving while still making exported saves visibly identify the example that last normalized them.

## Player Repair

The `player` object is merged over the active example's base player stats. Missing player fields fall back to `window.GAME_CONFIG.basePlayer`.

## Inventory Repair

`inventory` should be an array of item ids.

Current normalization keeps only ids that are strings and still exist in the active example's item content. Missing ids and malformed entries are dropped.

Future content-switching work can revisit whether missing item ids should be dropped, preserved as unknown ids, migrated, or quarantined in a recovery log. For the current starter, dropping stale item ids is the safest small repair.

## Equipment Repair

`equipment` should contain the known equipment slots:

- `weapon`
- `head`
- `body`
- `feet`
- `offhand`
- `trinket`

Current normalization rebuilds equipment from the known slot list. It preserves only saved item ids that still exist in active example content and match the slot they are assigned to. Missing ids, malformed ids, and wrong-slot ids are cleared to `null`.

## Log Repair

`log` should be an array of strings.

If saved log data is malformed, normalization falls back to the new-state log. If the log is an array, non-string entries are filtered out.

## Completion Repair

`completed` only remains true when the repaired `currentStage` is at or above `maxStage`. This prevents old or malformed saves from claiming completion too early.

## Version Rule

Current saves normalize to at least version `3`:

```js
version: Math.max(3, Number(source.version) || 0)
```

For now, `version` is a global engine save version, not an example-specific schema version.

## Migration Policy

Use the smallest migration that keeps existing saves safe.

1. Document the current save shape before changing it.
2. Add smoke coverage for old and malformed save shapes.
3. Repair renamed fields when the meaning is obvious.
4. Clamp unsafe values rather than trusting raw saved data.
5. Avoid content-specific repair logic inside generic engine files.
6. Do not reset existing saves unless the release notes clearly mark the change as breaking.
7. Do not change an example's `saveKey` without a dedicated issue.

## Current Smoke Coverage

`smoke_depth_engine_core.mjs` currently checks:

- export filename comes from `GAME_CONFIG.exportFileName`
- legacy `currentFloor` and `maxFloor` repair into stage fields
- old save versions normalize to version 3
- invalid and missing inventory ids are filtered
- malformed log entries are filtered
- wrong-slot equipment ids are cleared
- valid equipment ids in the correct slot are preserved
- missing equipment ids are cleared
- completion is preserved only at max stage
- duplicate inventory ids survive equipment changes

`smoke_example_selection_contract.mjs` checks:

- default example selection resolves to Rat Cellar
- stored Arena Waves selection writes Arena Waves scripts
- query-string selection can override stored selection
- invalid stored selection falls back safely
- selecting a bundled example stores the selected id and reloads

`smoke_registered_examples_content.mjs` validates every bundled example listed in the manifest.
