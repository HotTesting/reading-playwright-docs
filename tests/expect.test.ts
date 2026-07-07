import path from 'path';
import { test, expect } from '@playwright/test';

const expectPageUrl = `file://${path.resolve(__dirname, '../resourses/expect.html')}`;

test('expect', async ({ page }) => {
    await page.goto(expectPageUrl);

    // TEXTS
    // ⚠️ Element contains text
    await expect(page.getByTestId('contain-text'), 'My custom error message!').toContainText('Playwright');

    // ⚠️ Element matches text
    await expect(page.getByTestId('exact-text')).toHaveText('Exact Title');

    // ⚠️ Input has a value
    await expect(page.getByTestId('input-value')).toHaveValue('hello');

    console.log(test.info().errors);

    // ELEMENT STATE
    // ⚠️ Element is visible
    await expect(page.getByTestId('visible')).toBeVisible();

    // Element is not visible
    await expect(page.getByTestId('hidden')).toBeHidden();

    // ⚠️ Element has a DOM attribute
    await expect(page.getByTestId('with-attr')).toHaveAttribute('href', 'https://example.com');

    // Element has an ID
    await expect(page.getByTestId('styled')).toHaveId('styled');
    await expect(page.getByTestId('styled')).toHaveAttribute('id', 'styled');
    await expect(page.locator('#styled')).toBeVisible();

    // ⚠️ List has exact number of children
    await expect(page.getByTestId('list').locator('li')).toHaveCount(3);

    // Element is attached - avoid using this, use the visible state instead
    await expect(page.locator('meta[charset="UTF-8"]')).toBeAttached();

    // ⚠️ Checkbox is checked
    await expect(page.getByTestId('checked')).toBeChecked();

    // ⚠️ Select has options selected
    await expect(page.getByTestId('multi-select')).toHaveValues(['a', 'b']);

    // ⚠️ Element is enabled
    await expect(page.getByTestId('enabled')).toBeEnabled();

    // ⚠️ Element is disabled
    await expect(page.getByTestId('disabled')).toBeDisabled();

    // Element is editable
    await expect(page.getByTestId('editable')).toBeEditable();

    // Container is empty
    await expect(page.getByTestId('empty')).toBeEmpty();

    // Element is focused
    await page.getByTestId('focus-target').focus();
    await expect(page.getByTestId('focus-target')).toBeFocused();

    // Element intersects viewport
    await expect(page.getByTestId('in-viewport')).toBeInViewport();

    // Element has specified CSS classes
    await expect(page.getByTestId('with-classes')).toContainClass('highlight');

    // Element has specified CSS class property
    await expect(page.getByTestId('with-classes')).toHaveClass(/highlight/);

    // Element has CSS property
    await expect(page.getByTestId('styled')).toHaveCSS('color', 'rgb(255, 0, 0)');

    // Element has a JavaScript property
    await expect(page.getByTestId('checked')).toHaveJSProperty('checked', true);

    // Accessibility

    // Element has a matching accessible description
    await expect(page.getByTestId('with-description')).toHaveAccessibleDescription('Saves your changes');

    // Element has a matching accessible name
    await expect(page.getByTestId('with-name')).toHaveAccessibleName('Company logo');

    // Element has a specific ARIA role
    await expect(page.getByTestId('navigation')).toHaveRole('navigation');

    // Element matches the Aria snapshot
    await expect(page.getByTestId('aria-snapshot')).toMatchAriaSnapshot(`
            - region "User profile":
              - heading "John Doe" [level=3]
              - paragraph: Developer
          `);

    // Page matches the Aria snapshot
    await expect(page).toMatchAriaSnapshot(`
            - heading "Expect Examples" [level=1]
            - text: Attached element
            - checkbox "Checked checkbox" [checked]
            - text: Checked checkbox
            - button "Disabled button" [disabled]
            - textbox: editable
            - button "Enabled button"
            - textbox
            - text: In viewport
            - paragraph: Visible paragraph
            - text: Hello Playwright World Styled box
            - button "Save"
            - img "Company logo"
            - link "Example link":
              - /url: https://example.com
            - list:
              - listitem: One
              - listitem: Two
              - listitem: Three
            - text: Red text
            - navigation: Main navigation
            - text: Box
            - heading "Exact Title" [level=2]
            - textbox: hello
            - listbox:
              - option "A" [selected]
              - option "B" [selected]
              - option "C"
            - region "User profile":
              - heading "John Doe" [level=3]
              - paragraph: Developer
            - text: Below viewport
          `);

    // Screenshots

    // Element has a screenshot
    await expect(page.getByTestId('screenshot-box')).toHaveScreenshot('screenshot-box.png');

    // Page has a screenshot
    // await expect(page).toHaveScreenshot('page.png');

    // Tab level expectations

    // ⚠️ Page has a title
    await expect(page).toHaveTitle('Expect Examples');

    // ⚠️ Page has a URL
    await expect(page).toHaveURL(/expect\.html$/);
});
