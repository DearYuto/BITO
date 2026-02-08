import { test, expect } from "@playwright/test";

test("login page visual", async ({ page }) => {
  await page.goto("/ko/login", { waitUntil: "networkidle" });
  await expect(page).toHaveScreenshot("login-page.png");
});
