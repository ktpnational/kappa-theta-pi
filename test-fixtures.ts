import {
  type Page,
  type PlaywrightTestArgs,
  type PlaywrightTestOptions,
  test as base,
  expect,
} from '@playwright/test';

export * from '@playwright/test';
export { expect };

type TestExtras = object;

/**
 * Custom test configuration with extended Playwright test options.
 */
export const test = base.extend<
  PlaywrightTestArgs &
    PlaywrightTestOptions & {
      page: Page & TestExtras;
    }
>({
  /**
   * Custom page fixture to navigate to the test URL.
   *
   * @param {Object} param0 - The parameters object.
   * @param {string} param0.baseURL - The base URL for the test.
   * @param {Page} param0.page - The Playwright page object.
   * @param {Function} use - The use function to apply the fixture.
   * @param {Object} testInfo - The test information object.
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
