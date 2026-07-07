import { test, expect } from '@playwright/test';
import { TestFiles } from '../resourses/files';

test('upload file', async ({ page }) => {
    // Simple
    await page.goto('https://the-internet.herokuapp.com/upload');
    const fileUpload = page.locator('#file-upload');
    await fileUpload.setInputFiles(TestFiles.jpg.absolutePath());
    await page.locator('#file-submit').click();

    // Upload buffer from memory
    await page.goto('https://the-internet.herokuapp.com/upload');
    await fileUpload.setInputFiles({
        name: 'file.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from('this is test')
    });
    await page.locator('#file-submit').click();

    // Start waiting for file chooser before clicking. Note no await.
    await page.goto('https://the-internet.herokuapp.com/upload');
    const fileChooserPromise = page.waitForEvent('filechooser');
    await fileUpload.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(TestFiles.txt.absolutePath());
    await page.locator('#file-submit').click();
    console.log('File uploaded');

    // Drag and drop file
    await page.goto('https://the-internet.herokuapp.com/upload');
    await page.locator('#drag-drop-upload').drop({
        files: TestFiles.txt.absolutePath(),
    });

    // drag and drop data from memory - will not pass
    await page.locator('#drag-drop-upload').drop({
        data: {
            'text/plain': 'hello world',
            'text/uri-list': 'https://example.com',
        },
    });
});