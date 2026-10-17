import { expect, test } from "@playwright/test";

const PATHS = ["/", "/resume", "/contact"];

for (const path of PATHS) {
  test(`${path} renders without errors`, async ({ page, baseURL }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      // Third-party scripts (Google Maps) report their own errors; only ours count
      if (message.type() === "error" && message.location().url.startsWith(baseURL!)) {
        errors.push(message.text());
      }
    });

    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });

  for (const colorScheme of ["light", "dark"] as const) {
    test(`${path} fits a 320px screen in ${colorScheme} mode`, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 720 });
      await page.emulateMedia({ colorScheme });
      await page.goto(path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      expect(overflow).toBe(0);
    });
  }
}

test("contact form returns server validation errors and keeps the input", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Name", { exact: true }).fill("Test Player");
  // Passes the browser's email check but not the server's (no top-level domain)
  await page.getByLabel("Email", { exact: true }).fill("player@localhost");
  await page.getByLabel("Message", { exact: true }).fill("Looking for a point guard this season.");
  await page.getByRole("button", { name: "Send message" }).click();

  await expect(page.getByText("Invalid email address")).toBeVisible();
  await expect(page.getByLabel("Email", { exact: true })).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByLabel("Name", { exact: true })).toHaveValue("Test Player");
  await expect(page.getByLabel("Message", { exact: true })).toHaveValue(
    "Looking for a point guard this season."
  );
});
