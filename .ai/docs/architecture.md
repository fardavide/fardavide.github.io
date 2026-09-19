# Architecture

A single static page with one layer: presentation. There is no domain or data layer because the
site holds no data. Every string on the page is authored in the markup, and the only runtime
behaviour is choosing a colour theme. This is the decided shape; `status.md` says how much of it
exists yet.

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
