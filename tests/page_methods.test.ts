// Methods
// addInitScript
// - addLocatorHandler
// addScriptTag
// addStyleTag
// ariaSnapshot
// bringToFront
// - cancelPickLocator
// clearConsoleMessages
// clearPageErrors
// close
// consoleMessages
// content
// - context
// - dragAndDrop
// emulateMedia
// evaluate
// evaluateHandle
// - exposeBinding
// - exposeFunction
// frame
// frameLocator
// frames
// - getByAltText
// - getByLabel
// - getByPlaceholder
// - getByRole
// - getByTestId
// - getByText
// - getByTitle
// goBack
// goForward
// - goto
// - hideHighlight
// isClosed
// locator
// mainFrame
// opener
// pageErrors
// - pause
// pdf
// - pickLocator
// reload
// - removeAllListeners
// - removeLocatorHandler
// - requestGC
// - requests
// - route
// - routeFromHAR
// - routeWebSocket
// screenshot
// setContent
// setDefaultNavigationTimeout
// setDefaultTimeout
// setExtraHTTPHeaders
// setViewportSize
// title
// - unroute
// - unrouteAll
// url
// video
// viewportSize
// waitForEvent
// waitForFunction
// waitForLoadState
// waitForRequest
// waitForResponse
// waitForURL
// workers

import { test, expect } from '@playwright/test';

const SHOP_URL = 'https://shopdemo-alex-hot.koyeb.app/shop/brand/Nizhyn';

async function waitForProducts(page: import('@playwright/test').Page) {
    await page.waitForFunction(() => document.body.innerText.includes('CHERRY TOMATOES'));
}

// evaluate — виконує JavaScript у контексті сторінки і повертає результат
test('evaluate', async ({ page }) => {
    await page.goto(SHOP_URL);
    await waitForProducts(page);

    const productCount = await page.evaluate(() => document.querySelectorAll('main h1').length);
    expect(productCount).toBeGreaterThanOrEqual(4);
});

// 1 addInitScript — виконує JS до завантаження сторінки (наприклад, підготовка localStorage або глобальних змінних)
test('addInitScript', async ({ page }) => {
    await page.addInitScript(() => {
        window.localStorage.setItem('cart_items', '[{"taxable":false,"isActive":true,"brand":{"isActive":true,"_id":"64bbbc91e9d7a367fcb1d462","name":"Nizhyn cannery","slug":"Nizhyn"},"_id":"64e106888e01260021ea480c","sku":"CHERRY_TOMATOES","name":"CHERRY TOMATOES","description":"cherry tomatoes, salt, sugar, greens, acetic acid, garlic, spices","quantity":1,"price":95,"created":"2023-08-19T18:14:32.255Z","slug":"cherry-tomatoes","__v":0,"inventory":95014,"totalPrice":95}]');
        window.localStorage.setItem('cart_total', '95');
    });
    await page.goto(SHOP_URL);
    await page.getByRole('button', { name: 'your cart have 1 items' }).click();
    await expect(await page.locator('.cart-list').getByRole('heading', { level: 2, name: 'CHERRY TOMATOES' })).toBeVisible();
    await page.goto(SHOP_URL);
    console.log('breakpoint')
});

// 1 addScriptTag — додає <script> на сторінку (inline-код або URL зовнішнього файлу)
test('addScriptTag', async ({ page }) => {
    await page.goto(SHOP_URL);

    await page.addScriptTag({
        content: `document.body.setAttribute('data-script-demo', 'ready');`,
    });

    const flag = await page.evaluate(() => document.body.getAttribute('data-script-demo'));
    expect(flag).toBe('ready');
});

// 1 addStyleTag — додає <style> на сторінку, щоб змінити зовнішній вигляд без зміни HTML
test('addStyleTag', async ({ page }) => {
    await page.goto(SHOP_URL);

    await page.addStyleTag({
        content: 'body { background-color: rgb(255, 0, 0) !important; }',
    });

    const background = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(background).toBe('rgb(255, 0, 0)'); // red
});

// 1 ariaSnapshot — повертає текстовий знімок доступності (ARIA-дерево) для дебагу та snapshot-тестів
test('ariaSnapshot', async ({ page }) => {
    await page.goto(SHOP_URL);
    await waitForProducts(page);

    const snapshot = await page.locator('main').ariaSnapshot();
    expect(snapshot).toContain('CHERRY TOMATOES');
    expect(snapshot).toContain('Price');
});

