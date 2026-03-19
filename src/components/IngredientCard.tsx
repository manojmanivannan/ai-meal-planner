import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Ingredient } from '../types';
import { CATEGORY_LABELS, CATEGORY_ICONS } from '../constants';

interface IngredientCardProps {
  ingredient: Ingredient;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export const IngredientCard: React.FC<IngredientCardProps> = ({ ingredient, onEdit, onDelete }) => {
  const icon = CATEGORY_ICONS[ingredient.category] || '📦';
  const categoryLabel = CATEGORY_LABELS[ingredient.category] || ingredient.category;

  return (
    <div className="bg-surface-lowest rounded-lg p-6 md:p-4 hover:bg-surface-container-high transition-colors duration-200 group">
      <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
        <div className="col-span-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container flex items-center justify-center text-2xl">
            {icon}
          </div>
          <div>
            <h3 className="font-bold text-on-surface">{ingredient.name}</h3>
            <span className="text-xs text-on-surface-variant">{categoryLabel}</span>
          </div>
        </div>
        <div className="col-span-2 text-center">
          <span className="bg-surface-container-low px-3 py-1 rounded-full text-sm font-semibold">
            {ingredient.serving_size}{ingredient.serving_unit === 'g' ? 'g' : ` ${ingredient.serving_unit}`}
          </span>
        </div>
        <div className="col-span-1 text-center font-medium">{Math.round(ingredient.energy)}</div>
        <div className="col-span-1 text-center font-bold text-tertiary">{Math.round(ingredient.protein)}g</div>
        <div className="col-span-1 text-center text-on-surface-variant">{Math.round(ingredient.carbs)}g</div>
        <div className="col-span-1 text-center text-on-surface-variant">{Math.round(ingredient.fat)}g</div>
        <div className="col-span-2 flex justify-end gap-2">
          <button 
            onClick={() => onEdit?.(ingredient.id)}
            className="p-2 hover:bg-tertiary-fixed rounded-full transition-colors text-on-surface-variant"
          >
            <Edit2 className="w-5 h-5" />
          </button>
          <button 
            onClick={() => onDelete?.(ingredient.id)}
            className="p-2 hover:bg-red-100 hover:text-red-600 rounded-full transition-colors text-on-surface-variant"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
