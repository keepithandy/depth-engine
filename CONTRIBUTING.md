# Contributing to IdleForge RPG Engine

Thanks for helping improve IdleForge RPG Engine.

## Project Goals

- Keep the repo a lightweight browser RPG engine starter.
- Keep the loaded example working at all times.
- Keep engine code generic.
- Keep example content separate from engine logic.
- Keep the project understandable for beginners.
- Keep direct `index.html` startup working unless a future pass explicitly changes that requirement.

## Coding Style

- Use plain HTML, CSS, and JavaScript only.
- Prefer small, readable changes over large rewrites.
- Keep names generic in engine files.
- Keep formatting consistent with the surrounding code.
- Add comments only when a section would otherwise be hard to follow.

## Keep Engine Generic

Engine files should not contain theme-specific lore, names, or story text.

Good engine code handles:

- state
- stage progression
- combat
- inventory
- loot
- saving
- rendering

## Keep Example Content Separate

Put example-specific data in `examples/` instead of engine files.

- `game.config.js` for theme settings
- `items.js` for equipment and sellable items
- `enemies.js` for encounters and rewards
- `zones.js` for stage-to-zone mapping

Each example should live in its own folder. See `docs/examples.md` for the current manual loading workflow.

Engine code should use `currentStage` and `maxStage`. Example content can label stages as floors, waves, rooms, jobs, days, areas, or another structure, but that wording should stay in example data or clearly labeled example UI.

## Avoid Project-Specific Lore In Engine Files

Do not add example lore, region names, character names, or world-specific labels to engine code.

Engine code should stay reusable across different RPG themes.

## Test Checklist Before Commit

- Open `index.html` directly in a browser.
- Confirm the loaded example label matches `js/engine/content-loader.js`.
- Run at least one fight.
- Verify XP increases after combat.
- Verify currency changes after rewards and selling.
- Verify loot can be equipped.
- Verify save, export, import, and reset still work.
- Refresh the page and confirm the state reloads.
- Check that visible labels still read like an engine starter, not a one-off game.

## Suggested Branch And Commit Workflow

1. Create a short branch name for the change.
2. Make one focused change set.
3. Test the loaded example locally.
4. Commit with a clear message that describes the user-facing result.
5. Keep follow-up changes small and separate when possible.
