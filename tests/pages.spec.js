// Every page loads cleanly and passes axe-core.
const { test, expect } = require('@playwright/test');
const { watch, axe } = require('./helpers');

const pages = ['index.html','tim.html','vint.html','google.html'];

for (const file of pages) {
  test(`${file} loads without console errors or failed requests`, async ({ page }) => {
    const problems = watch(page);
    await page.goto(file, { waitUntil: 'networkidle' });
    await expect(page.locator('h1').first()).toBeVisible();
    expect(problems).toEqual([]);
  });

  test(`${file} has no axe violations`, async ({ page }) => {
    await page.goto(file, { waitUntil: 'networkidle' });
    await axe(page);
  });
}
