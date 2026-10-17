import { expect, test } from "@playwright/test";

const SITE = "https://kuba.rocks";

for (const path of ["/", "/resume", "/contact"]) {
  test(`${path} has a canonical URL, description and share image`, async ({ page }) => {
    await page.goto(path);
    const canonical = path === "/" ? SITE : `${SITE}${path}`;
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonical);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", canonical);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{50,}/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      new RegExp(`^${SITE}/opengraph-image`)
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image"
    );
  });
}

test("share image is a 1200×630 PNG", async ({ request }) => {
  const response = await request.get("/opengraph-image");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toBe("image/png");
  const png = await response.body();
  // Width and height sit in the IHDR chunk at bytes 16–23
  expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([1200, 630]);
});

test("structured data describes Kuba as a Person", async ({ page }) => {
  await page.goto("/");
  const raw = await page.locator('script[type="application/ld+json"]').textContent();
  const data = JSON.parse(raw!);
  const person = data["@graph"].find((node: { "@type": string }) => node["@type"] === "Person");
  expect(person).toMatchObject({ name: "Kuba Florczuk", url: SITE });
  expect(person.sameAs).toContain("https://github.com/KubaRocks");
});

test("robots.txt points at the sitemap", async ({ request }) => {
  const body = await (await request.get("/robots.txt")).text();
  expect(body).toContain("Allow: /");
  expect(body).toContain(`Sitemap: ${SITE}/sitemap.xml`);
});

test("sitemap lists every page", async ({ request }) => {
  const body = await (await request.get("/sitemap.xml")).text();
  for (const url of [SITE, `${SITE}/resume`, `${SITE}/contact`]) {
    expect(body).toContain(`<loc>${url}</loc>`);
  }
});

test("llms.txt summarises the site as Markdown", async ({ request }) => {
  const response = await request.get("/llms.txt");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("text/plain");
  const body = await response.text();
  expect(body).toMatch(/^# Kuba Florczuk\n\n> /);
  expect(body).toContain(`[Resume](${SITE}/resume)`);
  expect(body).toContain("## Experience");
});
