# Engine Principles

IdleForge RPG Engine is meant to stay small, browser-first, and easy to understand.

## Data-Driven Content

Game content should live in example data files where possible.

- The engine reads data.
- Example files define the playable theme.
- Example games live under `examples/`.
- New RPG ideas should usually start with data changes, not engine rewrites.

## Plain Browser-First Approach

- Open `index.html` directly.
- No build tools yet.
- No bundler required.
- No package install required for normal play.

This keeps the project approachable and easy to share.

The current active example metadata lives in `js/engine/content-loader.js`. `index.html` still loads example scripts directly to preserve browser-file compatibility.

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
