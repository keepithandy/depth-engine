# Engine Principles

Depth Engine is meant to stay small, browser-first, and easy to understand.

It is a bare HTML RPG engine core: plain files, readable systems, no build step, and no framework lock-in.

## Four-Phase Plan

1. Foundation: protect the playable starter, direct `index.html` startup, generic engine files, and clear example boundaries.
2. Extensibility: prepare multiple examples, cleaner loaders, and lightweight extension points after the foundation is stable.
3. Developer Experience: improve docs, smoke tests, starter workflows, and contributor confidence.
4. Ecosystem: grow reusable examples, templates, and community-friendly packages only after the core is trustworthy.

The current v0.3 checkpoint is a Phase 1 hardening pass with only light Phase 2 preparation.

## Data-Driven Content

Game content should live in example data files where possible.

- The engine reads data.
- Example files define the playable theme.
- Example games live under `examples/`.
- Example metadata lives with the example content.
- New RPG ideas should usually start with data changes, not engine rewrites.

## Plain Browser-First Approach

- Open `index.html` directly.
- No build tools yet.
- No bundler required.
- No package install required for normal play.

This keeps the project approachable and easy to share.

The current active example metadata is loaded from `examples/rat-cellar/example.meta.js`. `js/engine/content-loader.js` stays generic and reads whichever metadata was loaded first. `index.html` still loads example scripts directly to preserve browser-file compatibility.

## Generic Engine Vocabulary

Use neutral terms in engine files.

Examples:

- player
- enemy
- item
- zone
- stage
- currentStage
- maxStage
- inventory
- equipment
- save
- reward
- active example

Avoid theme-specific labels inside engine code.

Stages are the generic progression unit. A future example can present stages as floors, waves, rooms, jobs, days, areas, or another RPG structure without changing core engine logic.

## Small Examples Over Large Examples

The engine should prove the idea with small, readable examples.

- Keep the example focused.
- Show one or two systems well.
- Avoid packing the starter with too many mechanics too early.
- Use `docs/examples.md` when creating or replacing examples.

## Stability Before Features

Add new systems only after the current ones are stable.

- protect the working example
- keep saves reliable
- keep the UI understandable
- keep changes easy to review
- keep content separation guarded by smoke tests
