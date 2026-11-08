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
    [/^Granita/, '/granita/'],
    [/^Oltre/, 'https://oltre.space'],
    [/^Aura/, 'https://github.com/fardavide/Aura'],
    [/^Swiftly/, 'https://github.com/fardavide/Swiftly'],
  ];
  for (const [name, href] of cards) {
    await expect(page.getByRole('link', { name })).toHaveAttribute('href', href);
  }
});

for (const project of [
  {
    name: 'Granita',
    websiteHref: /^(\/granita\/|https:\/\/granita\.fardavide\.dev\/?)$/,
    websiteURL: /^(http:\/\/localhost:4173\/granita\/|https:\/\/granita\.fardavide\.dev\/?)$/,
    websiteRoute: 'https://granita.fardavide.dev/',
    repositoryURL: 'https://github.com/fardavide/granita',
  },
  {
    name: 'Oltre',
    websiteHref: 'https://oltre.space',
    websiteURL: 'https://oltre.space/',
    websiteRoute: 'https://oltre.space/',
    repositoryURL: 'https://github.com/fardavide/oltre',
  },
] as const) {
  test(`should offer ${project.name}’s website before its GitHub repository`, async ({
    page,
    context,
  }) => {
    await page.goto('/');
    const card = page.locator('.card').filter({
      has: page.getByRole('heading', { name: project.name, exact: true }),
    });
    const website = card.getByRole('link', { name: /website/i });
    const source = card.getByRole('link', { name: /github/i });

    await expect(website).toBeVisible();
    await expect(source).toBeVisible();
    await expect(website).toHaveAttribute('href', project.websiteHref);
    await expect(card.getByRole('link').first()).toHaveAttribute('href', project.websiteHref);
    await expect(source).toHaveAttribute('href', project.repositoryURL);

    await context.route(project.repositoryURL, async (route) => {
      await route.fulfill({
        contentType: 'text/html',
        body: `<title>${project.name} repository</title>`,
      });
    });
    await context.route(project.websiteRoute, async (route) => {
      await route.fulfill({
        contentType: 'text/html',
        body: `<title>${project.name} website</title>`,
      });
    });

    const websitePopup = page.waitForEvent('popup');
    await website.click();
    const websitePage = await websitePopup;
    await expect(websitePage).toHaveURL(project.websiteURL);
    await websitePage.close();

    const sourcePopup = page.waitForEvent('popup');
    await source.click();
    const sourcePage = await sourcePopup;
    await expect(sourcePage).toHaveURL(project.repositoryURL);
  });
}

for (const project of [
  { name: 'Aura', repositoryURL: 'https://github.com/fardavide/Aura' },
  { name: 'Swiftly', repositoryURL: 'https://github.com/fardavide/Swiftly' },
] as const) {
  test(`should offer ${project.name}’s GitHub repository as its only action`, async ({
    page,
    context,
  }) => {
    await page.goto('/');
    const card = page.locator('.card').filter({
      has: page.getByRole('heading', { name: project.name, exact: true }),
    });
    const source = card.getByRole('link', { name: /github/i });

    await expect(card.getByRole('link')).toHaveCount(1);
    await expect(source).toBeVisible();
    await expect(source).toContainText('GitHub');
    await expect(source).toHaveAttribute('href', project.repositoryURL);
    await expect(card.getByRole('link', { name: /website/i })).toHaveCount(0);

    await context.route(project.repositoryURL, async (route) => {
      await route.fulfill({
        contentType: 'text/html',
        body: `<title>${project.name} repository</title>`,
      });
    });

    const sourcePopup = page.waitForEvent('popup');
    await source.click();
    const sourcePage = await sourcePopup;
    await expect(sourcePage).toHaveURL(project.repositoryURL);
  });
}

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
