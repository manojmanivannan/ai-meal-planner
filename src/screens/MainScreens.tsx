import React from 'react';
import { motion } from 'motion/react';
import { 
  Sunrise, Sun, Moon, Coffee, Plus, 
  Search, Heart, ArrowRight, Sparkles, 
  Clock, Edit2 
} from 'lucide-react';
import { RecipeCard } from '../components/RecipeCard';
import { INITIAL_RECIPES, INITIAL_INGREDIENTS } from '../constants';
import { Recipe, Ingredient } from '../types';

import { RecipePicker } from '../components/RecipePicker';

interface PlannerScreenProps {
  onRecipeClick: (id: string) => void;
}

type MealSlot = 'breakfast' | 'lunch' | 'snack' | 'dinner';

export const PlannerScreen: React.FC<PlannerScreenProps> = ({ onRecipeClick }) => {
  const [selectedDay, setSelectedDay] = React.useState('MON');
  const [isPickerOpen, setIsPickerOpen] = React.useState(false);
  const [activeSlot, setActiveSlot] = React.useState<{ day: string, slot: MealSlot } | null>(null);

  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  // Initial state from mock data, but using recipe IDs or null
  const [dayPlans, setDayPlans] = React.useState<Record<string, Record<MealSlot, string | null>>>(() => {
    const initial: Record<string, Record<MealSlot, string | null>> = {};
    days.forEach(day => {
      initial[day] = {
        breakfast: INITIAL_RECIPES[0].id,
        lunch: INITIAL_RECIPES[1].id,
        snack: null,
        dinner: INITIAL_RECIPES[2].id
      };
    });
    // Add some variety to mock data
    initial['MON'].snack = INITIAL_RECIPES[0].id;
    initial['TUE'].dinner = null;
    initial['WED'].lunch = null;
    return initial;
  });

  const currentPlan = dayPlans[selectedDay];

  const handleAddRecipe = (slot: MealSlot) => {
    setActiveSlot({ day: selectedDay, slot });
    setIsPickerOpen(true);
  };

  const handleRemoveRecipe = (slot: MealSlot) => {
    setDayPlans(prev => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [slot]: null
      }
    }));
  };

  const handleSelectRecipe = (recipeId: string) => {
    if (activeSlot) {
      setDayPlans(prev => ({
        ...prev,
        [activeSlot.day]: {
          ...prev[activeSlot.day],
          [activeSlot.slot]: recipeId
        }
      }));
    }
  };

  const renderMealSlot = (slot: MealSlot, icon: React.ReactNode, title: string) => {
    const recipeId = currentPlan[slot];
    const recipe = recipeId ? INITIAL_RECIPES.find(r => r.id === recipeId) : null;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <span className="text-primary">{icon}</span>
            <h3 className="text-lg font-bold">{title}</h3>
          </div>
          {recipe && (
            <div className="flex gap-2">
              <button 
                onClick={() => handleAddRecipe(slot)}
                className="text-[10px] font-bold text-primary uppercase tracking-wider hover:underline"
              >
                Change
              </button>
              <span className="text-on-surface-variant/20">|</span>
              <button 
                onClick={() => handleRemoveRecipe(slot)}
                className="text-[10px] font-bold text-error uppercase tracking-wider hover:underline"
              >
                Remove
              </button>
            </div>
          )}
        </div>
        
        {recipe ? (
          <RecipeCard 
            recipe={recipe} 
            variant="planner" 
            onClick={onRecipeClick}
          />
        ) : (
          <button 
            onClick={() => handleAddRecipe(slot)}
            className="w-full h-48 rounded-xl border-2 border-dashed border-surface-container-high bg-surface-container-low/30 flex flex-col items-center justify-center gap-3 group hover:bg-surface-container-low hover:border-primary/30 transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-surface-lowest flex items-center justify-center text-on-surface-variant group-hover:text-primary group-hover:scale-110 transition-all shadow-sm">
              <Plus className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-on-surface-variant group-hover:text-primary">Add {title}</span>
          </button>
        )}
      </div>
    );
  };

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
        {renderMealSlot('breakfast', <Sunrise className="w-5 h-5" />, 'Breakfast')}
        {renderMealSlot('lunch', <Sun className="w-5 h-5" />, 'Lunch')}
        {renderMealSlot('snack', <Coffee className="w-5 h-5" />, 'Snack')}
        {renderMealSlot('dinner', <Moon className="w-5 h-5" />, 'Dinner')}
      </div>

      <RecipePicker 
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onSelect={handleSelectRecipe}
        title={`Select ${activeSlot?.slot || 'Recipe'}`}
      />
    </motion.div>
  );
};

