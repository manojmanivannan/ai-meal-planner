
export type Category =
  | 'vegetables'
  | 'fruits'
  | 'grains_and_cereals'
  | 'pulses_and_legumes'
  | 'dairy_and_alternatives'
  | 'animal_products_meat_poultry_seafood'
  | 'nuts_and_seeds'
  | 'spices_and_herbs'
  | 'oils_and_fats'
  | 'condiments_and_sauces'
  | 'beverages_and_infusions'
  | 'sweeteners'
  | 'salt_and_minerals'
  | 'other_miscellaneous';

export type MealType = 'pre_breakfast' | 'breakfast' | 'lunch' | 'snack' | 'dinner' | 'sides';

export interface Ingredient {
  id: number;
  name: string;
  shelf_life: number;
  available: boolean;
  last_available: string | null;
  serving_unit: string;
  serving_size: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  energy: number;
  iron_mg: number;
  magnesium_mg: number;
  calcium_mg: number;
  potassium_mg: number;
  sodium_mg: number;
  vitamin_c_mg: number;
  category: Category;
}

export interface RecipeIngredient {
  id: number;
  ingredient_id: number | null;
  name: string;
  quantity: number;
  serving_unit: string;
}

export interface Recipe {
  id: number;
  name: string;
  serves: number;
  instructions: string | null;
  meal_type: MealType;
  is_vegetarian: boolean;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  energy: number;
  iron_mg: number;
  magnesium_mg: number;
  calcium_mg: number;
  potassium_mg: number;
  sodium_mg: number;
  vitamin_c_mg: number;
  ingredients?: RecipeIngredient[];
}

export interface WeeklyPlanEntry {
  id: number;
  day: string;
  meal_type: MealType;
  recipe_ids: number[];
}
