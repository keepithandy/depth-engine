# Public Starter Release Strategy

This document defines how Depth Engine should eventually be presented as a public starter people can clone, learn from, and build with.

It is a planning document only. It does not publish a package, add package management, or change the direct `index.html` startup path.

## Release Promise

Depth Engine should become a small, readable browser RPG starter that proves a reusable engine/content split without asking beginners to learn a build system first.

A public release should make this promise clearly:

- clone the repo
- open `index.html`
- play the included example
- read the engine/example boundary
- replace the example content with your own RPG theme

The starter should feel safe to copy before it tries to feel impressive.

## v1.0 Stable Starter Definition

`v1.0 stable starter` means the repo is ready to recommend as a dependable starting point for small browser RPG projects.

To qualify, v1.0 should have:

- direct `index.html` startup still working without a server or package install
- one included example that remains playable from a fresh clone
- documented engine-vs-example boundaries
- documented save shape and migration expectations
- documented versioning rules
- a short public quickstart checklist
- a release readiness checklist
- smoke checks for the core engine and included example
- clear guidance for adding or replacing example content
- no misleading promise that the engine is a full framework or content platform

v1.0 does not require npm, package publishing, a plugin marketplace, a visual editor, or multiple polished games.

## Packaging Decision

The default release shape should stay clone-first.

Recommended near-term packaging:

1. GitHub repository as the source of truth.
2. GitHub releases for named checkpoints when the starter is stable enough.
3. Optional downloadable ZIPs attached to releases later, only after the release checklist is reliable.

Not approved yet:

- npm package publishing
- CLI scaffolding
- hosted template generator
- asset-heavy demo bundle
- compatibility promises beyond the documented save and version rules

This keeps the starter beginner-friendly and avoids turning the project into infrastructure before the core is trustworthy.

## Versioning Rules

Depth Engine should use simple checkpoint-style versioning until the first stable release, then treat v1.0+ changes more carefully.

Suggested categories:

- Engine changes: update the version when generic behavior, state rules, combat rules, save behavior, loader behavior, or rendering contracts change.
- Example changes: update notes when example data, balance, enemies, items, zones, or labels change.
- Documentation changes: note changes when public setup, contribution, roadmap, release, or content-authoring guidance changes.
- Save changes: document any save shape change before shipping it, including whether old saves are repaired, migrated, ignored, or intentionally reset.
- Breaking changes: call out anything that requires users to edit content files, reset saves, change script order, or change how the starter is launched.

Before v1.0, checkpoint labels can stay lightweight. At v1.0 and later, release notes should explain what changed, what remained compatible, and whether save data is affected.

## Public Quickstart Checklist

A public release should make the first run obvious:

1. Download or clone the repo.
2. Open `index.html` in a browser.
3. Confirm the Rat Cellar example loads.
4. Run one fight.
5. Confirm XP, currency, loot, save, export/import, and reset still work.
6. Read `README.md` for the project shape.
7. Read `docs/examples.md` before replacing content.
8. Keep engine code generic and put new theme data in `examples/`.

The quickstart should not require installing dependencies.

## Release Readiness Checklist

Before marking a public starter release, confirm:

- `index.html` opens directly in a browser.
- Rat Cellar loads as the included example.
- Core gameplay still works: fight, XP, currency, loot, equipment, save, export/import, and reset.
- `node smoke_depth_engine_core.mjs` passes.
- `node smoke_rat_cellar_content.mjs` passes.
- `README.md` accurately describes the current project state.
- `ROADMAP.md` does not overpromise current features.
- `CONTRIBUTING.md` still matches the actual workflow.
- Engine files avoid Rat Cellar-specific lore or content ids.
- Example files own theme-specific names, labels, items, enemies, and zones.
- Save/version notes describe any compatibility risk.
- Release notes identify whether the change is engine, example, docs, save, or breaking.

## Example Packaging Direction

For now, examples should stay inside the repo under `examples/` because that makes the starter easier to inspect and run from a fresh clone.

Later, if the example set grows, the project can revisit whether to:

- keep only one official example in the core starter
- list extra examples separately
- attach example packs to GitHub releases
- keep a small template gallery in docs

Do not split examples out before the loader, save rules, and authoring guidance are mature enough.

## Screenshots And Demo Needs

Depth Engine does not need art-heavy marketing assets before v1.0.

Useful public assets later:

- one screenshot of the loaded example
- one screenshot showing the engine/example identity clearly
- one short demo GIF or clip of a fight and save flow
- one diagram or simple doc section showing engine files vs example files

The goal is confidence, not hype.

## Tagline Options

Possible public-facing descriptions:

- A tiny browser RPG engine starter built with plain HTML, CSS, and JavaScript.
- A no-build RPG starter for cloning, learning, and reshaping into your own game.
- A lightweight engine/content foundation for small browser RPGs.
- A plain JavaScript RPG starter that keeps engine logic separate from example content.

## Follow-Up Slices

Good follow-up issues after this planning pass:

- v1.0 readiness checklist implementation
- versioning policy cleanup
- public quickstart polish
- demo and screenshot plan
- packaging decision doc expansion
