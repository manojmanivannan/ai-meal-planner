import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Users, Star, Flame, CheckCircle2, ShoppingCart, Edit2, Trash2 } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeDetailScreenProps {
  recipe: Recipe;
  onBack: () => void;
  onEdit: () => void;
  onDelete: (id: string) => void;
}

export const RecipeDetailScreen: React.FC<RecipeDetailScreenProps> = ({ recipe, onBack, onEdit, onDelete }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto pb-32"
    >
      {/* Hero Header */}
      <div className="relative h-[50vh] w-full overflow-hidden rounded-b-[3rem]">
        <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <div className="absolute top-8 left-8 right-8 flex justify-between items-center">
          <button 
            onClick={onBack}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="flex gap-3">
            <button 
              onClick={onEdit}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all"
            >
              <Edit2 className="w-5 h-5" />
            </button>
            <button 
              onClick={() => {
                if (confirm('Are you sure you want to delete this recipe?')) {
                  onDelete(recipe.id);
                }
              }}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-error hover:bg-error/40 transition-all"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-8 right-8">
          <div className="flex gap-2 mb-4">
            {recipe.tags.map(tag => (
              <span key={tag} className="bg-primary text-on-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2">{recipe.title}</h1>
          <p className="text-white/80 text-lg max-w-2xl line-clamp-2">{recipe.description}</p>
        </div>
      </div>

      <div className="px-6 mt-12 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left Column: Info & Ingredients */}
        <div className="md:col-span-7 space-y-12">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-surface-container-low p-4 rounded-2xl text-center">
              <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-[10px] font-bold text-on-surface-variant uppercase">Time</p>
              <p className="font-bold">{recipe.prepTime}m</p>
            </div>
            <div className="bg-surface-container-low p-4 rounded-2xl text-center">
              <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-[10px] font-bold text-on-surface-variant uppercase">Serves</p>
              <p className="font-bold">{recipe.servings}</p>
            </div>
            <div className="bg-surface-container-low p-4 rounded-2xl text-center">
              <Star className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-[10px] font-bold text-on-surface-variant uppercase">Level</p>
              <p className="font-bold">{recipe.difficulty}</p>
            </div>
          </div>

          {/* Ingredients */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Ingredients</h2>
              <button className="flex items-center gap-2 text-primary font-bold text-sm">
                <ShoppingCart className="w-4 h-4" /> Add all to list
              </button>
            </div>
            <div className="space-y-3">
              {recipe.ingredients.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-surface-lowest rounded-xl border border-surface-container">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary/30" />
                    <span className="font-medium text-on-surface capitalize">{item.name || `Ingredient ${i + 1}`}</span>
                  </div>
                  <span className="font-bold text-on-surface-variant">{item.quantity} {item.unit}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Instructions */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Method</h2>
            <div className="space-y-8">
              {recipe.instructions.map((step, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-black text-primary">
                    {i + 1}
                  </div>
                  <p className="text-on-surface-variant leading-relaxed pt-1">{step}</p>
                </div>
              ))}
            </div>
          </section>
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
                <span className="text-on-surface-variant font-medium">Calories</span>
                <span className="text-3xl font-black text-primary">{recipe.calories} <span className="text-sm font-medium opacity-60">kcal</span></span>
              </div>
              
              <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '40%' }} />
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { label: 'Protein', val: recipe.protein, unit: 'g', color: 'bg-blue-400' },
                  { label: 'Carbohydrates', val: recipe.carbs, unit: 'g', color: 'bg-green-400' },
                  { label: 'Fats', val: recipe.fats, unit: 'g', color: 'bg-yellow-400' }
                ].map(macro => (
                  <div key={macro.label} className="flex items-center justify-between p-4 bg-surface-lowest rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${macro.color}`} />
                      <span className="font-bold text-sm">{macro.label}</span>
                    </div>
                    <span className="font-black">{macro.val}{macro.unit}</span>
                  </div>
                ))}
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
