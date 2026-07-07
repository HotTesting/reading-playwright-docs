import { test, expect } from '@playwright/test';
import { lexpect, xlexpect } from '../util/expect';

const softExpect = expect.configure({ soft: true });

test('expect configure', async ({ }) => {
    const numbersToSum = [
        [1, 2, 3],
        [3, 4, 7],
        [5, 6, 11],
        [7, 8, 15],
        [9, 10, 19],
        [11, 12, 23],
        [13, 14, 27],
        [15, 16, 31],
        [17, 18, 35],
        [19, 20, 39],
    ]

    for (const [a, b, e] of numbersToSum) {
        const messagedExpect = softExpect.configure({ soft: true, message: `${a} + ${b} should be ${e}` });
        console.log(e);
        messagedExpect(a + b).toEqual(e);
    }
});

test('expect configure timeout', async ({ page }) => {
    await page.goto('https://shopdemo-alex-hot.koyeb.app/');

    await xlexpect(page.getByRole('link', { name: 'CHERRY TOMATOES By Nizhyn' })).toBeVisible();
    await lexpect(page.getByRole('link', { name: 'MARINATED SWEET PEPPER (SLICED) By Nizhyn' })).toBeVisible();
});

test('expect toPass', async ({ page }) => {
    let counter = 0;
    await page.route((route) => route.toString().includes('api/product/list/brand/Nizhyn'), async (route) => {
        if (counter === 3) {
            await route.fulfill({
                json: {
                    "products": [
                        {
                            "taxable": false,
                            "isActive": true,
                            "brand": {
                                "_id": "64bbbc91e9d7a367fcb1d462",
                                "name": "Nizhyn cannery"
                            },
                            "_id": "64e106888e01260021ea480c",
                            "sku": "CHERRY_TOMATOES",
                            "name": "CHERRY TOMATOES",
                            "description": "cherry tomatoes, salt, sugar, greens, acetic acid, garlic, spices",
                            "quantity": 95071,
                            "price": 95,
                            "created": "2023-08-19T18:14:32.255Z",
                            "slug": "cherry-tomatoes",
                            "__v": 0
                        },
                        {
                            "taxable": true,
                            "isActive": true,
                            "brand": {
                                "_id": "64bbbc91e9d7a367fcb1d462",
                                "name": "Nizhyn cannery"
                            },
                            "_id": "64e105d58e01260021ea480b",
                            "sku": "MARINATED_SWEET_PEPPER_SLICED",
                            "name": "MARINATED SWEET PEPPER (SLICED)",
                            "description": "sweet pepper, salt, sugar, acetic acid, garlic, spices",
                            "quantity": -10,
                            "price": 75,
                            "created": "2023-08-19T18:11:33.920Z",
                            "slug": "marinated-sweet-pepper-sliced",
                            "__v": 0
                        },
                        {
                            "taxable": true,
                            "isActive": true,
                            "brand": {
                                "_id": "64bbbc91e9d7a367fcb1d462",
                                "name": "Nizhyn cannery"
                            },
                            "_id": "64c4fdd89bb0c600219b4280",
                            "sku": "MARINATED_CUCUMBERS_NEZHIN_STYLE",
                            "name": "MARINATED CUCUMBERS NEZHIN STYLE",
                            "description": "COMPOSITION: cucumbers, greens, salt, sugar, acetic acid, garlic, spices",
                            "quantity": 998726,
                            "price": 120,
                            "created": "2023-07-29T11:54:00.642Z",
                            "slug": "MARINATED_CUCUMBERS_NEZHIN_STYLE",
                            "__v": 0
                        },
                        {
                            "taxable": true,
                            "isActive": true,
                            "brand": {
                                "_id": "64bbbc91e9d7a367fcb1d462",
                                "name": "Nizhyn cannery"
                            },
                            "_id": "64bbbc98e9d7a367fcb1d463",
                            "sku": "SWEET_PEPPER_PASTE",
                            "name": "SWEET PEPPER PASTE",
                            "description": "sweet pepper, carrot, tomato paste, sunflower oil, sugar, wheat flour, greens, spices",
                            "quantity": 999909,
                            "price": 100,
                            "created": "2023-07-22T11:25:12.046Z",
                            "slug": "SWEET_PEPPER_PASTE",
                            "__v": 0
                        }
                    ],
                    "page": 1,
                    "pages": 1,
                    "totalProducts": 4
                }
            });

        } else {
            counter++;
            await route.fulfill({
                status: 500,
                body: 'Internal Server Error'
            });
        }
    });

    await expect(async () => {
        await page.goto('https://shopdemo-alex-hot.koyeb.app/shop/brand/Nizhyn');
        await expect(page.locator('.product-container').first()).toBeVisible({ timeout: 1000 });
        await expect(page.locator('.product-container')).toHaveCount(4);
    }).toPass({ timeout: 10000, intervals: [100, 100, 100, 500, 500, 500]});
})

test('expect poll', async ({ page }) => {
    await page.goto('https://shopdemo-alex-hot.koyeb.app/product/cherry-tomatoes');
    await expect.poll(async () => {
        await page.getByPlaceholder('Product Quantity').focus();
        await page.getByPlaceholder('Product Quantity').press('ArrowUp');
        return page.getByPlaceholder('Product Quantity').inputValue();
    }).toEqual('4');
})