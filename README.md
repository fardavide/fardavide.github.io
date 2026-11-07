# fardavide.dev

Davide Farella's websites: the personal portfolio at [fardavide.dev](https://fardavide.dev),
and Granita's landing page. The portfolio presents his work as a multi-platform developer and AI
consultant, with a filmstrip of app screenshots and a card for each of Granita, Oltre, Aura and
Swiftly. Granita has its own page at `/granita/`, plus a standalone build prepared for
`granita.fardavide.dev`. Both sites' sources stay in this repository.

## Stack

- Vite + TypeScript, no framework. Both pages are static HTML and CSS; TypeScript handles the
  portfolio's theme override only. Granita uses a dark appearance and CSS motion.
- Vitest for unit tests, Playwright for screenshot tests.
- ESLint with type-checked typescript-eslint rules, Prettier, and `tsc --noEmit`.
- Published from the `gh-pages` branch by a GitHub Actions workflow, the same way
  [oltre.space](https://oltre.space) is.

## Develop

```sh
npm install
npm run dev
```

## Build

```sh
npm run build      # writes dist/
npm run preview    # serves dist/ locally
npm run build:granita    # writes the standalone subdomain site to dist-granita/
npm run preview:granita  # serves that site at the preview server's root
```

## Test

```sh
npm test                    # unit tests (Vitest)
npm run test:screenshots    # screenshot tests (Playwright); builds and serves dist/ first
npm run lint                # ESLint
npm run typecheck           # tsc --noEmit
npm run format:check        # Prettier
```

Screenshot baselines are recorded on a Mac with `npm run test:screenshots -- --update-snapshots`
and verified on a macOS runner in CI, so the comparison is byte-exact.

## Publish

Merging to `main` publishes. The `Publish the site` workflow (`.github/workflows/pages.yml`)
builds `dist/` and pushes it to the `gh-pages` branch, which GitHub Pages serves. There is no
manual release step; the workflow can also be dispatched by hand to republish without a change.

Granita's separate workflow publishes `dist-granita/` to the app repository's `gh-pages` branch.
It requires one-time Pages and deploy-key setup, plus the subdomain DNS record. See
[Granita publishing](.ai/docs/granita-publishing.md) for the setup and current limitations.

## Licence

The code is released under the MIT licence (see `LICENSE`). The text, the name and the app
screenshots are © Davide Farella and are not covered by it.

## Changelog

### 0.2.0 — 2026-11-07

- **Granita has its own landing page.** Real iPhone and iPad screenshots explain reading diffs,
  commenting, and copying a review back to an agent. Responsive layouts, entrance and scroll
  transitions, reduced-motion support, a Mac download, and an explicit private mobile beta.
- **The site sources stay together.** Granita has a separate subdomain build and publishing
  workflow; enabling publication requires the documented Pages, deploy-key and DNS setup.

### 0.1.1 — 2026-09-19

- **Live at fardavide.github.io.** Every merge to `main` that touches the page now publishes it.

### 0.1.0 — 2026-09-19

- **The whole page is there.** A filmstrip of seven app screenshots that slides as you scroll,
  the facts grid, cards for Granita, Oltre, Aura and Swiftly linking to each project, and the
  footer. Browsers without scroll-driven animations get a swipeable filmstrip and cards at rest
  instead of a broken layout.

### 0.0.2 — 2026-09-19

- **The hero is in place.** Name, title, introduction and the GitHub link, in dark and light,
  with the Geist fonts served from the site itself. Adding `?theme=light` or `?theme=dark` to the
  address forces a theme regardless of the system setting.

### 0.0.1 — 2026-09-19

- **Project scaffold.** Repository, toolchain and CI in place; the page itself is not published
  yet.
