import React from 'react';
import { motion } from 'motion/react';
import { 
  Sunrise, Sun, Moon, Coffee, Plus, 
  Search, UtensilsCrossed,
  Clock, Edit2, Trash2
} from 'lucide-react';
import { RecipeCard } from '../components/RecipeCard';
import { Recipe, Ingredient, WeeklyPlanEntry } from '../types';
import { MEAL_TYPE_LABELS } from '../constants';
import { fetchWeeklyPlan, fetchRecipes, updateWeeklyPlan } from '../api';
import { RecipePicker } from '../components/RecipePicker';
import { IngredientCard } from '../components/IngredientCard';

interface PlannerScreenProps {
  onRecipeClick: (id: number) => void;
}

type MealSlot = 'pre_breakfast' | 'breakfast' | 'lunch' | 'snack' | 'dinner';

export const PlannerScreen: React.FC<PlannerScreenProps> = ({ onRecipeClick }) => {
  const [selectedDay, setSelectedDay] = React.useState('monday');
  const [isPickerOpen, setIsPickerOpen] = React.useState(false);
  const [activeSlot, setActiveSlot] = React.useState<{ day: string, slot: MealSlot, intent?: 'add' | 'replace', oldRecipeId?: number } | null>(null);
  const [weeklyPlan, setWeeklyPlan] = React.useState<WeeklyPlanEntry[]>([]);
  const [allRecipes, setAllRecipes] = React.useState<Recipe[]>([]);
  const [loading, setLoading] = React.useState(true);

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const dayLabels: Record<string, string> = {
    monday: 'MON', tuesday: 'TUE', wednesday: 'WED', thursday: 'THU',
    friday: 'FRI', saturday: 'SAT', sunday: 'SUN',
  };

  React.useEffect(() => {
    const load = async () => {
      try {
        const [plan, recipes] = await Promise.all([
          fetchWeeklyPlan(),
          fetchRecipes({ limit: 500 }),
        ]);
        setWeeklyPlan(plan);
        setAllRecipes(recipes);
      } catch (err) {
        console.error('Failed to load planner data:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const mealSlots: MealSlot[] = ['pre_breakfast', 'breakfast', 'lunch', 'snack', 'dinner'];

  const getRecipesForSlot = (day: string, slot: MealSlot): Recipe[] => {
    const entry = weeklyPlan.find(e => e.day.toLowerCase() === day.toLowerCase() && e.meal_type.toLowerCase() === slot.toLowerCase());
    if (!entry) return [];
    return entry.recipe_ids
      .map(id => allRecipes.find(r => r.id === id))
      .filter(Boolean) as Recipe[];
  };

  const handleAddRecipe = (slot: MealSlot) => {
    setActiveSlot({ day: selectedDay, slot, intent: 'add' });
    setIsPickerOpen(true);
  };

  const handleChangeRecipe = (slot: MealSlot, oldRecipeId: number) => {
    setActiveSlot({ day: selectedDay, slot, intent: 'replace', oldRecipeId });
    setIsPickerOpen(true);
  };

  const handleRemoveRecipe = async (slot: MealSlot, recipeId: number) => {
    const entry = weeklyPlan.find(e => e.day.toLowerCase() === selectedDay.toLowerCase() && e.meal_type.toLowerCase() === slot.toLowerCase());
    if (!entry) return;
    const newIds = entry.recipe_ids.filter(id => id !== recipeId);
    try {
      const updated = await updateWeeklyPlan(entry.id, newIds);
      setWeeklyPlan(prev => prev.map(e => e.id === entry.id ? updated : e));
    } catch (err) {
      console.error('Failed to remove recipe:', err);
    }
  };

  const handleSelectRecipe = async (recipeId: number) => {
    if (!activeSlot) return;
    const entry = weeklyPlan.find(e => e.day.toLowerCase() === activeSlot.day.toLowerCase() && e.meal_type.toLowerCase() === activeSlot.slot.toLowerCase());
    if (!entry) return;

    let newIds = [...entry.recipe_ids];
    if (activeSlot.intent === 'replace' && activeSlot.oldRecipeId) {
      newIds = newIds.map(id => id === activeSlot.oldRecipeId ? recipeId : id);
    } else {
      newIds.push(recipeId);
    }

    try {
      const updated = await updateWeeklyPlan(entry.id, newIds);
      setWeeklyPlan(prev => prev.map(e => e.id === entry.id ? updated : e));
    } catch (err) {
      console.error('Failed to add recipe:', err);
    }
  };

  const mealIcons: Record<MealSlot, React.ReactNode> = {
    pre_breakfast: <Coffee className="w-5 h-5" />,
    breakfast: <Sunrise className="w-5 h-5" />,
    lunch: <Sun className="w-5 h-5" />,
    snack: <Coffee className="w-5 h-5" />,
    dinner: <Moon className="w-5 h-5" />,
  };

  const renderMealSlot = (slot: MealSlot) => {
    const recipes = getRecipesForSlot(selectedDay, slot);

    return (
      <div className="space-y-4" key={slot}>
        <div className="flex flex-col xl:flex-row xl:items-center justify-between px-1 mb-3 gap-3">
          <div className="flex items-center gap-2">
            <span className="text-primary flex-shrink-0">{mealIcons[slot]}</span>
            <h3 className="text-lg font-bold leading-tight">{MEAL_TYPE_LABELS[slot] || slot}</h3>
          </div>
        </div>
        
        {recipes.length > 0 ? (
          <div className="space-y-4">
            {recipes.map(recipe => (
              <RecipeCard 
                key={recipe.id}
                recipe={recipe} 
                variant="planner" 
                onClick={onRecipeClick}
                onSwap={(id) => handleChangeRecipe(slot, id)}
                onRemoveFromPlan={(id) => handleRemoveRecipe(slot, id)}
              />
            ))}
            <button 
              onClick={() => handleAddRecipe(slot)}
              className="w-full py-3 rounded-xl border-2 border-dashed border-surface-container-high bg-surface-container-low/30 flex items-center justify-center gap-2 group hover:bg-surface-container-low hover:border-primary/30 transition-all"
            >
              <Plus className="w-4 h-4 text-on-surface-variant group-hover:text-primary" />
              <span className="text-sm font-bold text-on-surface-variant group-hover:text-primary">Add Another</span>
            </button>
          </div>
        ) : (
          <button 
            onClick={() => handleAddRecipe(slot)}
            className="w-full h-48 rounded-xl border-2 border-dashed border-surface-container-high bg-surface-container-low/30 flex flex-col items-center justify-center gap-3 group hover:bg-surface-container-low hover:border-primary/30 transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-surface-lowest flex items-center justify-center text-on-surface-variant group-hover:text-primary group-hover:scale-110 transition-all shadow-sm">
              <Plus className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-on-surface-variant group-hover:text-primary">Add {MEAL_TYPE_LABELS[slot] || slot}</span>
          </button>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pb-12"
    >
      <div className="mb-10">
        <h2 className="text-4xl font-headline font-extrabold tracking-tight mb-2">Weekly Planner</h2>
        <p className="text-on-surface-variant font-medium">Curate your nourishment for {selectedDay}.</p>
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
                <span className={`text-sm font-bold ${selectedDay === day ? 'opacity-100' : 'opacity-60'}`}>{dayLabels[day]}</span>
                {selectedDay === day && <div className="mt-2 w-1.5 h-1.5 bg-tertiary-fixed rounded-full" />}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Meal Slots */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {mealSlots.map(slot => renderMealSlot(slot))}
      </div>

      <RecipePicker 
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onSelect={handleSelectRecipe}
        title={`Select ${activeSlot?.slot ? MEAL_TYPE_LABELS[activeSlot.slot] || activeSlot.slot : 'Recipe'}`}
        selectedRecipeId={activeSlot?.intent === 'replace' ? activeSlot.oldRecipeId : undefined}
      />
    </motion.div>
  );
};

interface RecipesScreenProps {
  recipes: Recipe[];
  onRecipeClick: (id: number) => void;
  onEditRecipe: (id: number) => void;
  onDeleteRecipe: (id: number) => void;
}

export const RecipesScreen: React.FC<RecipesScreenProps> = ({ recipes, onRecipeClick, onEditRecipe, onDeleteRecipe }) => {
  const [selectedFilter, setSelectedFilter] = React.useState('All Recipes');
  const [pendingDeletes, setPendingDeletes] = React.useState<number[]>([]);
  const deleteTimers = React.useRef<Record<number, NodeJS.Timeout>>({});

  const initiateDelete = (id: number) => {
    setPendingDeletes(prev => [...prev, id]);
    deleteTimers.current[id] = setTimeout(() => {
      onDeleteRecipe(id);
      setPendingDeletes(prev => prev.filter(p => p !== id));
      delete deleteTimers.current[id];
    }, 5000); // 5 second timeout
  };

  const undoDelete = (id: number) => {
    if (deleteTimers.current[id]) {
      clearTimeout(deleteTimers.current[id]);
      delete deleteTimers.current[id];
    }
    setPendingDeletes(prev => prev.filter(p => p !== id));
  };

  const activeRecipes = React.useMemo(() => {
    return recipes.filter(r => !pendingDeletes.includes(r.id));
  }, [recipes, pendingDeletes]);

  const allFilters = React.useMemo(() => {
    const types = new Set<string>();
    activeRecipes.forEach(r => types.add(r.meal_type));
    return ['All Recipes', ...Array.from(types).sort().map(t => MEAL_TYPE_LABELS[t] || t)];
  }, [activeRecipes]);

  const filteredRecipes = React.useMemo(() => {
    if (selectedFilter === 'All Recipes') return recipes;
    const mealType = Object.entries(MEAL_TYPE_LABELS).find(([, label]) => label === selectedFilter)?.[0];
    if (!mealType) return recipes;
    return recipes.filter(r => r.meal_type === mealType);
  }, [recipes, selectedFilter]);

  const heroRecipe = activeRecipes[0];

  if (!heroRecipe) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-on-surface-variant">No recipes found.</p>
      </div>
    );
  }

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
            className="md:col-span-8 group relative overflow-hidden rounded-lg bg-surface-container-lowest shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[300px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-container/30">
              {heroRecipe.image_url && <img src={heroRecipe.image_url} alt={heroRecipe.name} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 p-8 w-full">
              <span className="inline-block px-4 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold mb-4 uppercase tracking-wider">EDITOR'S CHOICE</span>
              <h3 className="text-white text-4xl font-extrabold mb-2">{heroRecipe.name}</h3>
              <p className="text-white/80 max-w-md mb-6 leading-relaxed line-clamp-2">{heroRecipe.meal_type} · {heroRecipe.is_vegetarian ? 'Vegetarian' : 'Non-veg'}</p>
              <div className="flex gap-6">
                <div className="flex flex-col">
                  <span className="text-white/60 text-[10px] font-bold uppercase tracking-wider">Energy</span>
                  <span className="text-white font-bold">{Math.round(heroRecipe.energy)} kcal</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white/60 text-[10px] font-bold uppercase tracking-wider">Protein</span>
                  <span className="text-white font-bold">{Math.round(heroRecipe.protein)}g</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white/60 text-[10px] font-bold uppercase tracking-wider">Serves</span>
                  <span className="text-white font-bold">{heroRecipe.serves}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-4 grid grid-rows-2 gap-6">
            {activeRecipes.slice(1, 3).map((item) => (
              <div 
                key={item.id} 
                onClick={() => onRecipeClick(item.id)}
                className="relative overflow-hidden rounded-lg bg-surface-container-lowest group cursor-pointer min-h-[140px]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary-container/20">
                  {item.image_url && <img src={item.image_url} alt={item.name} className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />}
                </div>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h4 className="text-white text-xl font-bold">{item.name}</h4>
                  <p className="text-white/80 text-sm line-clamp-1">{MEAL_TYPE_LABELS[item.meal_type] || item.meal_type} · {Math.round(item.energy)} kcal</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="mb-10 flex gap-3 overflow-x-auto no-scrollbar pb-2">
        {allFilters.map((filter) => (
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
        {filteredRecipes.map(recipe => {
          if (pendingDeletes.includes(recipe.id)) {
            return (
              <div key={recipe.id} className="bg-surface-container-low rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between shadow-sm animate-pulse h-32 gap-4">
                <div>
                  <span className="text-on-surface-variant font-bold block mb-1 hover:line-through transition-all decoration-error underline-offset-2">Recipe deleted</span>
                  <span className="text-sm text-on-surface-variant/80">{recipe.name} will be permanently removed in 5 seconds.</span>
                </div>
                <button 
                  onClick={() => undoDelete(recipe.id)} 
                  className="bg-primary/10 text-primary font-bold px-6 py-2 rounded-full hover:bg-primary/20 transition-colors whitespace-nowrap"
                >
                  UNDO
                </button>
              </div>
            );
          }
          return <RecipeCard key={recipe.id} recipe={recipe} onClick={onRecipeClick} onEdit={onEditRecipe} onDelete={initiateDelete} />
        })}
      </section>
    </motion.div>
  );
};

interface IngredientsScreenProps {
  ingredients: Ingredient[];
  onEditIngredient: (id: number) => void;
  onNewIngredient: () => void;
  onDeleteIngredient: (id: number) => void;
}

export const IngredientsScreen: React.FC<IngredientsScreenProps> = ({ ingredients, onEditIngredient, onNewIngredient, onDeleteIngredient }) => {
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
          <div className="col-span-1 text-center">Energy</div>
          <div className="col-span-1 text-center">Protein</div>
          <div className="col-span-1 text-center">Carbs</div>
          <div className="col-span-1 text-center">Fat</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>
        {filteredIngredients.map(ing => (
          <IngredientCard key={ing.id} ingredient={ing} onEdit={onEditIngredient} onDelete={onDeleteIngredient} />
        ))}
      </div>

      {filteredIngredients.length === 0 && (
        <div className="mt-12 text-center text-on-surface-variant">
          <p className="text-lg font-medium">No ingredients found</p>
          <p className="text-sm">Try adjusting your search query</p>
        </div>
      )}
    </motion.div>
  );
};
