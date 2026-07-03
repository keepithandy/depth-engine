# Copy An Example

Use this when you want to make a new small RPG theme from an existing bundled example.

The safest starting point is `examples/arena-waves/` because it is compact and already proves that the same engine can present progression as waves instead of rooms.

## Quick Path

1. Copy an existing example folder.

   Example:

   ```text
   examples/arena-waves/
   ```

2. Rename the copied folder.

   Example:

   ```text
   examples/job-board/
   ```

3. Open the copied `example.meta.js` file and change:

   - `id`
   - `name`
   - `path`
   - `description`
   - `entry`

4. Open the copied `game.config.js` file and change:

   - `currencyName`
   - `maxStage`
   - `stageLabel`
   - `saveKey`
   - `exportFileName`
   - `startLog`
   - `completionLog`
   - `basePlayer`
   - `levelCurve`

5. Replace the copied `items.js`, `enemies.js`, and `zones.js` content.

6. Add the new example to `examples/examples.manifest.js`.

7. Open `index.html` and select the new example from Registered Examples.

8. Run the smoke checks.

## Required Files

Every bundled example should include:

```text
examples/<example-id>/example.meta.js
examples/<example-id>/game.config.js
examples/<example-id>/items.js
examples/<example-id>/enemies.js
examples/<example-id>/zones.js
```

## Save Key Rule

Every example needs its own save key.

Good:

```js
saveKey: "depth-engine-job-board-save-v1"
```

Avoid reusing another example's key. Reusing a key can make two examples read and write the same browser save slot.

## Export File Rule

Every example should also have a distinct export file name.

Good:

```js
exportFileName: "depth-engine-job-board-save.json"
```

This keeps downloaded save files clear for players.

## Id Rules

Use stable ids for examples, items, enemies, and zones.

Good ids:

```text
job-board
missing-cart
rusty-contract-blade
bandit-crew
```

Avoid changing ids casually after the example ships. Saved inventory and equipment use item ids.

## Manifest Entry Shape

Add one entry like this to `examples/examples.manifest.js`:

```js
{
  id: "job-board",
  name: "Job Board",
  path: "examples/job-board",
  description: "Contract-based RPG example using the generic stage engine.",
  entry: "examples/job-board/example.meta.js",
  contentFiles: [
    "game.config.js",
    "items.js",
    "enemies.js",
    "zones.js"
  ],
  playable: true,
  bundled: true
}
```

## Smoke Checks

Run these from the repo root:

```bash
node smoke_index_static_contract.mjs
node smoke_example_selection_contract.mjs
node smoke_depth_engine_core.mjs
node smoke_rat_cellar_content.mjs
node smoke_registered_examples_content.mjs
```

The registered-example smoke checks the new example once it is marked as `bundled: true` in the manifest.

## Guardrails

Do not:

- put example-specific content in `js/engine/`
- reuse another example's `saveKey`
- add npm, a framework, or a build step
- load remote content
- skip manifest registration
- bypass smoke checks
