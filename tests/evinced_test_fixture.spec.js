
// import { test, expect } from "@playwright/test";

import { evincedTest as test, expect} from "../fixtures/evinced-fixture";


test.describe("Evinced test using fixture", () => {
  test("Simple test - page load and expected text", async ({ page,evinced }) => {

    await page.goto("https://a11y-audits.com/");
    const title = page.getByText("Outstanding design")
    await expect(title).toBeVisible()

  })
});

