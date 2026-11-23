# Oltre publishing

`chore/move-oltre-website` in [fardavide-website](https://github.com/fardavide/fardavide.github.io)
contains the source move for review. The new workflow builds the site from `oltre/site/`, the
latest published Android release, and the icons, screenshots, and release notes from Oltre
`main`. It records both source commits and the release tag in the run summary and uploads the
`oltre-site` artifact. Preview builds keep the full Pages tree, including `CNAME` and
`.nojekyll`.

GitHub Pages serves Oltre's `gh-pages` branch at its root, with `oltre.space` as its custom
domain and HTTPS enforced. Keep the same branch, domain, and DNS records during cutover.
[Landing page](https://oltre.space/) · [Privacy](https://oltre.space/privacy.html) ·
[Account deletion](https://oltre.space/delete-account.html)

## Prepare the Oltre relay

In the Oltre session, add a relay alongside the existing `.github/workflows/pages.yml`.
Keep the Android release workflow and its signing configuration in Oltre. The relay asks the
website repository to rebuild after a successful `Release Android` run or after changes to
app-owned inputs. A successful Android run that skips an already published version can also
dispatch. The website resolves the latest published release and skips a push when the output
matches the Pages branch.

```yaml
name: Refresh Oltre website

on:
  push:
    branches: [main]
    paths:
      - 'README.md'
      - '.github/scripts/android_release.py'
      - 'art/icon/**'
      - 'client/**/desktopTest/screenshots/**'
  workflow_run:
    workflows: ['Release Android']
    types: [completed]
  workflow_dispatch:

permissions: {}

jobs:
  refresh:
    if: >-
      github.ref == 'refs/heads/main' &&
      (github.event_name != 'workflow_run' || github.event.workflow_run.conclusion == 'success')
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
      - name: Request a website rebuild
        env:
          GH_TOKEN: ${{ secrets.OLTRE_WEBSITE_DISPATCH_TOKEN }}
        run: >
          gh api --method POST repos/fardavide/fardavide.github.io/dispatches
          -f event_type=oltre-site-refresh
```

The Android release uses Oltre's `GITHUB_TOKEN` to create the GitHub Release. The relay uses
`workflow_run` to observe the result because a `release` event raised by that token would
skip Actions. The receiving workflow runs from its own default branch and reads release
information directly from GitHub. [Workflow triggers](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow) ·
[Repository dispatch](https://docs.github.com/en/rest/repos/repos#create-a-repository-dispatch-event)

## Credentials

- In Oltre, set `OLTRE_WEBSITE_DISPATCH_TOKEN` to a fine-grained token limited to
  `fardavide/fardavide.github.io` with **Contents: Read and write**. This is the GitHub API
  permission for `repository_dispatch`.
- Add a dedicated SSH deploy key to `fardavide/oltre` with **Allow write access**. Save its
  private half as the website repository's `OLTRE_PAGES_DEPLOY_KEY` Actions secret. The
  website publisher uses the key to push the generated output to Oltre's `gh-pages` branch.
- Set the website repository variable `OLTRE_PAGES_ENABLED` to `true` only at cutover.
  The review build reads public Oltre inputs and needs neither cross-repository credential.

## Cutover

1. Review and merge the website branch with `OLTRE_PAGES_ENABLED` unset. Inspect the
   `oltre-site` artifact and compare it with the legacy build made from the same Oltre
   revision and release JSON.
2. Configure the two credentials and merge the Oltre relay. Manually run the relay from Oltre
   `main` and confirm the website workflow receives the dispatch and produces its artifact.
   The legacy publisher continues serving production during this check.
3. Record the current Oltre `gh-pages` commit. Disable the legacy **Publish the site**
   workflow and wait for its in-flight runs to finish. Set `OLTRE_PAGES_ENABLED=true` on the
   website repository and dispatch **Publish Oltre** on `main` with `publish=true`.
4. Check the publisher result, the Pages build if a push occurred, and the three public pages.
   Verify the screenshots, APK URL, and release notes against the release used by the run.
   An identical tree is a successful no-op. The first changed publish verifies the actual push
   and Pages rebuild.
5. After the new publisher and relay are verified, remove the old site source, builder, tests,
   and legacy workflow in the Oltre session. Keep `.github/scripts/android_release.py`,
   `README.md` and the asset sources. Update Oltre's website documentation to point here.

## Rollback

Unset `OLTRE_PAGES_ENABLED` and wait for any in-flight **Publish Oltre** runs to finish.
If the served files need restoring, commit the saved pre-cutover tree on top of Oltre's current
`gh-pages` and verify that Pages serves it. Re-enable and run Oltre's legacy publisher.
If its source or workflow has already been removed, revert the Oltre cleanup first. Disable the
relay while investigating. The existing Pages and DNS settings support both publishers.
