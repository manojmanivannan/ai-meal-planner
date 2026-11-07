import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Plus } from 'lucide-react';
import { Ingredient } from '../types';
import { INITIAL_INGREDIENTS } from '../constants';

interface IngredientPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (ingredient: Ingredient) => void;
  onAddNew: () => void;
}

export const IngredientPicker: React.FC<IngredientPickerProps> = ({ 
  isOpen, 
  onClose, 
  onSelect, 
  onAddNew 
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredIngredients = INITIAL_INGREDIENTS.filter(ing => 
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
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-[12%] bottom-[12%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[520px] bg-surface rounded-2xl shadow-xl z-50 flex flex-col overflow-hidden border border-surface-container"
          >
            <div className="p-4 sm:p-5 border-b border-surface-container flex items-center justify-between bg-surface-lowest">
              <div>
                <h2 className="text-lg font-black text-on-surface tracking-tight">Select Ingredient</h2>
                <p className="text-xs text-on-surface-variant mt-0.5">Pick from your pantry or register a custom ingredient</p>
              </div>
              <button 
                onClick={onClose} 
                className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-low transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-surface-low border-b border-surface-container">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
                <input 
                  type="text"
                  placeholder="Search by ingredient name or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-surface-lowest rounded-xl border border-surface-container text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              <button 
                onClick={() => {
                  onAddNew();
                  onClose();
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-primary-light/50 border border-dashed border-primary/40 text-primary hover:bg-primary-light transition-all text-left cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center shrink-0">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-xs">Add New Custom Ingredient</p>
                  <p className="text-[10px] text-on-surface-variant">Create and define custom nutrition specs</p>
                </div>
              </button>

              {filteredIngredients.map((ing) => (
                <button 
                  key={ing.id}
                  onClick={() => {
                    onSelect(ing);
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-surface-lowest border border-surface-container hover:border-primary/40 hover:bg-surface-low transition-all group text-left cursor-pointer shadow-2xs"
                >
                  <div className="w-9 h-9 rounded-lg bg-surface-low border border-surface-container flex items-center justify-center text-lg shrink-0">
                    {ing.icon || '🥗'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-xs text-on-surface group-hover:text-primary transition-colors truncate">
                      {ing.name}
                    </p>
                    <p className="text-[10px] text-on-surface-variant font-medium">
                      {ing.category} · Base: {ing.baseQuantity} {ing.baseUnit} · {ing.calories} kcal
                    </p>
                  </div>
                  <div className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    {ing.protein}g P
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
