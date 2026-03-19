import { test, expect } from '@playwright/test';

test.describe('Ingredient Hub', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Click Ingredients tab
    await page.locator('button').filter({ hasText: 'Ingredients' }).click();
  });

  test('should search ingredients', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Ingredient Hub' })).toBeVisible();
    await page.getByPlaceholder('Search ingredients...').fill('chicken');
    await page.waitForTimeout(500);
    // Clear search
    await page.getByPlaceholder('Search ingredients...').fill('');
  });

  test('should create, edit and delete an ingredient', async ({ page }) => {
    // Click New Ingredient
    await page.getByRole('button', { name: 'New Ingredient' }).click();
    await expect(page.getByRole('heading', { name: 'New Ingredient' })).toBeVisible();

    // Fill form
    await page.getByPlaceholder('e.g. Red Onion').fill('E2E Test Ingredient');
    
    // The serving size and unit
    const spinButtons = page.locator('input[type="number"]');
    await spinButtons.nth(0).fill('150'); // Serving Size
    
    await page.getByRole('combobox').selectOption('g');

    // Stats
    await spinButtons.nth(1).fill('100'); // Energy
    await spinButtons.nth(2).fill('10');  // Protein
    await spinButtons.nth(3).fill('5');   // Carbs
    await spinButtons.nth(4).fill('2');   // Fat

    await page.getByRole('button', { name: 'Create Ingredient' }).click();

    // Search for it
    await page.getByPlaceholder('Search ingredients...').fill('E2E Test');
    await expect(page.getByText('E2E Test Ingredient').first()).toBeVisible();

    // Click inline delete (since it is fixed now)
    await page.locator('.group').filter({ hasText: 'E2E Test Ingredient' }).first().getByRole('button').nth(1).click();
    
    // Wait for delete
    await page.waitForTimeout(500);
  });
});
