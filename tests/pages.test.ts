import { test, chromium } from '@playwright/test';

test('open new page', async ({ }) => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const pagePromise1 = context.waitForEvent('page');
    const page = await context.newPage();
    const page1 = await pagePromise1;

    const page2 = await context.newPage();
    const page3 = await context.newPage();

    console.log(await Promise.all(context.pages().map((p) => p.title())));

});

test('popup', async ({ page }) => {
    await page.goto('https://www.automationtesting.co.uk/popups.html');
    const popupPromise = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'Trigger Pop-up' }).click();
    const popup = await popupPromise;
    console.log('popup title: ' + await popup.url());
});