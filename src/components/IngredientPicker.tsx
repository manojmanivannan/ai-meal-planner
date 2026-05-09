import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search } from 'lucide-react';
import { Ingredient } from '../types';
import { CATEGORY_LABELS, CATEGORY_ICONS } from '../constants';
import { fetchIngredients } from '../api';

interface IngredientPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (ingredient: Ingredient) => void;
}

export const IngredientPicker: React.FC<IngredientPickerProps> = ({ isOpen, onClose, onSelect }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (isOpen && ingredients.length === 0) {
      setLoading(true);
      fetchIngredients({ limit: 1000 })
        .then(setIngredients)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [isOpen]);

  const filteredIngredients = ingredients.filter(ing => 
    ing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ing.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-[15%] bottom-[15%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[500px] bg-surface rounded-[2rem] shadow-2xl z-[110] flex flex-col overflow-hidden"
          >
            <div className="p-6 border-b border-surface-container flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Select Ingredient</h2>
                <p className="text-xs text-on-surface-variant">Choose from your ingredient hub</p>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container-high transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-surface-container-low">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
                <input 
                  type="text"
                  placeholder="Search ingredients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-lowest rounded-xl border-none text-sm focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-2">
              {loading && (
                <div className="flex justify-center py-8">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              {!loading && filteredIngredients.map((ing) => (
                <button 
                  key={ing.id}
                  onClick={() => {
                    onSelect(ing);
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-surface-lowest border border-surface-container hover:border-primary/30 hover:bg-primary/5 transition-all group text-left"
                >
                  <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-xl">
                    {CATEGORY_ICONS[ing.category] || '📦'}
                  </div>
                  <div className="flex-grow">
                    <p className="font-bold text-sm group-hover:text-primary transition-colors">{ing.name}</p>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-medium">{CATEGORY_LABELS[ing.category] || ing.category} • {ing.serving_unit}</p>
                  </div>
                </button>
              ))}
              {!loading && filteredIngredients.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-on-surface-variant font-medium text-sm">No ingredients found.</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
