import { defineConfig } from 'vitest/config';

// The site is a GitHub user site (fardavide.github.io), so it is served from the root of the host
// whether or not the custom domain is attached. `base` therefore never needs to change.
export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    // Never inline assets as base64. The self-hosted fonts are split into small per-script
    // subsets that browsers fetch on demand through unicode-range; inlining the ones under the
    // default 4 KiB limit would bake every subset into the stylesheet for every visitor.
    assetsInlineLimit: 0,
  },
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
  },
});
