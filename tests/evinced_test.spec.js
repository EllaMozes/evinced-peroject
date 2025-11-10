
import { test, expect } from "@playwright/test";
import { existsSync } from "node:fs";
import { EvincedSDK } from "@evinced/js-playwright-sdk";

test.describe("Evinced test", () => {
  test("Simple test - page load and expected text", async ({ page }) => {
    const evReport = "./test-results/page-load.html";
    const evincedService = new EvincedSDK(page);

    await page.goto("https://a11y-audits.com/");
    const title = page.getByText("Outstanding design")
    await expect(title).toBeVisible()

    const issues = await evincedService.evAnalyze({
      enableScreenshots: true
    }
    );

    await evincedService.evSaveFile(issues, "html", evReport);
    expect(existsSync(evReport)).toBeTruthy();
  })



  test('Book a consultation flow', async ({ page }) => {
    const evReport = './test-results/consultation.html'
    const evincedService = new EvincedSDK(page)
    await evincedService.evStart({
      enableScreenshots: true
    }
    )

    await page.goto('https://a11y-audits.com/');

    await page.getByRole('button', { name: 'Book a consultation' }).click();

    const modal = page.locator('#consultation-modal');
    await modal.waitFor({ state: 'visible', timeout: 10000 });

    // Wait for the name input field (using its id)
    const nameInput = page.locator('#full_name');
    await nameInput.waitFor({ state: 'visible', timeout: 10000 });

    // Fill out the form fields using id selectors
    await nameInput.fill('John Doe');
    await page.locator('#email').fill('john@example.com');
    await page.locator('#phone').fill('1234567890');

    await page.locator('#next-to-step-2').click({ force: true });

    // Verify next form is visible
    await expect(page.locator('#date-time-form')).toBeVisible();

    // Choose time and next
    await page.locator('label[for="time-label-1"]').click();
    await page.locator('#next-to-step-3').click()

    // Check confirm step
    await expect(await page.getByText("Review and confirm your consultation")).toBeVisible();
    await page.locator('#confirm-step').click()

    // Thank you step and close modal
    await expect(page.getByText("Thank you for booking!")).toBeVisible();
    await page.locator('#close-modal-final').click()
    await expect(page.getByText("#consultation-modal")).toBeHidden();

    const issues = await evincedService.evStop()
    await evincedService.evSaveFile(issues, 'html', evReport)
    expect(existsSync(evReport)).toBeTruthy()
  });

});

