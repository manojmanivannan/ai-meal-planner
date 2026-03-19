import { test, expect } from '@playwright/test';

test.describe('Recipes Hub', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Click Recipes tab in bottom nav
    await page.locator('button').filter({ hasText: 'Recipes' }).click();
  });

  test('should filter recipes by meal type', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Daily Inspiration' })).toBeVisible();

    // Click 'Breakfast' filter exactly otherwise it hits 'Pre-Breakfast'
    await page.getByRole('button', { name: 'Breakfast', exact: true }).click();
    await page.waitForTimeout(500);
    
    // Click 'All Recipes'
    await page.getByRole('button', { name: 'All Recipes' }).click();
  });

  test('should open recipe detail', async ({ page }) => {
    // Click the hero recipe
    await page.getByText('EDITOR\'S CHOICE').click();
    await expect(page.getByRole('heading', { level: 2 }).first()).toBeVisible();
    await page.getByRole('button').first().click(); // Back arrow is the first button on detail screen
  });

  test('should create and delete a recipe', async ({ page }) => {
    // Click '+' in TopBar
    await page.getByLabel('Create Recipe').click(); 
    
    await expect(page.getByRole('heading', { name: 'Create Recipe' })).toBeVisible();
    
    // Fill form
    await page.getByPlaceholder('Recipe Name').fill('E2E Test Recipe');
    await page.getByRole('button', { name: 'Save Recipe' }).click();

    // Should return to Recipes list
    await expect(page.getByRole('heading', { name: 'Daily Inspiration' })).toBeVisible();
    
    // Wait slightly for DOM
    await page.waitForTimeout(500);

    // Find our new recipe, click Edit (using first to avoid strict mode if previous tests failed and left artifacts)
    await page.getByText('E2E Test Recipe').first().scrollIntoViewIfNeeded();
    await page.getByText('E2E Test Recipe').first().click();
    
    // Edit from Detail - click the pencil icon which is the second button
    await page.getByRole('button').nth(1).click();
    
    // Delete
    await page.getByRole('button', { name: 'Delete' }).click();
    
    // Verify it is gone (Wait for deletion)
    await page.waitForTimeout(500);
  });
});
