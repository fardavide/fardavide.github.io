import { defineConfig } from 'vite';

// The same page is previewed at /granita/ in the portfolio and published at the subdomain root.
export default defineConfig({
  root: 'granita',
  base: '/',
  build: {
    outDir: '../dist-granita',
    emptyOutDir: true,
    assetsInlineLimit: 0,
  },
});
