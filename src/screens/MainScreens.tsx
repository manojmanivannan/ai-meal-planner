import React from 'react';
import { motion } from 'motion/react';
import { 
  Sunrise, Sun, Moon, Coffee, Plus, 
  Search, Heart, ArrowRight, Sparkles, 
  Clock, Edit2, X, ChevronLeft, ChevronRight,
  Calendar, LayoutGrid, Check
} from 'lucide-react';
import { RecipeCard } from '../components/RecipeCard';
import { IngredientCard } from '../components/IngredientCard';
import { INITIAL_RECIPES, INITIAL_INGREDIENTS, LEGACY_RECIPE_ID_MAP } from '../constants';
import { Recipe, Ingredient } from '../types';
import { RecipePicker } from '../components/RecipePicker';

interface PlannerScreenProps {
  onRecipeClick: (id: string) => void;
  recipes?: Recipe[];
  onBrowseRecipes?: () => void;
}

type MealSlot = 'preBreakfast' | 'breakfast' | 'lunch' | 'snack' | 'dinner';

interface MealSlotConfig {
  key: MealSlot;
  label: string;
  name: string;
  emoji: string;
}

const MEAL_SLOTS: MealSlotConfig[] = [
  { key: 'preBreakfast', label: 'PRE-BREAKFAST', name: 'Pre-Breakfast', emoji: '🌅' },
  { key: 'breakfast', label: 'BREAKFAST', name: 'Breakfast', emoji: '🍳' },
  { key: 'lunch', label: 'LUNCH', name: 'Lunch', emoji: '🥗' },
  { key: 'snack', label: 'SNACK', name: 'Snack', emoji: '🍎' },
  { key: 'dinner', label: 'DINNER', name: 'Dinner', emoji: '🍲' },
];

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
const DAY_SHORT_MAP: Record<string, string> = {
  Monday: 'MON',
  Tuesday: 'TUE',
  Wednesday: 'WED',
  Thursday: 'THU',
  Friday: 'FRI',
  Saturday: 'SAT',
  Sunday: 'SUN',
};

