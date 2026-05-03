import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://miniso.com/');
  await page.getByRole('link', { name: 'Store Image' }).nth(1).click();
});