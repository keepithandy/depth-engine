import { spawnSync } from "node:child_process";

const smokeScripts = [
  "smoke_index_static_contract.mjs",
  "smoke_example_selection_contract.mjs",
  "smoke_depth_engine_core.mjs",
  "smoke_save_stage_cap_contract.mjs",
  "smoke_save_player_repair_contract.mjs",
  "smoke_save_version_compatibility_contract.mjs",
  "smoke_rat_cellar_content.mjs",
  "smoke_registered_examples_content.mjs",
  "smoke_depth_kit_lab_example.mjs",
  "smoke_example_manifest_validator.mjs",
  "smoke_save_export_import_roundtrip.mjs",
  "smoke_example_save_isolation.mjs",
  "smoke_extension_hook_example.mjs"
];

const results = [];

for (const script of smokeScripts) {
  process.stdout.write(`\n▶ ${script}\n`);
  const result = spawnSync(process.execPath, [script], {
    cwd: new URL(".", import.meta.url),
    encoding: "utf8",
    stdio: "pipe"
  });

  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);

  const passed = result.status === 0;
  results.push({ script, passed, status: result.status });

  if (!passed) {
    console.error(`\nSmoke suite stopped at ${script} with exit code ${result.status ?? "unknown"}.`);
    process.exit(result.status || 1);
  }
}

console.log("\nDepth Engine smoke suite passed.");
console.log(`${results.length}/${results.length} smoke scripts passed in fixed order.`);
