# Keyboard And Focus Accessibility Checklist

Run this manual pass from a fresh browser session with only the keyboard.

## Keyboard Order

1. Press `Tab` once and confirm **Skip to game controls** becomes visible.
2. Activate it with `Enter` and confirm focus moves to the main game shell.
3. Continue tabbing through:
   - Export Save
   - Import Save file input
   - Reset Save
   - available example buttons
   - Fight
   - inventory Equip/Sell buttons when items exist
4. Confirm focus does not enter disabled **Active** buttons.
5. Confirm `Shift+Tab` reverses the same logical order.

## Focus Visibility

- Every interactive control has a visible high-contrast focus outline.
- The outline is not clipped by panels or rounded containers.
- File input focus is also visible on the import control.
- Focus remains visible at narrow phone widths.

## Activation

- `Enter` and `Space` activate buttons exactly as clicking them does.
- Selecting an example through the keyboard stores the selected id and reloads.
- Import can be opened and completed without a mouse.
- Reset remains keyboard-accessible but is visually distinct as destructive.

## Status Announcements

Using a screen reader or browser accessibility inspector, confirm:

- the loaded example label uses a polite status region;
- the combat log is exposed as a live log;
- fight results are announced without moving keyboard focus;
- current enemy, equipment, inventory, and selector regions have useful labels.

## Regression Guardrails

- Do not change combat math, rewards, progression, or save behavior during an accessibility pass.
- Do not replace semantic buttons with clickable divs.
- Do not add positive `tabindex` values.
- Keep direct `index.html` startup working.
