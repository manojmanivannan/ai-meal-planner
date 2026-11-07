import { Ingredient, Recipe } from './types';
export { INITIAL_INGREDIENTS } from './data/ingredients';
export { INITIAL_RECIPES } from './data/recipes';

export const API_BASE = ((import.meta as unknown as { env?: Record<string, string> }).env?.VITE_API_URL) || '';

export const LEGACY_RECIPE_ID_MAP: Record<string, string> = {
  'r-cumin-tea': '54',
  'r-garlic-bread': '80',
  'r-avocado-toast': '202',
  'r-overnight-oats': '3',
  'r-stir-fry-noodles': '24',
  'r-pasta-veggie': '16',
  'r-chapati': '65',
  'r-lentil-masala': '97',
  'r-gongura-thovaiyal': '208',
  'r-boiled-rice': '206',
  'r-chicken-saute': '205',
  'r-bhaji-gravy': '67',
  'r-sweet-potato-chaat': '85',
  'r-lentil-stew': '74',
  'r1': '1',
  'r2': '11',
  'r3': '199',
  'r4': '16',
};
