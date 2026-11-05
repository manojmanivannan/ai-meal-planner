import React from 'react';
import { motion } from 'motion/react';
import { 
  Sunrise, Sun, Moon, Coffee, Plus, 
  Search, Heart, ArrowRight, Sparkles, 
  Clock, Edit2, X 
} from 'lucide-react';
import { RecipeCard } from '../components/RecipeCard';
import { INITIAL_RECIPES, INITIAL_INGREDIENTS } from '../constants';
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
  emoji: string;
}

const MEAL_SLOTS: MealSlotConfig[] = [
  { key: 'preBreakfast', label: 'PRE-BREAKFAST', emoji: '🌅' },
  { key: 'breakfast', label: 'BREAKFAST', emoji: '🍳' },
  { key: 'lunch', label: 'LUNCH', emoji: '🥗' },
  { key: 'snack', label: 'SNACK', emoji: '🍎' },
  { key: 'dinner', label: 'DINNER', emoji: '🍲' },
];

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;

export const PlannerScreen: React.FC<PlannerScreenProps> = ({ 
  onRecipeClick, 
  recipes = INITIAL_RECIPES,
  onBrowseRecipes 
}) => {
  const [selectedDay, setSelectedDay] = React.useState<string>('Thursday');
  const [viewMode, setViewMode] = React.useState<'day' | 'week'>('day');
  const [isPickerOpen, setIsPickerOpen] = React.useState(false);
  const [activeSlot, setActiveSlot] = React.useState<{ day: string; slot: MealSlot } | null>(null);

  // Initial plan populated with authentic recipes matching reference designs
  const [dayPlans, setDayPlans] = React.useState<Record<string, Record<MealSlot, string[]>>>(() => {
    return {
      Monday: {
        preBreakfast: ['r-cumin-tea'],
        breakfast: ['r-garlic-bread'],
        lunch: ['r-stir-fry-noodles'],
        snack: [],
        dinner: ['r-chicken-saute', 'r-boiled-rice']
      },
      Tuesday: {
        preBreakfast: ['r-cumin-tea'],
        breakfast: ['r-avocado-toast'],
        lunch: ['r-pasta-veggie'],
        snack: [],
        dinner: ['r-bhaji-gravy']
      },
      Wednesday: {
        preBreakfast: ['r-cumin-tea'],
        breakfast: ['r-overnight-oats'],
        lunch: ['r-chapati', 'r-lentil-masala'],
        snack: [],
        dinner: ['r-lentil-stew']
      },
      Thursday: {
        preBreakfast: ['r-cumin-tea'],
        breakfast: ['r-overnight-oats'],
        lunch: ['r-gongura-thovaiyal', 'r-boiled-rice'],
        snack: [],
        dinner: ['r-sweet-potato-chaat']
      },
      Friday: {
        preBreakfast: ['r-cumin-tea'],
        breakfast: ['r-avocado-toast'],
        lunch: ['r2'],
        snack: ['r-sweet-potato-chaat'],
        dinner: ['r3']
      },
      Saturday: {
        preBreakfast: [],
        breakfast: ['r1'],
        lunch: ['r4'],
        snack: ['r-sweet-potato-chaat'],
        dinner: ['r-chicken-saute']
      },
      Sunday: {
        preBreakfast: ['r-cumin-tea'],
        breakfast: ['r-overnight-oats'],
        lunch: ['r-stir-fry-noodles'],
        snack: [],
        dinner: ['r-lentil-stew']
      }
    };
  });

  const getRecipeById = React.useCallback((id: string): Recipe | undefined => {
    return recipes.find(r => r.id === id) || INITIAL_RECIPES.find(r => r.id === id);
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
          calories += recipe.calories;
          protein += recipe.protein;
          carbs += recipe.carbs;
          fats += recipe.fats;
          fiber += recipe.fiber || 0;
        }
      });
    });

    // Macro calorie breakdown for distribution bar: P (4 kcal/g), C (4 kcal/g), F (9 kcal/g)
    const pCal = protein * 4;
    const cCal = carbs * 4;
    const fCal = fats * 9;
    const totalMacroCal = pCal + cCal + fCal || 1;

    return {
      calories: Math.round(calories),
      protein: Number(protein.toFixed(1)),
      carbs: Number(carbs.toFixed(1)),
      fats: Number(fats.toFixed(1)),
      fiber: Number(fiber.toFixed(1)),
      filledSlots,
      macroPercentages: {
        protein: Math.round((pCal / totalMacroCal) * 100),
        carbs: Math.round((cCal / totalMacroCal) * 100),
        fat: Math.round((fCal / totalMacroCal) * 100)
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

  const handleOpenPicker = (day: string, slot: MealSlot) => {
    setActiveSlot({ day, slot });
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

  // Day theme styling map matching screenshots
  const getDayTheme = (day: string) => {
    const isToday = day === 'Thursday';
    switch (day) {
      case 'Monday':
        return {
          dotColor: 'bg-indigo-400',
          borderColor: 'border-indigo-500/30',
          activeBg: 'bg-indigo-500/10 text-indigo-300',
          isToday: false
        };
      case 'Tuesday':
        return {
          dotColor: 'bg-sky-400',
          borderColor: 'border-sky-500/30',
          activeBg: 'bg-sky-500/10 text-sky-300',
          isToday: false
        };
      case 'Wednesday':
        return {
          dotColor: 'bg-emerald-400',
          borderColor: 'border-emerald-500/30',
          activeBg: 'bg-emerald-500/10 text-emerald-300',
          isToday: false
        };
      case 'Thursday':
        return {
          dotColor: 'bg-amber-400',
          borderColor: 'border-amber-400/80 shadow-[0_0_20px_rgba(251,191,36,0.15)] ring-1 ring-amber-400/40',
          activeBg: 'bg-amber-500/10 text-amber-300',
          isToday: true
        };
      case 'Friday':
        return {
          dotColor: 'bg-rose-400',
          borderColor: 'border-rose-500/30',
          activeBg: 'bg-rose-500/10 text-rose-300',
          isToday: false
        };
      case 'Saturday':
        return {
          dotColor: 'bg-violet-400',
          borderColor: 'border-violet-500/30',
          activeBg: 'bg-violet-500/10 text-violet-300',
          isToday: false
        };
      case 'Sunday':
      default:
        return {
          dotColor: 'bg-orange-400',
          borderColor: 'border-orange-500/30',
          activeBg: 'bg-orange-500/10 text-orange-300',
          isToday: false
        };
    }
  };

  // Render a single Day Column Card with full nutrition telemetry
  const renderDayCard = (day: string, isFullWidth = false) => {
    const totals = getDayTotals(day);
    const theme = getDayTheme(day);
    const plan = dayPlans[day] || { preBreakfast: [], breakfast: [], lunch: [], snack: [], dinner: [] };

    return (
      <div 
        key={day}
        className={`bg-surface-lowest/95 backdrop-blur-md rounded-2xl p-5 flex flex-col justify-between border transition-all duration-300 ${
          theme.borderColor
        } ${isFullWidth ? 'w-full' : 'w-full md:w-[320px] shrink-0'}`}
      >
        {/* Day Card Header */}
        <div>
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-surface-container/60">
            <div className="flex items-center gap-2.5">
              <span className={`w-2.5 h-2.5 rounded-full ${theme.dotColor}`} />
              <h3 className="font-extrabold text-lg text-on-surface">{day}</h3>
              {theme.isToday && (
                <span className="bg-amber-400 text-black text-[10px] font-black px-2 py-0.5 rounded-full tracking-wider uppercase">
                  TODAY
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-surface-container-high text-on-surface-variant font-mono text-xs font-bold px-2 py-0.5 rounded-md tabular-nums">
                {totals.filledSlots}/5
              </span>
            </div>
          </div>

          {/* 5 Meal Slots */}
          <div className="space-y-4">
            {MEAL_SLOTS.map((slotConfig) => {
              const itemIds = plan[slotConfig.key] || [];
              const hasItems = itemIds.length > 0;

              return (
                <div key={slotConfig.key} className="space-y-2">
                  {/* Slot Title & Actions */}
                  <div className="flex items-center justify-between text-[11px] font-bold text-on-surface-variant">
                    <div className="flex items-center gap-1.5 uppercase tracking-wider">
                      <span>{slotConfig.emoji}</span>
                      <span>{slotConfig.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {hasItems && (
                        <button
                          onClick={() => handleClearSlot(day, slotConfig.key)}
                          className="hover:text-error transition-colors text-[10px] uppercase font-semibold"
                        >
                          Clear
                        </button>
                      )}
                      <button
                        onClick={() => handleOpenPicker(day, slotConfig.key)}
                        className="text-primary hover:underline transition-colors flex items-center gap-0.5 text-[10px] uppercase font-bold"
                      >
                        + Add
                      </button>
                    </div>
                  </div>

                  {/* Slot Items */}
                  {hasItems ? (
                    <div className="space-y-2">
                      {itemIds.map((recipeId, idx) => {
                        const recipe = getRecipeById(recipeId);
                        if (!recipe) return null;

                        return (
                          <div
                            key={`${recipeId}-${idx}`}
                            className="bg-surface-container-low/70 hover:bg-surface-container-low border border-surface-container/60 rounded-xl p-3 transition-all group"
                          >
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <div
                                onClick={() => onRecipeClick(recipe.id)}
                                className="flex items-center gap-2 cursor-pointer flex-grow min-w-0"
                              >
                                <span className={`w-2 h-2 rounded-full shrink-0 ${recipe.calories < 150 ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                                <span className="font-bold text-sm text-on-surface hover:text-primary transition-colors truncate">
                                  {recipe.title}
                                </span>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveItem(day, slotConfig.key, idx);
                                }}
                                className="text-on-surface-variant/40 hover:text-error p-0.5 rounded transition-colors shrink-0"
                                title="Remove item"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Macro Telemetry: kcal • P • C • F */}
                            <div className="flex items-center gap-1.5 text-xs font-mono tabular-nums text-on-surface-variant pl-4 flex-wrap">
                              <span className="font-bold text-on-surface">{recipe.calories} kcal</span>
                              <span className="opacity-30">•</span>
                              <span className="text-emerald-400 font-semibold">{recipe.protein}g P</span>
                              <span className="opacity-30">•</span>
                              <span className="text-sky-400 font-semibold">{recipe.carbs}g C</span>
                              <span className="opacity-30">•</span>
                              <span className="text-rose-400 font-semibold">{recipe.fats}g F</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleOpenPicker(day, slotConfig.key)}
                      className="w-full py-2.5 px-3 rounded-xl border border-dashed border-surface-container-highest/60 hover:border-primary/50 bg-surface-container-lowest/40 hover:bg-surface-container-low/50 text-on-surface-variant/70 hover:text-primary transition-all text-xs font-semibold flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Assign {slotConfig.label.toLowerCase()}</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Daily Total & Deep Nutrition Footer */}
        <div className="mt-6 pt-5 border-t border-surface-container/60 space-y-3.5">
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] font-bold tracking-wider text-on-surface-variant uppercase">
              DAILY TOTAL
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black font-mono tracking-tight text-on-surface tabular-nums">
                {totals.calories}
              </span>
              <span className="text-xs font-bold text-on-surface-variant">kcal</span>
            </div>
          </div>

          {/* Color-coded Macro Distribution Bar */}
          <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden flex">
            <div 
              className="bg-emerald-400 h-full transition-all duration-500" 
              style={{ width: `${totals.macroPercentages.protein}%` }} 
              title={`Protein: ${totals.macroPercentages.protein}%`}
            />
            <div 
              className="bg-sky-400 h-full transition-all duration-500" 
              style={{ width: `${totals.macroPercentages.carbs}%` }} 
              title={`Carbs: ${totals.macroPercentages.carbs}%`}
            />
            <div 
              className="bg-rose-400 h-full transition-all duration-500" 
              style={{ width: `${totals.macroPercentages.fat}%` }} 
              title={`Fat: ${totals.macroPercentages.fat}%`}
            />
          </div>

          {/* 4 Macro Cards */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-surface-container-low/70 rounded-xl p-2.5 border border-surface-container/40">
              <span className="block text-[9px] font-bold text-on-surface-variant uppercase tracking-wider mb-0.5">
                PROTEIN
              </span>
              <span className="text-sm font-black font-mono text-emerald-400 tabular-nums">
                {totals.protein}g
              </span>
            </div>
            <div className="bg-surface-container-low/70 rounded-xl p-2.5 border border-surface-container/40">
              <span className="block text-[9px] font-bold text-on-surface-variant uppercase tracking-wider mb-0.5">
                CARBS
              </span>
              <span className="text-sm font-black font-mono text-sky-400 tabular-nums">
                {totals.carbs}g
              </span>
            </div>
            <div className="bg-surface-container-low/70 rounded-xl p-2.5 border border-surface-container/40">
              <span className="block text-[9px] font-bold text-on-surface-variant uppercase tracking-wider mb-0.5">
                FAT
              </span>
              <span className="text-sm font-black font-mono text-rose-400 tabular-nums">
                {totals.fats}g
              </span>
            </div>
            <div className="bg-surface-container-low/70 rounded-xl p-2.5 border border-surface-container/40">
              <span className="block text-[9px] font-bold text-on-surface-variant uppercase tracking-wider mb-0.5">
                FIBER
              </span>
              <span className="text-sm font-black font-mono text-violet-400 tabular-nums">
                {totals.fiber}g
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="pb-16 space-y-8"
    >
      {/* Top Header & Actions */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Weekly Planner
            </span>
            <span className="text-xs text-on-surface-variant font-medium">Active Plan</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface">
            Meal Schedule & Macros
          </h1>
          <p className="text-on-surface-variant text-sm md:text-base mt-1 max-w-2xl">
            Organize 5 meal slots per day and monitor nutritional balance with real-time macro calculations.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* View mode toggle: Day Focus vs 7-Day Board */}
          <div className="flex items-center p-1 bg-surface-container-low rounded-xl border border-surface-container">
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'day' 
                  ? 'bg-primary text-on-primary shadow-sm' 
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Day Focus
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'week' 
                  ? 'bg-primary text-on-primary shadow-sm' 
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              7-Day Board
            </button>
          </div>

          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-4 py-2 bg-surface-container-low hover:bg-surface-container rounded-xl text-on-surface text-xs font-bold transition-colors border border-surface-container"
          >
            <span>Export PDF</span>
          </button>
          {onBrowseRecipes && (
            <button
              onClick={onBrowseRecipes}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-xl text-xs font-bold hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Browse Recipes</span>
            </button>
          )}
        </div>
      </header>

      {/* Weekly Stats Strip Banner (Screenshot 2) */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Planned meals */}
        <div className="bg-surface-lowest/90 backdrop-blur-md rounded-2xl p-4 border border-surface-container/60 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                PLANNED MEALS
              </span>
              <span className="text-xs font-mono font-bold text-on-surface tabular-nums">
                {weeklyAnalytics.plannedCount}/{weeklyAnalytics.totalSlots}
              </span>
            </div>
            <div className="text-2xl font-black font-mono tracking-tight text-on-surface tabular-nums">
              {weeklyAnalytics.plannedPercent}%
            </div>
            <p className="text-[11px] text-on-surface-variant">of weekly plan</p>
          </div>
          <div className="mt-3 h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
            <div 
              className="bg-emerald-400 h-full rounded-full transition-all duration-500" 
              style={{ width: `${weeklyAnalytics.plannedPercent}%` }} 
            />
          </div>
        </div>

        {/* Avg Daily Cal */}
        <div className="bg-surface-lowest/90 backdrop-blur-md rounded-2xl p-4 border border-surface-container/60 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
              AVG DAILY CAL
            </span>
            <div className="text-2xl font-black font-mono tracking-tight text-on-surface tabular-nums mt-1">
              {weeklyAnalytics.avgDailyCal} <span className="text-xs font-normal text-on-surface-variant">kcal/day</span>
            </div>
          </div>
          <p className="text-[11px] text-on-surface-variant font-mono tabular-nums mt-3">
            Total: {weeklyAnalytics.totalCal} kcal
          </p>
        </div>

        {/* Avg Daily Protein */}
        <div className="bg-surface-lowest/90 backdrop-blur-md rounded-2xl p-4 border border-surface-container/60 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
              AVG DAILY PROTEIN
            </span>
            <div className="text-2xl font-black font-mono tracking-tight text-emerald-400 tabular-nums mt-1">
              {weeklyAnalytics.avgDailyProtein} <span className="text-xs font-normal text-on-surface-variant">g/day</span>
            </div>
          </div>
          <p className="text-[11px] text-on-surface-variant font-mono tabular-nums mt-3">
            Total: {weeklyAnalytics.totalProtein} g
          </p>
        </div>

        {/* Avg Daily Carbs */}
        <div className="bg-surface-lowest/90 backdrop-blur-md rounded-2xl p-4 border border-surface-container/60 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
              AVG DAILY CARBS
            </span>
            <div className="text-2xl font-black font-mono tracking-tight text-sky-400 tabular-nums mt-1">
              {weeklyAnalytics.avgDailyCarbs} <span className="text-xs font-normal text-on-surface-variant">g/day</span>
            </div>
          </div>
          <p className="text-[11px] text-on-surface-variant font-mono tabular-nums mt-3">
            Total: {weeklyAnalytics.totalCarbs} g
          </p>
        </div>

        {/* Avg Daily Fat */}
        <div className="bg-surface-lowest/90 backdrop-blur-md rounded-2xl p-4 border border-surface-container/60 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
              AVG DAILY FAT
            </span>
            <div className="text-2xl font-black font-mono tracking-tight text-rose-400 tabular-nums mt-1">
              {weeklyAnalytics.avgDailyFat} <span className="text-xs font-normal text-on-surface-variant">g/day</span>
            </div>
          </div>
          <p className="text-[11px] text-on-surface-variant font-mono tabular-nums mt-3">
            Total: {weeklyAnalytics.totalFat} g
          </p>
        </div>

        {/* Avg Daily Fiber */}
        <div className="bg-surface-lowest/90 backdrop-blur-md rounded-2xl p-4 border border-surface-container/60 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
              AVG DAILY FIBER
            </span>
            <div className="text-2xl font-black font-mono tracking-tight text-violet-400 tabular-nums mt-1">
              {weeklyAnalytics.avgDailyFiber} <span className="text-xs font-normal text-on-surface-variant">g/day</span>
            </div>
          </div>
          <p className="text-[11px] text-on-surface-variant font-mono tabular-nums mt-3">
            Total: {weeklyAnalytics.totalFiber} g
          </p>
        </div>
      </section>

      {/* Day-by-Day Tabbed Navigation */}
      <section>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {DAYS_OF_WEEK.map((day) => {
            const isSelected = selectedDay === day;
            const totals = getDayTotals(day);
            const isToday = day === 'Thursday';

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-5 py-3 rounded-2xl font-bold flex items-center gap-3 transition-all shrink-0 border ${
                  isSelected 
                    ? 'bg-primary text-on-primary border-primary shadow-lg scale-102' 
                    : 'bg-surface-lowest/80 text-on-surface-variant hover:text-on-surface border-surface-container hover:bg-surface-container-low'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{day}</span>
                  {isToday && (
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${
                      isSelected ? 'bg-amber-400 text-black' : 'bg-amber-400/20 text-amber-300'
                    }`}>
                      TODAY
                    </span>
                  )}
                </div>
                <span className={`text-xs font-mono px-2 py-0.5 rounded-full tabular-nums ${
                  isSelected ? 'bg-black/20 text-white' : 'bg-surface-container-high text-on-surface-variant'
                }`}>
                  {totals.filledSlots}/5
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Viewport Content */}
      {viewMode === 'day' ? (
        /* Single Day Focused View with full deep nutrition */
        <div className="max-w-2xl mx-auto">
          {renderDayCard(selectedDay, true)}
        </div>
      ) : (
        /* 7-Day Board View (Horizontal scrollable columns matching Screenshot 2) */
        <div className="overflow-x-auto no-scrollbar pb-6">
          <div className="flex gap-5 min-w-[1400px]">
            {DAYS_OF_WEEK.map((day) => renderDayCard(day, false))}
          </div>
        </div>
      )}

      {/* Recipe Selection Modal */}
      <RecipePicker 
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onSelect={handleSelectRecipe}
        recipes={recipes}
        title={`Add to ${activeSlot?.day} ${activeSlot ? MEAL_SLOTS.find(s => s.key === activeSlot.slot)?.label : 'Meal'}`}
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