interface RecipesScreenProps {
  recipes: Recipe[];
  onRecipeClick: (id: string) => void;
  onEditRecipe: (id: string) => void;
}

export const RecipesScreen: React.FC<RecipesScreenProps> = ({ recipes, onRecipeClick, onEditRecipe }) => {
  const [selectedFilter, setSelectedFilter] = React.useState('All Recipes');

  // Extract unique tags from all recipes
  const allTags = React.useMemo(() => {
    const tags = new Set<string>();
    recipes.forEach(r => r.tags.forEach(t => tags.add(t)));
    return ['All Recipes', ...Array.from(tags).sort()];
  }, [recipes]);

  const filteredRecipes = React.useMemo(() => {
    if (selectedFilter === 'All Recipes') return recipes;
    return recipes.filter(r => r.tags.includes(selectedFilter));
  }, [recipes, selectedFilter]);

  const heroRecipe = recipes[0] || INITIAL_RECIPES[0];

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
            onClick={() => onRecipeClick(heroRecipe.id)}
            className="md:col-span-8 group relative overflow-hidden rounded-lg bg-surface-container-lowest shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <img 
              src={heroRecipe.image} 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              alt="Hero"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 p-8 w-full">
              <span className="inline-block px-4 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold mb-4 uppercase tracking-wider">EDITOR'S CHOICE</span>
              <h3 className="text-white text-4xl font-extrabold mb-2">{heroRecipe.title}</h3>
              <p className="text-white/80 max-w-md mb-6 leading-relaxed line-clamp-2">{heroRecipe.description}</p>
              <div className="flex gap-6">
                <div className="flex flex-col">
                  <span className="text-white/60 text-[10px] font-bold uppercase tracking-wider">Calories</span>
                  <span className="text-white font-bold">{heroRecipe.calories} kcal</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white/60 text-[10px] font-bold uppercase tracking-wider">Protein</span>
                  <span className="text-white font-bold">{heroRecipe.protein}g</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white/60 text-[10px] font-bold uppercase tracking-wider">Prep Time</span>
                  <span className="text-white font-bold">{heroRecipe.prepTime} min</span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-4 grid grid-rows-2 gap-6">
            {recipes.slice(1, 3).map((item, i) => (
              <div 
                key={item.id} 
                onClick={() => onRecipeClick(item.id)}
                className="relative overflow-hidden rounded-lg bg-surface-container-lowest group cursor-pointer"
              >
                <img src={item.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={item.title} />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h4 className="text-white text-xl font-bold">{item.title}</h4>
                  <p className="text-white/80 text-sm line-clamp-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="mb-10 flex gap-3 overflow-x-auto no-scrollbar pb-2">
        {allTags.map((filter) => (
          <button 
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-6 py-2.5 rounded-full font-bold whitespace-nowrap transition-all ${
              selectedFilter === filter 
                ? 'bg-primary text-on-primary shadow-sm' 
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            {filter}
          </button>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {filteredRecipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} onClick={onRecipeClick} onEdit={onEditRecipe} />
        ))}
      </section>
    </motion.div>
  );
};

import { IngredientCard } from '../components/IngredientCard';

interface IngredientsScreenProps {
  ingredients: Ingredient[];
  onEditIngredient: (id: string) => void;
  onNewIngredient: () => void;
}

export const IngredientsScreen: React.FC<IngredientsScreenProps> = ({ ingredients, onEditIngredient, onNewIngredient }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredIngredients = React.useMemo(() => {
    return ingredients.filter(ing => 
      ing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ing.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [ingredients, searchQuery]);

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
        {filteredIngredients.map(ing => (
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
