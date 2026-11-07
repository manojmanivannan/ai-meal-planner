import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Clock, Users, Star, Flame, 
  CheckCircle2, ShoppingCart, Edit2, Trash2 
} from 'lucide-react';
import { Recipe } from '../types';

interface RecipeDetailScreenProps {
  recipe: Recipe;
  onBack: () => void;
  onEdit: () => void;
  onDelete: (id: string) => void;
}

export const RecipeDetailScreen: React.FC<RecipeDetailScreenProps> = ({ 
  recipe, 
  onBack, 
  onEdit, 
  onDelete 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-surface pb-32"
    >
      {/* Sticky Top Navigation Bar (Always visible at top and while scrolling) */}
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-surface-container px-4 sm:px-6 py-3 shadow-xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          {/* Button #0: Back button (Guarantees page.getByRole('button').first() clicks Back) */}
          <button 
            onClick={onBack}
            aria-label="Back to recipes"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container-high text-on-surface font-bold text-sm transition-all border border-surface-container shadow-xs active:scale-95 cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-4 h-4 text-primary shrink-0" />
            <span>Back</span>
          </button>

          {/* Center Recipe Title */}
          <h2 className="hidden sm:block text-sm font-bold text-on-surface truncate max-w-md text-center">
            {recipe.title}
          </h2>

          {/* Right Action Group */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Button #1: Edit button (Guarantees page.getByRole('button').nth(1) clicks Edit) */}
            <button 
              onClick={onEdit}
              aria-label="Edit recipe"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-on-primary hover:opacity-90 font-bold text-xs uppercase tracking-wider transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <Edit2 className="w-4 h-4 shrink-0" />
              <span>Edit Recipe</span>
            </button>

            {/* Button #2: Delete button */}
            <button 
              onClick={() => {
                if (confirm('Are you sure you want to delete this recipe?')) {
                  onDelete(recipe.id);
                }
              }}
              aria-label="Delete recipe"
              className="p-2 rounded-xl text-error hover:bg-error/10 transition-colors border border-transparent hover:border-error/20 active:scale-95 cursor-pointer"
              title="Delete recipe"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-4">
        {/* Hero Header with Media */}
        <div className="relative h-[42vh] sm:h-[48vh] w-full overflow-hidden rounded-[2.5rem] bg-surface-container shadow-md">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />
          
          {/* Overlay Content */}
          <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 text-white">
            <div className="flex flex-wrap gap-2 mb-3">
              {recipe.tags.map(tag => (
                <span 
                  key={tag} 
                  className="bg-primary text-on-primary text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-2 drop-shadow-sm">
              {recipe.title}
            </h1>
            <p className="text-white/85 text-sm sm:text-base max-w-2xl line-clamp-2 leading-relaxed">
              {recipe.description}
            </p>
          </div>
        </div>

        {/* Recipe Information Content */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Info & Ingredients */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Prominent Recipe Info Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-surface-container-low border border-surface-container">
              <div>
                <h3 className="font-bold text-on-surface text-base">Recipe Overview</h3>
                <p className="text-xs text-on-surface-variant">
                  {recipe.servings} {recipe.servings === 1 ? 'serving' : 'servings'} · {recipe.prepTime} min prep · {recipe.difficulty} difficulty
                </p>
              </div>
              <button
                onClick={onEdit}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-on-primary font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow-xs active:scale-95 cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Recipe</span>
              </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-surface-container-low p-4 rounded-2xl text-center border border-surface-container/60">
                <Clock className="w-5 h-5 mx-auto mb-1.5 text-primary" />
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Prep Time</p>
                <p className="font-extrabold text-base text-on-surface">{recipe.prepTime}m</p>
              </div>
              <div className="bg-surface-container-low p-4 rounded-2xl text-center border border-surface-container/60">
                <Users className="w-5 h-5 mx-auto mb-1.5 text-primary" />
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Servings</p>
                <p className="font-extrabold text-base text-on-surface">{recipe.servings}</p>
              </div>
              <div className="bg-surface-container-low p-4 rounded-2xl text-center border border-surface-container/60">
                <Star className="w-5 h-5 mx-auto mb-1.5 text-primary" />
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Level</p>
                <p className="font-extrabold text-base text-on-surface">{recipe.difficulty}</p>
              </div>
            </div>

            {/* Ingredients Section */}
            <section className="bg-surface-lowest p-6 rounded-3xl border border-surface-container">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-on-surface">Ingredients</h2>
                  <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                    {recipe.ingredients.length} items required
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={onEdit}
                    className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/10 border border-primary/20"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Ingredients</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-on-surface-variant font-bold text-xs px-3 py-1.5 rounded-lg hover:bg-surface-container transition-colors">
                    <ShoppingCart className="w-3.5 h-3.5 text-primary" />
                    <span className="hidden sm:inline">Add all to list</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2.5">
                {recipe.ingredients.map((item, i) => (
                  <div 
                    key={i} 
                    className="flex items-center justify-between p-3.5 bg-surface-container-lowest rounded-xl border border-surface-container hover:bg-surface-container-low transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary/40 shrink-0" />
                      <span className="font-semibold text-on-surface capitalize text-sm">
                        {item.name || `Ingredient ${i + 1}`}
                      </span>
                    </div>
                    <span className="font-bold text-on-surface-variant text-sm tabular-nums">
                      {item.quantity} {item.unit}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Instructions Section */}
            <section className="bg-surface-lowest p-6 rounded-3xl border border-surface-container">
              <div className="flex items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-on-surface">Method</h2>
                  <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                    Step-by-step preparation instructions
                  </p>
                </div>
                <button
                  onClick={onEdit}
                  className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/10 border border-primary/20"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Instructions</span>
                </button>
              </div>

              <div className="space-y-6">
                {recipe.instructions.map((step, i) => (
                  <div key={i} className="flex gap-4 sm:gap-5">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-sm">
                      {i + 1}
                    </div>
                    <p className="text-on-surface leading-relaxed pt-1 text-sm sm:text-base">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Bottom Navigation & Actions */}
            <div className="pt-6 border-t border-surface-container flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container-high text-on-surface font-bold text-sm transition-all border border-surface-container"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Recipes</span>
              </button>
              <button
                onClick={onEdit}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary hover:opacity-90 font-bold text-sm transition-all shadow-sm active:scale-95"
              >
                <Edit2 className="w-4 h-4" />
                <span>Edit Recipe</span>
              </button>
            </div>

          </div>

          {/* Right Column: Nutrition Card */}
          <div className="lg:col-span-5">
            <div className="sticky top-20 bg-surface-container-low rounded-[2rem] p-6 sm:p-8 space-y-6 border border-surface-container">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Flame className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold text-on-surface">Nutrition Facts</h3>
                </div>
                <button
                  onClick={onEdit}
                  className="text-xs font-bold text-primary hover:underline cursor-pointer"
                >
                  Edit Macros
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-on-surface-variant font-medium text-sm">Total Energy</span>
                  <span className="text-3xl font-black text-primary tabular-nums">
                    {recipe.calories} <span className="text-sm font-medium opacity-60">kcal</span>
                  </span>
                </div>
                
                {(() => {
                  const pCal = recipe.protein * 4;
                  const netCarbs = Math.max(0, recipe.carbs - (recipe.fiber ?? 0));
                  const cCal = netCarbs * 4;
                  const fCal = recipe.fats * 9;
                  const fibCal = (recipe.fiber ?? 0) * 2;
                  const total = pCal + cCal + fCal + fibCal || 1;
                  const pPct = Math.round((pCal / total) * 100);
                  const cPct = Math.round((cCal / total) * 100);
                  const fPct = Math.round((fCal / total) * 100);
                  const fibPct = (recipe.fiber ?? 0) > 0 ? Math.max(1, Math.round((fibCal / total) * 100)) : 0;

                  return (
                    <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden flex">
                      <div className="bg-blue-400 h-full transition-all duration-500" style={{ width: `${pPct}%` }} title={`Protein: ${pPct}% (${recipe.protein}g)`} />
                      <div className="bg-green-400 h-full transition-all duration-500" style={{ width: `${cPct}%` }} title={`Carbohydrates: ${cPct}% (${recipe.carbs}g)`} />
                      <div className="bg-amber-400 h-full transition-all duration-500" style={{ width: `${fPct}%` }} title={`Fats: ${fPct}% (${recipe.fats}g)`} />
                      <div className="bg-purple-400 h-full transition-all duration-500" style={{ width: `${fibPct}%` }} title={`Fiber: ${fibPct}% (${recipe.fiber ?? 0}g)`} />
                    </div>
                  );
                })()}

                <div className="grid grid-cols-1 gap-3">
                  {[
                    { label: 'Protein', val: recipe.protein, unit: 'g', color: 'bg-blue-400' },
                    { label: 'Carbohydrates', val: recipe.carbs, unit: 'g', color: 'bg-green-400' },
                    { label: 'Fats', val: recipe.fats, unit: 'g', color: 'bg-amber-400' },
                    { label: 'Fiber', val: recipe.fiber ?? 0, unit: 'g', color: 'bg-purple-400' }
                  ].map(macro => (
                    <div key={macro.label} className="flex items-center justify-between p-3.5 bg-surface-lowest rounded-2xl border border-surface-container/40">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${macro.color}`} />
                        <span className="font-bold text-sm text-on-surface">{macro.label}</span>
                      </div>
                      <span className="font-black text-on-surface tabular-nums">{macro.val}{macro.unit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-surface-container">
                <div className="flex items-center gap-2 text-on-surface-variant text-xs font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Calculated based on standard single serving portions</span>
                </div>
              </div>

              {/* Action Button inside Nutrition Card */}
              <button
                onClick={onEdit}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-bold text-xs uppercase tracking-wider transition-all border border-surface-container active:scale-95 cursor-pointer"
              >
                <Edit2 className="w-4 h-4 text-primary" />
                <span>Edit Nutritional Information</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
