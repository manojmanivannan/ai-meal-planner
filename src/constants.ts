// API base URL — in Docker, Nginx proxies /api to the backend.
// In local dev mode, you can set VITE_API_URL to point to the backend directly.
export const API_BASE = import.meta.env.VITE_API_URL || '';

export const CATEGORY_LABELS: Record<string, string> = {
  vegetables: 'Vegetables',
  fruits: 'Fruits',
  grains_and_cereals: 'Grains & Cereals',
  pulses_and_legumes: 'Pulses & Legumes',
  dairy_and_alternatives: 'Dairy',
  animal_products_meat_poultry_seafood: 'Protein',
  nuts_and_seeds: 'Nuts & Seeds',
  spices_and_herbs: 'Spices & Herbs',
  oils_and_fats: 'Oils & Fats',
  condiments_and_sauces: 'Condiments',
  beverages_and_infusions: 'Beverages',
  sweeteners: 'Sweeteners',
  salt_and_minerals: 'Salt & Minerals',
  other_miscellaneous: 'Other',
};

export const MEAL_TYPE_LABELS: Record<string, string> = {
  pre_breakfast: 'Pre-Breakfast',
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  snack: 'Snack',
  dinner: 'Dinner',
  sides: 'Sides',
};

export const CATEGORY_ICONS: Record<string, string> = {
  vegetables: '🥬',
  fruits: '🍎',
  grains_and_cereals: '🌾',
  pulses_and_legumes: '🫘',
  dairy_and_alternatives: '🥛',
  animal_products_meat_poultry_seafood: '🍗',
  nuts_and_seeds: '🥜',
  spices_and_herbs: '🌿',
  oils_and_fats: '🫒',
  condiments_and_sauces: '🫙',
  beverages_and_infusions: '☕',
  sweeteners: '🍯',
  salt_and_minerals: '🧂',
  other_miscellaneous: '📦',
};
