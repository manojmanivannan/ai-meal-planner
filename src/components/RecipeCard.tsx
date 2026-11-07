import React from 'react';
import { Clock, Zap, Edit2, X } from 'lucide-react';
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

  const serves = recipe.servings || 1;
  const perServingCal = Math.round(recipe.calories / serves);
  const perServingProtein = Number((recipe.protein / serves).toFixed(1));
  const perServingCarbs = Number((recipe.carbs / serves).toFixed(1));
  const perServingFats = Number((recipe.fats / serves).toFixed(1));

  if (variant === 'compact') {
    return (
      <div 
        onClick={handleClick}
        className="bg-surface-lowest rounded-xl p-3 flex items-center gap-3 border border-surface-container hover:border-primary/40 transition-all cursor-pointer shadow-2xs group"
      >
        <div className="w-12 h-12 rounded-lg bg-surface-low overflow-hidden shrink-0">
          <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm text-on-surface truncate group-hover:text-primary transition-colors">{recipe.title}</h4>
          <p className="text-xs font-mono text-on-surface-variant tabular-nums">
            {perServingCal} kcal · <span className="text-emerald-600">{perServingProtein}g P</span>
          </p>
        </div>
        <button 
          className="p-1 text-on-surface-variant/40 hover:text-rose-600 transition-colors" 
          onClick={(e) => { e.stopPropagation(); }}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div 
      onClick={handleClick}
      className="bg-surface-lowest rounded-2xl overflow-hidden border border-surface-container hover:border-primary/40 hover:shadow-sm transition-all duration-200 group cursor-pointer flex flex-col sm:flex-row"
    >
      <div className="w-full sm:w-48 h-40 sm:h-auto relative overflow-hidden shrink-0 bg-surface-low">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{recipe.prepTime}m</span>
        </div>
      </div>

      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 min-w-0">
        <div>
          <div className="flex flex-wrap items-center gap-1.5 mb-2">
            {recipe.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary-light/70 px-2 py-0.5 rounded-md">
                {tag}
              </span>
            ))}
            <span className="text-[11px] text-on-surface-variant/60 font-medium ml-1">
              · Serves {serves}
            </span>
          </div>

          <h3 className="font-extrabold text-base sm:text-lg text-on-surface group-hover:text-primary transition-colors leading-snug mb-1.5 truncate">
            {recipe.title}
          </h3>
          <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed mb-3">
            {recipe.description}
          </p>
        </div>

        <div className="pt-3 border-t border-surface-container flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono tabular-nums">
            <span className="font-bold text-on-surface">{perServingCal} kcal</span>
            <span className="text-on-surface-variant/30">·</span>
            <span className="text-emerald-600 font-semibold">{perServingProtein}g P</span>
            <span className="text-on-surface-variant/30">·</span>
            <span className="text-sky-600 font-semibold">{perServingCarbs}g C</span>
            <span className="text-on-surface-variant/30">·</span>
            <span className="text-rose-600 font-semibold">{perServingFats}g F</span>
          </div>

          <button 
            className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-low rounded-lg transition-colors shrink-0" 
            onClick={handleEdit}
            title="Edit Recipe"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
