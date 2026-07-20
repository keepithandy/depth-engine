# Browser Performance Baseline

This baseline is intentionally lightweight. It records the current starter shape and defines warning budgets without forcing premature optimization.

## Current Static Baseline

Every bundled example uses the same local-first loader shape:

- 9 static scripts declared in `index.html`
- 6 dynamically written scripts for the active example:
  - example metadata
  - shared content loader
  - game config
  - items
  - enemies
  - zones
- 15 total script files per loaded example
- 1 stylesheet
- 0 package-manager or framework runtime requests
- 0 remote content requests

Run the repeatable byte-count report from the repo root:

```powershell
node .\tools\measure_static_baseline.mjs
```

```bash
node ./tools/measure_static_baseline.mjs
```

The report prints shared bytes, example-specific bytes, and total source bytes for Rat Cellar, Arena Waves, Sewer Patrol, and Depth Kit Lab.

## Browser Timing Procedure

Measure from a fresh private/incognito window with DevTools cache disabled only when comparing like-for-like runs.

Open `index.html` directly, select each bundled example, then run this in the browser console:

```js
const navigation = performance.getEntriesByType("navigation")[0];
console.table({
  domContentLoadedMs: navigation?.domContentLoadedEventEnd,
  loadMs: navigation?.loadEventEnd,
  resourceCount: performance.getEntriesByType("resource").length,
  scriptCount: performance.getEntriesByType("resource").filter((entry) => entry.initiatorType === "script").length,
  transferBytes: performance.getEntriesByType("resource").reduce((total, entry) => total + (entry.transferSize || 0), 0)
});
```

Because direct `file://` startup may report zero transfer bytes in some browsers, also preserve the static byte report from `tools/measure_static_baseline.mjs`.

## Interaction Responsiveness Procedure

In a Chromium browser that supports Event Timing, run:

```js
const interactionSamples = [];
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    interactionSamples.push({ name: entry.name, duration: entry.duration });
    console.table(interactionSamples.slice(-10));
  }
});
observer.observe({ type: "event", buffered: true, durationThreshold: 16 });
```

Then perform:

- one Fight action;
- one Equip action when inventory exists;
- one Sell action when inventory exists;
- one example selection;
- one Reset action after preserving any needed save.

Record the highest observed interaction duration.

## Measurement Matrix

Record at least one desktop and one phone-class result before a named starter release.

| Example | Browser / version | Device | DOMContentLoaded | Load | Highest interaction | Notes |
| --- | --- | --- | ---: | ---: | ---: | --- |
| Rat Cellar | Record during release check | Record device | — | — | — | |
| Arena Waves | Record during release check | Record device | — | — | — | |
| Sewer Patrol | Record during release check | Record device | — | — | — | |
| Depth Kit Lab | Record during release check | Record device | — | — | — | |

## Warning Budgets

These are investigation thresholds, not automatic failure gates:

- more than 20 total script files for one bundled example;
- more than 250 KiB of uncompressed shared-plus-example source;
- DOMContentLoaded above 1,000 ms on a current desktop browser;
- DOMContentLoaded above 2,000 ms on a representative phone;
- interaction duration above 100 ms for Fight, Equip, Sell, or Reset;
- visible input delay or layout shift during example selection.

Crossing a warning budget should open a focused investigation. It should not trigger content cuts or engine rewrites without evidence.

## Conditions To Record

Always record:

- date;
- browser and version;
- operating system;
- device model or CPU class;
- direct `file://` startup versus a local static server;
- cache state;
- selected bundled example;
- whether DevTools was open.

## Guardrails

This baseline is measurement-only. Do not change combat, rewards, content size, or engine architecture solely to improve a synthetic number.
