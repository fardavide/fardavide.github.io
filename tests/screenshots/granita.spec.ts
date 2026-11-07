import { expect, test } from '@playwright/test';

test('should reach setup from the Granita introduction', async ({ page }) => {
  await page.goto('/granita/');

  await expect(page.getByRole('heading', { level: 1, name: /agent|code|review/i })).toBeVisible();
  await expect(page.getByText('Granita', { exact: true }).first()).toBeVisible();

  await page.getByRole('link', { name: 'Get Granita', exact: true }).first().click();

  await expect(
    page.getByRole('heading', { level: 2, name: /get granita|download|set up/i }).first(),
  ).toBeInViewport();
});

test('should match the Granita baseline', async ({ page }) => {
  await page.goto('/granita/');
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth))
      .toBeGreaterThan(0);
  }
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });
  await expect(page).toHaveScreenshot('granita.png', { fullPage: true });
});

test('should keep the page within the viewport at phone and tablet widths', async ({ page }) => {
  for (const width of [320, 700, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/granita/');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow, `Horizontal overflow at ${width.toString()}px`).toBeLessThanOrEqual(0);
  }
});
