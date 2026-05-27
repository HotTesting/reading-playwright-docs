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
