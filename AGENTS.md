# Depth Engine Agent Board

This board keeps Depth Engine issues pointed at a clear owner lane. These are working roles, not separate people.

Every new issue should name one primary agent and any supporting agents.

## Agent Lanes

| Agent | Owns | Typical files | Done means |
| --- | --- | --- | --- |
| Architect | Engine boundaries, public starter shape, roadmap, compatibility rules | `README.md`, `ROADMAP.md`, `docs/` | The design is explicit, small, and does not overpromise. |
| Core Runtime | Game loop, state, combat, saves, loaders, exports/imports | `js/engine/`, `index.html` loader wiring | Existing examples still run without a build step. |
| Content Systems | Bundled examples, content registry, example authoring rules | `examples/`, `docs/examples.md` | Content changes do not require engine-specific rewrites. |
| Rendering UI | Browser UI, panels, readable labels, selector surfaces | `index.html`, `styles/`, render helpers | The UI stays clear and works from direct file startup. |
| Testing Warden | Smoke tests, regression checks, release gates | `smoke_*.mjs`, `.github/workflows/` | The smallest useful smoke check guards the change. |
| Documentation | README, contribution docs, authoring guides, release notes | `README.md`, `CONTRIBUTING.md`, `docs/` | A new user can understand the current state without guessing. |
| Release Manager | Version/checkpoint language, changelog discipline, release readiness | `ROADMAP.md`, `CHANGELOG.md`, release docs | The repo can explain what changed and what stayed compatible. |

## Issue Template Habit

Use this shape inside new issues:

```markdown
## Agent Owner

Primary: <Agent>
Support: <Agent>, <Agent>

## Goal

<One specific outcome.>

## Scope

- <What changes>
- <What does not change>

## Acceptance Checks

- <Observable pass condition>
- <Smoke/docs condition>

## Guardrails

- No build step unless explicitly approved.
- No remote content loading unless explicitly approved.
- Do not break direct `index.html` startup.
- Do not put example-specific behavior in generic engine code.
```

## Working Order

1. Close or confirm current open issues.
2. Prefer one narrow implementation issue over broad architecture rewrites.
3. Keep examples small and readable.
4. Add smoke coverage when behavior changes.
5. Update docs when project usage changes.

## Current Guardrails

- Direct `index.html` startup remains supported.
- No package manager is required for the starter.
- Bundled examples stay local.
- Engine files stay generic.
- Example content owns theme names, items, enemies, zones, save keys, and export filenames.
- Smoke checks are the release gate for core behavior.
