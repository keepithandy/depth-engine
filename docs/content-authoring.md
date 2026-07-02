# Content Authoring And Validation Kit

This guide defines the first authoring checklist for people who want to copy Rat Cellar and make a new Depth Engine RPG example.

It is intentionally small. The goal is to help authors avoid broken references without adding a build step or editor tooling.

## Required Example Files

A bundled example should include:

- `example.meta.js`
- `game.config.js`
- `items.js`
- `enemies.js`
- `zones.js`

The example should live under:

```text
examples/<example-id>/
```

## Metadata Checklist

`example.meta.js` should define:

- stable `id`
- readable `name`
- folder `path`
- short `description`
- `entry`
- `contentFiles`
- `playable`
- `bundled`

The `id` should match the folder name when possible.

## Config Checklist

`game.config.js` should define:

- `title`
- `currencyName`
- `maxStage`
- `stageLabel`
- `saveKey`
- `exportFileName`
- `startLog`
- `completionLog`
- `basePlayer`
- `levelCurve`

Use a unique `saveKey` per example once multi-example loading exists. Do not reuse Rat Cellar's save key for a different example.

## Item Checklist

Each item should have:

- string `id`
- string `name`
- valid `slot`
- number `attack`
- number `defense`
- positive number `price`
- string `description`

Allowed slots:

- `weapon`
- `head`
- `body`
- `feet`
- `offhand`
- `trinket`

## Enemy Checklist

Each enemy should have:

- string `id`
- string `name`
- positive number `stage`
- positive number `hp`
- positive number `attack`
- number `defense`
- positive number `xp`
- positive number `currency`
- array `loot`

Every loot id should exist in `items.js`.

## Zone Checklist

Each zone should have:

- positive number `stage`
- string `enemy`
- string `title`

Every stage from 1 through `GAME_CONFIG.maxStage` should have one zone.

Every zone enemy id should exist in `enemies.js`.

## Copy Rat Cellar Safely

1. Copy `examples/rat-cellar/` into `examples/<new-example-id>/`.
2. Rename ids and text in `example.meta.js`.
3. Update `game.config.js`.
4. Replace item ids and names.
5. Replace enemy ids and loot references.
6. Replace zone titles and enemy references.
7. Add the example to `examples/examples.manifest.js`.
8. Update `index.html` script paths only if this should become the active direct-load example.
9. Run both smoke scripts.

## Current Validation Coverage

`smoke_rat_cellar_content.mjs` validates Rat Cellar's current content shape.

It checks:

- metadata and registry alignment
- max stage
- export filename
- unique item ids
- unique enemy ids
- valid item fields
- valid enemy fields
- loot references
- zone references
- one zone per stage

## Future Validation Tool Direction

A future generic authoring checker can turn the Rat Cellar smoke rules into reusable validation for every registered example.

Suggested future file:

```text
smoke_registered_examples_content.mjs
```

That future smoke should iterate `examples/examples.manifest.js`, load each bundled example, and run the same shape checks without hardcoding Rat Cellar.

## Guardrails

Do not add a visual editor, npm package, framework, or schema library yet.

Keep the authoring kit readable and plain JavaScript until multiple examples prove the need for stronger tooling.
