# Status

## Landed

- **0.0.1**: scaffold. Vite + TypeScript toolchain, CI with five gating jobs (Build, Unit tests,
  Lint, Type check, Screenshot tests), the `protect-main` ruleset, and this agent harness.
- **0.0.2**: walking skeleton. The `?theme=light|dark` override as pure logic with unit tests and
  an end-to-end test, the hero section from the design with self-hosted fonts, and screenshot
  baselines for wide and narrow in dark and light, verified on CI.
- **0.1.0**: the whole page. Filmstrip, facts grid, four project cards and footer from the
  design, the app screenshots under `public/shots/`, scroll-driven animations behind a
  `@supports` guard with a swipeable fallback, and byte-exact screenshot comparison.

## Next

1. Publishing: `pages.yml` pushing `dist/` to `gh-pages`, the Pages source switched from `main` to
   `gh-pages`. No custom domain for now (user decision 2026-09-19); `fardavide.dev` can be
   attached later without touching the build.

## Not yet configured

- GitHub Pages currently serves the raw `main` branch, auto-enabled by the repository name. It is
  switched to `gh-pages` in the publishing step.
- `public/shots/aura-cameras-filled.png` is a stand-in (the unfilled Aura snapshot) until the
  design's filled variant is downloaded from the design project by hand; the design tool cannot
  deliver files over 256 KiB.
