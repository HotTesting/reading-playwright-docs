import test, { chromium } from "@playwright/test";

// 71% ram
test('how many RAM eats 100 browsers with google.com', async ({ }) => {
    const numberOfBrowsers = 100;
    const browsers = await Promise.all(Array.from({ length: numberOfBrowsers }, async () => {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://www.google.com');
        return browser;
    }));
    console.log(`Number of browsers: ${numberOfBrowsers}`);
})

// 56% of ram
test('how many RAM eats 100 contexts with google.com', async ({ browser }) => {
    const numberOfContexts = 100;
    const contexts = await Promise.all(Array.from({ length: numberOfContexts }, async () => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://www.google.com');
        return context;
    }));
    console.log(`Number of contexts: ${numberOfContexts}`);
})

// 62% ram
test('how many RAM eats google.com pages', async ({ context }) => {
    const numberOfPages = 100;
    const pages = await Promise.all(Array.from({ length: numberOfPages }, async () => {
        const page = await context.newPage();
        await page.goto('https://www.google.com');
        return page;
    }));
    console.log(`Number of pages: ${numberOfPages}`);
})