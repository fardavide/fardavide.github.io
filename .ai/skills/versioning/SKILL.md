---
name: versioning
description: fardavide.dev's version-bump and changelog convention - patch for fixes, minor for feature slices, major only when the user calls it; bump package.json and the README changelog together, then tag main. Use before bumping the version or opening a PR with a user-visible change.
when_to_use: >
  Consult before bumping the version or opening a PR that adds user-visible behaviour, when
  editing `version` in `package.json`, or when the user says "bump the version" or "cut a
  release". Also whenever a change lands that warrants a changelog entry.
---

# Versioning

The version lives in one place, `"version"` in `package.json`; `package-lock.json` mirrors it.
Bump with `npm version <patch|minor> --no-git-tag-version`, which updates both files. There is no
build number.

| Bump          | When                                                                 | Who initiates                 |
| ------------- | -------------------------------------------------------------------- | ----------------------------- |
| Patch `0.0.X` | Fixes, corrections, internal work with a user-visible effect         | Agent, by default             |
| Minor `0.X.0` | A feature slice lands: new user-visible capability                   | Agent, when a slice completes |
| Major `X.0.0` | A big milestone: first usable release, a redesign, a breaking rework | User only                     |

- Never initiate a major bump, and do not propose one as a matter of course.
- The walking skeleton is a patch, not a minor.
- Every bump carries its changelog entry in `README.md` under `## Changelog`, in the same PR.
  Heading `### <version> — <YYYY-MM-DD>` (em dash), newest first, one bold user-facing claim per
  bullet followed by plain-language detail. No user-visible effect means no entry and no bump.
- After the squash merge, tag `main`: `git tag v<version>` then `git push origin v<version>`.
