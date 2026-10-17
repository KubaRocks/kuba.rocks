import { expect, test, type Page } from "@playwright/test";

// --color-navy, the page background, from globals.css
const NIGHT_BG = "rgb(14, 27, 44)";
const DAY_BG = "rgb(243, 239, 231)";

const toggle = (page: Page) => page.getByRole("button", { name: /^Theme:/ });
const background = (page: Page) =>
  page.evaluate(() => getComputedStyle(document.body).backgroundColor);
const dataTheme = (page: Page) =>
  page.evaluate(() => document.documentElement.dataset.theme ?? null);

test("follows the system setting by default", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await expect(toggle(page)).toHaveAccessibleName(/^Theme: Auto/);
  expect(await dataTheme(page)).toBeNull();
  expect(await background(page)).toBe(DAY_BG);

  await page.emulateMedia({ colorScheme: "dark" });
  expect(await background(page)).toBe(NIGHT_BG);
});

test("cycles Auto, light and dark, and remembers the choice", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");

  await toggle(page).click();
  await expect(toggle(page)).toHaveAccessibleName(/^Theme: Day game/);
  expect(await dataTheme(page)).toBe("light");
  expect(await background(page)).toBe(DAY_BG);

  await page.reload();
  await expect(toggle(page)).toHaveAccessibleName(/^Theme: Day game/);
  expect(await background(page)).toBe(DAY_BG);

  await toggle(page).click();
  await expect(toggle(page)).toHaveAccessibleName(/^Theme: Night game/);
  expect(await dataTheme(page)).toBe("dark");

  await toggle(page).click();
  await expect(toggle(page)).toHaveAccessibleName(/^Theme: Auto/);
  expect(await dataTheme(page)).toBeNull();
  expect(await page.evaluate(() => localStorage.getItem("theme"))).toBeNull();
});

test("applies a saved theme before the page body renders", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.addInitScript(() => {
    localStorage.setItem("theme", "dark");
    // Record data-theme the moment <body> is parsed, before React hydrates
    new MutationObserver((_, observer) => {
      if (!document.body) return;
      (window as unknown as { themeAtBody?: string }).themeAtBody =
        document.documentElement.dataset.theme;
      observer.disconnect();
    }).observe(document, { childList: true, subtree: true });
  });

  await page.goto("/");
  expect(
    await page.evaluate(() => (window as unknown as { themeAtBody?: string }).themeAtBody)
  ).toBe("dark");
  expect(await background(page)).toBe(NIGHT_BG);
});
