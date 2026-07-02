# Trusted Content Rendering Rules

Depth Engine currently treats bundled example files as trusted local source files.

This document records that boundary so future contributors do not mistake the current renderer for a safe remote-content renderer.

## Current Assumption

The engine renders example content that lives in this repository under `examples/`.

That content is expected to be reviewed source code and data, not arbitrary user input and not remote third-party content.

## Trusted Content Means

Trusted example content can define:

- item names
- item descriptions
- enemy names
- zone titles
- example labels
- currency labels
- start and completion log text

Those values are part of the local project. They should be reviewed like any other source file.

## What Is Not Supported Yet

Depth Engine does not currently support arbitrary untrusted content such as:

- remote JSON loaded from another site
- user-submitted item or enemy names
- plugin marketplace content
- downloaded example packs from unknown authors
- editable browser text that is rendered as HTML

Do not describe the current renderer as safe for those use cases.

## Renderer Boundary

The renderer intentionally stays small and readable for a beginner-friendly starter.

That means future work should not add a heavy sanitizer, framework, virtual DOM, or template engine unless a separate implementation issue approves the larger tradeoff.

## Rule For Bundled Examples

Bundled examples must be reviewed before merging.

A bundled example should:

- keep content in `examples/<example-id>/`
- avoid script tags or event handler HTML inside text fields
- use plain text for names, labels, and descriptions
- keep engine code out of example folders
- pass the content smoke checks

## Rule For Future Third-Party Content

Before Depth Engine supports third-party or remote content, open a separate security-focused implementation issue.

That issue should decide whether to:

- render with `textContent` instead of HTML strings
- sanitize content before rendering
- restrict allowed fields and characters
- validate content through an authoring tool
- isolate remote packs from the default starter path

## Current Non-Goal

This document does not require a renderer rewrite.

The current goal is to make the trust boundary explicit while preserving the small-engine rendering style.
