import { expect, test } from '@playwright/test';

test('should apply the light theme when the URL asks for it', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/?theme=light');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(244, 244, 241)');
});

test('should link each project card to its home', async ({ page }) => {
  await page.goto('/');
  const cards: readonly (readonly [RegExp, string])[] = [
    [/^Granita/, 'https://github.com/fardavide/Granita'],
    [/^Oltre/, 'https://oltre.space'],
    [/^Aura/, 'https://github.com/fardavide/Aura'],
    [/^Swiftly/, 'https://github.com/fardavide/Swiftly'],
  ];
  for (const [name, href] of cards) {
    await expect(page.getByRole('link', { name })).toHaveAttribute('href', href);
  }
});

test('should show every app screenshot', async ({ page }) => {
  await page.goto('/');
  const images = page.locator('img');
  await expect(images).toHaveCount(10);
  for (const image of await images.all()) {
    await expect
      .poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth))
      .toBeGreaterThan(0);
  }
});

for (const colorScheme of ['dark', 'light'] as const) {
  test(`should match the ${colorScheme} baseline`, async ({ page }) => {
    await page.emulateMedia({ colorScheme });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready.then(() => undefined));
    await expect(page).toHaveScreenshot(`page-${colorScheme}.png`, { fullPage: true });
  });
}
