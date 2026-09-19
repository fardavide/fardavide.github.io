---
name: screenshots
description: How Playwright screenshot baselines for fardavide.dev are recorded (locally, on a Mac) and verified (CI, macos-26), and what never to do - regenerate on CI, record on Linux, or add tolerance to hide drift. Use when a screenshot test fails, a visual change is intended, or a screenshot test is added.
when_to_use: When a screenshot test fails, when a change to the page's look is intended, or when adding a screenshot test.
user-invocable: true
---

# Screenshot baselines

Tests live in `tests/screenshots/`, baselines next to them in `*-snapshots/`. Two Playwright
projects, `wide` (1440 by 900) and `narrow` (390 by 844, mobile), both Chromium, both with reduced
motion, CSS-pixel scale. The page under test is the built `dist/`.

## Record

Only on a Mac, only for a change you intend:

```
npm run test:screenshots -- --update-snapshots
```

Then look at every changed PNG in the diff before committing. A baseline is the assertion; a
re-recorded one nobody looked at asserts nothing.

## Verify

`npm run test:screenshots` locally, and the `Screenshot tests` job on CI, which runs on `macos-26`
so the render matches a Mac byte for byte. A failure uploads `playwright-report/` and
`test-results/` (expected, actual, diff) as the `playwright-report` artifact.

## Never

- Regenerate baselines on CI, or add a step that does. That turns the test into a recorder of
  whatever the code currently draws.
- Record on Linux or in Docker. The baselines are Mac renders; a Linux render is a different image.
- Add `maxDiffPixels` or `threshold` to make a red run green. If the macOS runner ever drifts from
  a local Mac, measure the drift and record the number in `decisions.md` before adding any
  tolerance.
- Bump the runner image (`macos-26`) without checking it still matches the recording machine.
