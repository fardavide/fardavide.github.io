import { expect, test } from '@playwright/test';

test('should apply the light theme when the URL asks for it', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/?theme=light');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(244, 244, 241)');
});

for (const colorScheme of ['dark', 'light'] as const) {
  test(`should match the ${colorScheme} baseline`, async ({ page }) => {
    await page.emulateMedia({ colorScheme });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready.then(() => undefined));
    await expect(page).toHaveScreenshot(`page-${colorScheme}.png`, { fullPage: true });
  });
}
