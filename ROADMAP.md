# Roadmap

## v0.1 Working Prototype

- Rat Cellar example prototype is playable.
- Core stage progression, fight, loot, inventory, and save loops work.

## v0.2 Depth Engine Identity And Documentation

- Reframe the repo as Depth Engine, an open-source bare HTML RPG engine.
- Add README, contributing, roadmap, and principles docs.
- Make the visible UI describe the engine and loaded example clearly.
- Remove misleading idle/incremental language from the public-facing identity.

## v0.3 Example And Content Separation

- Separate example content more cleanly from shared engine code.
- Improve the data shape and document content editing rules.
- Use generic stage progression in the engine while examples choose their own labels.
- Document `examples/` as the home for example games.
- Keep the working example intact.

## v0.4 Multi-Example Loader

- Add a simple way to switch between multiple example content sets.
- Build on the active example metadata in `js/engine/content-loader.js`.
- Keep the loader browser-friendly and build-tool free.
- Preserve direct `index.html` startup or document any future runtime change clearly.
- Preserve a small, readable startup path.

## v0.5 Save Migration And Schema Docs

- Define save structure more formally.
- Document versioning and migration rules.
- Add compatibility guidance for future content changes.

## v0.6 Hooks And Plugin Foundation

- Introduce lightweight extension hooks.
- Keep the base engine small and generic.
- Avoid hard-coding theme-specific logic into the core.

## v1.0 Stable Open RPG Engine Starter

- Present a stable starter engine for browser RPG projects.
- Keep the included example simple, readable, and easy to replace.
- Treat the repo as an engine foundation rather than a single game.
