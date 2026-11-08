
export type Category = 'Produce' | 'Dairy' | 'Protein' | 'Pantry' | 'Spices' | 'Grains' | 'Bakery';

export interface Ingredient {
  id: string;
  name: string;
  category: Category;
  baseQuantity: number;
  baseUnit: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber?: number;
  image?: string;
  icon?: string;
}

export interface RecipeIngredient {
  ingredientId: string;
  name?: string;
  quantity: number;
  unit: string;
  notes?: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  servings: number;
  difficulty: 'Easy' | 'Intermediate' | 'Advanced';
  tags: string[];
  ingredients: RecipeIngredient[];
  instructions: string[];
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber?: number;
}

export type MealSlot = 'preBreakfast' | 'breakfast' | 'lunch' | 'snack' | 'dinner';

export interface DayPlan {
  preBreakfast: string[];
  breakfast: string[];
  lunch: string[];
  snack: string[];
  dinner: string[];
}

export type DayPlans = Record<string, Record<MealSlot, string[]>>;

export interface MealPlanDay {
  date: string;
  meals: {
    breakfast?: string; // recipeId
    lunch?: string;
    dinner?: string;
    snack?: string;
  };
}

export interface WeeklyPlanEntry {
  id: number;
  day: string;
  meal_type: string;
  recipe_ids: number[];
}

export type UserRole = 'chef' | 'nutritionist' | 'home_cook' | 'member';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
}

export interface UserAccountData {
  userId: string;
  recipes: Recipe[];
  ingredients: Ingredient[];
  weeklyPlan: DayPlans;
  hasPopulatedStarterWeek?: boolean;
}

