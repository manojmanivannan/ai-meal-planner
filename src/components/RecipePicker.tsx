import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Clock, Flame } from 'lucide-react';
import { Recipe } from '../types';
import { INITIAL_RECIPES } from '../constants';

interface RecipePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (recipeId: string) => void;
  title: string;
  recipes?: Recipe[];
}

export const RecipePicker: React.FC<RecipePickerProps> = ({ 
  isOpen, 
  onClose, 
  onSelect, 
  title, 
  recipes = INITIAL_RECIPES 
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50"
          />
          
          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-[10%] bottom-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[620px] bg-surface rounded-2xl shadow-xl z-50 flex flex-col overflow-hidden border border-surface-container"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-surface-container flex items-center justify-between bg-surface-lowest">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-on-surface tracking-tight">{title}</h2>
                <p className="text-xs text-on-surface-variant mt-0.5">Choose a recipe to assign to this meal slot</p>
              </div>
              <button 
                onClick={onClose} 
                className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-low transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search */}
            <div className="p-4 bg-surface-low border-b border-surface-container">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
                <input 
                  type="text"
                  placeholder="Search recipes by name or tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-surface-lowest rounded-xl border border-surface-container text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
              {filteredRecipes.map((recipe) => {
                const serves = recipe.servings || 1;
                const cal = Math.round(recipe.calories / serves);
                const prot = (recipe.protein / serves).toFixed(1);
                const carbs = (recipe.carbs / serves).toFixed(1);
                const fats = (recipe.fats / serves).toFixed(1);

                return (
                  <button 
                    key={recipe.id}
                    onClick={() => {
                      onSelect(recipe.id);
                      onClose();
                    }}
                    className="w-full flex items-center gap-3.5 p-3 rounded-xl bg-surface-lowest border border-surface-container hover:border-primary/50 hover:bg-primary-light/10 transition-all group text-left cursor-pointer shadow-2xs"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-surface-low">
                      <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm text-on-surface truncate group-hover:text-primary transition-colors">
                        {recipe.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-on-surface-variant font-mono tabular-nums mt-1">
                        <span className="flex items-center gap-1 font-sans text-on-surface-variant/80">
                          <Clock className="w-3 h-3 text-primary" />
                          <span>{recipe.prepTime}m</span>
                        </span>
                        <span>·</span>
                        <span className="font-bold text-on-surface">{cal} kcal</span>
                        <span>·</span>
                        <span className="text-emerald-600 font-semibold">{prot}g P</span>
                        <span className="text-sky-600 font-semibold">{carbs}g C</span>
                        <span className="text-rose-600 font-semibold">{fats}g F</span>
                      </div>
                    </div>
                    <div className="bg-primary text-white px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      Select
                    </div>
                  </button>
                );
              })}
              {filteredRecipes.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-on-surface-variant font-medium text-xs">No recipes found matching your search.</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
