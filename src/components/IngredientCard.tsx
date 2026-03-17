import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Ingredient } from '../types';

interface IngredientCardProps {
  ingredient: Ingredient;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const IngredientCard: React.FC<IngredientCardProps> = ({ ingredient, onEdit, onDelete }) => {
  return (
    <div className="bg-surface-lowest rounded-lg p-6 md:p-4 hover:bg-surface-container-high transition-colors duration-200 group">
      <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
        <div className="col-span-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container">
            <img src={ingredient.image} alt={ingredient.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="font-bold text-on-surface">{ingredient.name}</h3>
            <span className="text-xs text-on-surface-variant">{ingredient.category} • Fresh</span>
          </div>
        </div>
        <div className="col-span-2 text-center">
          <span className="bg-surface-container-low px-3 py-1 rounded-full text-sm font-semibold">
            {ingredient.baseQuantity}{ingredient.baseUnit === 'Grams' ? 'g' : ` ${ingredient.baseUnit}`}
          </span>
        </div>
        <div className="col-span-1 text-center font-medium">{ingredient.calories}</div>
        <div className="col-span-1 text-center font-bold text-tertiary">{ingredient.protein}g</div>
        <div className="col-span-1 text-center text-on-surface-variant">{ingredient.carbs}g</div>
        <div className="col-span-1 text-center text-on-surface-variant">{ingredient.fats}g</div>
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
