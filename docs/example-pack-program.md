# Example Pack Program And Template Gallery

This document defines the example-pack direction for Depth Engine.

Depth Engine now includes a small secondary bundled example, Arena Waves, to prove the registry and validation path without adding runtime example switching yet.

## Goal

Example packs should teach people how to reshape Depth Engine into different RPG structures without bloating the core starter.

A good example pack should be small, readable, local-first, and focused on one clear design idea.

## Current Bundled Examples

- `rat-cellar` — the default direct-loaded example.
- `arena-waves` — a secondary bundled example that is registered and smoke-validated, but not loaded by default from `index.html`.

## What Qualifies As An Example Pack

A bundled example pack should:

- live under `examples/<example-id>/`
- include `example.meta.js`, `game.config.js`, `items.js`, `enemies.js`, and `zones.js`
- use the same generic engine fields
- avoid engine code inside the example folder
- run without a server
- run without npm
- use reviewed local content only
- have a unique example id
- have a unique save key once example switching is implemented
- pass content validation smoke checks

## Example Pack Checklist

Before an example pack is accepted:

- metadata matches the manifest entry
- every item id is unique
- every enemy id is unique
- every enemy loot id exists
- every zone enemy id exists
- every stage from 1 to `maxStage` has one zone
- config has a clear title, currency, stage label, save key, and export filename
- text fields stay plain and reviewed
- Rat Cellar remains playable
- direct `index.html` startup remains intact
- `node smoke_registered_examples_content.mjs` validates the example

## Template Gallery Ideas

Future examples should each prove a different RPG shape.

Possible starter packs:

1. Dungeon Crawl — staged monsters, loot, and boss finish.
2. Arena Waves — repeated combat waves with escalating rewards. Included as `examples/arena-waves`.
3. Job Board — contracts instead of floors or rooms.
4. Survival Days — days, supplies, and attrition-flavored stages.
5. Creature Collector — enemy ids become encounter species and loot becomes capture/reward data.
6. Crafting Loop — rewards emphasize materials and equipment upgrades.
7. Tavern Guild — missions, reputation, and recruit-flavored progression.

Do not add all of these at once. The best next example is the one that teaches the most with the least new code.

## Why Arena Waves Was Added First

`arena-waves` reuses the existing stage, enemy, item, loot, and zone fields without needing new engine behavior.

The point is to prove the engine can feel different through content alone:

- `stageLabel` becomes `Wave`
- currency becomes `Medals`
- zones become arena rounds
- enemies become wave opponents
- rewards stay compatible with the same generic loot and equipment systems

## Example Pack Release Policy

Keep example packs repo-owned until:

- the multi-example loader is real
- save identity rules are defined
- authoring validation can check every registered example
- README explains how to choose or copy examples

Do not split example packs into separate packages yet.

## Guardrails

Example packs must not:

- add npm requirements
- require a build step
- introduce remote assets
- hide engine changes inside example folders
- make Rat Cellar stop working
- turn the starter into a content marketplace
