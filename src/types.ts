
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
  image?: string;
}

export interface RecipeIngredient {
  ingredientId: string;
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
}

export interface MealPlanDay {
  date: string;
  meals: {
    breakfast?: string; // recipeId
    lunch?: string;
    dinner?: string;
    snack?: string;
  };
}
