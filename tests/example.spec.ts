import { test, expect } from "@playwright/test";

test("homepage has title and links to contact page", async ({ page }) => {
  await page.goto("http://127.0.0.1:3000/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Lucas Draichi/);

  // create a locator
  const contactLink = page.getByRole("link", { name: "Contact" }).last();

  // Expect an attribute "to be strictly equal" to the value.
  await expect(contactLink).toHaveAttribute("href", "#contact");

  // Click the get started link.
  await contactLink.click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*contact/);
});
