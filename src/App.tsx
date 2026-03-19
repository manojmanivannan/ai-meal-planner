import React, { useEffect, useState, useCallback } from 'react';
import { TopBar, BottomNav } from './components/Navigation';
import { PlannerScreen, RecipesScreen, IngredientsScreen } from './screens/MainScreens';
import { EditIngredientScreen } from './screens/EditIngredientScreen';
import { CreateRecipeScreen } from './screens/CreateRecipeScreen';
import { RecipeDetailScreen } from './screens/RecipeDetailScreen';
import { Recipe, Ingredient } from './types';
import { fetchIngredients, fetchRecipes, createIngredient, updateIngredient, deleteIngredient, createRecipe, updateRecipe, deleteRecipeApi } from './api';

type ViewState =
  | { type: 'main' }
  | { type: 'edit-ingredient'; ingredientId: number | null }
  | { type: 'create-recipe' }
  | { type: 'edit-recipe'; recipeId: number }
  | { type: 'recipe-detail'; recipeId: number };

function App() {
  const [activeTab, setActiveTab] = useState<'planner' | 'recipes' | 'ingredients'>('planner');
  const [view, setView] = useState<ViewState>({ type: 'main' });
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data from API
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [ings, recs] = await Promise.all([
        fetchIngredients({ limit: 1000 }),
        fetchRecipes({ limit: 500 }),
      ]);
      setIngredients(ings);
      setRecipes(recs);
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handlers
  const handleSaveIngredient = async (data: Partial<Ingredient>, id?: number) => {
    try {
      if (id) {
        await updateIngredient(id, data);
      } else {
        await createIngredient(data);
      }
      await loadData();
      setView({ type: 'main' });
    } catch (err) {
      console.error('Failed to save ingredient:', err);
    }
  };

  const handleDeleteIngredient = async (id: number) => {
    try {
      await deleteIngredient(id);
      await loadData();
      setView({ type: 'main' });
    } catch (err) {
      console.error('Failed to delete ingredient:', err);
    }
  };

  const handleSaveRecipe = async (data: Partial<Recipe>, id?: number) => {
    try {
      if (id) {
        await updateRecipe(id, data);
      } else {
        await createRecipe(data);
      }
      await loadData();
      setView({ type: 'main' });
    } catch (err) {
      console.error('Failed to save recipe:', err);
    }
  };

  const handleDeleteRecipe = async (id: number) => {
    try {
      await deleteRecipeApi(id);
      await loadData();
      setView({ type: 'main' });
    } catch (err) {
      console.error('Failed to delete recipe:', err);
    }
  };

  // Navigation handlers
  const handleRecipeClick = (id: number) => setView({ type: 'recipe-detail', recipeId: id });
  const handleEditRecipe = (id: number) => setView({ type: 'edit-recipe', recipeId: id });
  const handleEditIngredient = (id: number) => setView({ type: 'edit-ingredient', ingredientId: id });
  const handleNewIngredient = () => setView({ type: 'edit-ingredient', ingredientId: null });
  const handleBack = () => setView({ type: 'main' });

  // Render sub-views
  if (view.type === 'edit-ingredient') {
    const ingredient = view.ingredientId 
      ? ingredients.find(i => i.id === view.ingredientId) || null 
      : null;
    return (
      <EditIngredientScreen
        ingredient={ingredient}
        onBack={handleBack}
        onSave={(data) => handleSaveIngredient(data, view.ingredientId ?? undefined)}
        onDelete={view.ingredientId ? () => handleDeleteIngredient(view.ingredientId!) : undefined}
      />
    );
  }

  if (view.type === 'create-recipe' || view.type === 'edit-recipe') {
    const recipe = view.type === 'edit-recipe' 
      ? recipes.find(r => r.id === view.recipeId) || null 
      : null;
    return (
      <CreateRecipeScreen
        recipe={recipe}
        ingredients={ingredients}
        onBack={handleBack}
        onSave={(data) => handleSaveRecipe(data, view.type === 'edit-recipe' ? view.recipeId : undefined)}
        onDelete={view.type === 'edit-recipe' ? () => handleDeleteRecipe(view.recipeId) : undefined}
      />
    );
  }

  if (view.type === 'recipe-detail') {
    const recipe = recipes.find(r => r.id === view.recipeId);
    if (recipe) {
      return (
        <RecipeDetailScreen
          recipe={recipe}
          onBack={handleBack}
          onEdit={() => handleEditRecipe(view.recipeId)}
        />
      );
    }
  }

  // Main view
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-on-surface-variant font-medium">Loading your kitchen...</p>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'planner':
        return <PlannerScreen onRecipeClick={handleRecipeClick} />;
      case 'recipes':
        return (
          <RecipesScreen
            recipes={recipes}
            onRecipeClick={handleRecipeClick}
            onEditRecipe={handleEditRecipe}
          />
        );
      case 'ingredients':
        return (
          <IngredientsScreen
            ingredients={ingredients}
            onEditIngredient={handleEditIngredient}
            onNewIngredient={handleNewIngredient}
            onDeleteIngredient={handleDeleteIngredient}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      <TopBar
        activeTab={activeTab}
        onCreateRecipe={() => setView({ type: 'create-recipe' })}
      />
      <main className="max-w-7xl mx-auto px-6 pt-28 pb-28">
        {renderContent()}
      </main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;
