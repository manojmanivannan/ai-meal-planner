# Weekly Planner Recipe Cards & Full Nutrition Telemetry

## Overview & Goal
Upgrade the Weekly Planner and recipe cards to achieve full nutritional feature parity with the reference designs. This introduces a 5-meal slot architecture per day (Pre-breakfast, Breakfast, Lunch, Snack, Dinner), multi-item support per slot, inline color-coded macro badges (Calories, Protein, Carbs, Fat), a comprehensive daily macro footer with distribution bar, and weekly aggregated metrics (planned completion, average daily calories, protein, carbs, fat, and fiber).

## User Review & Critical Decisions

> [!IMPORTANT]
> Based on your confirmed choices:
> 1. **Schedule Architecture**: Day-by-day tabbed view featuring deep nutrition summary and meal breakdown.
> 2. **Multi-Item Support**: Each meal slot supports multiple recipe items, with combined macro calculations and individual item removal.
> 3. **5 Meal Slots**: Pre-breakfast, Breakfast, Lunch, Snack, and Dinner are supported across all 7 days.

- **Confirmed Decision 1**: Pre-breakfast, Breakfast, Lunch, Snack, Dinner slots.
- **Confirmed Decision 2**: Color-coded inline telemetry for each meal item: `kcal • X.Xg P • X.Xg C • X.Xg F`.
- **Confirmed Decision 3**: Aggregated Daily Nutrition footer (Daily Total kcal, Macro distribution bar, Protein, Carbs, Fat, Fiber cards).

---

## 1. Core User Experience & Flows

### A. Weekly Metrics & Analytics Banner
- **Planned Meals Progress**: Tracks scheduled meals out of total possible slots (e.g., `21/35`, `60%` with a progress bar).
- **Macro Averages**: 5 summary metric cards displaying average daily intake and total week sums:
  - Avg Daily Cal (`kcal/day` + Week Total)
  - Avg Daily Protein (`g/day` + Week Total)
  - Avg Daily Carbs (`g/day` + Week Total)
  - Avg Daily Fat (`g/day` + Week Total)
  - Avg Daily Fiber (`g/day` + Week Total)
- **Actions**: "Browse Recipes" button to quickly jump to the recipe catalog, and "Export PDF" for weekly summary printing.

### B. Day Navigation & Slot Management
- **Day Selector Tabs**: `MON`, `TUE`, `WED`, `THU`, `FRI`, `SAT`, `SUN` with active day highlight, `TODAY` indicator, and completed slot count badge (e.g. `4/5`).
- **5 Meal Slots per Day**:
  - 🌅 **PRE-BREAKFAST**: Clear button + `+ Add` button
  - 🍳 **BREAKFAST**: Clear button + `+ Add` button
  - 🥗 **LUNCH**: Clear button + `+ Add` button
  - 🍎 **SNACK**: Clear button + `+ Add` button
  - 🍲 **DINNER**: Clear button + `+ Add` button

### C. Individual Recipe Items in Meal Slots
- Dot indicator (color-coded dietary or meal category).
- Recipe title with one-click navigation to Recipe Detail.
- Inline Macro Breakdown: `[Calories] kcal • [Protein]g P • [Carbs]g C • [Fats]g F`.
  - Protein: emerald green (`text-emerald-400`)
  - Carbs: cyan blue (`text-sky-400`)
  - Fat: coral red (`text-rose-400`)
- Dismiss/Remove `X` button to delete specific recipe from the slot without affecting other items.
- Empty state: Clean dashed slot with `+ Assign [slot]` button.

### D. Daily Nutrition Summary Card
- **Daily Total**: Prominent calorie count (`XXXX kcal`).
- **Macro Distribution Bar**: Visual proportion bar showing the calorie breakdown of Protein (4 kcal/g), Carbs (4 kcal/g), and Fat (9 kcal/g).
- **4 Metric Cards**:
  - `PROTEIN`: Exact total grams with emerald accent.
  - `CARBS`: Exact total grams with cyan accent.
  - `FAT`: Exact total grams with coral accent.
  - `FIBER`: Exact total grams with violet accent.

---

## 2. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────┐
│                        App.tsx                         │
│   (Manages recipes, ingredients, and weekly plan state)│
└──────────────────────────┬─────────────────────────────┘
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
┌───────────────────────────┐ ┌───────────────────────────┐
│       WeeklySummary       │ │       PlannerScreen       │
│  - Planned ratio (21/35)  │ │  - Day Tabs (Mon-Sun)     │
│  - Avg Cal / Prot / Carb  │ │  - 5 Meal Slots           │
│  - Fat / Fiber aggregates │ │  - Multi-item slots       │
└───────────────────────────┘ └─────────────┬─────────────┘
                                            │
                                            ▼
                              ┌───────────────────────────┐
                              │     PlannerRecipeItem     │
                              │ - Color dot & Title       │
                              │ - kcal • P • C • F        │
                              │ - Remove (X) button       │
                              └───────────────────────────┘
                                            │
                                            ▼
                              ┌───────────────────────────┐
                              │     DailyNutritionCard    │
                              │ - Total kcal              │
                              │ - Macro ratio bar         │
                              │ - Protein, Carbs, Fat,    │
                              │   Fiber stat cards        │
                              └───────────────────────────┘
```

### Data Schema Updates (`src/types.ts`)
- Add `fiber?: number` to `Recipe` and `Ingredient` interfaces.
- Define `MealSlot = 'preBreakfast' | 'breakfast' | 'lunch' | 'snack' | 'dinner'`.
- Update `DayPlan` to: `Record<MealSlot, string[]>`, allowing multiple recipe IDs per slot.

### State Transitions & Working Handlers
- `handleAddRecipeToSlot(day, slot)`: Opens the recipe picker; choosing a recipe appends it to `dayPlans[day][slot]`.
- `handleRemoveItem(day, slot, index)`: Removes the recipe at specific index from the slot.
- `handleClearSlot(day, slot)`: Empties all items from the slot.
- Real-time recalculation of day totals and weekly averages on every state mutation.

---

## 3. Verification & Polish
- Ensure all numeric values use `tabular-nums` for crisp visual alignment.
- Implement responsive layout: clean tabbed selector on mobile/tablet and wide desktop presentation.
- Verify TypeScript types and lint checks pass cleanly.
