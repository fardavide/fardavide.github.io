# Status

## Landed

- **0.0.1**: scaffold. Vite + TypeScript toolchain, CI with five gating jobs (Build, Unit tests,
  Lint, Type check, Screenshot tests), the `protect-main` ruleset, and this agent harness. The
  page itself is a placeholder.

## Next

1. Walking skeleton: the theme override as pure logic plus DOM wiring, the hero section from the
   design, and the first screenshot tests with committed baselines.
2. The rest of the page from the design: screenshot filmstrip, facts grid, four project cards,
   footer, self-hosted fonts.
3. Publishing: `pages.yml` pushing `dist/` to `gh-pages`, the Pages source switched from `main` to
   `gh-pages`, CNAME `fardavide.dev`, HTTPS enforced. Needs DNS at the registrar.

## Not yet configured

- GitHub Pages currently serves the raw `main` branch, auto-enabled by the repository name. It is
  switched to `gh-pages` in the publishing step.
- `public/shots/aura-cameras-filled.png` will be a stand-in (the unfilled Aura snapshot) until the
  design's filled variant is downloaded from the design project by hand; the design tool cannot
  deliver files over 256 KiB.
