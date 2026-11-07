# Granita publishing

Granita's website source stays in this repository. The standalone build is served separately
from the Granita app repository's `gh-pages` branch, at `granita.fardavide.dev`. The portfolio
continues to use its existing Pages configuration at `fardavide.dev`.

## Builds

- `npm run build` emits the portfolio and the `/granita/` page into `dist/`.
- `npm run build:granita` emits only Granita at the root of `dist-granita/`, with its own
  `CNAME` and `.nojekyll`. `npm run preview:granita` serves this output locally.
- Both builds use the same Granita HTML, CSS, fonts and images. There is no second authored copy.

## One-time setup

1. After review, create `gh-pages` in `fardavide/granita` with the standalone build. The branch
   contains generated site files only; do not alter the app's `main` branch.
2. Enable GitHub Pages for that repository with source `gh-pages`, path `/`, and custom domain
   `granita.fardavide.dev`. Set the domain on GitHub before adding DNS.
3. Generate an SSH deploy key dedicated to this workflow. Add the public key to
   `fardavide/granita` with write access and store the private key as the Actions secret
   `GRANITA_PAGES_DEPLOY_KEY` in `fardavide/fardavide.github.io`. Keep the private key out of the
   repository, command arguments, logs and chat. A deploy key is scoped to the repository, not
   the publishing branch; use branch rules to constrain it if broader write access is unwanted.
4. In Namecheap's DNS for `fardavide.dev`, add a CNAME with host `granita` and target
   `fardavide.github.io`, with the default TTL. The target is the GitHub user hostname, without
   an app repository name or URL path. Preserve the apex domain's existing records.
5. Confirm DNS resolves, request the first Pages build if needed, wait for the certificate, and
   enable HTTPS enforcement. Verify the deployed root, images, navigation and download link.

The workflow `.github/workflows/granita-pages.yml` then publishes on relevant merges to this
repository's `main`. It can also be dispatched manually. A missing branch or deploy key is a
setup failure, not a reason to publish through the portfolio's existing domain setting.

GitHub's [custom-domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
explains the Pages configuration and CNAME target.

## Verified locally, 2026-11-07

- Both production builds succeed; the standalone output includes the intended CNAME.
- Type check, lint, unit tests and formatting pass before the final documentation pass.
- Granita's six checks cover navigation, phone/tablet overflow and both Mac-recorded screenshot
  baselines. Images are decoded before
  capture; the screenshot suite uses reduced motion.
- The full suite has four existing portfolio screenshot mismatches. A control with the original
  Vite build configuration reproduces the same 805-pixel desktop dark difference. The visible
  difference is concentrated around text edges; its environmental cause is not established.
  The portfolio's source styles and screenshot baselines remain unchanged. No tolerance was added.

## Still pending

No branch push, Pages configuration, deploy-key installation or DNS change has been made in this
session. Granita's Pages API returns 404 and `granita.fardavide.dev` has no DNS answer. The website
is reviewable locally but the subdomain is not live. No Namecheap-capable plugin was found, so DNS
needs the domain owner's action or an explicitly authorized registrar browser session.
