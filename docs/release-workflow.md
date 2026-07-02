# Release Workflow And Quality Checks

Depth Engine should stay simple: one issue, one focused patch, smoke checks, report, then close the issue when its acceptance checks are met.

## Milestone Naming

Use small checkpoint names until the starter reaches v1.0.

Suggested pattern:

```text
v0.x Short Checkpoint Name
```

Examples:

- `v0.4 Multi-Example Loader Plan`
- `v0.5 Save Schema Foundation`
- `v0.6 Hook Boundary Prep`
- `v1.0 Stable Starter`

Do not promise stable package behavior before v1.0.

## Issue To Patch Flow

1. Pick one issue.
2. Confirm the current baseline.
3. Make the smallest safe change that satisfies the issue.
4. Preserve direct `index.html` startup.
5. Run smoke checks.
6. Update docs when the public contract changes.
7. Report what changed and what intentionally did not change.
8. Close the issue only when acceptance checks are satisfied.

## Quality Checks

Before a change is complete, confirm:

- `index.html` still opens directly.
- `node smoke_depth_engine_core.mjs` passes.
- `node smoke_rat_cellar_content.mjs` passes.
- The GitHub Actions smoke workflow succeeds for PRs or pushes.
- README still matches the repo state.
- Roadmap language does not overpromise current features.
- Engine files stay generic.
- Example content stays under `examples/`.
- Save behavior changes are documented in `docs/save-schema.md`.
- Rendering trust changes are documented in `docs/trusted-content-rendering.md`.

## Required Report Format

Every completed issue should report:

```text
Summary:
- ...

Files changed:
- ...

Behavior changed:
- ...

Behavior intentionally not changed:
- ...

Checks run:
- ...

Remaining risks:
- ...

Suggested next issue:
- ...
```

## Change Categories

Use one main category per issue:

- `docs`: documentation, checklists, roadmap, release notes
- `engine`: generic runtime behavior
- `example`: bundled example content
- `save`: save shape, import/export, repair, migration
- `smoke`: test or CI coverage
- `workflow`: GitHub Actions, issue process, release process
- `planning`: future design without runtime behavior

## Release Note Rules

A release note should say:

- what changed
- what did not change
- whether saves are affected
- whether startup requirements changed
- what smoke checks were run
- which issue or PR it resolves

## Current CI Check

`.github/workflows/smoke.yml` runs:

```bash
node smoke_depth_engine_core.mjs
node smoke_rat_cellar_content.mjs
```

The workflow runs on pushes to `main` and pull requests.

## Guardrails

Do not add package publishing, npm packaging, a CLI, or a hosted generator until release rules and save/version behavior are more mature.
