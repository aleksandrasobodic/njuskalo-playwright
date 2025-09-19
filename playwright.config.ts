import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * Uncomment if you need dotenv for environment variables.
 * import dotenv from 'dotenv';
 * import path from 'path';
 * dotenv.config({ path: path.resolve(__dirname, '.env') });
 */

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    trace: 'on-first-retry',
    headless: true,
    viewport: { width: 1366, height: 768},
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 0,
    navigationTimeout: 30000,
    /* Custom user-agent to avoid bot detection */
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    /* Custom device emulation for specific browsers */
    // ...devices['Desktop Chrome'],
    // Optional: For mobile testing, you can uncomment and use these
    // ...devices['Pixel 5'], // Example for mobile testing
    // ...devices['iPhone 12'], // Example for mobile testing
    launchOptions: {
    args: [
      '--disable-infobars',
    ],
  },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }, // Add specific browser settings if needed
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }, // Adjust for Firefox if necessary
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  /* Run your local dev server before starting the tests (if applicable) */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});