---
name: build-and-test
description: The real build, test, lint and type-check commands for fardavide.dev, and the branch, PR, green checks, squash-merge flow under the protect-main ruleset. Use before running any build or test, and before pushing, opening or merging a PR.
when_to_use: Before running a build, test, lint or type-check, and before pushing a branch, opening a PR or merging one.
user-invocable: true
---

# Build and test

All commands are npm scripts, run bare from the repository root: never `cd … &&`, never piped.

| What          | Command                                            | CI job           |
| ------------- | -------------------------------------------------- | ---------------- |
| Build `dist/` | `npm run build`                                    | Build            |
| Unit tests    | `npm test`                                         | Unit tests       |
| Lint          | `npm run lint`                                     | Lint             |
| Formatting    | `npm run format:check` (fix with `npm run format`) | Lint             |
| Types         | `npm run typecheck`                                | Type check       |
| Screenshots   | `npm run test:screenshots`                         | Screenshot tests |
| Dev server    | `npm run dev`                                      |                  |

`npm run test:screenshots` builds and serves `dist/` itself. Read the `screenshots` skill before
touching a baseline.

## Before a PR

Run all five checks locally; CI runs the same scripts. Then:

```
git switch -c <type>/<slice>
git push -u origin <type>/<slice>
gh pr create --fill
gh pr checks --watch
gh pr merge --squash
```

`main` is protected by the `protect-main` ruleset (`.github/rulesets/protect-main.json`): PR
required, all five checks required, squash only, linear history, no bypass for anyone. Do not arm
`--auto` merge; watch the checks, then merge. An out-of-date branch is rebased onto `main`, never
merged with it.

## Traps

- Playwright's Chromium is installed once per machine with `npx playwright install chromium`.
- CI sets `CI`; the Playwright config uses it to refuse `test.only` and to always start a fresh
  preview server.
