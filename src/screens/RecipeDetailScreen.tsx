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
  const serves = recipe.servings || 1;
  const perCal = Math.round(recipe.calories / serves);
  const perProt = recipe.protein / serves;
  const perCarbs = recipe.carbs / serves;
  const perFats = recipe.fats / serves;
  const perFiber = (recipe.fiber ?? 0) / serves;

  const pCal = perProt * 4;
  const netCarbs = Math.max(0, perCarbs - perFiber);
  const cCal = netCarbs * 4;
  const fCal = perFats * 9;
  const fibCal = perFiber * 2;
  const total = pCal + cCal + fCal + fibCal || 1;
  const pPct = Math.round((pCal / total) * 100);
  const cPct = Math.round((cCal / total) * 100);
  const fPct = Math.round((fCal / total) * 100);
  const fibPct = perFiber > 0 ? Math.max(1, Math.round((fibCal / total) * 100)) : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="max-w-5xl mx-auto space-y-6 pb-24"
    >
      {/* Hero Media Banner */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden rounded-2xl bg-surface-low border border-surface-container shadow-xs">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
        
        {/* Overlay Content */}
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            {recipe.tags.map(tag => (
              <span 
                key={tag} 
                className="bg-primary/90 text-white text-[11px] font-bold px-3 py-1 rounded-lg tracking-wide uppercase backdrop-blur-xs"
              >
                {tag}
              </span>
            ))}
            <span className="bg-white/20 text-white text-[11px] font-bold px-3 py-1 rounded-lg tracking-wide uppercase backdrop-blur-xs">
              {recipe.difficulty}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-2 drop-shadow-xs">
            {recipe.title}
          </h1>
          <p className="text-white/85 text-xs sm:text-sm max-w-2xl line-clamp-2 leading-relaxed">
            {recipe.description}
          </p>
        </div>
      </div>

      {/* Main Grid: Overview & Method vs Nutrition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (7 cols): Quick KPIs, Ingredients & Method */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-surface-lowest p-3.5 rounded-xl text-center border border-surface-container shadow-2xs">
              <Clock className="w-4 h-4 mx-auto mb-1 text-primary" />
              <span className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Prep Time</span>
              <span className="font-bold text-base text-on-surface font-mono">{recipe.prepTime} min</span>
            </div>
            <div className="bg-surface-lowest p-3.5 rounded-xl text-center border border-surface-container shadow-2xs">
              <Users className="w-4 h-4 mx-auto mb-1 text-primary" />
              <span className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Servings</span>
              <span className="font-bold text-base text-on-surface font-mono">{recipe.servings}</span>
            </div>
            <div className="bg-surface-lowest p-3.5 rounded-xl text-center border border-surface-container shadow-2xs">
              <Star className="w-4 h-4 mx-auto mb-1 text-primary" />
              <span className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Skill Level</span>
              <span className="font-bold text-base text-on-surface">{recipe.difficulty}</span>
            </div>
          </div>

          {/* Ingredients Section */}
          <section className="bg-surface-lowest p-5 sm:p-6 rounded-2xl border border-surface-container shadow-2xs">
            <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-surface-container">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-on-surface tracking-tight">Ingredients</h2>
                <span className="text-xs text-on-surface-variant font-medium">
                  {recipe.ingredients.length} items required
                </span>
              </div>
              <button
                onClick={onEdit}
                className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover px-2.5 py-1.5 rounded-lg hover:bg-primary-light/50 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Ingredients</span>
              </button>
            </div>

            <div className="space-y-2">
              {recipe.ingredients.map((item, i) => (
                <div 
                  key={i} 
                  className="flex items-center justify-between p-3 bg-surface-low rounded-xl border border-surface-container/60 hover:bg-surface-container-high transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    <span className="font-semibold text-on-surface text-sm capitalize">
                      {item.name || `Ingredient ${i + 1}`}
                    </span>
                  </div>
                  <span className="font-bold text-on-surface-variant text-sm font-mono tabular-nums">
                    {item.quantity} {item.unit}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Instructions Section */}
          <section className="bg-surface-lowest p-5 sm:p-6 rounded-2xl border border-surface-container shadow-2xs">
            <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-surface-container">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-on-surface tracking-tight">Method</h2>
                <span className="text-xs text-on-surface-variant font-medium">
                  Step-by-step preparation instructions
                </span>
              </div>
              <button
                onClick={onEdit}
                className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover px-2.5 py-1.5 rounded-lg hover:bg-primary-light/50 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Method</span>
              </button>
            </div>

            <div className="space-y-4">
              {recipe.instructions.map((step, i) => (
                <div key={i} className="flex gap-3 sm:gap-4 items-start">
                  <div className="shrink-0 w-7 h-7 rounded-lg bg-primary-light text-primary flex items-center justify-center font-bold text-xs">
                    {i + 1}
                  </div>
                  <p className="text-on-surface text-sm sm:text-base leading-relaxed pt-0.5 flex-1">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom Actions Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-lowest hover:bg-surface-low text-on-surface font-bold text-xs transition-all border border-surface-container shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-primary" />
              <span>Back to Recipes</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={onEdit}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs transition-all shadow-2xs active:scale-95 cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Recipe</span>
              </button>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete this recipe?')) {
                    onDelete(recipe.id);
                  }
                }}
                className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors active:scale-95"
                title="Delete recipe"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Right Column (5 cols): Sticky Nutrition Card */}
        <div className="lg:col-span-5">
          <div className="sticky top-20 bg-surface-lowest rounded-2xl p-5 sm:p-6 space-y-5 border border-surface-container shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-extrabold text-on-surface">Nutrition Facts</h3>
              </div>
              <button
                onClick={onEdit}
                className="text-xs font-bold text-primary hover:underline cursor-pointer"
              >
                Edit Macros
              </button>
            </div>

            {/* Calories per serving */}
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <div>
                  <span className="text-on-surface-variant font-bold text-xs uppercase tracking-wider">Energy</span>
                  <span className="text-[11px] text-on-surface-variant/70 ml-1">/ serving</span>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-on-surface font-mono tabular-nums">
                    {perCal}
                  </span>
                  <span className="text-xs font-bold text-on-surface-variant ml-1">kcal</span>
                </div>
              </div>

              {/* Macro breakdown bar matching uniform colors */}
              <div className="h-2 w-full bg-surface-low rounded-full overflow-hidden flex border border-surface-container/50">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-500" 
                  style={{ width: `${pPct}%` }} 
                  title={`Protein: ${pPct}% (${perProt.toFixed(1)}g)`} 
                />
                <div 
                  className="bg-sky-500 h-full transition-all duration-500" 
                  style={{ width: `${cPct}%` }} 
                  title={`Carbs: ${cPct}% (${perCarbs.toFixed(1)}g)`} 
                />
                <div 
                  className="bg-rose-500 h-full transition-all duration-500" 
                  style={{ width: `${fPct}%` }} 
                  title={`Fat: ${fPct}% (${perFats.toFixed(1)}g)`} 
                />
                <div 
                  className="bg-violet-500 h-full transition-all duration-500" 
                  style={{ width: `${fibPct}%` }} 
                  title={`Fiber: ${fibPct}% (${perFiber.toFixed(1)}g)`} 
                />
              </div>
            </div>

            {/* 4 Macro Breakdown Rows */}
            <div className="space-y-2">
              {[
                { label: 'Protein', val: Number(perProt.toFixed(1)), batchVal: recipe.protein, unit: 'g', color: 'bg-emerald-500', textColor: 'text-emerald-600' },
                { label: 'Carbohydrates', val: Number(perCarbs.toFixed(1)), batchVal: recipe.carbs, unit: 'g', color: 'bg-sky-500', textColor: 'text-sky-600' },
                { label: 'Fats', val: Number(perFats.toFixed(1)), batchVal: recipe.fats, unit: 'g', color: 'bg-rose-500', textColor: 'text-rose-600' },
                { label: 'Fiber', val: Number(perFiber.toFixed(1)), batchVal: recipe.fiber ?? 0, unit: 'g', color: 'bg-violet-500', textColor: 'text-violet-600' }
              ].map(macro => (
                <div 
                  key={macro.label} 
                  className="flex items-center justify-between p-3 bg-surface-low rounded-xl border border-surface-container/40"
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${macro.color}`} />
                    <span className="font-bold text-xs text-on-surface">{macro.label}</span>
                  </div>
                  <div className="text-right">
                    <span className={`font-bold text-xs font-mono tabular-nums ${macro.textColor}`}>
                      {macro.val}{macro.unit}
                    </span>
                    {serves > 1 && (
                      <span className="block text-[10px] text-on-surface-variant/70 font-mono">
                        ({macro.batchVal}{macro.unit} total)
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-surface-container flex items-center gap-2 text-on-surface-variant text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>Calculated based on 1 of {serves} portion{serves > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
