import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Flame, Trash2, Camera, Check } from 'lucide-react';
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
  React.useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [ingredient?.id]);
  const categories: Category[] = ['Produce', 'Dairy', 'Protein', 'Pantry', 'Spices', 'Grains'];
  const [name, setName] = React.useState(ingredient?.name || '');
  const [category, setCategory] = React.useState<Category>(ingredient?.category || 'Produce');
  const [baseQuantity, setBaseQuantity] = React.useState(ingredient?.baseQuantity || 100);
  const [baseUnit, setBaseUnit] = React.useState(ingredient?.baseUnit === 'Grams' ? 'g' : ingredient?.baseUnit || 'g');
  const [calories, setCalories] = React.useState(ingredient?.calories || 0);
  const [protein, setProtein] = React.useState(ingredient?.protein || 0);
  const [carbs, setCarbs] = React.useState(ingredient?.carbs || 0);
  const [fats, setFats] = React.useState(ingredient?.fats || 0);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSave({
      name: name.trim() || 'New Ingredient',
      category,
      baseQuantity: Number(baseQuantity) || 100,
      baseUnit: baseUnit === 'g' ? 'Grams' : baseUnit,
      calories: Number(calories) || 0,
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fats: Number(fats) || 0,
      icon: category === 'Produce' ? '🥦' : category === 'Dairy' ? '🧀' : category === 'Protein' ? '🥩' : '🌾',
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="max-w-xl mx-auto space-y-6 pb-24"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-surface-container">
        <div>
          <h1 className="text-2xl font-black text-on-surface tracking-tight">
            {ingredient ? 'Edit Ingredient' : 'New Ingredient'}
          </h1>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Configure macro density and default serving measurements.
          </p>
        </div>
        {ingredient && onDelete && (
          <button 
            onClick={() => {
              if (confirm('Are you sure you want to delete this ingredient?')) {
                onDelete(ingredient.id);
              }
            }}
            className="flex items-center gap-1.5 text-rose-600 hover:bg-rose-50 border border-rose-200 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Ingredient Name */}
        <div className="bg-surface-lowest rounded-2xl p-5 border border-surface-container shadow-2xs space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
              Ingredient Name
            </label>
            <input 
              className="w-full bg-surface-low border border-surface-container rounded-xl px-4 py-3 text-base font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-on-surface-variant/40" 
              placeholder="e.g. Red Onion" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Category Tabs */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
              Category
            </label>
            <div className="flex gap-1.5 flex-wrap">
              {categories.map(cat => {
                const isSelected = category === cat;
                return (
                  <button 
                    type="button"
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-primary text-white shadow-2xs'
                        : 'bg-surface-low hover:bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Serving Size & Unit */}
        <div className="bg-surface-lowest rounded-2xl p-5 border border-surface-container shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-on-surface uppercase tracking-wider">
            Standard Serving Base
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Serving Size (Qty)
              </label>
              <input 
                className="w-full bg-surface-low border border-surface-container rounded-xl px-4 py-2.5 text-sm font-mono font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" 
                type="number" 
                value={baseQuantity}
                onChange={(e) => setBaseQuantity(parseFloat(e.target.value) || 0)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Base Unit
              </label>
              <select 
                value={baseUnit}
                onChange={(e) => setBaseUnit(e.target.value)}
                className="w-full bg-surface-low border border-surface-container rounded-xl px-3 py-2.5 text-sm font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer"
              >
                <option value="g">Grams (g)</option>
                <option value="ml">Milliliters (ml)</option>
                <option value="cups">Cups</option>
                <option value="tbsp">Tablespoons (tbsp)</option>
                <option value="piece">Piece / Whole</option>
              </select>
            </div>
          </div>
        </div>

        {/* Nutritional Information (4 spin buttons: Energy, Protein, Carbs, Fat) */}
        <div className="bg-surface-lowest rounded-2xl p-5 border border-surface-container shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-surface-container">
            <Flame className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-bold text-on-surface uppercase tracking-wider">
              Nutrition per Serving Base
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Calories (Spin Button 1) */}
            <div className="col-span-2 p-3.5 bg-surface-low rounded-xl border border-surface-container/60 flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-on-surface-variant uppercase">Energy / Calories</span>
                <span className="text-[11px] text-on-surface-variant/70">Total intake per base unit</span>
              </div>
              <div className="flex items-center gap-1.5">
                <input 
                  className="w-24 bg-surface-lowest border border-surface-container rounded-lg px-2.5 py-1.5 text-lg font-mono font-bold text-on-surface text-right focus:outline-none focus:ring-1 focus:ring-primary" 
                  type="number" 
                  value={calories}
                  onChange={(e) => setCalories(parseFloat(e.target.value) || 0)}
                />
                <span className="text-xs font-bold text-on-surface-variant">kcal</span>
              </div>
            </div>

            {/* Protein (Spin Button 2) */}
            <div className="p-3 bg-surface-low rounded-xl border border-surface-container/60 space-y-1">
              <span className="block text-[11px] font-bold text-emerald-600 uppercase">Protein</span>
              <div className="flex items-center gap-1">
                <input 
                  className="w-full bg-surface-lowest border border-surface-container rounded-lg px-2 py-1 text-sm font-mono font-bold text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" 
                  type="number" 
                  step="0.1"
                  value={protein}
                  onChange={(e) => setProtein(parseFloat(e.target.value) || 0)}
                />
                <span className="text-xs font-bold text-on-surface-variant">g</span>
              </div>
            </div>

            {/* Carbs (Spin Button 3) */}
            <div className="p-3 bg-surface-low rounded-xl border border-surface-container/60 space-y-1">
              <span className="block text-[11px] font-bold text-sky-600 uppercase">Carbohydrates</span>
              <div className="flex items-center gap-1">
                <input 
                  className="w-full bg-surface-lowest border border-surface-container rounded-lg px-2 py-1 text-sm font-mono font-bold text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" 
                  type="number" 
                  step="0.1"
                  value={carbs}
                  onChange={(e) => setCarbs(parseFloat(e.target.value) || 0)}
                />
                <span className="text-xs font-bold text-on-surface-variant">g</span>
              </div>
            </div>

            {/* Fats (Spin Button 4) */}
            <div className="col-span-2 p-3 bg-surface-low rounded-xl border border-surface-container/60 space-y-1">
              <span className="block text-[11px] font-bold text-rose-600 uppercase">Fats</span>
              <div className="flex items-center gap-1">
                <input 
                  className="w-full bg-surface-lowest border border-surface-container rounded-lg px-2 py-1 text-sm font-mono font-bold text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" 
                  type="number" 
                  step="0.1"
                  value={fats}
                  onChange={(e) => setFats(parseFloat(e.target.value) || 0)}
                />
                <span className="text-xs font-bold text-on-surface-variant">g</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button 
            type="button"
            onClick={onBack}
            className="px-5 py-2.5 rounded-xl bg-surface-lowest hover:bg-surface-low text-on-surface font-bold text-xs border border-surface-container transition-colors"
          >
            Cancel
          </button>
          <button 
            id="save-ingredient-form-btn"
            type="submit"
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-2xs transition-all active:scale-95 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>{ingredient ? 'Save Changes' : 'Create Ingredient'}</span>
          </button>
        </div>
      </form>
    </motion.div>
  );
};
