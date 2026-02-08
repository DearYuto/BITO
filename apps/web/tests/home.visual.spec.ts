import { test, expect } from "@playwright/test";

test("home page visual", async ({ page }) => {
  await page.goto("/ko", { waitUntil: "networkidle" });
  await expect(page).toHaveScreenshot("home-page.png");
});
