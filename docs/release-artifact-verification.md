# Release Artifact Verification

Depth Engine release snapshots can be audited without npm, a build tool, or automatic publishing.

## Generate A Manifest

For an unpacked release folder:

```powershell
node .\tools\generate_release_manifest.mjs .\release\DepthEngine-v0.6
```

```bash
node ./tools/generate_release_manifest.mjs ./release/DepthEngine-v0.6
```

For a finished ZIP file:

```powershell
node .\tools\generate_release_manifest.mjs .\release\DepthEngine-v0.6.zip
```

```bash
node ./tools/generate_release_manifest.mjs ./release/DepthEngine-v0.6.zip
```

The generator writes:

- `release-manifest.json`
- `SHA256SUMS.txt`

Folder manifests include each release file in sorted path order with byte size and SHA-256. ZIP targets produce one checksum entry for the ZIP itself.

## Exclusions

The generator excludes common development debris:

- `.git/`
- `node_modules/`
- `.idea/`
- `.vscode/`
- `.DS_Store`
- `Thumbs.db`
- prior generated manifest/checksum files
- filenames matching `*.local.json` or `*.localsave.json`

Browser `localStorage` saves are not files in the repo and therefore cannot enter a release folder unless someone exports and copies them manually. Do not include personal exported saves in a release.

## Verify In PowerShell

Verify an individual ZIP:

```powershell
Get-FileHash .\release\DepthEngine-v0.6.zip -Algorithm SHA256
Get-Content .\release\SHA256SUMS.txt
```

Verify every file in an unpacked release folder against `release-manifest.json`:

```powershell
$root = Resolve-Path .\release\DepthEngine-v0.6
$manifest = Get-Content (Join-Path $root 'release-manifest.json') -Raw | ConvertFrom-Json
foreach ($file in $manifest.files) {
  $actual = (Get-FileHash (Join-Path $root $file.path) -Algorithm SHA256).Hash.ToLower()
  if ($actual -ne $file.sha256) { throw "Checksum mismatch: $($file.path)" }
}
'All release files verified.'
```

## Verify In Bash

For a ZIP or unpacked folder manifest:

```bash
cd release
sha256sum --check SHA256SUMS.txt
```

macOS may use:

```bash
shasum -a 256 -c SHA256SUMS.txt
```

## Release Guardrails

- Generate manifests manually for named release snapshots.
- Do not use this tool to publish, tag, or create releases automatically.
- Regenerate checksums after any release file changes.
- Keep the manifest beside the exact folder or ZIP it describes.
- Run the full smoke suite before generating final checksums.
