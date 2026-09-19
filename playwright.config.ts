import { defineConfig } from '@playwright/test';

const port = '4173';
const isCi = process.env.CI !== undefined;

// Screenshot tests run against the built site (`dist/`), not the dev server: what is asserted is
// what gets published. Baselines are recorded on a Mac and verified on a macOS runner, so the
// comparison is byte-exact and needs no tolerance; see .claude/docs/decisions.md.
export default defineConfig({
  testDir: 'tests/screenshots',
  fullyParallel: true,
  forbidOnly: isCi,
  retries: 0,
  reporter: isCi ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://localhost:${port}`,
    browserName: 'chromium',
    reducedMotion: 'reduce',
    trace: 'retain-on-failure',
  },
  expect: {
    toHaveScreenshot: {
      animations: 'disabled',
      scale: 'css',
      // Byte-exact: no per-pixel colour tolerance and no allowance for differing pixels. The
      // baselines are Mac renders verified on a Mac, so any difference is a real change.
      threshold: 0,
      maxDiffPixels: 0,
    },
  },
  webServer: {
    command: `vite build && vite preview --port ${port} --strictPort`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !isCi,
    timeout: 120_000,
  },
  projects: [
    {
      name: 'wide',
      use: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
    },
    {
      name: 'narrow',
      use: {
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 1,
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
});
