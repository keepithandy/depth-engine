# Extension Hooks And Plugin Boundary

This document defines the first lightweight extension boundary for Depth Engine.

It is a design contract, not a full plugin system.

## Goal

Depth Engine should leave room for custom behavior without turning the starter into a framework.

Hooks should help future examples customize small decisions while the engine stays readable, local-first, and dependency-free.

## Hook Principles

- Hooks are optional.
- Missing hooks must never break the starter.
- Hooks should receive plain data and return plain data.
- Hooks should not own rendering, save storage, or boot order.
- Hooks should not require npm, a bundler, or async loading.
- Hooks should be example-owned unless they become truly generic.

## Safe Hook Points

Good future hook points:

1. Before combat starts.
2. After combat resolves.
3. Before rewards are granted.
4. After loot is rolled.
5. Before save export.
6. After save import normalization.
7. Before rendering an optional panel.

These points are narrow enough to explain and smoke-test.

## Unsafe Early Hook Points

Avoid hooks around:

- browser storage ownership
- script loading order
- core state creation
- direct `index.html` startup
- arbitrary HTML rendering
- remote content loading
- account/cloud behavior

Those areas are too central for an early starter plugin boundary.

## Proposed Future Shape

A future example could define hooks like this:

```js
window.DEPTH_ENGINE_HOOKS = {
  afterCombatResolved(context) {
    return context;
  },
  beforeRewardGranted(context) {
    return context;
  }
};
```

The engine would call hooks through a tiny helper that safely returns the original context if no hook exists.

```js
window.runDepthEngineHook = function runDepthEngineHook(name, context) {
  const hook = window.DEPTH_ENGINE_HOOKS?.[name];
  return typeof hook === "function" ? hook(context) : context;
};
```

Do not add this helper until an implementation issue names the first hook and smoke coverage.

## What Hooks May Change Later

Future hooks may adjust:

- reward amounts
- extra combat log lines
- optional loot modifiers
- optional post-fight effects
- optional example-specific panels

## What Hooks Must Not Change Yet

Early hooks must not:

- replace the save model
- switch examples dynamically
- inject remote scripts
- own the main renderer
- bypass content validation
- create hidden dependencies

## First Implementation Recommendation

The safest first real hook would be `afterCombatResolved(context)` because it can be tested with a synthetic smoke fixture and does not need to change startup or save storage.

Acceptance for that future issue:

- no hook keeps current behavior unchanged
- one test hook can append a log line or derived metadata
- Rat Cellar remains playable
- both smoke scripts pass
- direct `index.html` startup remains intact
