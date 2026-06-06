# Example Games

This folder contains example games for IdleForge RPG Engine.

Rat Cellar is currently the only included example. It shows how a content folder can define config, items, enemies, zones, rewards, and progression data for the shared engine.

Examples are not the engine. The reusable engine code lives in `js/engine/`.

New examples should live in their own folder under `examples/`, such as `examples/my-example/`. Each example can use its own theme, names, labels, item balance, enemy rewards, and zone structure.

For the current manual loading workflow, see `docs/examples.md`.

## New Example Checklist

- Opens from `index.html`.
- Has `game.config.js`.
- Has `items.js`.
- Has `enemies.js`.
- Has `zones.js`.
- Has no engine code inside the example folder.
- Does not require a server.
- Uses generic engine fields correctly.
