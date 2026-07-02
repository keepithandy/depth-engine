---
name: Focused Patch
description: A small implementation, docs, smoke, or workflow change
title: "Patch: "
labels: []
assignees: []
---

## Goal

Describe the focused result this issue should produce.

## Current Behavior

Describe what currently exists or what is missing.

## Proposed Work

- 
- 
- 

## Acceptance Checks

- [ ] Direct `index.html` startup still works.
- [ ] Rat Cellar remains playable.
- [ ] `node smoke_depth_engine_core.mjs` passes.
- [ ] `node smoke_rat_cellar_content.mjs` passes.
- [ ] `node smoke_registered_examples_content.mjs` passes.
- [ ] Docs are updated if the public contract changes.

## Guardrails

- Do not add npm, a framework, or a build step unless this issue explicitly approves it.
- Do not move example-specific content into `js/engine/`.
- Do not change save behavior without updating `docs/save-schema.md`.
- Keep the change small enough to review.

## Suggested Final Report

- Summary
- Files changed
- Behavior changed
- Behavior intentionally not changed
- Checks run
- Remaining risks
- Suggested next issue
