import { expect, test } from "@playwright/test";

test('simple key presses', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/key_presses');
    await page.locator('#target').press('Shift');
    await expect(page.locator('#result')).toHaveText('You entered: A');
});


test('driving car', async ({ page }) => {
    test.setTimeout(120000);
    
    await page.goto('https://www.crazygames.com/game/deadly-descent-bzs');
    await page.waitForTimeout(10000);

    const ingame = await page.frameLocator('#game-iframe').frameLocator('#game-iframe');

    await page.keyboard.down('ArrowUp');
    await page.waitForTimeout(10000)

    await page.keyboard.down('ArrowLeft')
    await page.waitForTimeout(10000)
    
});
