# Design source

The page is implemented from the Claude Design project **Website**, file `fardavide.dev.dc.html`:
<https://claude.ai/design/p/389c8285-6e16-4aac-a0a2-90d3912b7922?file=fardavide.dev.dc.html>

The design file is a Claude Design component: an `<x-dc>` template with two `<sc-if>` branches
(wide at 900 px and above, narrow below), inline styles, `style-hover` attributes, and a small
script that switches the branch and applies a `?theme=light|dark` URL override. None of that
runtime ships. The site expresses the same design as one document with media queries, `:hover`
rules and a few lines of TypeScript for the theme override.

## Reading it again

The `DesignSync` tool reads the project: `get_project`, `list_files`, `get_file`. `get_file` is
capped at 256 KiB, so the larger screenshots cannot be fetched through it; those come from the
app repositories instead, as the table below records.

## Screenshots in `public/shots/`

| File                       | Source                                                                                                                                                                                                                                                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `granita-diff.png`         | Granita `Apps/GranitaMobileSnapshotTests/__Snapshots__/ReadmeScreenshotTests/screenshot-of.diff-iPhone-dark.png`, downscaled to 560 px wide                                                                                                                                                                  |
| `granita-diff-light.png`   | Same folder, `screenshot-of.diff-iPhone-light.png`, downscaled                                                                                                                                                                                                                                               |
| `granita-review-light.png` | Design export, already 560 px                                                                                                                                                                                                                                                                                |
| `granita-worktrees.png`    | Design export, already 560 px                                                                                                                                                                                                                                                                                |
| `oltre-colony.png`         | Design export, 393 px, from oltre `client/colony/ui/src/desktopTest/screenshots/colony_screen_watching_phone.png`                                                                                                                                                                                            |
| `oltre-galaxy.png`         | Design export, 393 px, from oltre `client/galaxy/presentation/src/desktopTest/screenshots/galaxy_ledger.png`                                                                                                                                                                                                 |
| `aura-events-light.png`    | Aura `AuraTests/__Snapshots__/EventsListSnapshotTests/given-events-when-loaded-then-it-matches-the-reference.loaded-iPhone-portrait-light.png`, downscaled                                                                                                                                                   |
| `aura-cameras-filled.png`  | **Stand-in.** Aura `AuraTests/__Snapshots__/CameraGridSnapshotTests/given-reachable-cameras-when-loaded-then-it-matches-the-reference.loaded-iPhone-portrait-dark.png`, downscaled. The design's version fills the camera tiles with a neutral texture; download it from the design project to replace this. |

Downscaling uses the macOS built-in: `sips --resampleWidth 560 in.png --out out.png`. The design
shows these at 200 by 434 CSS pixels in the filmstrip, so 560 px covers a 2.8x device pixel ratio.
