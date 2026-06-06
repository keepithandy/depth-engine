# Rat Cellar Example

Rat Cellar is a minimal sample RPG for IdleForge RPG Engine.

It demonstrates content config, items, enemies and encounters, zones and stages, rewards, loot drops, equipment, selling, saves, and progression through the shared engine loop.

Rat Cellar is intentionally small. It should not define engine architecture or push theme-specific assumptions into `js/engine/`.

## Files To Edit

- `game.config.js` controls the visible title, currency label, stage label, stage cap, save key, starting player stats, level curve, and log messages.
- `items.js` controls equipment ids, item names, slots, stats, prices, and descriptions.
- `enemies.js` controls encounter ids, enemy stats, rewards, and loot tables.
- `zones.js` maps stages to zone titles and enemy ids.

Keep ids stable when possible. If an id changes, update any file that references it.
