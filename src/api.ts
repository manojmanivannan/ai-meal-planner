import { API_BASE } from './constants';
import type { Ingredient, Recipe, WeeklyPlanEntry } from './types';

const headers = { 'Content-Type': 'application/json' };

// ── Ingredients ────────────────────────────────────────────────────────────────

export async function fetchIngredients(params?: {
  category?: string;
  search?: string;
  limit?: number;
  offset?: number;
}): Promise<Ingredient[]> {
  const q = new URLSearchParams();
  if (params?.category) q.set('category', params.category);
  if (params?.search) q.set('search', params.search);
  if (params?.limit) q.set('limit', String(params.limit));
  if (params?.offset) q.set('offset', String(params.offset));
  const res = await fetch(`${API_BASE}/api/ingredients?${q}`);
  if (!res.ok) throw new Error('Failed to fetch ingredients');
  return res.json();
}

export async function fetchIngredient(id: number): Promise<Ingredient> {
  const res = await fetch(`${API_BASE}/api/ingredients/${id}`);
  if (!res.ok) throw new Error('Ingredient not found');
  return res.json();
}

export async function fetchCategories(): Promise<string[]> {
  const res = await fetch(`${API_BASE}/api/ingredients/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function createIngredient(data: Partial<Ingredient>): Promise<Ingredient> {
  const res = await fetch(`${API_BASE}/api/ingredients`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create ingredient');
  return res.json();
}

export async function updateIngredient(id: number, data: Partial<Ingredient>): Promise<Ingredient> {
  const res = await fetch(`${API_BASE}/api/ingredients/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update ingredient');
  return res.json();
}

export async function deleteIngredient(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/ingredients/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete ingredient');
}

// ── Recipes ────────────────────────────────────────────────────────────────────

export async function fetchRecipes(params?: {
  meal_type?: string;
  is_vegetarian?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
}): Promise<Recipe[]> {
  const q = new URLSearchParams();
  if (params?.meal_type) q.set('meal_type', params.meal_type);
  if (params?.is_vegetarian !== undefined) q.set('is_vegetarian', String(params.is_vegetarian));
  if (params?.search) q.set('search', params.search);
  if (params?.limit) q.set('limit', String(params.limit));
  if (params?.offset) q.set('offset', String(params.offset));
  const res = await fetch(`${API_BASE}/api/recipes?${q}`);
  if (!res.ok) throw new Error('Failed to fetch recipes');
  return res.json();
}

export async function fetchRecipe(id: number): Promise<Recipe> {
  const res = await fetch(`${API_BASE}/api/recipes/${id}`);
  if (!res.ok) throw new Error('Recipe not found');
  return res.json();
}

export async function fetchMealTypes(): Promise<string[]> {
  const res = await fetch(`${API_BASE}/api/recipes/meal-types`);
  if (!res.ok) throw new Error('Failed to fetch meal types');
  return res.json();
}

export async function createRecipe(data: Partial<Recipe>): Promise<Recipe> {
  const res = await fetch(`${API_BASE}/api/recipes`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create recipe');
  return res.json();
}

export async function updateRecipe(id: number, data: Partial<Recipe>): Promise<Recipe> {
  const res = await fetch(`${API_BASE}/api/recipes/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update recipe');
  return res.json();
}

export async function deleteRecipeApi(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/recipes/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete recipe');
}

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch(`${API_BASE}/api/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) throw new Error('Failed to upload image');
  const data = await response.json();
  return data.url;
};

// ── Weekly Plan ────────────────────────────────────────────────────────────────

export async function fetchWeeklyPlan(): Promise<WeeklyPlanEntry[]> {
  const res = await fetch(`${API_BASE}/api/weekly-plan`);
  if (!res.ok) throw new Error('Failed to fetch weekly plan');
  return res.json();
}

export async function updateWeeklyPlan(id: number, recipe_ids: number[]): Promise<WeeklyPlanEntry> {
  const res = await fetch(`${API_BASE}/api/weekly-plan/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ recipe_ids }),
  });
  if (!res.ok) throw new Error('Failed to update weekly plan');
  return res.json();
}
