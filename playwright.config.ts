import { defineConfig, devices, type PlaywrightTestConfig } from '@playwright/test';

const getReportersArray = () => {
  const reporters: PlaywrightTestConfig['reporter'] = [
    ['list'],
  ];

  if (process.env.CI === 'true') { 
    reporters.push(['json'])
  }
  return reporters;
}
// reporter: getReportersArray(),

export default defineConfig({
  captureGitInfo: { commit: true, diff: true },
  testDir: './tests',
  testMatch: /.*\.test\.ts/,
  fullyParallel: true,
  forbidOnly: true,
  retries: 0,
  workers: 2,
  use: {
    headless: false,
  },
  reporter: [
    ['html', 
      {
        title: 'Hello Reading Playwright Docs guys!',
        mergeFiles: false,
        open: 'never',
      }
    ],
    ['github', { omitTags: true }]
  ],
  projects: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
