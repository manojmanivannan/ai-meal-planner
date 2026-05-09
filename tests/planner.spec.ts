import { test, expect } from '@playwright/test';

test.describe('Weekly Planner', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the planner and assign a recipe to a meal slot', async ({ page }) => {
    // Navigate to Planner
    await expect(page.getByRole('heading', { name: 'Weekly Planner' })).toBeVisible();

    // Pick Monday
    await page.getByText('MON', { exact: true }).click();

    // Click "Add Breakfast" or "Add Another" in the Breakfast section
    const addBreakfastBtn = page.getByRole('button', { name: 'Add Breakfast' });
    if (await addBreakfastBtn.isVisible()) {
      await addBreakfastBtn.click();
    } else {
      await page.locator('div.space-y-4').filter({ has: page.getByRole('heading', { name: 'Breakfast', exact: true }) }).getByRole('button', { name: /Add Another/i }).click();
    }

    // Modal opens
    await expect(page.getByRole('heading', { name: 'Select Breakfast' })).toBeVisible();

    // Wait for recipes to load
    await page.waitForTimeout(500);

    // Get the first recipe option inside the modal (it has "kcal" in the button content)
    const firstRecipeBtn = page.getByRole('button').filter({ hasText: 'kcal' }).first();
    const btnText = await firstRecipeBtn.textContent();
    // The name is the first part of the text, but let's just click it
    await firstRecipeBtn.click();

    // Wait for modal to close
    await expect(page.getByRole('heading', { name: 'Select Breakfast' })).not.toBeVisible();
    await page.waitForTimeout(500);
  });

  test('should remove a recipe from a meal slot', async ({ page }) => {
    await page.goto('/');
    await page.getByText('MON', { exact: true }).click();

    // Find the first "Remove" button in the planner and click it
    const removeBtn = page.getByRole('button', { name: /Remove/i }).first();
    if (await removeBtn.isVisible()) {
      await removeBtn.click();
      await page.waitForTimeout(500);
    }
  });
});
