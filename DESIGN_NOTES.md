# Design Notes

## Project Purpose

IdleForge is a generic browser incremental RPG engine. This pass proves that the project can host more than one theme by separating reusable engine logic from demo content.

## Engine vs Demo Content

Engine code lives in `js/engine/`. It should focus on reusable systems such as state, combat, inventory, loot, save handling, and UI rendering.

Example content lives in `examples/`. It should define the sample theme, item names, enemy names, zone names, and config values.

## Naming Rules

- Engine files use generic terms: `player`, `enemy`, `item`, `zone`, `currency`, `reward`.
- Content files may define the demo theme and use themed names.
- Keep ids stable and machine-friendly.
- Keep display names readable for players.

## Current Scope

- One shared engine.
- Two sample zones.
- Stage-based combat progression.
- Simple equipment and inventory.
- Autosave, export, import, and reset support.
- Direct `index.html` startup without a server.

## Future Scope

- More zones and themes.
- More item variety.
- More enemy variety.
- More progression depth if the engine still stays simple.
- Additional UI polish only after the core content pipeline is stable.

## Anti-Scope

Do not add these yet:

- talents
- prestige
- crafting
- shops
- classes
- skill trees
- complex boss systems
- multi-resource economy layers
- server requirements
- framework dependencies

The goal for this version is clarity, stability, and easy content editing.
