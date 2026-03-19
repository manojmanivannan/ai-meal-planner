import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Flame, Trash2 } from 'lucide-react';
import { Ingredient, Category } from '../types';
import { CATEGORY_LABELS, CATEGORY_ICONS } from '../constants';

interface EditIngredientScreenProps {
  ingredient: Ingredient | null;
  onBack: () => void;
  onSave: (ingredient: Partial<Ingredient>) => void;
  onDelete?: () => void;
}

export const EditIngredientScreen: React.FC<EditIngredientScreenProps> = ({ 
  ingredient, 
  onBack, 
  onSave,
  onDelete 
}) => {
  const categories = Object.keys(CATEGORY_LABELS) as Category[];

  const [name, setName] = React.useState(ingredient?.name || '');
  const [category, setCategory] = React.useState<Category>(ingredient?.category || 'vegetables');
  const [servingSize, setServingSize] = React.useState(ingredient?.serving_size || 100);
  const [servingUnit, setServingUnit] = React.useState(ingredient?.serving_unit || 'g');
  const [energy, setEnergy] = React.useState(ingredient?.energy || 0);
  const [protein, setProtein] = React.useState(ingredient?.protein || 0);
  const [carbs, setCarbs] = React.useState(ingredient?.carbs || 0);
  const [fat, setFat] = React.useState(ingredient?.fat || 0);
  const [fiber, setFiber] = React.useState(ingredient?.fiber || 0);

  const handleSave = () => {
    onSave({
      name,
      category,
      serving_size: servingSize,
      serving_unit: servingUnit,
      energy,
      protein,
      carbs,
      fat,
      fiber,
    });
  };

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
        <div className="w-full h-full flex flex-col items-center justify-center">
          <span className="text-6xl mb-2">{CATEGORY_ICONS[category] || '📦'}</span>
          <span className="text-sm font-semibold text-on-surface-variant">{name || 'New Ingredient'}</span>
        </div>
        <div className="absolute bottom-4 left-6">
          <span className="bg-tertiary-fixed text-on-tertiary-fixed px-4 py-1 rounded-full text-xs font-semibold">
            {CATEGORY_LABELS[category] || category}
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <label className="text-sm font-semibold text-on-surface-variant px-1">Category</label>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full font-semibold transition-all text-sm ${
                  cat === category
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {CATEGORY_ICONS[cat]} {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-on-surface-variant px-1">Serving Size</label>
            <input 
              className="w-full bg-surface-container-low border-none rounded-lg px-5 py-4 text-on-surface focus:ring-2 focus:ring-primary/30 transition-all font-medium" 
              type="number" 
              value={servingSize}
              onChange={(e) => setServingSize(parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-on-surface-variant px-1">Serving Unit</label>
            <select 
              className="w-full bg-surface-container-low border-none rounded-lg px-5 py-4 text-on-surface focus:ring-2 focus:ring-primary/30 transition-all font-medium appearance-none"
              value={servingUnit}
              onChange={(e) => setServingUnit(e.target.value)}
            >
              <option value="g">Grams</option>
              <option value="ml">Milliliters</option>
              <option value="cup">Cups</option>
              <option value="tbsp">Tbsp</option>
              <option value="tsp">Tsp</option>
              <option value="piece">Piece</option>
              <option value="nos">Nos</option>
            </select>
          </div>
        </div>
      </section>

      {/* Nutrition */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-on-surface px-1">Nutrition per Serving</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 bg-surface-lowest p-6 rounded-lg flex items-center justify-between group hover:bg-surface-container-high transition-colors">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-on-surface-variant">Energy</p>
              <div className="flex items-baseline gap-1">
                <input className="w-20 bg-transparent border-none p-0 text-2xl font-bold text-primary focus:ring-0" type="number" value={energy} onChange={(e) => setEnergy(parseFloat(e.target.value) || 0)} />
                <span className="text-on-surface-variant font-medium">kcal</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <Flame className="w-6 h-6" />
            </div>
          </div>
          
          {[
            { label: 'Protein', value: protein, setter: setProtein },
            { label: 'Carbs', value: carbs, setter: setCarbs },
            { label: 'Fat', value: fat, setter: setFat },
            { label: 'Fiber', value: fiber, setter: setFiber },
          ].map(({ label, value, setter }) => (
            <div key={label} className="bg-surface-lowest p-5 rounded-lg space-y-1 hover:bg-surface-container-high transition-colors">
              <p className="text-xs font-semibold text-on-surface-variant">{label}</p>
              <div className="flex items-baseline gap-1">
                <input className="w-12 bg-transparent border-none p-0 text-xl font-bold text-on-surface focus:ring-0" type="number" value={value} onChange={(e) => setter(parseFloat(e.target.value) || 0)} />
                <span className="text-xs font-medium text-on-surface-variant">g</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Actions */}
      <div className="pt-8 space-y-4">
        <button 
          onClick={handleSave}
          className="w-full gradient-primary text-on-primary py-5 rounded-full font-bold shadow-lg hover:opacity-90 active:scale-[0.98] transition-all"
        >
          {ingredient ? 'Save Changes' : 'Create Ingredient'}
        </button>
        {ingredient && onDelete && (
          <button 
            onClick={onDelete}
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
