import test, { expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

export { test } from '@playwright/test';

export const ownExpect = expect.extend({
    async toBeLoaded(actual: { expectLoaded: (waitForLoaded: boolean, timeout?: number) => Promise<void> }, options?: { timeout?: number }) {
        const assertionName = 'toBeLoaded';
        let pass: boolean;
        let matcherResult: any;
        try {
            if (this.isNot) {
                await actual.expectLoaded(false, options?.timeout);
            } else {
                await actual.expectLoaded(true, options?.timeout);
            }
            pass = true;
        } catch (e: any) {
            matcherResult = e.matcherResult;
            pass = false;
        }

        if (this.isNot) {
            pass = !pass;
        }

        const message = pass
            ? () => this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot }) +
                '\n\n' +
                `Component` +
                `Expected: not loaded\n` +
                (matcherResult ? `Received: loaded` : '')
            : () => this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot }) +
                '\n\n' +
                `Component` +
                `Expected: loaded\n` +
                (matcherResult ? `Received: not loaded` : '');

        return {
            message,
            pass,
            name: assertionName,
            actual: matcherResult?.actual,
        };
    },
});

class SearchResultsPage {
    constructor(private page: Page) { }

    async expectLoaded(waitForLoaded: boolean = true, timeout: number = 10000) {
        await expect(this.page.locator('.header')).toBeVisible({ visible: waitForLoaded, timeout });
        // Atleast one product loaded
        await expect(this.page.locator('.product-container').first()).toBeVisible({ visible: waitForLoaded, timeout });
        // filters loaded
        await expect(this.page.locator('.product-filter')).toBeVisible({ visible: waitForLoaded, timeout });
    }
}

test('validate search results loaded', async ({ page }) => {
    // await page.goto('https://shopdemo-alex-hot.koyeb.app/shop/brand/Nizhyn');
    await page.goto('https://shopdemo-alex-hot.koyeb.app/');

    await ownExpect(new SearchResultsPage(page)).toBeLoaded();
});