import test, { Page } from "@playwright/test";

test.use({
    headless: true,
})


for (let i = 1; i <= 10; i++) {
    test(`${i}`, async ({ page }) => {
        console.log('Browser in this test has ' + page.context().browser()!.contexts().length + ' contexts');
        // @ts-expect-error - we know that browser has _guid property
        console.log('Browser guid is: ' + page.context().browser()!['_guid']);
        // @ts-expect-error - we know that context has _guid property
        console.log('Context guid is: ' + page.context()!['_guid']);
        // @ts-expect-error - we know that page has _guid property
        console.log('Page guid is: ' + page['_guid']);
        console.log('This test uses worker ' + test.info().workerIndex + ' and parallel index ' + test.info().parallelIndex);
    })
}