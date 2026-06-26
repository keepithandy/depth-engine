# Content vs Engine

Depth Engine works best when engine logic and example content stay separate.

## Engine Files Should Not Contain Example Lore

Engine files should stay reusable and generic.

Do not put:

- world names
- faction names
- character names
- story text
- theme-specific progression rules
- active example identity values

in engine code.

## Content Files Define Theme And Game Data

Example files are where you change the game theme.

- example id, name, path, description, and content file list
- title and currency labels
- enemy lists
- loot tables
- item names
- zone names
- stage mapping

Rat Cellar is one example of stage-based RPG progression. Another example could treat the same stage number as a wave, room, job, day, area, or other progression unit.

Example games live under `examples/`. The active example metadata now lives in the active example folder, such as `examples/rat-cellar/example.meta.js`. `index.html` currently loads that metadata and the example scripts directly for no-server compatibility.

## Good Generic Engine Terms

These belong in engine code:

- player
- enemy
- item
- zone
- stage
- currentStage
- maxStage
- inventory
- equipment
- reward
- save data
- active example metadata

## Content-Only Terms

These belong in content files, not engine logic:

- unique region names
- monster family names
- special currency names
- story-specific item names
- themed zone titles
- active example names such as Rat Cellar
- active example folder ids such as `rat-cellar`

## Current Boundary Contract

- `examples/<example>/example.meta.js` owns the example id, display name, path, description, and content file list.
- `js/engine/content-loader.js` normalizes and exposes metadata after the example metadata script has loaded.
- `index.html` may still reference the active example scripts directly until the future multi-example loader exists.
- Engine files must not hardcode Rat Cellar lore, item names, enemy names, zone names, or old IdleForge branding.
- Smoke tests should fail if example-specific Rat Cellar terms drift into `js/engine/`.

## Rules For Future Contributors

- Keep engine files generic.
- Put example-specific values in `examples/`.
- Use `docs/examples.md` for the current manual example workflow.
- Update docs when a data shape changes.
- Test the loaded example after every change.
- Do not hide content rules inside engine logic.
