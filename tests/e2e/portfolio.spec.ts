import { expect, test } from "@playwright/test";

test("Spanish portfolio is static, navigable and indexable", async ({ page }) => {
  await page.goto("/es");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Creo productos web escalables");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/es$/);
  await expect(page.getByRole("heading", { name: "Experiencia" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Trabajo seleccionado" })).toBeVisible();
});

test("language switch serves translated HTML", async ({ page }) => {
  await page.goto("/es");
  const englishLink = page.locator('a[href="/en"]');
  if (!(await englishLink.isVisible())) await page.getByRole("button", { name: "Abrir menú" }).click();
  await englishLink.click();
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("I build scalable web products");
});

test("project filter changes the visible cards", async ({ page }) => {
  await page.goto("/en");
  await page.getByRole("button", { name: "UX design" }).click();
  await expect(page.getByText("Cajero Santander")).toBeVisible();
  await expect(page.getByText("App2u", { exact: true })).toBeHidden();
});

test("admin is private without the configured GitHub account", async ({ page }) => {
  await page.goto("/admin");
  await expect(page.getByRole("heading", { name: "Panel privado" })).toBeVisible();
});