// 1 bringToFront — активує вкладку, коли відкрито кілька Page в одному BrowserContext
test('bringToFront', async ({ context }) => {
    const catalogPage = await context.newPage();
    const homePage = await context.newPage();

    await catalogPage.goto(SHOP_URL);
    await homePage.goto('https://shopdemo-alex-hot.koyeb.app/');

    await catalogPage.bringToFront();
    expect(catalogPage.url()).toContain('Nizhyn');
});

// 1 clearConsoleMessages — очищає буфер consoleMessages()
test('clearConsoleMessages', async ({ page }) => {
    await page.goto(SHOP_URL);

    await page.evaluate(() => console.log('demo message'));
    expect((await page.consoleMessages()).length).toBeGreaterThan(0);

    await page.clearConsoleMessages();
    expect(await page.consoleMessages()).toHaveLength(0);
});

// 1 clearPageErrors — очищає буфер pageErrors()
test('clearPageErrors', async ({ page }) => {
    await page.goto(SHOP_URL);

    await page.evaluate(() => {
        setTimeout(() => {
            throw new Error('demo page error');
        }, 0);
    });
    await expect.poll(async () => (await page.pageErrors()).length).toBeGreaterThan(0);

    expect((await page.pageErrors()).length).toBeGreaterThan(0);

    await page.clearPageErrors();
    expect(await page.pageErrors()).toHaveLength(0);
});

// 1 close — закриває вкладку; після цього isClosed() поверне true
test('close', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(SHOP_URL);

    expect(page.isClosed()).toBe(false);
    await page.close();
    expect(page.isClosed()).toBe(true);

    await context.close();
});

// 1 consoleMessages — повертає повідомлення з console.log / warn / error сторінки
test('consoleMessages', async ({ page }) => {
    await page.goto(SHOP_URL);

    await page.evaluate(() => console.log('Nizhyn products loaded'));
    const messages = await page.consoleMessages();

    expect(messages.some((msg) => msg.text().includes('Nizhyn products loaded'))).toBe(true);
});

// 1 content — повертає повний HTML-код поточної сторінки
test('content', async ({ page }) => {
    await page.goto(SHOP_URL);
    await waitForProducts(page);

    const html = await page.content();
    expect(html).toContain('CHERRY TOMATOES');
    expect(html.toLowerCase()).toContain('<html');
});

// emulateMedia — імітує тип медіа (dark/light) або режим print/screen
test('emulateMedia', async ({ page }) => {
    await page.goto(SHOP_URL);

    await page.emulateMedia({ colorScheme: 'dark' });
    const colorScheme = await page.evaluate(() => matchMedia('(prefers-color-scheme: dark)').matches);
    expect(colorScheme).toBe(true);
});

// evaluateHandle — як evaluate, але повертає JSHandle (посилання на об'єкт у браузері)
test('evaluateHandle', async ({ page }) => {
    await page.goto(SHOP_URL);
    await waitForProducts(page);

    const headingHandle = await page.evaluateHandle(() => document.querySelector('main h1'));
    const text = await headingHandle.evaluate((el) => el?.textContent?.trim() ?? '');
    expect(text).toContain('CHERRY TOMATOES');
});

// frame — знаходить Frame за name або url (корисно для iframe)
test('frame', async ({ page }) => {
    await page.setContent(`
        <iframe id="catalog" title="Nizhyn catalog"
          srcdoc="<main><h1>CHERRY TOMATOES</h1><p>By Nizhyn cannery</p></main>">
        </iframe>
    `);

    const shopFrame = page.frame({ url: /srcdoc/ });
    expect(shopFrame).not.toBeNull();
    await expect(shopFrame!.locator('h1')).toContainText('CHERRY TOMATOES');
});

// frameLocator — створює локатор всередині iframe (зручніше за frame для дій)
test('frameLocator', async ({ page }) => {
    await page.setContent(`
        <iframe id="catalog"
          srcdoc="<main><h1>CHERRY TOMATOES</h1><p>By Nizhyn cannery</p></main>">
        </iframe>
    `);

    const productTitle = page.frameLocator('#catalog').locator('h1');
    await expect(productTitle).toContainText('CHERRY TOMATOES');
});

