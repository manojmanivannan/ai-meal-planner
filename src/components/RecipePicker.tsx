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

export const RecipePicker: React.FC<RecipePickerProps> = ({ isOpen, onClose, onSelect, title, recipes = INITIAL_RECIPES }) => {
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          
          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-[10%] bottom-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[600px] bg-surface rounded-[2rem] shadow-2xl z-[70] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-surface-container flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                <p className="text-sm text-on-surface-variant">Choose a recipe to add to your plan</p>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container-high transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Search */}
            <div className="p-6 bg-surface-container-low">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5" />
                <input 
                  type="text"
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-surface-lowest rounded-xl border-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {filteredRecipes.map((recipe) => (
                <button 
                  key={recipe.id}
                  onClick={() => {
                    onSelect(recipe.id);
                    onClose();
                  }}
                  className="w-full flex items-center gap-4 p-3 rounded-2xl bg-surface-lowest border border-surface-container hover:border-primary/30 hover:bg-primary/5 transition-all group text-left"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="font-bold text-base mb-1 truncate group-hover:text-primary transition-colors">{recipe.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-on-surface-variant font-medium">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {recipe.prepTime}m</span>
                      <span>•</span>
                      <span className="font-bold text-on-surface">{recipe.calories} kcal</span>
                      <span>•</span>
                      <span className="text-emerald-500 font-medium">{recipe.protein}g P</span>
                      <span className="text-sky-500 font-medium">{recipe.carbs}g C</span>
                      <span className="text-rose-500 font-medium">{recipe.fats}g F</span>
                      {recipe.fiber !== undefined && (
                        <span className="text-purple-500 font-medium">{recipe.fiber}g Fib</span>
                      )}
                    </div>
                  </div>
                  <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    Select
                  </div>
                </button>
              ))}
              {filteredRecipes.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-on-surface-variant font-medium">No recipes found matching your search.</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
