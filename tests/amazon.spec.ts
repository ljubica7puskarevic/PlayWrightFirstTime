import { test, expect } from '@playwright/test';
const TIMEOUT = 5000;

test('popup with default shipping country', async ({ page }) => {
  await page.goto('https://www.amazon.com/');

  // Expect a title "to contain" a substring.
 // await expect(page.getByRole('heading',{ name: 'International Shopping Transition Alert'})).toBeVisible({timeout:5000});
  await expect(page.getByText('International Shopping Transition Alert')).toBeAttached({timeout:5000});

});

test('popup with default shipping country 2', async ({ page }) => {
  await page.goto('https://www.amazon.com/');

  // Use heading locator
  //const heading = page.getByRole('heading', {
  //name: 'International Shopping Transition Alert'
  //});

  //await expect(heading).toBeAttached({ timeout: 5000 });
  await expect(page.getByText('International Shopping Transition Alert')).toBeAttached({timeout:5000});

  // Check text in the same popup
  const dialog = page.locator('[id="nav-global-location-popover-link"]');
  await expect(dialog).toContainText(/Serbia/i);
});