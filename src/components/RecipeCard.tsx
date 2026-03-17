import React from 'react';
import { Plus, Clock, Zap, Edit2, BookOpen, ShoppingBasket, X } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  variant?: 'compact' | 'full' | 'hero';
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, variant = 'full' }) => {
  if (variant === 'hero') {
    return (
      <div className="relative bg-surface-lowest rounded-lg overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-md transition-all">
        <div className="w-full md:w-1/2 h-48 md:h-auto">
          <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
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
            <button className="bg-primary text-on-primary rounded-full px-6 py-2 text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-opacity">
              <BookOpen className="w-4 h-4" /> Recipe
            </button>
            <button className="bg-secondary-container text-on-secondary-container rounded-full px-6 py-2 text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-opacity">
              <ShoppingBasket className="w-4 h-4" /> Shop
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="bg-surface-lowest rounded-lg p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-all">
        <div className="w-16 h-16 rounded-full bg-surface-container-high overflow-hidden flex-shrink-0">
          <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-grow">
          <h4 className="font-bold text-on-surface">{recipe.title}</h4>
          <p className="text-xs text-on-surface-variant">{recipe.description}</p>
        </div>
        <button className="p-1 text-on-surface-variant hover:text-error">
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-surface-lowest rounded-lg overflow-hidden flex flex-col sm:flex-row shadow-sm hover:shadow-md transition-all group">
      <div className="w-full sm:w-40 h-32 relative overflow-hidden">
        <img src={recipe.recipeImage || recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-4 flex flex-col justify-center flex-grow">
        <div className="flex gap-2 mb-2">
          {recipe.tags.slice(0, 1).map(tag => (
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
        <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
          <Edit2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
