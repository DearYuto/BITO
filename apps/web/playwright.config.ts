import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 60000,
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
    },
  },
  projects: [
    {
      name: "desktop",
      use: {
        baseURL: "http://localhost:3000",
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: "mobile",
      use: {
        baseURL: "http://localhost:3000",
        ...devices["iPhone 14"],
      },
    },
  ],
  webServer: [
    {
      command: "bun run dev",
      url: "http://localhost:3000",
      reuseExistingServer: true,
      timeout: 120000,
    },
    {
      command: "bun run start:dev",
      url: "http://localhost:8000/health",
      reuseExistingServer: true,
      timeout: 120000,
      cwd: "../api",
    },
  ],
});
