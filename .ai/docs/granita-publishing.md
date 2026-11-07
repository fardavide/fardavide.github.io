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
- Type check, lint, unit tests and formatting pass; all five CI jobs are green.
- Granita's six checks cover navigation, phone/tablet overflow and both Mac-recorded screenshot
  baselines. Images are decoded before
  capture; the screenshot suite uses reduced motion.
- The first CI run uses macOS 26 and passes the original portfolio baselines while rejecting
  Granita's macOS 27 recordings. The local Mac is macOS 27.0.1 (26A434). Verification moves to
  `xcode-27`, whose documented OS build matches, and the portfolio baselines are re-recorded
  locally on macOS 27. The rerun confirms all 16 browser checks pass on macOS 27.0.1 (26A434),
  matching the recording Mac. See `decisions.md` for measured differences. Pixel tolerance stays zero.

## Verified deployment, 2026-11-07

Granita's `gh-pages` branch contains the standalone build. Pages reports `built`, source
`gh-pages` at `/`, and custom domain `granita.fardavide.dev`. The publishing deploy key is
installed and verified; local copies of its private key have been removed.

The domain owner added the Namecheap CNAME: `granita` points to `fardavide.github.io`. Both
authoritative nameservers and Cloudflare's public resolver return the intended record. GitHub's
DNS health check reports the domain valid and eligible for HTTPS.

The custom domain was refreshed in Pages after DNS became valid, following
[GitHub's certificate-provisioning guidance](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https).
GitHub then approved the certificate for `granita.fardavide.dev`. HTTPS enforcement is enabled.
The secure root, stylesheet, icon and all four app screenshots return HTTP 200. HTTP redirects
to HTTPS, and the portfolio's `/granita/` link redirects to the secure subdomain.

Live at [granita.fardavide.dev](https://granita.fardavide.dev/). The portfolio's existing
`fardavide.dev` Pages configuration is unchanged. There is no remaining DNS or HTTPS setup.
