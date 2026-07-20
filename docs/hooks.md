# Hook Boundary

Depth Engine includes a deliberately small, local, read-only hook runtime. It is not a plugin manager, dependency-injection framework, or remote extension loader.

The starter still runs by opening `index.html` directly, and the game loop works with zero registered hooks.

## Current Runtime

`js/engine/hooks.js` exposes three generic helpers:

```js
const unsubscribe = window.registerDepthEngineHook("afterStateLoad", (payload) => {
  console.log(payload);
});

window.runDepthEngineHook("afterStateLoad", {
  exampleId: "rat-cellar",
  stateSnapshot: {}
});

unsubscribe();
```

Available helpers:

- `registerDepthEngineHook(name, listener)` registers a local listener and returns an unsubscribe function.
- `runDepthEngineHook(name, payload)` sends a cloned, read-only payload to listeners and returns listener results.
- `getDepthEngineHookCount(name)` reports the current listener count for smoke/debug use.

Listener failures are caught and logged so an optional extension cannot stop the core game loop.

## Implemented Hook

### `afterStateLoad`

This hook runs after browser storage is loaded and normalized during boot.

Payload shape:

```js
{
  exampleId: "rat-cellar",
  event: "afterStateLoad",
  stateSnapshot: {},
  readOnly: true
}
```

The payload is cloned before listeners receive it. An extension should treat it as diagnostic/read-only information and must not expect mutations to alter `window.GameState`.

## Optional Example

`extensions/after-state-load-status.js` demonstrates one optional extension. It observes `afterStateLoad` and adds a read-only status message to the header.

The extension is disabled by default because `index.html` does not load it.

To try it, add this script after `js/engine/hooks.js` and before `js/engine/render.js`:

```html
<script src="extensions/after-state-load-status.js"></script>
```

To remove it, delete that one script tag. No core file or save change is required.

The smoke `smoke_extension_hook_example.mjs` proves:

- the core has zero listeners when the extension is absent;
- running a hook with no listeners is a no-op;
- the optional extension registers one listener;
- the extension renders a read-only message;
- later mutation of the source object does not alter the delivered snapshot.

## Candidate Future Hook Points

These lifecycle moments remain candidates rather than implemented promises:

1. `beforeStateInit`
2. `beforeFightResolution`
3. `afterFightResolution`
4. `beforeSaveExport`
5. `afterExampleSelection`

Add future hooks only through narrow issues with smoke coverage and explicit payload rules.

## Hooks To Wait On

Delay mutation-capable hooks:

- hooks that change combat math;
- hooks that rewrite save data;
- hooks that register remote examples;
- hooks that replace rendering internals;
- hooks that alter item, enemy, reward, or progression rules at runtime.

## Naming And Payload Rules

- Use lower camel case lifecycle names.
- Use plain serializable payload objects.
- Avoid DOM nodes in hook payloads.
- Avoid mutable references to internal state.
- Keep hooks optional.
- Document whether a hook is notification-only before shipping it.

## Guardrails

- No remote extension loading.
- No npm, bundler, or framework dependency.
- No plugin discovery or plugin manager.
- No hook may be required for normal gameplay.
- Optional extension files should be removable by deleting one script tag.
