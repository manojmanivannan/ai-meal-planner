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
    <div className="bg-surface-lowest rounded-xl p-4 md:p-3.5 border border-surface-container hover:border-primary/30 transition-all duration-200 group shadow-2xs">
      <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-3">
        {/* Ingredient Visual & Name */}
        <div className="col-span-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-surface-low border border-surface-container flex items-center justify-center text-lg shrink-0">
            {ingredient.image ? (
              <img src={ingredient.image} alt={ingredient.name} className="w-full h-full object-cover" />
            ) : (
              <span>{ingredient.icon || '🥗'}</span>
            )}
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-sm text-on-surface truncate group-hover:text-primary transition-colors">
              {ingredient.name}
            </h3>
            <span className="text-[11px] text-on-surface-variant font-medium">
              {ingredient.category} · Fresh
            </span>
          </div>
        </div>

        {/* Base Unit */}
        <div className="col-span-2 text-left md:text-center">
          <span className="inline-block bg-surface-low px-2.5 py-0.5 rounded-md text-xs font-mono font-bold text-on-surface-variant border border-surface-container/60">
            {ingredient.baseQuantity}{ingredient.baseUnit === 'Grams' ? 'g' : ` ${ingredient.baseUnit}`}
          </span>
        </div>

        {/* Calories */}
        <div className="col-span-1 text-left md:text-center font-mono font-bold text-xs text-on-surface tabular-nums">
          {ingredient.calories} <span className="md:hidden text-[10px] text-on-surface-variant">kcal</span>
        </div>

        {/* Protein */}
        <div className="col-span-1 text-left md:text-center font-mono font-bold text-xs text-emerald-600 tabular-nums">
          {ingredient.protein}g <span className="md:hidden text-[10px] text-on-surface-variant">P</span>
        </div>

        {/* Carbs */}
        <div className="col-span-1 text-left md:text-center font-mono font-bold text-xs text-sky-600 tabular-nums">
          {ingredient.carbs}g <span className="md:hidden text-[10px] text-on-surface-variant">C</span>
        </div>

        {/* Fats */}
        <div className="col-span-1 text-left md:text-center font-mono font-bold text-xs text-rose-600 tabular-nums">
          {ingredient.fats}g <span className="md:hidden text-[10px] text-on-surface-variant">F</span>
        </div>

        {/* Actions (Button 0 is Edit, Button 1 is Delete) */}
        <div className="col-span-2 flex justify-end items-center gap-1">
          <button 
            onClick={() => onEdit?.(ingredient.id)}
            aria-label={`Edit ${ingredient.name}`}
            className="p-1.5 hover:bg-primary-light/60 hover:text-primary rounded-lg transition-colors text-on-surface-variant cursor-pointer"
            title="Edit Ingredient"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => {
              if (confirm(`Delete ${ingredient.name}?`)) {
                onDelete?.(ingredient.id);
              }
            }}
            aria-label={`Delete ${ingredient.name}`}
            className="p-1.5 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-colors text-on-surface-variant cursor-pointer"
            title="Delete Ingredient"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
