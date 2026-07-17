# Roadmap

## Four-Phase Plan

1. **Foundation** — protect direct browser startup, save reliability, generic engine boundaries, and the playable core loop.
2. **Extensibility** — prove multiple local examples and add only narrowly justified extension seams.
3. **Developer Experience** — synchronize docs, smoke tests, release gates, and customization guidance.
4. **Ecosystem** — grow reusable starter material only after the core is dependable.

## Completed Checkpoints

### v0.1 Working Prototype

- Rat Cellar is playable.
- Core stage progression, fight, loot, inventory, equipment, and save loops work.

### v0.2 Depth Engine Identity And Documentation

- Reframed the repository as a bare HTML RPG engine starter.
- Added README, contribution, roadmap, and principles documentation.
- Removed misleading idle/incremental identity language.

### v0.3 Content Separation Hardening

- Moved active example identity and content under `examples/`.
- Kept `js/engine/` generic.
- Preserved direct `index.html` startup.
- Added boundary smoke coverage.

### v0.4 Multi-Example Loader Foundation

- Added `examples/examples.manifest.js`.
- Added local selected-example loading without `fetch()` or a server.
- Added registry and selection contracts.

### v0.5 Bundled Example Expansion

- Added Arena Waves and Sewer Patrol.
- Proved themes can replace labels, routes, enemies, items, rewards, save keys, and export filenames without engine-specific rewrites.

### v0.6 Depth Kit Lab Pocket Loop

- Added Depth Kit Lab as a short six-depth prototype.
- Proved prepare, delve, loot, upgrade, repeat pacing through existing generic systems.
- Added dedicated content and reward-flow coverage.

### Save Compatibility Hardening

- Made active example configuration authoritative for progression caps.
- Repaired malformed saved player fields.
- Added a canonical save version and read-only compatibility classification.
- Preserved legacy normalization without destructive future-save behavior.

## Current Checkpoint

### v0.7 Stable Starter Release Candidate

The goal is to prove the starter is dependable to clone, launch, understand, customize, and validate.

Required evidence:

- synchronized release-readiness checklist;
- complete fresh-checkout GitHub Actions smoke run;
- direct `file://` browser launch without console errors;
- manual validation of example selection, combat, save/load, export/import, and reset;
- five bundled examples resolving through the generic loader;
- Crystal Mines created through the public customization guide without engine edits;
- focused Crystal Mines smoke coverage;
- named release notes tied to the tested commit;
- no package manager, build step, local server, or remote loader requirement.

This checkpoint is a release candidate, not yet a permanent compatibility promise or a package publication.

## After v0.7

### Stabilization And Outside-User Validation

- Have another developer clone or download the starter and follow the quickstart.
- Record documentation confusion, startup failures, or customization friction.
- Prefer narrow corrective patches over new systems.

### Read-Only Hook Proof

- Introduce a hook only when a concrete diagnostic or notification use case requires it.
- Start with read-only events such as `afterStateLoad`, `afterFightResolution`, or `afterExampleSelection`.
- Keep the core loop functional with zero hooks.
- Do not add mutation-capable plugins, remote loading, or dependency injection during the starter stabilization period.

### v1.0 Stable Open RPG Engine Starter

To qualify for v1.0:

- the v0.7 release gate must remain repeatable;
- outside-user startup and customization must succeed;
- save and version policies must be explicit;
- direct browser startup must remain supported;
- public quickstart and release documentation must match the tested repository;
- known support boundaries must be stated clearly.

v1.0 does not require npm publishing, CLI scaffolding, a visual editor, a plugin marketplace, or multiple polished games.
