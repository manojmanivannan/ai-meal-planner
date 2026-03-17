import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Flame, Trash2, Camera } from 'lucide-react';
import { Category, Ingredient } from '../types';

interface EditIngredientScreenProps {
  ingredient?: Ingredient;
  onBack: () => void;
  onSave: (ingredient: Partial<Ingredient>) => void;
  onDelete?: (id: string) => void;
}

export const EditIngredientScreen: React.FC<EditIngredientScreenProps> = ({ 
  ingredient, 
  onBack, 
  onSave,
  onDelete 
}) => {
  const categories: Category[] = ['Produce', 'Dairy', 'Protein', 'Pantry', 'Spices', 'Grains'];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto space-y-10 pb-12"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold text-primary">{ingredient ? 'Edit Ingredient' : 'New Ingredient'}</h1>
      </div>

      {/* Hero Visual */}
      <section className="relative h-48 w-full rounded-lg overflow-hidden bg-surface-container-low">
        {ingredient?.image ? (
          <img src={ingredient.image} alt={ingredient.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/30">
            <Camera className="w-10 h-10 text-primary/40 mb-2" />
            <span className="text-sm font-semibold text-on-surface-variant">Upload Image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-4 left-6">
          <span className="bg-tertiary-fixed text-on-tertiary-fixed px-4 py-1 rounded-full text-xs font-semibold">
            {ingredient?.category || 'Produce'}
          </span>
        </div>
      </section>

      {/* Form */}
      <section className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-on-surface-variant px-1">Ingredient Name</label>
          <input 
            className="w-full bg-surface-container-low border-none rounded-lg px-5 py-4 text-on-surface focus:ring-2 focus:ring-primary/30 transition-all font-medium" 
            placeholder="e.g. Red Onion" 
            defaultValue={ingredient?.name}
          />
        </div>

        <div className="space-y-4">
          <label className="text-sm font-semibold text-on-surface-variant px-1">Category</label>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {categories.map(cat => (
              <button 
                key={cat}
                className={`whitespace-nowrap px-6 py-2 rounded-full font-semibold transition-all ${
                  cat === (ingredient?.category || 'Produce')
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-on-surface-variant px-1">Base Quantity</label>
            <input 
              className="w-full bg-surface-container-low border-none rounded-lg px-5 py-4 text-on-surface focus:ring-2 focus:ring-primary/30 transition-all font-medium" 
              type="number" 
              defaultValue={ingredient?.baseQuantity || 100}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-on-surface-variant px-1">Base Unit</label>
            <select className="w-full bg-surface-container-low border-none rounded-lg px-5 py-4 text-on-surface focus:ring-2 focus:ring-primary/30 transition-all font-medium appearance-none">
              <option>Grams</option>
              <option>Milliliters</option>
              <option>Cups</option>
              <option>Tbsp</option>
            </select>
          </div>
        </div>
      </section>

      {/* Nutrition */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-on-surface px-1">Nutrition per Base Quantity</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 bg-surface-lowest p-6 rounded-lg flex items-center justify-between group hover:bg-surface-container-high transition-colors">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-on-surface-variant">Calories</p>
              <div className="flex items-baseline gap-1">
                <input className="w-20 bg-transparent border-none p-0 text-2xl font-bold text-primary focus:ring-0" type="number" defaultValue={ingredient?.calories || 0} />
                <span className="text-on-surface-variant font-medium">kcal</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <Flame className="w-6 h-6" />
            </div>
          </div>
          
          <div className="bg-surface-lowest p-5 rounded-lg space-y-1 hover:bg-surface-container-high transition-colors">
            <p className="text-xs font-semibold text-on-surface-variant">Protein</p>
            <div className="flex items-baseline gap-1">
              <input className="w-12 bg-transparent border-none p-0 text-xl font-bold text-on-surface focus:ring-0" type="number" defaultValue={ingredient?.protein || 0} />
              <span className="text-xs font-medium text-on-surface-variant">g</span>
            </div>
          </div>

          <div className="bg-surface-lowest p-5 rounded-lg space-y-1 hover:bg-surface-container-high transition-colors">
            <p className="text-xs font-semibold text-on-surface-variant">Carbs</p>
            <div className="flex items-baseline gap-1">
              <input className="w-12 bg-transparent border-none p-0 text-xl font-bold text-on-surface focus:ring-0" type="number" defaultValue={ingredient?.carbs || 0} />
              <span className="text-xs font-medium text-on-surface-variant">g</span>
            </div>
          </div>

          <div className="col-span-2 bg-surface-lowest p-5 rounded-lg space-y-1 hover:bg-surface-container-high transition-colors">
            <p className="text-xs font-semibold text-on-surface-variant">Fats</p>
            <div className="flex items-baseline gap-1">
              <input className="w-12 bg-transparent border-none p-0 text-xl font-bold text-on-surface focus:ring-0" type="number" defaultValue={ingredient?.fats || 0} />
              <span className="text-xs font-medium text-on-surface-variant">g</span>
            </div>
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="pt-8 space-y-4">
        <button 
          onClick={() => onSave({})}
          className="w-full gradient-primary text-on-primary py-5 rounded-full font-bold shadow-lg hover:opacity-90 active:scale-[0.98] transition-all"
        >
          Save Changes
        </button>
        {ingredient && (
          <button 
            onClick={() => onDelete?.(ingredient.id)}
            className="w-full border-2 border-red-100 text-red-600 py-4 rounded-full font-bold hover:bg-red-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            Delete Ingredient
          </button>
        )}
      </div>
    </motion.div>
  );
};
