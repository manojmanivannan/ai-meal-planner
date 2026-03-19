import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Users, Flame, CheckCircle2, Edit2, Zap, Leaf } from 'lucide-react';
import { Recipe } from '../types';
import { MEAL_TYPE_LABELS } from '../constants';
import { fetchRecipe } from '../api';

interface RecipeDetailScreenProps {
  recipe: Recipe;
  onBack: () => void;
  onEdit: () => void;
}

export const RecipeDetailScreen: React.FC<RecipeDetailScreenProps> = ({ recipe: initialRecipe, onBack, onEdit }) => {
  const [recipe, setRecipe] = React.useState(initialRecipe);
  const [loading, setLoading] = React.useState(false);

  // Fetch full recipe with ingredients
  React.useEffect(() => {
    setLoading(true);
    fetchRecipe(initialRecipe.id)
      .then(setRecipe)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [initialRecipe.id]);

  const instructions = recipe.instructions
    ? recipe.instructions.split(/\n+/).filter(s => s.trim())
    : [];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto pb-32"
    >
      {/* Hero Header */}
      <div className="relative h-[35vh] w-full overflow-hidden rounded-b-[3rem] bg-gradient-to-br from-primary/20 via-primary-container/30 to-surface">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[120px] opacity-20">{recipe.is_vegetarian ? '🥗' : '🍽️'}</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <div className="absolute top-8 left-8 right-8 flex justify-between items-center">
          <button 
            onClick={onBack}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={onEdit}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all"
          >
            <Edit2 className="w-5 h-5" />
          </button>
        </div>
        
        <div className="absolute bottom-12 left-8 right-8">
          <div className="flex gap-2 mb-4">
            <span className="bg-primary text-on-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {MEAL_TYPE_LABELS[recipe.meal_type] || recipe.meal_type}
            </span>
            {recipe.is_vegetarian && (
              <span className="bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Leaf className="w-3 h-3" /> Vegetarian
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2">{recipe.name}</h1>
        </div>
      </div>

      <div className="px-6 mt-12 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left Column: Info & Ingredients */}
        <div className="md:col-span-7 space-y-12">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-low p-4 rounded-2xl text-center">
              <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-[10px] font-bold text-on-surface-variant uppercase">Serves</p>
              <p className="font-bold">{recipe.serves}</p>
            </div>
            <div className="bg-surface-container-low p-4 rounded-2xl text-center">
              <Zap className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-[10px] font-bold text-on-surface-variant uppercase">Energy</p>
              <p className="font-bold">{Math.round(recipe.energy)} kcal</p>
            </div>
          </div>

          {/* Ingredients */}
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <section>
              <h2 className="text-2xl font-bold mb-6">Ingredients</h2>
              <div className="space-y-3">
                {(recipe.ingredients || []).map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-surface-lowest rounded-xl border border-surface-container">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-primary/30" />
                      <span className="font-medium text-on-surface">{item.name}</span>
                    </div>
                    <span className="font-bold text-on-surface-variant">{item.quantity} {item.serving_unit}</span>
                  </div>
                ))}
                {(!recipe.ingredients || recipe.ingredients.length === 0) && (
                  <p className="text-on-surface-variant text-sm">No ingredient data available.</p>
                )}
              </div>
            </section>
          )}

          {/* Instructions */}
          {instructions.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Method</h2>
              <div className="space-y-8">
                {instructions.map((step, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-black text-primary">
                      {i + 1}
                    </div>
                    <p className="text-on-surface-variant leading-relaxed pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Nutrition */}
        <div className="md:col-span-5">
          <div className="sticky top-8 bg-surface-container-low rounded-[2rem] p-8 space-y-8">
            <div className="flex items-center gap-3">
              <Flame className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold">Nutrition Facts</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-baseline justify-between">
                <span className="text-on-surface-variant font-medium">Energy</span>
                <span className="text-3xl font-black text-primary">{Math.round(recipe.energy)} <span className="text-sm font-medium opacity-60">kcal</span></span>
              </div>
              
              <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '40%' }} />
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { label: 'Protein', val: recipe.protein, unit: 'g', color: 'bg-blue-400' },
                  { label: 'Carbohydrates', val: recipe.carbs, unit: 'g', color: 'bg-green-400' },
                  { label: 'Fat', val: recipe.fat, unit: 'g', color: 'bg-yellow-400' },
                  { label: 'Fiber', val: recipe.fiber, unit: 'g', color: 'bg-orange-400' },
                ].map(macro => (
                  <div key={macro.label} className="flex items-center justify-between p-4 bg-surface-lowest rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${macro.color}`} />
                      <span className="font-bold text-sm">{macro.label}</span>
                    </div>
                    <span className="font-black">{Math.round(macro.val)}{macro.unit}</span>
                  </div>
                ))}
              </div>

              {/* Micronutrients */}
              <div className="pt-4 border-t border-surface-container">
                <h4 className="text-sm font-bold text-on-surface-variant mb-3 uppercase tracking-wider">Micronutrients</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Iron', val: recipe.iron_mg, unit: 'mg' },
                    { label: 'Calcium', val: recipe.calcium_mg, unit: 'mg' },
                    { label: 'Magnesium', val: recipe.magnesium_mg, unit: 'mg' },
                    { label: 'Potassium', val: recipe.potassium_mg, unit: 'mg' },
                    { label: 'Sodium', val: recipe.sodium_mg, unit: 'mg' },
                    { label: 'Vitamin C', val: recipe.vitamin_c_mg, unit: 'mg' },
                  ].map(micro => (
                    <div key={micro.label} className="flex justify-between p-2 text-sm">
                      <span className="text-on-surface-variant">{micro.label}</span>
                      <span className="font-bold">{Math.round(micro.val * 10) / 10}{micro.unit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-surface-container">
              <div className="flex items-center gap-2 text-on-surface-variant text-xs font-medium">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Calculated based on standard portions
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