// frames — повертає масив усіх фреймів на сторінці (main + iframe)
test('frames', async ({ page }) => {
    await page.setContent(`
        <iframe srcdoc="<main><h1>SWEET PEPPER PASTE</h1></main>"></iframe>
    `);

    await expect.poll(() => page.frames().length).toBeGreaterThanOrEqual(2);
    expect(page.frames().some((frame) => frame.url().includes('srcdoc'))).toBe(true);
});

// 1 goBack — повертається на попередню сторінку в історії браузера
test('goBack', async ({ page }) => {
    await page.goto('https://shopdemo-alex-hot.koyeb.app/');
    await page.goto(SHOP_URL);

    await page.goBack();
    await expect(page).toHaveURL(/shopdemo-alex-hot\.koyeb\.app\/?$/);
});

// 1 goForward — переходить вперед після goBack
test('goForward', async ({ page }) => {
    await page.goto('https://shopdemo-alex-hot.koyeb.app/');
    await page.goto(SHOP_URL);
    await page.goBack();

    await page.goForward();
    await expect(page).toHaveURL(/brand\/Nizhyn/);
});

// isClosed — перевіряє, чи вкладка вже закрита
test('isClosed', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    expect(page.isClosed()).toBe(false);
    await page.close();
    expect(page.isClosed()).toBe(true);

    await context.close();
});

// locator — створює локатор за CSS, XPath або іншим селектором
test('locator', async ({ page }) => {
    await page.goto(SHOP_URL);
    await waitForProducts(page);

    const firstProduct = page.locator('main h1').first();
    await expect(firstProduct).toHaveText(/CHERRY TOMATOES/);
});

// mainFrame — повертає головний фрейм сторінки
test('mainFrame', async ({ page }) => {
    await page.goto(SHOP_URL);

    const main = page.mainFrame();
    expect(main.url()).toContain('Nizhyn');
    await expect(main.locator('h1').first()).toBeVisible();
});

// opener — повертає Page, яка відкрила поточну вкладку (popup / new tab)
test('opener', async ({ page }) => {
    await page.goto(SHOP_URL);

    const [productPage] = await Promise.all([
        page.waitForEvent('popup'),
        page.evaluate(() => window.open('/product/cherry-tomatoes', 'product')),
    ]);

    expect(await productPage.opener()).toBe(page);
    await productPage.close();
});

// pageErrors — збирає необроблені помилки JavaScript на сторінці
test('pageErrors', async ({ page }) => {
    await page.goto(SHOP_URL);

    await page.evaluate(() => {
        setTimeout(() => {
            throw new Error('Broken product card script');
        }, 0);
    });
    await expect.poll(async () => (await page.pageErrors()).length).toBeGreaterThan(0);

    const errors = await page.pageErrors();
    expect(errors.some((err) => err.message.includes('Broken product card script'))).toBe(true);
});

// pdf — зберігає сторінку у PDF (працює лише в headless Chromium)
test('pdf', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(SHOP_URL);

    const pdfBuffer = await page.pdf({ format: 'A4' });
    expect(pdfBuffer.subarray(0, 4).toString()).toBe('%PDF');

    await context.close();
});

// 1 reload — перезавантажує поточну сторінку
test('reload', async ({ page }) => {
    await page.goto(SHOP_URL);
    await waitForProducts(page);

    await page.reload();
    await waitForProducts(page);
    await expect(page.locator('main h1').first()).toContainText('CHERRY TOMATOES');
});

// 1 screenshot — робить знімок екрана сторінки або елемента
test('screenshot', async ({ page }) => {
    await page.goto(SHOP_URL);

    const screenshot = await page.screenshot();
    expect(screenshot.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a'); // PNG signature
});

// 1 setContent — підставляє власний HTML замість поточного вмісту
test('setContent', async ({ page }) => {
    await page.setContent(`
        <main>
            <h1>Nizhyn Demo Shelf</h1>
            <p>Міні-вітрина для заняття з Playwright</p>
        </main>
    `);

    await expect(page.locator('h1')).toHaveText('Nizhyn Demo Shelf');
});

// 1 setDefaultNavigationTimeout — задає timeout для goto / goBack / reload
test('setDefaultNavigationTimeout', async ({ page }) => {
    page.setDefaultNavigationTimeout(60_000);
    await page.goto(SHOP_URL);
    expect(page.url()).toContain('Nizhyn');
});

// 1 setDefaultTimeout — задає timeout для click, expect, waitFor* за замовчуванням
test('setDefaultTimeout', async ({ page }) => {
    page.setDefaultTimeout(10_000);
    await page.goto(SHOP_URL);
    await expect(page.locator('h1').first()).toBeVisible();
});

// 1 setExtraHTTPHeaders — додає HTTP-заголовки до кожного запиту сторінки
test('setExtraHTTPHeaders', async ({ page }) => {
    await page.setExtraHTTPHeaders({ 'x-student-demo': 'nizhyn-lesson' });

    const requestPromise = page.waitForRequest((req) => req.url().includes('shopdemo-alex-hot.koyeb.app'));
    await page.goto(SHOP_URL);
    const request = await requestPromise;

    expect(request.headers()['x-student-demo']).toBe('nizhyn-lesson');
});

// 1 setViewportSize — змінює розмір вікна браузера (desktop / tablet / mobile)
test('setViewportSize', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(SHOP_URL);

    expect(page.viewportSize()).toEqual({ width: 390, height: 844 });
});

