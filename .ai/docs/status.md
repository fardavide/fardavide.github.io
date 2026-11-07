# Status

## Landed

- **0.2.0**: Granita's landing page, with real iPhone/iPad screenshots, CSS entrance and scroll
  motion, reduced-motion support, a Mac download and an explicit private TestFlight beta. The
  source stays here; the normal build includes `/granita/` and the standalone build targets
  `granita.fardavide.dev`. Its generated branch, Pages custom domain and publishing key are
  configured. Namecheap DNS and HTTPS enforcement remain pending; see
  [Granita publishing](granita-publishing.md).
  All 16 browser checks pass locally and on CI. Screenshot verification uses `xcode-27` on
  macOS 27.0.1 (26A434), matching the recording Mac, with zero pixel tolerance.
- **0.0.1**: scaffold. Vite + TypeScript toolchain, CI with five gating jobs (Build, Unit tests,
  Lint, Type check, Screenshot tests), the `protect-main` ruleset, and this agent harness.
- **0.0.2**: walking skeleton. The `?theme=light|dark` override as pure logic with unit tests and
  an end-to-end test, the hero section from the design with self-hosted fonts, and screenshot
  baselines for wide and narrow in dark and light, verified on CI.
- **0.1.0**: the whole page. Filmstrip, facts grid, four project cards and footer from the
  design, the app screenshots under `public/shots/`, scroll-driven animations behind a
  `@supports` guard with a swipeable fallback, and byte-exact screenshot comparison.
- **0.1.1**: published. `pages.yml` builds `dist/` on every merge that touches the page and
  pushes it to `gh-pages`; the Pages source is `gh-pages`, set through the API once the first
  publish created the branch. Live at https://fardavide.github.io/.

## Next

1. Complete Granita's Namecheap DNS and HTTPS setup.
2. Replace the Aura stand-in screenshot (below).

`fardavide.dev` is already attached: the live Pages settings report the custom domain and HTTPS
enforcement, verified 2026-11-07.

## Not yet configured

- `public/shots/aura-cameras-filled.png` is a stand-in (the unfilled Aura snapshot) until the
  design's filled variant is downloaded from the design project by hand; the design tool cannot
  deliver files over 256 KiB.
