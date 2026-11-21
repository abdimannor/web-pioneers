// Header controls in a browser that asks for reduced motion: motion stays on by default.
const { test, expect } = require('@playwright/test');

test.use({ contextOptions: { reducedMotion: 'reduce' } });

const toggle = '.motion-toggle';

test('moving by default, off after the button, remembered after reload', async ({ page }) => {
  await page.goto('./vint.html');
  const html = page.locator('html');
  const button = page.locator(toggle);
  const steps = page.locator('#pk-steps');
  await expect(html).toHaveAttribute('data-motion', 'on');
  await expect(button).toBeVisible();
  await expect(button).toHaveAttribute('aria-pressed', 'true');
  await expect(button).toHaveAccessibleName('Pausa rörelse');
  await expect(steps).not.toBeChecked();
  await button.click();
  await expect(html).toHaveAttribute('data-motion', 'off');
  await expect(button).toHaveAttribute('aria-pressed', 'false');
  await expect(button).toHaveAccessibleName('Starta rörelse');
  await expect(steps).toBeChecked();
  await page.reload();
  await expect(html).toHaveAttribute('data-motion', 'off');
  await expect(steps).toBeChecked();
  await button.click();
  await expect(html).toHaveAttribute('data-motion', 'on');
  await page.reload();
  await expect(html).toHaveAttribute('data-motion', 'on');
});

test('quiet controls: language then motion, named in the page language', async ({ page }) => {
  await page.goto('./');
  const controls = page.locator('.site-controls > *');
  await expect(controls).toHaveCount(2);
  await expect(controls.nth(0)).toHaveAccessibleName('Byt till engelska');
  await expect(controls.nth(0)).toHaveAttribute('hreflang', 'en');
  await expect(controls.nth(1)).toHaveAccessibleName('Pausa rörelse');
  const box = await controls.nth(1).boundingBox();
  expect(Math.round(box.width)).toBe(34);
  expect(Math.round(box.height)).toBe(34);
  await controls.nth(0).click();
  await expect(page).toHaveURL(/\/en\/index\.html$/);
  await expect(page.locator('.lang-switch')).toHaveAccessibleName('Switch to Swedish');
  await expect(page.locator('.lang-switch span[lang]')).toHaveAttribute('lang', 'sv');
  await expect(page.locator(toggle)).toHaveAccessibleName('Pause motion');
});