// 1 title — повертає текст із <title>
test('title', async ({ page }) => {
    await page.goto(SHOP_URL);
    await expect(page).toHaveTitle(/MERN Store/);
});

// 1 url — повертає поточну адресу сторінки
test('url', async ({ page }) => {
    await page.goto(SHOP_URL);
    expect(page).toHaveURL('/shop/brand/Nizhyn');
});

// video — повертає об'єкт Video, якщо у context увімкнено recordVideo
test('video', async ({ browser }) => {
    const context = await browser.newContext({
        recordVideo: { dir: 'test-results/videos' },
    });
    const page = await context.newPage();
    await page.goto(SHOP_URL);
    await page.close();

    const video = page.video();
    expect(video).not.toBeNull();
    const path = await video!.path();
    expect(path).toMatch(/\.webm$/);

    await context.close();
});

// 1 viewportSize — повертає поточний розмір viewport
test('viewportSize', async ({ page }) => {
    await page.goto(SHOP_URL);

    const size = page.viewportSize();
    expect(size?.width).toBeGreaterThan(0);
    expect(size?.height).toBeGreaterThan(0);
});

// 1 waitForEvent — чекає на подію Page (popup, close, console тощо)
test('waitForEvent', async ({ page, context }) => {
    await page.goto(SHOP_URL);

    const popupPromise = 
    await page.locator('a[href="/product/cherry-tomatoes"]').click({ modifiers: ['Meta'] });
    const popup = await popupPromise;

    expect(popup.url()).toContain('cherry-tomatoes');
    await popup.close();
});

// 1 waitForFunction — чекає, поки JS-функція в браузері поверне true
test('waitForFunction', async ({ page }) => {
    await page.goto(SHOP_URL);

    await page.waitForFunction(() => document.querySelectorAll('main h1').length >= 4);
    const count = await page.evaluate(() => document.querySelectorAll('main h1').length);
    expect(count).toBeGreaterThanOrEqual(4);
});

// 1 waitForLoadState — чекає стан завантаження: load | domcontentloaded | networkidle
test('waitForLoadState', async ({ page }) => {
    await page.goto(SHOP_URL);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1').first()).toBeVisible();
});

// 1 waitForRequest — чекає конкретний HTTP-запит
test('waitForRequest', async ({ page }) => {
    const requestPromise = page.waitForRequest(/shopdemo-alex-hot\.koyeb\.app/);
    await page.goto(SHOP_URL);
    const request = await requestPromise;

    expect(request.url()).toContain('shopdemo-alex-hot.koyeb.app');
});

// 1 waitForResponse — чекає HTTP-відповідь (наприклад, API з товарами)
test('waitForResponse', async ({ page }) => {
    const responsePromise = page.waitForResponse((res) =>
        res.url().includes('shopdemo-alex-hot.koyeb.app') && res.status() === 200,
    );
    await page.goto(SHOP_URL);
    const response = await responsePromise;

    expect(response.ok()).toBe(true);
});

// 1 waitForURL — чекає, поки адреса сторінки відповідатиме патерну
test('waitForURL', async ({ page }) => {
    await page.goto('https://shopdemo-alex-hot.koyeb.app/');
    await page.locator('a[href="/shop"]').click();

    await page.waitForURL(/\/shop/);
    expect(page.url()).toContain('/shop');
});

// 1 workers — повертає Service Workers, зареєстровані на сторінці (на demo-shop їх зазвичай немає)
test('workers', async ({ page }) => {
    await page.goto(SHOP_URL);
    expect(Array.isArray(page.workers())).toBe(true);
});
