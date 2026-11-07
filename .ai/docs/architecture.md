# Architecture

Two static pages with one layer: presentation. There is no domain or data layer because the
sites hold no data. Every string is authored in markup. The portfolio's only runtime behaviour
is choosing a colour theme; Granita uses HTML navigation and CSS motion without JavaScript.
`status.md` records publication state.

## Shape

- `index.html` is the page, hand-written from the Claude Design source (see `design-source.md`).
  One document serves both the wide and the narrow layout through CSS media queries. No
  templating.
- `src/style.css` holds the design tokens as CSS custom properties (dark by default, light under
  `prefers-color-scheme: light` or an explicit theme attribute on the root element), the layout,
  and the scroll-driven animations.
- `src/theme.ts` is pure logic with no DOM access: given the page URL, decide whether a theme
  override applies. Unit-tested with Vitest.
- `src/main.ts` is the only module that touches the document: it applies the theme decision to the
  root element. Not unit-tested; covered by the screenshot tests.
- `public/shots/` holds the app screenshots the page shows, copied verbatim into `dist/`.
- `granita/index.html` is Granita's landing page, styled independently by `src/granita.css`.
  Its images live in `granita/media/` and Vite fingerprints them into the build's assets directory.
- The normal Vite build emits both documents, including `/granita/index.html`. The independent
  `vite.granita.config.ts` uses `granita/` as its root and emits only Granita to `dist-granita/`,
  with its own `CNAME` and `.nojekyll` from `granita/public/`.

## Dependency rule

Pure modules never import the DOM or Vite. `main.ts` imports pure modules, never the other way
round. With one layer there is nothing for a build to enforce, so the rule is simply: logic that
can be unit-tested lives in a module with no DOM imports. If a second layer ever appears (data
fetched at build time, say), split it into its own directory and add a dependency-cruiser rule
then, not before.

## Build and delivery

Vite builds `index.html` plus hashed assets into `dist/`. Screenshot tests run against `dist/`
served by `vite preview`, so what is asserted is what is published. Publishing pushes `dist/` to
the `gh-pages` branch, which GitHub Pages serves under the custom domain (see `decisions.md`).
Granita's standalone output goes to the Granita app repository's `gh-pages` branch through
`.github/workflows/granita-pages.yml`, using a deploy key scoped to that repository. Source and
review remain here. [Granita publishing](granita-publishing.md) describes the one-time setup.
