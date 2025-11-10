import { test as base, expect } from '@playwright/test';
import { EvincedSDK } from '@evinced/js-playwright-sdk';

export const evincedTest = base.extend({
  evinced: async ({ page }, use) => {
    const evinced = new EvincedSDK(page);

    // Start scanning automatically for each test
    await evinced.evStart({ enableScreenshots: true });

    await use(evinced);

    // Run analysis at the end of the test
    const results = await evinced.evAnalyze();
    if (results && results.length) {
      console.warn(`⚠️ Accessibility issues found: ${results.length}`);
    }

    await evinced.evStop();
  },
});

export { expect };
