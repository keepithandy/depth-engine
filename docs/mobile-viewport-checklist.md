# Narrow Phone Viewport Checklist

Use browser responsive mode and at least one real phone when available.

## Viewports

Check these CSS viewport widths:

- 320 px
- 360 px
- 375 px
- 390 px
- 412 px

Check every bundled example:

- Rat Cellar
- Arena Waves
- Sewer Patrol
- Depth Kit Lab

## Layout Checks

- No horizontal page scrolling.
- Header copy wraps without clipping.
- Export, Import, and Reset controls stack at narrow widths.
- The file input stays inside its panel.
- Example names, descriptions, and paths wrap safely.
- Example action buttons remain usable.
- Combat controls remain full-width and easy to tap.
- Inventory item names and descriptions do not push actions off-screen.
- Equipment labels remain readable.
- Footer paths wrap instead of overflowing.

## Interaction Checks

- Tap targets remain at least approximately 44 px tall.
- Focus outlines remain visible when a hardware keyboard is used.
- Example selection still reloads the correct bundled example.
- Save, import/export, reset, combat, equip, and sell behavior remain unchanged.

## Guardrails

This is a CSS/QoL validation pass only. Do not change combat, reward tables, item data, enemy data, save identity, or progression rules to make the layout fit.
