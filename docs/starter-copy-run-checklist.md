# Starter Copy-And-Run Checklist

Use this checklist to prove that Depth Engine can be reshaped into a new bundled RPG theme without changing generic engine files.

## 1. Copy One Existing Example

From the repo root, copy a small bundled example such as `examples/sewer-patrol/` to a temporary fixture folder:

```powershell
Copy-Item -Recurse .\examples\sewer-patrol .\examples\fixture-run
```

```bash
cp -R examples/sewer-patrol examples/fixture-run
```

Do not copy `node_modules`, build output, browser saves, or release artifacts.

## 2. Update Identity Fields

Edit only the copied example files and the manifest entry.

Required identity changes:

- `examples/fixture-run/example.meta.js`
  - `id`
  - `name`
  - `path`
  - `description`
  - `entry`
- `examples/fixture-run/game.config.js`
  - `title`
  - `currencyName` if the theme needs it
  - `stageLabel`
  - `saveKey`
  - `exportFileName`
  - start/completion copy
- `examples/examples.manifest.js`
  - add the fixture entry
  - use the required file order: `game.config.js`, `items.js`, `enemies.js`, `zones.js`

The fixture must have a unique example id, save key, and export filename.

## 3. Update Theme Content

Edit these copied files without changing `js/engine/`:

- `items.js`
- `enemies.js`
- `zones.js`

Every enemy loot id must exist in `items.js`. Every zone enemy id must exist in `enemies.js`. Every stage from `1` through `GAME_CONFIG.maxStage` must have one zone.

## 4. Confirm Direct-File Loading

Open `index.html` directly in a browser.

Confirm:

- the fixture appears in the Registered Examples panel;
- selecting it reloads the page;
- the loaded-example label uses the fixture name;
- the browser title uses `GAME_CONFIG.title`;
- no server or package install is required.

## 5. Confirm Save Identity

Play one action in the fixture and verify:

- the fixture uses its own `GAME_CONFIG.saveKey`;
- existing bundled example saves remain unchanged;
- exported save files use the fixture's `exportFileName`;
- switching away and back restores only the fixture save.

## 6. Run Validation

```powershell
node .\run_smokes.mjs
```

```bash
node ./run_smokes.mjs
```

At minimum, the manifest validator and registered-example content smoke must pass.

## Common Failures

- **Fixture does not appear:** manifest entry missing or malformed.
- **Page loads the wrong example:** `id`, `path`, or `entry` mismatch.
- **Old example save appears:** copied `saveKey` was not changed.
- **Export overwrites another example:** copied `exportFileName` was not changed.
- **Smoke reports missing loot:** enemy references an item id not defined in the copied `items.js`.
- **Smoke reports missing stage:** `zones.js` does not define every stage through `maxStage`.
- **Direct file startup fails:** a remote fetch, module import, or server-only path was introduced.

## Cleanup

After the fixture proves the workflow, either keep it as a real example with intentional content or remove its manifest entry and folder. Do not leave a half-registered fixture in `main`.
