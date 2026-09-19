import { defineConfig } from 'vitest/config';

// The site is a GitHub user site (fardavide.github.io), so it is served from the root of the host
// whether or not the custom domain is attached. `base` therefore never needs to change.
export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
  },
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
  },
});
