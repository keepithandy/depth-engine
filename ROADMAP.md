# Roadmap

## Four-Phase Plan

1. Foundation: protect the working starter, direct browser startup, save reliability, generic engine boundaries, and the playable Rat Cellar example.
2. Extensibility: add safer multi-example loading and lightweight extension points without forcing a framework or build step.
3. Developer Experience: improve docs, smoke tests, workflows, examples, and contributor guidance.
4. Ecosystem: grow reusable examples, templates, starter packs, and community-facing packages after the core is stable.

## Completed Checkpoints

### v0.1 Working Prototype

- Rat Cellar example prototype is playable.
- Core stage progression, fight, loot, inventory, and save loops work.

### v0.2 Depth Engine Identity And Documentation

- Reframe the repo as Depth Engine, an open-source bare HTML RPG engine.
- Add README, contributing, roadmap, and principles docs.
- Make the visible UI describe the engine and loaded example clearly.
- Remove misleading idle/incremental language from the public-facing identity.

### v0.3 Content Separation Hardening

- Move active example identity into `examples/rat-cellar/example.meta.js`.
- Keep `js/engine/content-loader.js` generic and metadata-driven.
- Preserve direct `index.html` startup and manual script loading.
- Keep Rat Cellar playable.
- Guard against Rat Cellar-specific terms leaking into `js/engine/`.
- Rename the default exported save file away from old IdleForge branding.
- Update docs for the current engine-vs-example boundary.

### v0.4 Multi-Example Loader Foundation

- Add `examples/examples.manifest.js` as the browser-friendly example registry.
- Keep Rat Cellar registered as Example Game #1.
- Add generic registry helpers in `js/engine/content-loader.js`.
- Add a simple way to switch between bundled example content sets.
- Preserve direct `index.html` startup and manual script loading.
- Guard the registry and active-example relationship in smoke tests.

### v0.5 Bundled Example Expansion

- Add Arena Waves and Sewer Patrol as selectable bundled examples.
- Prove that themes can replace stage labels, content, and presentation without engine-specific rewrites.
- Keep each example isolated through its own save key and export filename.
- Expand registered-example smoke coverage and documentation.

### v0.6 Depth Kit Lab Pocket Loop

- Add Depth Kit Lab as a selectable six-depth prototype.
- Prove a compact prepare, delve, loot, upgrade, repeat loop using the existing generic runtime.
- Keep Depth labels, Shards currency, route data, enemies, rewards, and equipment content-owned.
- Add dedicated smoke coverage for registry identity, save identity, export naming, route length, reward flow, and Depth Kit item progression.
- Document the example as a short manual testbed for starter users and future engine work.

## Next Planned Lanes

### Save Schema And Compatibility Hardening

- Continue formalizing save structure, versioning, and migration rules.
- Add compatibility guidance for future content changes.
- Keep example save identities isolated and trustworthy.
- Add focused regression coverage before any schema-affecting runtime change.

### Hooks And Plugin Foundation

- Introduce lightweight extension hooks only where a proven use case exists.
- Keep the base engine small and generic.
- Avoid hard-coding theme-specific logic into the core.
- Preserve direct-file startup and the no-build-step starter path.

### Developer Experience Follow-Up

- Keep the quickstart, example authoring guidance, and smoke commands synchronized with the active checkpoint.
- Add contributor-facing checks when a recurring failure mode justifies them.
- Prefer narrow examples and contracts over broad framework adoption.

## Phase 4 Public Starter Planning

See [`docs/public-starter-release.md`](docs/public-starter-release.md) for the public starter release strategy.

Before Depth Engine is presented as a stable public starter, the project should define:

- what `v1.0 stable starter` means
- whether releases stay clone-first or eventually include downloadable starter ZIPs
- how engine, example, docs, save, and breaking changes are versioned
- what the public quickstart must prove
- what screenshots or demo materials are useful without turning the repo into a marketing-heavy project
- which packaging ideas are explicitly not approved yet

Current Phase 4 stance:

- Keep the repo clone-first.
- Preserve direct `index.html` startup.
- Do not introduce npm package management for release packaging unless separately approved.
- Do not publish packages before save/version rules are trustworthy.
- Treat examples as repo-owned starter content until the loader and authoring guidance are mature enough to split them out.

## v1.0 Stable Open RPG Engine Starter

- Present a stable starter engine for browser RPG projects.
- Keep the included examples simple, readable, and easy to replace.
- Treat the repo as an engine foundation rather than a single game.
- Include a public quickstart that proves the starter runs without dependencies.
- Include a release readiness checklist before calling the starter stable.
- Document versioning expectations for engine, example, docs, save, and breaking changes.
- Avoid package publishing or long-term compatibility promises until release rules are ready.