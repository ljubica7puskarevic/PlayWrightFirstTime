import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('test', async ({ page }) => {
  await page.goto('https://www.miniso.com/');
  await page.getByRole('link', { name: 'Stores' }).first().click();
  // await expect(page.getByText('Store Image').nth(5)).toBeVisible();
  // const parent = page
  // .locator('div')
  // .filter({ hasText: 'Store Image Asia North' })
  // .first();

  // await expect(parent.getByText('Store Image')).toBeVisible();

  const storeSection = page.locator('div.store').first();
  await expect(storeSection.getByText('Store Image')).toBeVisible();
});