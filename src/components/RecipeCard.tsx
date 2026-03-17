import React from 'react';
import { Plus, Clock, Zap, Edit2, BookOpen, ShoppingBasket, X } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  variant?: 'compact' | 'full' | 'hero' | 'planner';
  onClick?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, variant = 'full', onClick, onEdit }) => {
  const handleClick = () => onClick?.(recipe.id);
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(recipe.id);
  };

  if (variant === 'hero') {
    return (
      <div 
        onClick={handleClick}
        className="relative bg-surface-lowest rounded-lg overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-md transition-all cursor-pointer group"
      >
        <div className="w-full md:w-1/2 h-48 md:h-auto">
          <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        </div>
        <div className="p-6 md:w-1/2 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3">
            {recipe.tags.map(tag => (
              <span key={tag} className="bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <h4 className="font-bold text-2xl mb-2 leading-tight text-primary">{recipe.title}</h4>
          <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">{recipe.description}</p>
          <div className="flex gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase">Protein</span>
              <span className="font-bold text-on-surface">{recipe.protein}g</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase">Carbs</span>
              <span className="font-bold text-on-surface">{recipe.carbs}g</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase">Fat</span>
              <span className="font-bold text-on-surface">{recipe.fats}g</span>
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
        <div className="w-16 h-16 rounded-full bg-surface-container-high overflow-hidden flex-shrink-0">
          <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-grow">
          <h4 className="font-bold text-on-surface">{recipe.title}</h4>
          <p className="text-xs text-on-surface-variant">{recipe.calories} kcal • {recipe.protein}g protein</p>
        </div>
        <button className="p-1 text-on-surface-variant hover:text-error" onClick={(e) => { e.stopPropagation(); }}>
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  if (variant === 'planner') {
    return (
      <div 
        onClick={handleClick}
        className="bg-surface-lowest rounded-xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all cursor-pointer group border border-surface-container"
      >
        <div className="h-40 relative overflow-hidden">
          <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3" /> {recipe.prepTime}m
          </div>
        </div>
        <div className="p-5">
          <h4 className="font-bold text-lg mb-3 leading-tight group-hover:text-primary transition-colors">{recipe.title}</h4>
          <div className="grid grid-cols-4 gap-2">
            <div className="text-center bg-surface-container-low rounded-lg py-2">
              <span className="block text-[8px] font-bold text-on-surface-variant uppercase">Cals</span>
              <span className="text-sm font-bold">{recipe.calories}</span>
            </div>
            <div className="text-center bg-surface-container-low rounded-lg py-2">
              <span className="block text-[8px] font-bold text-on-surface-variant uppercase">Prot</span>
              <span className="text-sm font-bold">{recipe.protein}g</span>
            </div>
            <div className="text-center bg-surface-container-low rounded-lg py-2">
              <span className="block text-[8px] font-bold text-on-surface-variant uppercase">Carb</span>
              <span className="text-sm font-bold">{recipe.carbs}g</span>
            </div>
            <div className="text-center bg-surface-container-low rounded-lg py-2">
              <span className="block text-[8px] font-bold text-on-surface-variant uppercase">Fat</span>
              <span className="text-sm font-bold">{recipe.fats}g</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={handleClick}
      className="bg-surface-lowest rounded-lg overflow-hidden flex flex-col sm:flex-row shadow-sm hover:shadow-md transition-all group cursor-pointer"
    >
      <div className="w-full sm:w-40 h-32 relative overflow-hidden">
        <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-4 flex flex-col justify-center flex-grow">
        <div className="flex flex-wrap gap-2 mb-2">
          {recipe.tags.map(tag => (
            <span key={tag} className="bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              {tag}
            </span>
          ))}
        </div>
        <h4 className="font-bold text-lg mb-1 leading-tight">{recipe.title}</h4>
        <div className="flex items-center gap-4 text-on-surface-variant text-sm">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {recipe.prepTime} min</span>
          <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> {recipe.calories} kcal</span>
        </div>
      </div>
      <div className="p-4 flex items-center justify-center">
        <button className="p-2 text-on-surface-variant hover:text-primary transition-colors" onClick={handleEdit}>
          <Edit2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
