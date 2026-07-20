# Manual Save Export/Import Round-Trip Checklist

Use this browser check alongside `smoke_save_export_import_roundtrip.mjs`.

## Known-State Round Trip

1. Open `index.html` directly.
2. Choose one bundled example.
3. Fight until the state visibly changes through stage progress, XP, currency, or inventory.
4. Select **Export Save** and confirm the downloaded filename matches the active example.
5. Preserve the downloaded JSON file.
6. Select **Reset Save** and confirm the example returns to its new-state baseline.
7. Import the saved JSON.
8. Confirm stage, player stats, currency, inventory, equipment, log, and completion state return in normalized form.
9. Reload the page and confirm the imported state persists in the active example's save slot.

## Isolation Check

1. Export one example's save.
2. Switch to a different bundled example.
3. Confirm the second example retains its own independent state.
4. Import the first example's JSON while the second example is active.
5. Confirm normalization stamps the currently active example id and does not overwrite another example's storage key.

## Malformed And Future-Version Checks

Use copies of an exported JSON file, never the only copy of a real save.

- Replace the file contents with malformed JSON and confirm import fails without replacing the current state.
- Change `exampleId` to another value and confirm import normalizes it to the active example.
- Increase `version` above `DEPTH_ENGINE_SAVE_VERSION` and confirm the numeric future version remains preserved for compatibility detection.

## Guardrails

- Do not change save keys during this validation.
- Do not test with irreplaceable player data.
- Keep direct `file://` startup as the primary manual path.
