# fardavide.dev

Davide Farella's personal website: a single page presenting his work as a multi-platform
developer and AI consultant, with a filmstrip of app screenshots and a card for each of Granita,
Oltre, Aura and Swiftly. The page is implemented from a Claude Design project and published to
GitHub Pages at [fardavide.dev](https://fardavide.dev).

## Stack

- Vite + TypeScript, no framework. The page is static HTML and CSS; TypeScript handles the theme
  override only.
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

## Licence

The code is released under the MIT licence (see `LICENSE`). The text, the name and the app
screenshots are © Davide Farella and are not covered by it.

## Changelog

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
