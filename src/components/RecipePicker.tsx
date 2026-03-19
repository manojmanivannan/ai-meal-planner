import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Zap } from 'lucide-react';
import { Recipe } from '../types';
import { MEAL_TYPE_LABELS } from '../constants';
import { fetchRecipes } from '../api';

interface RecipePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (recipeId: number) => void;
  title: string;
}

export const RecipePicker: React.FC<RecipePickerProps> = ({ isOpen, onClose, onSelect, title }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (isOpen && recipes.length === 0) {
      setLoading(true);
      fetchRecipes({ limit: 500 })
        .then(setRecipes)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [isOpen]);

  const filteredRecipes = recipes.filter(recipe => 
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.meal_type.toLowerCase().includes(searchQuery.toLowerCase())
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
              {loading && (
                <div className="flex justify-center py-12">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              {!loading && filteredRecipes.map((recipe) => (
                <button 
                  key={recipe.id}
                  onClick={() => {
                    onSelect(recipe.id);
                    onClose();
                  }}
                  className="w-full flex items-center gap-4 p-3 rounded-2xl bg-surface-lowest border border-surface-container hover:border-primary/30 hover:bg-primary/5 transition-all group text-left"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary/10 to-primary-container/20 flex items-center justify-center">
                    <span className="text-3xl opacity-50">{recipe.is_vegetarian ? '🥗' : '🍽️'}</span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{recipe.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-on-surface-variant font-medium">
                      <span>{MEAL_TYPE_LABELS[recipe.meal_type] || recipe.meal_type}</span>
                      <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> {Math.round(recipe.energy)} kcal</span>
                    </div>
                  </div>
                  <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    Select
                  </div>
                </button>
              ))}
              {!loading && filteredRecipes.length === 0 && (
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
