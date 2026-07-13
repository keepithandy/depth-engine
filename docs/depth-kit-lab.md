# Depth Kit Lab

Depth Kit Lab is a short pocket-loop prototype bundled with Depth Engine. It exists to prove that the existing generic stage loop can express a compact prepare, delve, loot, upgrade, repeat rhythm without adding a new runtime system.

## Purpose

This example is intentionally smaller than Rat Cellar, Arena Waves, and Sewer Patrol. It is meant to be a fast manual testbed for new starter users and for future engine work that needs a short, readable loop.

Depth Kit Lab proves:

- a six-stage progression cap;
- example-specific labels using `Depth` instead of `Stage`, `Wave`, or `Patrol`;
- a separate `Shards` currency;
- its own local save key and export filename;
- upgrade-flavored equipment rewards named `Depth Kit Mk I`, `Depth Kit Mk II`, and `Depth Kit Mk III`;
- a complete local-file startup path through the existing example registry and loader.

## Files

The example lives under `examples/depth-kit-lab/`.

- `example.meta.js` defines the example id, name, path, description, entry file, and content file order.
- `game.config.js` defines the short-loop config, save key, export filename, labels, player baseline, and XP curve.
- `items.js` defines upgrade-flavored equipment and field-kit rewards.
- `enemies.js` defines six compact encounters and reward flow.
- `zones.js` maps each Depth from 1 through 6 to a readable route beat.

## Manual Validation

1. Open `index.html` directly in a browser.
2. Use the Registered Examples panel.
3. Load **Depth Kit Lab**.
4. Confirm the hero panel uses `Depth` progression and `Shards` currency.
5. Fight through the short route.
6. Confirm loot, equipment, save, export, import, and reset still use the generic engine controls.

## Smoke Validation

Run:

```bash
node smoke_depth_kit_lab_example.mjs
node smoke_registered_examples_content.mjs
```

The dedicated smoke guards the example's registry entry, content files, save identity, export filename, short-loop stage map, reward flow, and Depth Kit item progression.

## Boundary

Depth Kit Lab should stay content-only. Do not add shared save migration, DOM boot logic, engine helpers, build tooling, or framework dependencies inside the example folder.
