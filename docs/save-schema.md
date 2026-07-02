# Save Schema And Migration Rules

This document defines the current Depth Engine save contract. It is documentation only; it does not change runtime behavior.

## Current Save Owner

The active example owns the save key through `window.GAME_CONFIG.saveKey`.

For Rat Cellar, the current key is:

```js
depth-engine-demo-save-v1
```

Do not change an example's save key casually. Changing the key makes existing browser saves look missing unless a separate migration or compatibility plan exists.

## Current Save Shape

A normalized save contains these top-level fields:

```js
{
  version: 3,
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

## Player Repair

The `player` object is merged over the active example's base player stats. Missing player fields fall back to `window.GAME_CONFIG.basePlayer`.

## Inventory Repair

`inventory` should be an array of item ids.

Current normalization keeps only string ids and drops invalid non-string entries. It does not currently validate whether every id still exists in active example content.

Future content-switching work should decide whether missing item ids are dropped, preserved as unknown ids, migrated, or quarantined in a recovery log.

## Equipment Repair

`equipment` should contain the known equipment slots:

- `weapon`
- `head`
- `body`
- `feet`
- `offhand`
- `trinket`

Current normalization overlays saved equipment over the default slot map. Like inventory, it does not currently validate whether every equipped id still exists in active example content.

## Log Repair

`log` should be an array of strings.

If saved log data is malformed, normalization falls back to the new-state log.

## Completion Repair

`completed` only remains true when the repaired `currentStage` is at or above `maxStage`. This prevents old or malformed saves from claiming completion too early.

## Version Rule

Current saves normalize to at least version `3`:

```js
version: Math.max(3, Number(source.version) || 0)
```

For now, `version` is a global engine save version, not an example-specific schema version.

## Future Example Identity Strategy

Multi-example loading will need a stricter save identity decision before example switching becomes real.

Recommended future save identity fields:

```js
{
  engineSaveVersion: 3,
  exampleId: "rat-cellar",
  exampleSaveVersion: 1
}
```

Until that is implemented, example switching should be treated as a design risk. Do not silently load one example's save into another example without a clear rule.

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
- invalid inventory entries are filtered
- completion is preserved only at max stage
- duplicate inventory ids survive equipment changes

Additional future coverage should target example identity, missing content references, and malformed equipment ids before multi-example switching ships.
