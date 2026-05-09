import React from 'react';
import { Edit2, Zap, Clock, Trash2 } from 'lucide-react';
import { Recipe } from '../types';
import { MEAL_TYPE_LABELS } from '../constants';

interface RecipeCardProps {
  recipe: Recipe;
  variant?: 'compact' | 'full' | 'hero' | 'planner';
  onClick?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onSwap?: (id: number) => void;
  onRemoveFromPlan?: (id: number) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, variant = 'full', onClick, onEdit, onDelete, onSwap, onRemoveFromPlan }) => {
  const handleClick = () => onClick?.(recipe.id);
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(recipe.id);
  };
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(recipe.id);
  };

  const mealLabel = MEAL_TYPE_LABELS[recipe.meal_type] || recipe.meal_type;

  if (variant === 'hero') {
    return (
      <div 
        onClick={handleClick}
        className="relative bg-surface-lowest rounded-lg overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-md transition-all cursor-pointer group"
      >
        <div className="w-full md:w-1/2 h-48 md:h-auto bg-gradient-to-br from-primary/20 to-primary-container/30 relative overflow-hidden">
          {recipe.image_url && <img src={recipe.image_url} alt={recipe.name} className="absolute inset-0 w-full h-full object-cover" />}
        </div>
        <div className="p-6 md:w-1/2 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold px-2 py-0.5 rounded-full">
              {mealLabel}
            </span>
            {recipe.is_vegetarian && (
              <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">Veg</span>
            )}
          </div>
          <h4 className="font-bold text-2xl mb-2 leading-tight text-primary">{recipe.name}</h4>
          <div className="flex gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase">Protein</span>
              <span className="font-bold text-on-surface">{Math.round(recipe.protein)}g</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase">Carbs</span>
              <span className="font-bold text-on-surface">{Math.round(recipe.carbs)}g</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase">Fat</span>
              <span className="font-bold text-on-surface">{Math.round(recipe.fat)}g</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div 
        onClick={handleClick}
        className="bg-surface-lowest rounded-lg p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary-container/30 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
          {recipe.image_url ? (
            <img src={recipe.image_url} alt={recipe.name} className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <span className="text-2xl">{recipe.is_vegetarian ? '🥗' : '🍽️'}</span>
          )}
        </div>
        <div className="flex-grow">
          <h4 className="font-bold text-on-surface">{recipe.name}</h4>
          <p className="text-xs text-on-surface-variant">{Math.round(recipe.energy)} kcal • {Math.round(recipe.protein)}g protein</p>
        </div>
      </div>
    );
  }

  if (variant === 'planner') {
    return (
      <div 
        onClick={handleClick}
        className="bg-surface-lowest rounded-3xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all cursor-pointer group border border-surface-container pb-2"
      >
        <div className="h-48 relative overflow-hidden bg-gradient-to-br from-primary/10 to-primary-container/20">
          {recipe.image_url ? (
            <img src={recipe.image_url} alt={recipe.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl opacity-30">{recipe.is_vegetarian ? '🥗' : '🍽️'}</span>
            </div>
          )}
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 z-10 shadow-sm">
            <Clock className="w-3 h-3" /> {recipe.prep_time_minutes || 15}m
          </div>
        </div>
        <div className="p-4 md:p-5">
          <h4 className="font-bold text-base md:text-lg mb-4 leading-tight text-center group-hover:text-primary transition-colors">{recipe.name}</h4>
          <div className="grid grid-cols-4 gap-1 px-1">
            <div className="flex flex-col items-center text-center">
              <span className="text-[8px] font-bold text-on-surface-variant uppercase tracking-wider mb-0.5">Cals</span>
              <span className="text-sm font-extrabold text-on-surface truncate w-full">{Math.round(recipe.energy)}</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-[8px] font-bold text-on-surface-variant uppercase tracking-wider mb-0.5">Prot</span>
              <span className="text-sm font-extrabold text-on-surface truncate w-full">{Math.round(recipe.protein)}g</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-[8px] font-bold text-on-surface-variant uppercase tracking-wider mb-0.5">Carb</span>
              <span className="text-sm font-extrabold text-on-surface truncate w-full">{Math.round(recipe.carbs)}g</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-[8px] font-bold text-on-surface-variant uppercase tracking-wider mb-0.5">Fat</span>
              <span className="text-sm font-extrabold text-on-surface truncate w-full">{Math.round(recipe.fat)}g</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default 'full' variant
  return (
    <div 
      onClick={handleClick}
      className="bg-surface-lowest rounded-lg overflow-hidden flex flex-col sm:flex-row shadow-sm hover:shadow-md transition-all group cursor-pointer"
    >
      <div className="w-full sm:w-40 h-32 relative overflow-hidden bg-gradient-to-br from-primary/10 to-primary-container/20">
        {recipe.image_url ? (
          <img src={recipe.image_url} alt={recipe.name} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl opacity-30">{recipe.is_vegetarian ? '🥗' : '🍽️'}</span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col justify-center flex-grow">
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
            {mealLabel}
          </span>
          {recipe.is_vegetarian && (
            <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Veg</span>
          )}
        </div>
        <h4 className="font-bold text-lg mb-1 leading-tight">{recipe.name}</h4>
        <div className="flex items-center gap-4 text-on-surface-variant text-sm">
          <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> {Math.round(recipe.energy)} kcal</span>
          <span>Serves {recipe.serves}</span>
        </div>
      </div>
      <div className="p-4 flex items-center justify-center gap-2">
        <button className="p-2 text-on-surface-variant hover:text-primary transition-colors" onClick={handleEdit}>
          <Edit2 className="w-5 h-5" />
        </button>
        {onDelete && (
          <button className="p-2 text-on-surface-variant hover:text-error transition-colors" onClick={handleDelete} title="Delete Recipe">
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};
