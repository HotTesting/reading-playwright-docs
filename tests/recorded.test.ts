import { test, expect } from '@playwright/test';

const testData = [
  'CHERRY TOMATOES',
  'MARINATED SWEET PEPPER (SLICED)'
]

for (const product of testData) {
  test(`${product} is visible`, async ({ page }) => {
    await page.goto('https://shopdemo-alex-hot.koyeb.app/');
    await page.getByRole('link', { name: 'Brands ' }).click();
    await page.getByRole('menuitem', { name: 'Nizhyn cannery' }).click();
    await expect(page.getByRole('link', { name: `${product} By Nizhyn` })).toBeVisible();
  });
}

test('filtering locator', async ({ page }) => {
  const product = 'Playwright';
  await page.locator(`article:has-text("${product}")`).click();
  // SAME AS:

  const hasText = 'Playwright';
  await page.locator('article').filter({ hasText }).click();


  await page.locator('button:visible').click();
  // SAME AS:
  await page.locator('button').filter({visible: true}).click();


  await page.locator('button:has-text("Log in"), button:has-text("Sign in")').click();
  // SAME AS:
  await page.locator('button').filter({hasText: 'Log in'})
    .and(
      page.locator('button').filter({hasText: 'Sign in'})
    )
    .click();


  await page.locator('button').locator('nth=0').click();
  // SAME AS:
  await page.locator('button').last().click();
})
