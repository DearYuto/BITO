import { test, expect } from "@playwright/test";

const apiBaseUrl = "http://localhost:8000";

test("wallet balance and order flow", async ({ page, request }) => {
  const email = `e2e+${Date.now()}@example.com`;
  const password = "Test1234!";

  const signupResponse = await request.post(`${apiBaseUrl}/auth/signup`, {
    data: { email, password },
  });

  expect(signupResponse.ok()).toBeTruthy();

  await page.goto("/ko/login", { waitUntil: "networkidle" });
  await page.getByTestId("login-email").fill(email);
  await page.getByTestId("login-password").fill(password);
  await page.getByTestId("login-submit").click();

  await expect(page.getByTestId("login-success")).toBeVisible();

  await page.goto("/ko/market", { waitUntil: "networkidle" });

  await expect(page.getByTestId("wallet-balance-list")).toBeVisible();
  await expect(
    page.getByTestId("wallet-balance-item").filter({ hasText: "BTC" }),
  ).toBeVisible();

  await page.getByTestId("order-size-input").fill("0.01");
  await page.getByTestId("order-submit").click();

  await expect(page.getByTestId("order-submit-success")).toBeVisible();
  await expect(page.getByTestId("recent-orders-list")).toBeVisible();
  await expect(page.getByTestId("recent-order-item").first()).toBeVisible();
});
