import React from 'react';
import { motion } from 'motion/react';
import { 
  Sunrise, Sun, Moon, Coffee, Plus, 
  Search, Heart, ArrowRight, Sparkles, 
  Clock, Edit2 
} from 'lucide-react';
import { RecipeCard } from '../components/RecipeCard';
import { INITIAL_RECIPES, INITIAL_INGREDIENTS } from '../constants';

interface PlannerScreenProps {
  onRecipeClick: (id: string) => void;
}

export const PlannerScreen: React.FC<PlannerScreenProps> = ({ onRecipeClick }) => {
  const [selectedDay, setSelectedDay] = React.useState('MON');
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  // Mock data for different days
  const dayPlans: Record<string, { breakfast: number, lunch: number, snack: number, dinner: number }> = {
    'MON': { breakfast: 0, lunch: 1, snack: 0, dinner: 2 },
    'TUE': { breakfast: 1, lunch: 2, snack: 0, dinner: 0 },
    'WED': { breakfast: 2, lunch: 0, snack: 1, dinner: 1 },
    'THU': { breakfast: 0, lunch: 1, snack: 0, dinner: 2 },
    'FRI': { breakfast: 1, lunch: 2, snack: 0, dinner: 0 },
    'SAT': { breakfast: 2, lunch: 0, snack: 1, dinner: 1 },
    'SUN': { breakfast: 0, lunch: 1, snack: 0, dinner: 2 },
  };

  const currentPlan = dayPlans[selectedDay];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pb-12"
    >
      <div className="mb-10">
        <h2 className="text-4xl font-headline font-extrabold tracking-tight mb-2">Weekly Planner</h2>
        <p className="text-on-surface-variant font-medium">Curate your nourishment for {selectedDay === 'MON' ? 'Monday' : selectedDay}.</p>
      </div>

      {/* Date Picker */}
      <section className="mb-12">
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 snap-x">
          {days.map((day) => (
            <div key={day} className="flex-shrink-0 snap-center">
              <button 
                onClick={() => setSelectedDay(day)}
                className={`flex flex-col items-center justify-center w-20 h-20 rounded-xl transition-all duration-300 ${
                  selectedDay === day 
                    ? 'bg-primary text-on-primary shadow-lg scale-105' 
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span className={`text-sm font-bold ${selectedDay === day ? 'opacity-100' : 'opacity-60'}`}>{day}</span>
                {selectedDay === day && <div className="mt-2 w-1.5 h-1.5 bg-tertiary-fixed rounded-full" />}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Meal Slots */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Breakfast */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-2">
            <Sunrise className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold">Breakfast</h3>
          </div>
          <RecipeCard 
            recipe={INITIAL_RECIPES[currentPlan.breakfast]} 
            variant="planner" 
            onClick={onRecipeClick}
          />
        </div>

        {/* Lunch */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-2">
            <Sun className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold">Lunch</h3>
          </div>
          <RecipeCard 
            recipe={INITIAL_RECIPES[currentPlan.lunch]} 
            variant="planner" 
            onClick={onRecipeClick}
          />
        </div>

        {/* Snack */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-2">
            <Coffee className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold">Snack</h3>
          </div>
          <RecipeCard 
            recipe={{...INITIAL_RECIPES[currentPlan.snack], title: 'Protein Bites', image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=200'}} 
            variant="planner" 
            onClick={onRecipeClick}
          />
        </div>

        {/* Dinner */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-2">
            <Moon className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold">Dinner</h3>
          </div>
          <RecipeCard 
            recipe={INITIAL_RECIPES[currentPlan.dinner]} 
            variant="planner" 
            onClick={onRecipeClick}
          />
        </div>
      </div>

      {/* CTA */}
      <section className="mt-12 bg-surface-lowest p-8 rounded-lg shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-md">
          <h3 className="text-2xl font-bold mb-2">Ready for the market?</h3>
          <p className="text-on-surface-variant">We've compiled your shopping list based on the 12 recipes planned for this week.</p>
        </div>
        <button className="w-full md:w-auto gradient-primary text-on-primary py-4 px-10 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-95">
          Generate Shopping List
        </button>
      </section>
    </motion.div>
  );
};

interface RecipesScreenProps {
  onRecipeClick: (id: string) => void;
}

export const RecipesScreen: React.FC<RecipesScreenProps> = ({ onRecipeClick }) => {
  const filters = ['All Recipes', 'Quick & Easy', 'Vegetarian', 'High Protein', 'Low Carb'];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="pb-12"
    >
      <header className="mb-12">
        <h2 className="text-3xl font-extrabold tracking-tight mb-6">Daily Inspiration</h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[500px]">
          <div 
            onClick={() => onRecipeClick(INITIAL_RECIPES[0].id)}
            className="md:col-span-8 group relative overflow-hidden rounded-lg bg-surface-container-lowest shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <img 
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1200" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              alt="Hero"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 p-8 w-full">
              <span className="inline-block px-4 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold mb-4">EDITOR'S CHOICE</span>
              <h3 className="text-white text-4xl font-extrabold mb-2">Summer Harvest Buddha Bowl</h3>
              <p className="text-white/80 max-w-md mb-6 leading-relaxed">A nutrient-dense symphony of roasted sweet potatoes, quinoa, and avocado lime dressing.</p>
              <div className="flex gap-6">
                <div className="flex flex-col">
                  <span className="text-white/60 text-[10px] font-bold uppercase tracking-wider">Calories</span>
                  <span className="text-white font-bold">420 kcal</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white/60 text-[10px] font-bold uppercase tracking-wider">Protein</span>
                  <span className="text-white font-bold">18g</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white/60 text-[10px] font-bold uppercase tracking-wider">Prep Time</span>
                  <span className="text-white font-bold">20 min</span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-4 grid grid-rows-2 gap-6">
            {[
              { id: INITIAL_RECIPES[1].id, title: 'Rustic Tomato Bisque', img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=400' },
              { id: INITIAL_RECIPES[2].id, title: 'Mediterranean Mezze', img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=400' }
            ].map((item, i) => (
              <div 
                key={i} 
                onClick={() => onRecipeClick(item.id)}
                className="relative overflow-hidden rounded-lg bg-surface-container-lowest group cursor-pointer"
              >
                <img src={item.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={item.title} />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h4 className="text-white text-xl font-bold">{item.title}</h4>
                  <p className="text-white/80 text-sm">Comfort in a bowl.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="mb-10 flex gap-3 overflow-x-auto no-scrollbar pb-2">
        {filters.map((filter, i) => (
          <button 
            key={filter}
            className={`px-6 py-2.5 rounded-full font-bold whitespace-nowrap transition-all ${
              i === 0 ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            {filter}
          </button>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {INITIAL_RECIPES.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} onClick={onRecipeClick} />
        ))}
      </section>

      <section className="mt-20 relative overflow-hidden rounded-lg bg-primary p-12 text-on-primary">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 relative z-10">
          <div>
            <h2 className="text-4xl font-extrabold mb-4 leading-tight">Unlock Personalized Meal Plans</h2>
            <p className="text-on-primary/80 text-lg mb-8 leading-relaxed">Join 20,000+ home cooks who get curated recipes based on their nutritional goals and dietary needs.</p>
            <button className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-lg">
              Upgrade to Pro
            </button>
          </div>
          <div className="hidden md:block">
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=300" className="rounded-lg transform rotate-2" alt="Food" />
              <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=300" className="rounded-lg transform -rotate-3 mt-8" alt="Food" />
            </div>
          </div>
        </div>
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-primary-container/30 blur-3xl" />
      </section>
    </motion.div>
  );
};

import { IngredientCard } from '../components/IngredientCard';

interface IngredientsScreenProps {
  onEditIngredient: (id: string) => void;
  onNewIngredient: () => void;
}

export const IngredientsScreen: React.FC<IngredientsScreenProps> = ({ onEditIngredient, onNewIngredient }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="pb-12"
    >
      <header className="mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-on-background mb-4">
          Ingredient <span className="text-primary italic">Hub</span>
        </h1>
        <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed">
          Manage your pantry staples and custom items. Define nutrition per unit for precise meal planning and accurate macro tracking.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-grow relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5" />
          <input 
            className="w-full pl-12 pr-4 py-4 bg-surface-container-low rounded-lg border-none focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-on-surface-variant/50" 
            placeholder="Search ingredients..." 
            type="text"
          />
        </div>
        <button 
          onClick={onNewIngredient}
          className="gradient-primary text-on-primary px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-transform active:scale-95"
        >
          <Plus className="w-5 h-5" /> New Ingredient
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="hidden md:grid grid-cols-12 px-8 py-4 bg-surface-container-high rounded-full text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">
          <div className="col-span-4">Ingredient</div>
          <div className="col-span-2 text-center">Unit</div>
          <div className="col-span-1 text-center">Cals</div>
          <div className="col-span-1 text-center">Protein</div>
          <div className="col-span-1 text-center">Carbs</div>
          <div className="col-span-1 text-center">Fat</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>
        {INITIAL_INGREDIENTS.map(ing => (
          <IngredientCard key={ing.id} ingredient={ing} onEdit={onEditIngredient} />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <button className="px-8 py-3 bg-surface-container text-on-surface-variant font-bold rounded-full hover:bg-surface-container-high transition-colors active:scale-95">
          Load More Ingredients
        </button>
      </div>
    </motion.div>
  );
};
