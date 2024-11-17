import {
  type Page,
  type PlaywrightTestArgs,
  type PlaywrightTestOptions,
  test as base,
  expect,
} from '@playwright/test';

export * from '@playwright/test';
export { expect };

/**
 * Additional properties and methods that can be added to the Page object
 * for custom test functionality.
 */
type TestExtras = object;

/**
 * Extended Playwright test configuration that adds custom fixtures and options.
 *
 * This test configuration builds on top of the base Playwright test framework to provide:
 * - Custom page fixture with automatic URL navigation
 * - Extended page object with additional test utilities
 * - Type-safe access to all Playwright test features
 *
 * @example
 * ```ts
 * import { test } from './test-fixtures';
 *
 * test('my test', async ({ page }) => {
 *   // Page automatically navigates to the correct URL
 *   await expect(page).toHaveTitle('My Page');
 * });
 * ```
 */
export const test = base.extend<
  PlaywrightTestArgs &
    PlaywrightTestOptions & {
      page: Page & TestExtras;
    }
>({
  /**
   * Custom page fixture that automatically navigates to the appropriate test URL.
   *
   * This fixture extends Playwright's base page fixture to:
   * 1. Extract the test file path from the test name
   * 2. Convert it to a URL path by removing the .spec.ts extension
   * 3. Navigate to the full URL by combining baseURL with the path
   *
   * @param param0 - The fixture parameters
   * @param {string} param0.baseURL - The base URL configured in the Playwright config
   * @param {Page} param0.page - The Playwright page object to extend
   * @param {Function} use - Callback function to use the fixture
   * @param {Object} testInfo - Information about the current test
   * @param {string[]} testInfo.titlePath - Array of test title segments, where titlePath[0] is the spec file path
   *
   * @example
   * For a test file at 'tests/login.spec.ts' and baseURL 'http://localhost:3000':
   * - Extracts path 'tests/login.spec.ts'
   * - Converts to 'tests/login'
   * - Navigates to 'http://localhost:3000/tests/login'
   */
  //@ts-ignore
  page: async ({ baseURL, page }, use, testInfo) => {
    const testFilePath = testInfo.titlePath[0] || '';

    const fileName = testFilePath.replace('.spec.ts', '');

    const url = `${baseURL}${fileName}`;

    await page.goto(url);

    await use(page);
  },
});
