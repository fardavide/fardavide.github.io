# fardavide.dev

Davide Farella's personal portfolio and the websites for Granita, Oltre, and Aura.

## Stack

- Vite builds the portfolio, Granita, and Aura. They use static HTML and CSS, with TypeScript
  for the portfolio's theme override.
- Oltre's Python builder renders the landing page from a published Android release and app
  assets, and copies the privacy and account-deletion pages verbatim.
- Vitest for unit tests, Playwright for screenshot tests.
- ESLint with type-checked typescript-eslint rules, Prettier, and `tsc --noEmit`.
- GitHub Actions builds the sites, and GitHub Pages serves the generated branches.

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

Oltre builds separately to `dist-oltre/`. Use a checkout of Oltre's `origin/main` for the
screenshots, icons, and changelog. Use Python 3.14 and an authenticated GitHub CLI.

```sh
gh release view --repo fardavide/oltre --json tagName,publishedAt,url,assets > /tmp/oltre-release.json
npm run build:oltre -- --app-root ../Oltre --release /tmp/oltre-release.json --out dist-oltre
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

Install pytest in your Python environment and run
`npm run test:oltre -- --app-root ../Oltre` to check the Oltre builder and its app inputs.

## Publish

### Portfolio

The portfolio lives in `index.html`, `src/`, and `public/`.
[Publish the site](.github/workflows/pages.yml) builds `dist/` on relevant pushes to `main`
or manual dispatch and pushes it to this repository's `gh-pages`.
[fardavide.dev](https://fardavide.dev/) · [GitHub Pages redirect](https://fardavide.github.io/)

### Aura

Aura's support and privacy pages live in `public/aura/` and publish with the portfolio.
[Support](https://fardavide.dev/aura/support.html) · [Privacy](https://fardavide.dev/aura/privacy.html)

### Granita

Granita's landing, support, and privacy pages live in `granita/` and use `src/granita.css` for
the landing page. [Publish Granita](.github/workflows/granita-pages.yml) builds `dist-granita/`
on relevant pushes to `main` or manual dispatch and pushes it to
[Granita's `gh-pages`](https://github.com/fardavide/granita/tree/gh-pages). See
[Granita publishing](.ai/docs/granita-publishing.md) for the Pages setup.
[Landing page](https://granita.fardavide.dev/) · [Support](https://granita.fardavide.dev/support/) ·
[Privacy](https://granita.fardavide.dev/privacy/)

### Oltre

Oltre's landing, privacy, and account-deletion pages and their builder live in `oltre/`.
[Publish Oltre](.github/workflows/oltre-pages.yml) builds on relevant pushes to `main`, manual
dispatch, and `oltre-site-refresh` events from the app repository. After cutover it pushes
`dist-oltre/` to [Oltre's `gh-pages`](https://github.com/fardavide/oltre/tree/gh-pages).
See [Oltre publishing](.ai/docs/oltre-publishing.md) for the review build, release relay, and cutover.
[Landing page](https://oltre.space/) · [Privacy](https://oltre.space/privacy.html) ·
[Account deletion](https://oltre.space/delete-account.html)

## Licence

The portfolio, Granita, and Aura website code is released under the MIT licence (see `LICENSE`).
The text, the name and the app screenshots are © Davide Farella. The imported Oltre files retain
their original terms.

## Changelog

### 0.2.6 — 2026-11-19

- **Share Granita with its Mac and iPhone cover.** Link previews use the approved light/dark presentation artwork and explain standalone Mac review with optional iPhone and iPad companions.

### 0.2.5 — 2026-11-19

- **Review on your Mac or away from your desk.** The download section explains local and remote review, with the required Mac companion mentioned below the iPhone and iPad download.

### 0.2.4 — 2026-11-19

- **Get Granita on iPhone and iPad.** The download section links to the App Store alongside the Mac download on GitHub. A Mac App Store release is coming soon.

### 0.2.3 — 2026-11-17

- **Granita support and privacy.** Find help with pairing and read how review comments sync to your Mac.

### 0.2.2 — 2026-11-16

- **Aura support and privacy.** Added setup and support information and published Aura’s privacy policy.

### 0.2.1 — 2026-11-08

- **Project links are easy to find.** Granita and Oltre lead with a website action and a secondary
  GitHub link. Aura and Swiftly have a single GitHub action. Granita’s own page exposes GitHub in
  the top navigation on desktop and mobile.

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
