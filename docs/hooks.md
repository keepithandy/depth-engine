# Hook Boundary

This document defines the starter-safe hook boundary for Depth Engine before any plugin or extension runtime is implemented.

Hooks are a future extension surface, not a current dependency-injection system. The current project should stay understandable as a plain HTML, CSS, and JavaScript starter that runs by opening `index.html` directly.

## Current Status

- No broad plugin system exists yet.
- No package manager, build step, remote loader, or dependency-injection framework is required.
- Engine behavior should remain explicit and readable before hooks become executable runtime behavior.

## Candidate Hook Points

The following lifecycle moments are worth tracking as future extension seams:

1. `beforeStateInit`
   - Runs before a fresh game state is created.
   - Potential use: choose safe default config values.

2. `afterStateLoad`
   - Runs after browser storage or imported save data has been repaired.
   - Potential use: inspect normalized state for diagnostics.

3. `beforeFightResolution`
   - Runs before a fight changes player, enemy, loot, XP, or currency state.
   - Potential use: read-only preview or logging.

4. `afterFightResolution`
   - Runs after combat rewards and state changes finish.
   - Potential use: achievement-style read-only summaries.

5. `beforeSaveExport`
   - Runs before save export data is serialized.
   - Potential use: add non-gameplay metadata later.

6. `afterExampleSelection`
   - Runs after a bundled example id has been resolved.
   - Potential use: selector diagnostics or UI copy updates.

## Starter-Safe Hooks

For the no-build starter, the safest first hooks would be read-only notification hooks:

- `afterStateLoad`
- `afterFightResolution`
- `afterExampleSelection`

These expose what happened without granting mutation power too early.

## Hooks To Wait On

Delay mutation-capable hooks until the starter is more stable:

- hooks that change combat math
- hooks that rewrite save data
- hooks that register remote examples
- hooks that replace rendering internals
- hooks that alter item, enemy, reward, or progression rules at runtime

These would make testing and documentation harder before the core starter is ready.

## Naming Style

Hook names should use lower camel case and describe lifecycle timing:

- `beforeStateInit`
- `afterStateLoad`
- `beforeFightResolution`
- `afterFightResolution`
- `beforeSaveExport`
- `afterExampleSelection`

Avoid vague names such as `onChange`, `update`, or `pluginRun`.

## Payload Expectations

Early hook payloads should be plain objects.

Recommended shape:

```js
{
  exampleId: "rat-cellar",
  event: "afterStateLoad",
  stateSnapshot: {},
  readOnly: true
}
```

Rules:

- Payloads should be serializable.
- Payloads should avoid DOM nodes.
- Payloads should avoid direct references to mutable internal state until mutation rules are documented.
- If mutation hooks are added later, they need their own smoke coverage and compatibility notes.

## Guardrails

- Do not implement a broad plugin system in the starter boundary pass.
- Do not add remote loading.
- Do not add npm, bundlers, or framework dependencies.
- Do not make hooks required for the core game loop.
- Keep the engine playable with zero registered hooks.