export const PlannerScreen: React.FC<PlannerScreenProps> = ({ 
  onRecipeClick, 
  recipes = INITIAL_RECIPES,
  onBrowseRecipes 
}) => {
  const [selectedDay, setSelectedDay] = React.useState<string>('Thursday');
  const [viewMode, setViewMode] = React.useState<'day' | 'week'>('day');
  const [isPickerOpen, setIsPickerOpen] = React.useState(false);
  const [activeSlot, setActiveSlot] = React.useState<{ day: string; slot: MealSlot; slotLabel: string } | null>(null);

  // Initial plan populated from canonical weekly_plan.csv
  const [dayPlans, setDayPlans] = React.useState<Record<string, Record<MealSlot, string[]>>>(() => {
    return {
      Monday: {
        preBreakfast: ['54'],
        breakfast: ['80'],
        lunch: ['24'],
        snack: [],
        dinner: ['205', '206']
      },
      Tuesday: {
        preBreakfast: ['54'],
        breakfast: ['202'],
        lunch: ['16'],
        snack: [],
        dinner: ['67']
      },
      Wednesday: {
        preBreakfast: ['54'],
        breakfast: ['3'],
        lunch: ['65', '97'],
        snack: [],
        dinner: ['74']
      },
      Thursday: {
        preBreakfast: ['54'],
        breakfast: ['3'],
        lunch: ['208', '206'],
        snack: [],
        dinner: ['85']
      },
      Friday: {
        preBreakfast: ['54'],
        breakfast: ['49'],
        lunch: [],
        snack: [],
        dinner: ['14']
      },
      Saturday: {
        preBreakfast: ['54'],
        breakfast: [],
        lunch: [],
        snack: [],
        dinner: ['68']
      },
      Sunday: {
        preBreakfast: [],
        breakfast: [],
        lunch: [],
        snack: [],
        dinner: []
      }
    };
  });

  const getRecipeById = React.useCallback((id: string): Recipe | undefined => {
    const resolvedId = LEGACY_RECIPE_ID_MAP[id] || id;
    return recipes.find(r => r.id === resolvedId || r.id === id || String(r.id) === String(id)) || 
           INITIAL_RECIPES.find(r => r.id === resolvedId || r.id === id || String(r.id) === String(id));
  }, [recipes]);

  // Calculate day totals
  const getDayTotals = React.useCallback((day: string) => {
    const plan = dayPlans[day] || { preBreakfast: [], breakfast: [], lunch: [], snack: [], dinner: [] };
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fats = 0;
    let fiber = 0;
    let filledSlots = 0;

    (MEAL_SLOTS.map(s => s.key)).forEach(slot => {
      const itemIds = plan[slot] || [];
      if (itemIds.length > 0) filledSlots++;
      itemIds.forEach(id => {
        const recipe = getRecipeById(id);
        if (recipe) {
          const serves = recipe.servings || 1;
          calories += recipe.calories / serves;
          protein += recipe.protein / serves;
          carbs += recipe.carbs / serves;
          fats += recipe.fats / serves;
          fiber += (recipe.fiber || 0) / serves;
        }
      });
    });

    const pCal = protein * 4;
    const netCarbs = Math.max(0, carbs - fiber);
    const cCal = netCarbs * 4;
    const fCal = fats * 9;
    const fibCal = fiber * 2;
    const totalMacroCal = pCal + cCal + fCal + fibCal || 1;

    const rawProtPct = Math.round((pCal / totalMacroCal) * 100);
    const rawCarbPct = Math.round((cCal / totalMacroCal) * 100);
    const rawFatPct = Math.round((fCal / totalMacroCal) * 100);
    const rawFibPct = fiber > 0 ? Math.max(1, Math.round((fibCal / totalMacroCal) * 100)) : 0;

    return {
      calories: Math.round(calories),
      protein: Number(protein.toFixed(1)),
      carbs: Number(carbs.toFixed(1)),
      fats: Number(fats.toFixed(1)),
      fiber: Number(fiber.toFixed(1)),
      filledSlots,
      macroPercentages: {
        protein: rawProtPct,
        carbs: rawCarbPct,
        fat: rawFatPct,
        fiber: rawFibPct
      }
    };
  }, [dayPlans, getRecipeById]);

  // Weekly analytics
  const weeklyAnalytics = React.useMemo(() => {
    let totalCal = 0;
    let totalProt = 0;
    let totalCarb = 0;
    let totalFat = 0;
    let totalFib = 0;
    let totalFilled = 0;
    const totalSlots = DAYS_OF_WEEK.length * MEAL_SLOTS.length; // 35

    DAYS_OF_WEEK.forEach(day => {
      const totals = getDayTotals(day);
      totalCal += totals.calories;
      totalProt += totals.protein;
      totalCarb += totals.carbs;
      totalFat += totals.fats;
      totalFib += totals.fiber;
      totalFilled += totals.filledSlots;
    });

    return {
      plannedCount: totalFilled,
      totalSlots,
      plannedPercent: Math.round((totalFilled / totalSlots) * 100),
      avgDailyCal: Math.round(totalCal / 7),
      totalCal: Math.round(totalCal),
      avgDailyProtein: Number((totalProt / 7).toFixed(1)),
      totalProtein: Math.round(totalProt),
      avgDailyCarbs: Number((totalCarb / 7).toFixed(1)),
      totalCarbs: Math.round(totalCarb),
      avgDailyFat: Number((totalFat / 7).toFixed(1)),
      totalFat: Math.round(totalFat),
      avgDailyFiber: Math.round(totalFib / 7),
      totalFiber: Math.round(totalFib)
    };
  }, [getDayTotals]);

  const handleOpenPicker = (day: string, slot: MealSlot, slotLabel: string) => {
    setActiveSlot({ day, slot, slotLabel });
    setIsPickerOpen(true);
  };

  const handleSelectRecipe = (recipeId: string) => {
    if (activeSlot) {
      setDayPlans(prev => {
        const currentSlotItems = prev[activeSlot.day]?.[activeSlot.slot] || [];
        return {
          ...prev,
          [activeSlot.day]: {
            ...prev[activeSlot.day],
            [activeSlot.slot]: [...currentSlotItems, recipeId]
          }
        };
      });
    }
  };

  const handleRemoveItem = (day: string, slot: MealSlot, indexToRemove: number) => {
    setDayPlans(prev => {
      const currentItems = prev[day]?.[slot] || [];
      const updated = currentItems.filter((_, idx) => idx !== indexToRemove);
      return {
        ...prev,
        [day]: {
          ...prev[day],
          [slot]: updated
        }
      };
    });
  };

  const handleClearSlot = (day: string, slot: MealSlot) => {
    setDayPlans(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [slot]: []
      }
    }));
  };

  const handleExportPDF = () => {
    window.print();
  };

  // Render meal slots list for a day
  const renderMealSlotsContent = (day: string) => {
    const plan = dayPlans[day] || { preBreakfast: [], breakfast: [], lunch: [], snack: [], dinner: [] };

    return (
      <div className="space-y-3.5">
        {MEAL_SLOTS.map((slotConfig) => {
          const itemIds = plan[slotConfig.key] || [];
          const hasItems = itemIds.length > 0;

          return (
            <div key={slotConfig.key} className="space-y-1.5">
              {/* Slot Title & Actions */}
              <div className="flex items-center justify-between text-xs font-bold text-on-surface-variant">
                <div className="flex items-center gap-1.5 uppercase tracking-wider">
                  <span>{slotConfig.emoji}</span>
                  <span className="font-extrabold text-on-surface text-[11px]">{slotConfig.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {hasItems && (
                    <button
                      onClick={() => handleClearSlot(day, slotConfig.key)}
                      className="text-on-surface-variant hover:text-rose-600 transition-colors text-[10px] uppercase font-bold"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    onClick={() => handleOpenPicker(day, slotConfig.key, slotConfig.name)}
                    aria-label={`Add ${slotConfig.name}`}
                    className="text-primary hover:text-primary-hover font-bold flex items-center gap-0.5 text-[11px] uppercase cursor-pointer"
                  >
                    + Add {hasItems ? 'Another' : slotConfig.name}
                  </button>
                </div>
              </div>

              {/* Slot Items */}
              {hasItems ? (
                <div className="space-y-1.5">
                  {itemIds.map((recipeId, idx) => {
                    const recipe = getRecipeById(recipeId);
                    if (!recipe) return null;

                    const serves = recipe.servings || 1;
                    const cal = Math.round(recipe.calories / serves);
                    const prot = (recipe.protein / serves).toFixed(1);
                    const carbs = (recipe.carbs / serves).toFixed(1);
                    const fats = (recipe.fats / serves).toFixed(1);

                    return (
                      <div
                        key={`${recipeId}-${idx}`}
                        className="bg-surface-low hover:bg-surface-container border border-surface-container rounded-xl p-2.5 transition-all group shadow-2xs"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <div
                            onClick={() => onRecipeClick(recipe.id)}
                            className="flex items-center gap-2 cursor-pointer flex-1 min-w-0"
                          >
                            <span className="w-2 h-2 rounded-full shrink-0 bg-primary" />
                            <span className="font-bold text-sm text-on-surface hover:text-primary transition-colors truncate">
                              {recipe.title}
                            </span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveItem(day, slotConfig.key, idx);
                            }}
                            aria-label="Remove"
                            title="Remove item"
                            className="text-on-surface-variant hover:text-rose-600 p-1 rounded-md transition-colors shrink-0"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Macro Telemetry: kcal • P • C • F per serving */}
                        <div className="flex items-center gap-1.5 text-xs font-mono tabular-nums text-on-surface-variant pl-4 flex-wrap">
                          <span className="font-bold text-on-surface">{cal} kcal</span>
                          <span className="opacity-30">·</span>
                          <span className="text-emerald-600 font-semibold">{prot}g P</span>
                          <span className="opacity-30">·</span>
                          <span className="text-sky-600 font-semibold">{carbs}g C</span>
                          <span className="opacity-30">·</span>
                          <span className="text-rose-600 font-semibold">{fats}g F</span>
                          {serves > 1 && (
                            <span className="text-[10px] text-on-surface-variant/70 font-sans ml-1">
                              (serves {serves})
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <button
                  onClick={() => handleOpenPicker(day, slotConfig.key, slotConfig.name)}
                  aria-label={`Add ${slotConfig.name}`}
                  className="w-full py-2.5 px-3 rounded-xl border border-dashed border-surface-container hover:border-primary/50 bg-surface-lowest hover:bg-surface-low text-on-surface-variant hover:text-primary transition-all text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add {slotConfig.name}</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Dedicated Daily Nutrition Summary Card
  const renderNutritionSummaryCard = (day: string) => {
    const totals = getDayTotals(day);
    const plan = dayPlans[day] || { preBreakfast: [], breakfast: [], lunch: [], snack: [], dinner: [] };

    return (
      <div className="bg-surface-lowest rounded-2xl p-5 border border-surface-container shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-2.5 border-b border-surface-container">
          <span className="text-xs font-bold tracking-wider text-on-surface-variant uppercase">
            Daily Nutrition ({day})
          </span>
          <span className="text-xs font-mono font-bold text-on-surface-variant bg-surface-low px-2 py-0.5 rounded-md">
            {totals.filledSlots}/5 Slots
          </span>
        </div>

        {/* Calories and Proportional Bar */}
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
              Total Intake
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black font-mono tracking-tight text-on-surface tabular-nums">
                {totals.calories}
              </span>
              <span className="text-xs font-bold text-on-surface-variant">kcal</span>
            </div>
          </div>

          <div className="h-2 w-full bg-surface-low rounded-full overflow-hidden flex border border-surface-container/50">
            <div 
              className="bg-emerald-500 h-full transition-all duration-500" 
              style={{ width: `${totals.macroPercentages.protein}%` }} 
              title={`Protein: ${totals.macroPercentages.protein}% (${totals.protein}g)`}
            />
            <div 
              className="bg-sky-500 h-full transition-all duration-500" 
              style={{ width: `${totals.macroPercentages.carbs}%` }} 
              title={`Carbs: ${totals.macroPercentages.carbs}% (${totals.carbs}g)`}
            />
            <div 
              className="bg-rose-500 h-full transition-all duration-500" 
              style={{ width: `${totals.macroPercentages.fat}%` }} 
              title={`Fat: ${totals.macroPercentages.fat}% (${totals.fats}g)`}
            />
            <div 
              className="bg-violet-500 h-full transition-all duration-500" 
              style={{ width: `${totals.macroPercentages.fiber}%` }} 
              title={`Fiber: ${totals.macroPercentages.fiber}% (${totals.fiber}g)`}
            />
          </div>
        </div>

        {/* 4 Macro KPI tiles with uniform palette */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-surface-low rounded-xl p-2.5 border border-surface-container/40">
            <span className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-0.5">
              PROTEIN
            </span>
            <span className="text-base font-black font-mono text-emerald-600 tabular-nums">
              {totals.protein}g
            </span>
          </div>
          <div className="bg-surface-low rounded-xl p-2.5 border border-surface-container/40">
            <span className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-0.5">
              CARBS
            </span>
            <span className="text-base font-black font-mono text-sky-600 tabular-nums">
              {totals.carbs}g
            </span>
          </div>
          <div className="bg-surface-low rounded-xl p-2.5 border border-surface-container/40">
            <span className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-0.5">
              FAT
            </span>
            <span className="text-base font-black font-mono text-rose-600 tabular-nums">
              {totals.fats}g
            </span>
          </div>
          <div className="bg-surface-low rounded-xl p-2.5 border border-surface-container/40">
            <span className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-0.5">
              FIBER
            </span>
            <span className="text-base font-black font-mono text-violet-600 tabular-nums">
              {totals.fiber}g
            </span>
          </div>
        </div>

        {/* Slot-by-Slot Calorie Breakdown */}
        <div className="pt-2 border-t border-surface-container space-y-1.5 text-xs">
          <span className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
            Energy by Meal Slot
          </span>
          {MEAL_SLOTS.map(slot => {
            const itemIds = plan[slot.key] || [];
            let slotCal = 0;
            itemIds.forEach(id => {
              const r = getRecipeById(id);
              if (r) {
                const serves = r.servings || 1;
                slotCal += Math.round(r.calories / serves);
              }
            });

            return (
              <div key={slot.key} className="flex justify-between items-center text-on-surface-variant">
                <span className="flex items-center gap-1.5">
                  <span>{slot.emoji}</span>
                  <span className="text-xs font-medium">{slot.name}</span>
                </span>
                <span className="font-mono font-bold text-on-surface tabular-nums">
                  {slotCal > 0 ? `${slotCal} kcal` : '—'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render a single Day Column Card (for 7-Day Board View)
  const renderDayCard = (day: string) => {
    const totals = getDayTotals(day);
    const isToday = day === 'Thursday';

    return (
      <div 
        key={day}
        className={`bg-surface-lowest rounded-2xl p-4 flex flex-col justify-between border transition-all duration-200 w-[290px] shrink-0 shadow-2xs ${
          isToday ? 'border-primary ring-1 ring-primary/30' : 'border-surface-container'
        }`}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-surface-container">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isToday ? 'bg-primary' : 'bg-on-surface-variant/40'}`} />
              <h3 className="font-extrabold text-base text-on-surface">{day}</h3>
              {isToday && (
                <span className="bg-primary-light text-primary text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                  TODAY
                </span>
              )}
            </div>
            <span className="bg-surface-low text-on-surface-variant font-mono text-xs font-bold px-2 py-0.5 rounded-md tabular-nums">
              {totals.filledSlots}/5
            </span>
          </div>

          {/* Slots */}
          {renderMealSlotsContent(day)}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-surface-container space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] font-bold tracking-wider text-on-surface-variant uppercase">
              DAILY TOTAL
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black font-mono tracking-tight text-on-surface tabular-nums">
                {totals.calories}
              </span>
              <span className="text-xs font-bold text-on-surface-variant">kcal</span>
            </div>
          </div>

          <div className="h-1.5 w-full bg-surface-low rounded-full overflow-hidden flex">
            <div className="bg-emerald-500 h-full" style={{ width: `${totals.macroPercentages.protein}%` }} title={`Protein: ${totals.protein}g`} />
            <div className="bg-sky-500 h-full" style={{ width: `${totals.macroPercentages.carbs}%` }} title={`Carbs: ${totals.carbs}g`} />
            <div className="bg-rose-500 h-full" style={{ width: `${totals.macroPercentages.fat}%` }} title={`Fat: ${totals.fats}g`} />
            <div className="bg-violet-500 h-full" style={{ width: `${totals.macroPercentages.fiber}%` }} title={`Fiber: ${totals.fiber}g`} />
          </div>

          <div className="grid grid-cols-4 gap-1 text-center font-mono text-xs pt-1">
            <div className="bg-surface-low rounded p-1">
              <span className="block text-[8px] font-bold text-on-surface-variant">P</span>
              <span className="text-emerald-600 font-bold">{totals.protein}g</span>
            </div>
            <div className="bg-surface-low rounded p-1">
              <span className="block text-[8px] font-bold text-on-surface-variant">C</span>
              <span className="text-sky-600 font-bold">{totals.carbs}g</span>
            </div>
            <div className="bg-surface-low rounded p-1">
              <span className="block text-[8px] font-bold text-on-surface-variant">F</span>
              <span className="text-rose-600 font-bold">{totals.fats}g</span>
            </div>
            <div className="bg-surface-low rounded p-1">
              <span className="block text-[8px] font-bold text-on-surface-variant">Fib</span>
              <span className="text-violet-600 font-bold">{totals.fiber}g</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const currentDayIndex = DAYS_OF_WEEK.indexOf(selectedDay as any);
  const prevDay = DAYS_OF_WEEK[(currentDayIndex - 1 + DAYS_OF_WEEK.length) % DAYS_OF_WEEK.length];
  const nextDay = DAYS_OF_WEEK[(currentDayIndex + 1) % DAYS_OF_WEEK.length];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-4 pb-12"
    >
      {/* Top Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-surface-container">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-on-surface">
              Weekly Planner
            </h1>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-primary-light text-primary border border-primary/20">
              {weeklyAnalytics.plannedPercent}% Planned ({weeklyAnalytics.plannedCount}/{weeklyAnalytics.totalSlots})
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Organize daily meals and track macro balance across the full week.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* View mode toggle: Day Focus vs 7-Day Board */}
          <div className="flex items-center p-1 bg-surface-low rounded-xl border border-surface-container">
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'day' 
                  ? 'bg-surface-lowest text-primary shadow-2xs' 
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Day Focus
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'week' 
                  ? 'bg-surface-lowest text-primary shadow-2xs' 
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              7-Day Board
            </button>
          </div>

          <button
            onClick={handleExportPDF}
            className="px-3.5 py-1.5 bg-surface-low hover:bg-surface-container rounded-xl text-on-surface text-xs font-bold transition-colors border border-surface-container cursor-pointer"
          >
            Export PDF
          </button>
          {onBrowseRecipes && (
            <button
              onClick={onBrowseRecipes}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold transition-all shadow-2xs active:scale-95 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Browse Recipes</span>
            </button>
          )}
        </div>
      </div>

      {/* Center Day Navigation in Day Focus View (Matches MON, TUE, WED...) */}
      {viewMode === 'day' && (
        <div className="flex items-center p-1.5 bg-surface-lowest rounded-2xl border border-surface-container gap-1 overflow-x-auto no-scrollbar shadow-2xs">
          {DAYS_OF_WEEK.map(d => {
            const isSelected = selectedDay === d;
            const isToday = d === 'Thursday';
            const shortCode = DAY_SHORT_MAP[d];
            const dTotals = getDayTotals(d);

            return (
              <button
                key={d}
                onClick={() => setSelectedDay(d)}
                className={`flex-1 min-w-[72px] py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                  isSelected 
                    ? 'bg-primary text-white shadow-2xs scale-[1.02]' 
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-low'
                }`}
              >
                <div className="flex items-center gap-1">
                  <span>{shortCode}</span>
                  {isToday && (
                    <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-amber-300' : 'bg-amber-400'}`} />
                  )}
                </div>
                <span className={`text-[10px] font-mono ${isSelected ? 'text-white/80' : 'text-on-surface-variant/70'}`}>
                  {dTotals.filledSlots}/5
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Slim Weekly Nutrition HUD Strip */}
      <section className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-surface-lowest rounded-xl border border-surface-container text-xs shadow-2xs">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Weekly Daily Avg:</span>
          <span className="font-mono font-bold text-on-surface">{weeklyAnalytics.avgDailyCal} kcal</span>
          <span className="opacity-30">·</span>
          <span className="font-mono text-emerald-600 font-semibold">{weeklyAnalytics.avgDailyProtein}g Prot</span>
          <span className="opacity-30">·</span>
          <span className="font-mono text-sky-600 font-semibold">{weeklyAnalytics.avgDailyCarbs}g Carb</span>
          <span className="opacity-30">·</span>
          <span className="font-mono text-rose-600 font-semibold">{weeklyAnalytics.avgDailyFat}g Fat</span>
          <span className="opacity-30">·</span>
          <span className="font-mono text-violet-600 font-semibold">{weeklyAnalytics.avgDailyFiber}g Fib</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-on-surface-variant font-mono text-xs">
          <span>Week Total: {weeklyAnalytics.totalCal.toLocaleString()} kcal</span>
          <span className="opacity-30">|</span>
          <span>{weeklyAnalytics.plannedCount}/{weeklyAnalytics.totalSlots} Planned</span>
        </div>
      </section>

      {/* Main Viewport Content */}
      {viewMode === 'day' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Column: 5 Meal Slots */}
          <div className="lg:col-span-8 bg-surface-lowest rounded-2xl p-5 border border-surface-container shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedDay(prevDay)}
                  className="p-1 rounded-lg hover:bg-surface-low transition-colors text-on-surface-variant cursor-pointer"
                  title={`Previous: ${prevDay}`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-on-surface">{selectedDay}</h2>
                  {selectedDay === 'Thursday' && (
                    <span className="bg-primary-light text-primary text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                      TODAY
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setSelectedDay(nextDay)}
                  className="p-1 rounded-lg hover:bg-surface-low transition-colors text-on-surface-variant cursor-pointer"
                  title={`Next: ${nextDay}`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <span className="text-xs font-mono font-bold bg-surface-low text-on-surface-variant px-2.5 py-1 rounded-lg border border-surface-container/60">
                {getDayTotals(selectedDay).filledSlots}/5 Slots Planned
              </span>
            </div>
            {renderMealSlotsContent(selectedDay)}
          </div>

          {/* Right Column: Sticky Daily Nutrition Summary */}
          <div className="lg:col-span-4 sticky top-20">
            {renderNutritionSummaryCard(selectedDay)}
          </div>
        </div>
      ) : (
        /* 7-Day Board View */
        <div className="overflow-x-auto no-scrollbar pb-6 pt-1">
          <div className="flex gap-4 min-w-[1400px]">
            {DAYS_OF_WEEK.map((day) => renderDayCard(day))}
          </div>
        </div>
      )}

      {/* Recipe Selection Modal */}
      <RecipePicker 
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onSelect={handleSelectRecipe}
        recipes={recipes}
        title={activeSlot ? `Select ${activeSlot.slotLabel}` : 'Select Recipe'}
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
  const [searchQuery, setSearchQuery] = React.useState('');
  const categoriesContainerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  // Extract unique tags from all recipes
  const allTags = React.useMemo(() => {
    const tags = new Set<string>();
    recipes.forEach(r => r.tags.forEach(t => tags.add(t)));
    return ['All Recipes', ...Array.from(tags).sort()];
  }, [recipes]);

  const filteredRecipes = React.useMemo(() => {
    let result = recipes;
    if (selectedFilter !== 'All Recipes') {
      result = result.filter(r => r.tags.includes(selectedFilter));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(r => 
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [recipes, selectedFilter, searchQuery]);

  const checkScrollState = React.useCallback(() => {
    const el = categoriesContainerRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 10);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    }
  }, []);

  React.useEffect(() => {
    checkScrollState();
    window.addEventListener('resize', checkScrollState);
    return () => window.removeEventListener('resize', checkScrollState);
  }, [checkScrollState, allTags]);

  const handleScrollCategories = (direction: 'left' | 'right') => {
    if (categoriesContainerRef.current) {
      categoriesContainerRef.current.scrollBy({
        left: direction === 'left' ? -220 : 220,
        behavior: 'smooth'
      });
      setTimeout(checkScrollState, 300);
    }
  };

  const heroRecipe = recipes[0] || INITIAL_RECIPES[0];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6 pb-16"
    >
      {/* Hero Media Inspiration Section */}
      <header>
        <div className="flex items-center justify-between pb-3 border-b border-surface-container mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-on-surface tracking-tight">
              Daily Inspiration
            </h1>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Explore chef-tested recipes balanced for energy, protein, and dietary goals.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-on-surface-variant bg-surface-low px-2.5 py-1 rounded-lg border border-surface-container/60">
            {recipes.length} Total Recipes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 h-auto md:h-[420px]">
          {/* Main Hero Card */}
          <div 
            onClick={() => onRecipeClick(heroRecipe.id)}
            className="md:col-span-8 group relative overflow-hidden rounded-2xl bg-surface-low border border-surface-container shadow-2xs hover:shadow-md transition-all cursor-pointer"
          >
            <img 
              src={heroRecipe.image} 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              alt="Hero"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute bottom-0 p-6 md:p-8 w-full">
              <span className="inline-block px-3 py-1 rounded-lg bg-primary text-white text-[10px] font-black mb-2 uppercase tracking-wider shadow-xs">
                EDITOR'S CHOICE
              </span>
              <h2 className="text-white text-2xl md:text-3xl font-black mb-2 tracking-tight">
                {heroRecipe.title}
              </h2>
              <p className="text-white/80 max-w-lg mb-4 text-xs sm:text-sm leading-relaxed line-clamp-2">
                {heroRecipe.description}
              </p>
              <div className="flex items-center gap-6 text-white text-xs font-mono">
                <div>
                  <span className="block text-white/60 text-[9px] font-bold uppercase">Calories</span>
                  <span className="font-bold text-sm">
                    {Math.round(heroRecipe.calories / (heroRecipe.servings || 1))} kcal
                  </span>
                </div>
                <div>
                  <span className="block text-white/60 text-[9px] font-bold uppercase">Protein</span>
                  <span className="text-emerald-400 font-bold text-sm">
                    {(heroRecipe.protein / (heroRecipe.servings || 1)).toFixed(1)}g
                  </span>
                </div>
                <div>
                  <span className="block text-white/60 text-[9px] font-bold uppercase">Prep Time</span>
                  <span className="font-bold text-sm">{heroRecipe.prepTime} min</span>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Hero Side Cards */}
          <div className="md:col-span-4 grid grid-rows-2 gap-4">
            {recipes.slice(1, 3).map((item) => (
              <div 
                key={item.id} 
                onClick={() => onRecipeClick(item.id)}
                className="relative overflow-hidden rounded-2xl bg-surface-low border border-surface-container group cursor-pointer shadow-2xs hover:shadow-md transition-all"
              >
                <img src={item.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <h4 className="text-white text-base font-bold truncate">{item.title}</h4>
                  <div className="flex items-center gap-2 mt-1 text-xs font-mono text-white/80">
                    <span>{Math.round(item.calories / (item.servings || 1))} kcal</span>
                    <span>·</span>
                    <span className="text-emerald-400 font-semibold">{(item.protein / (item.servings || 1)).toFixed(1)}g P</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Sticky Categories Bar */}
      <div className="sticky top-16 z-30 -mx-4 md:-mx-6 px-4 md:px-6 py-2.5 bg-surface/95 backdrop-blur-md border-b border-surface-container shadow-2xs transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Scrollable Category Filter Chips */}
          <div className="relative flex-1 min-w-0 flex items-center">
            {canScrollLeft && (
              <button 
                onClick={() => handleScrollCategories('left')}
                className="absolute left-0 z-20 p-1.5 rounded-lg bg-surface-lowest shadow-md text-on-surface hover:bg-surface-low transition-all -ml-1 border border-surface-container"
                aria-label="Scroll categories left"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            )}

            <div 
              ref={categoriesContainerRef}
              onScroll={checkScrollState}
              className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-0.5 px-0.5 w-full"
            >
              {allTags.map((filter) => {
                const isSelected = selectedFilter === filter;
                const count = filter === 'All Recipes' 
                  ? recipes.length 
                  : recipes.filter(r => r.tags.includes(filter)).length;

                return (
                  <button 
                    key={filter}
                    aria-label={filter}
                    onClick={(e) => {
                      setSelectedFilter(filter);
                      e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                    }}
                    className={`px-3.5 py-1.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                      isSelected 
                        ? 'bg-primary text-white shadow-2xs' 
                        : 'bg-surface-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                    }`}
                  >
                    <span>{filter}</span>
                    <span 
                      aria-hidden="true"
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded leading-none font-bold ${
                        isSelected 
                          ? 'bg-white/20 text-white' 
                          : 'bg-surface-lowest text-on-surface-variant'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {canScrollRight && (
              <button 
                onClick={() => handleScrollCategories('right')}
                className="absolute right-0 z-20 p-1.5 rounded-lg bg-surface-lowest shadow-md text-on-surface hover:bg-surface-low transition-all -mr-1 border border-surface-container"
                aria-label="Scroll categories right"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Search */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-7 py-1.5 bg-surface-low border border-surface-container rounded-xl text-xs text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-1 focus:ring-primary w-40 md:w-52 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface p-0.5"
                  title="Clear search"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
            <span className="text-[11px] font-mono text-on-surface-variant font-bold px-2.5 py-1 rounded-xl bg-surface-low whitespace-nowrap border border-surface-container">
              {filteredRecipes.length} recipes
            </span>
          </div>

        </div>
      </div>

      {/* Recipes Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} onClick={onRecipeClick} onEdit={onEditRecipe} />
          ))
        ) : (
          <div className="col-span-full py-16 text-center bg-surface-lowest rounded-2xl border border-surface-container shadow-2xs">
            <p className="text-on-surface-variant font-medium text-sm">
              No recipes found matching "{searchQuery || selectedFilter}".
            </p>
            <button
              onClick={() => {
                setSelectedFilter('All Recipes');
                setSearchQuery('');
              }}
              className="mt-3 text-primary text-xs font-bold hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>
    </motion.div>
  );
};

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
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6 pb-16"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-surface-container">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-on-surface">
            Ingredient Hub
          </h1>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Manage pantry staples and custom ingredients. Track nutrition per unit for precise meal planning.
          </p>
        </div>
        <button 
          onClick={onNewIngredient}
          className="flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold transition-all shadow-2xs active:scale-95 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Ingredient</span>
        </button>
      </div>

      {/* Search & Overview Strip */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
          <input 
            className="w-full pl-10 pr-4 py-2.5 bg-surface-lowest border border-surface-container rounded-xl text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-on-surface-variant/50 shadow-2xs" 
            placeholder="Search ingredients..." 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-on-surface-variant bg-surface-lowest px-3 py-2 rounded-xl border border-surface-container shadow-2xs">
            {filteredIngredients.length} Items Listed
          </span>
        </div>
      </div>

      {/* Aligned Table Columns Header (Desktop) */}
      <div className="space-y-2">
        <div className="hidden md:grid grid-cols-12 px-4 py-2 bg-surface-lowest rounded-xl border border-surface-container text-[11px] font-bold text-on-surface-variant uppercase tracking-wider shadow-2xs">
          <div className="col-span-4">Ingredient</div>
          <div className="col-span-2 text-center">Base Serving</div>
          <div className="col-span-1 text-center">Cals</div>
          <div className="col-span-1 text-center text-emerald-600">Protein</div>
          <div className="col-span-1 text-center text-sky-600">Carbs</div>
          <div className="col-span-1 text-center text-rose-600">Fat</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {filteredIngredients.map(ing => (
          <IngredientCard key={ing.id} ingredient={ing} onEdit={onEditIngredient} />
        ))}

        {filteredIngredients.length === 0 && (
          <div className="py-12 text-center bg-surface-lowest rounded-2xl border border-surface-container shadow-2xs">
            <p className="text-on-surface-variant text-sm font-medium">No ingredients found matching "{searchQuery}".</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
