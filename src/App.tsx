import React, { useState } from 'react';
import { TopBar, BottomNav } from './components/Navigation';
import { PlannerScreen, RecipesScreen, IngredientsScreen } from './screens/MainScreens';
import { EditIngredientScreen } from './screens/EditIngredientScreen';
import { CreateRecipeScreen } from './screens/CreateRecipeScreen';
import { RecipeDetailScreen } from './screens/RecipeDetailScreen';
import { Ingredient, Recipe } from './types';
import { INITIAL_INGREDIENTS, INITIAL_RECIPES } from './constants';

type ViewState = 'main' | 'edit-ingredient' | 'create-recipe' | 'edit-recipe' | 'recipe-detail';

export default function App() {
  const [activeTab, setActiveTab] = useState('planner');
  const [currentView, setCurrentView] = useState<ViewState>('main');
  const [ingredients, setIngredients] = useState<Ingredient[]>(INITIAL_INGREDIENTS);
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | undefined>();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>();
  const recipesScrollPosRef = React.useRef<number>(0);

  const handleEditIngredient = (id: string) => {
    const ing = ingredients.find(i => i.id === id);
    setSelectedIngredient(ing);
    setCurrentView('edit-ingredient');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleNewIngredient = () => {
    setSelectedIngredient(undefined);
    setCurrentView('edit-ingredient');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleSaveIngredient = (ing: Partial<Ingredient>) => {
    if (selectedIngredient) {
      setIngredients(ingredients.map(i => i.id === selectedIngredient.id ? { ...i, ...ing } as Ingredient : i));
    } else {
      const newIng: Ingredient = {
        ...ing,
        id: Math.random().toString(36).substr(2, 9),
      } as Ingredient;
      setIngredients([...ingredients, newIng]);
    }
    setCurrentView('main');
  };

  const handleDeleteIngredient = (id: string) => {
    setIngredients(ingredients.filter(i => i.id !== id));
    if (selectedIngredient?.id === id) {
      setSelectedIngredient(undefined);
    }
    setCurrentView('main');
  };

  const handleNewRecipe = () => {
    setSelectedRecipe(undefined);
    setCurrentView('create-recipe');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleEditRecipe = (id: string) => {
    const recipe = recipes.find(r => r.id === id || String(r.id) === String(id));
    if (recipe) {
      setSelectedRecipe(recipe);
      setCurrentView('edit-recipe');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  };

  const handleSaveRecipe = (recipeData: Partial<Recipe>) => {
    if (selectedRecipe) {
      const updated = { ...selectedRecipe, ...recipeData } as Recipe;
      setRecipes(recipes.map(r => r.id === selectedRecipe.id ? updated : r));
      setSelectedRecipe(updated);
    } else {
      const newRecipe: Recipe = {
        ...recipeData,
        id: Math.random().toString(36).substr(2, 9),
        tags: recipeData.tags || [],
        ingredients: recipeData.ingredients || [],
        instructions: recipeData.instructions || [],
        image: recipeData.image || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=800',
        calories: recipeData.calories || 400,
        protein: recipeData.protein || 25,
        carbs: recipeData.carbs || 30,
        fats: recipeData.fats || 15,
      } as Recipe;
      setRecipes([newRecipe, ...recipes]);
    }
    setCurrentView('main');
  };

  const handleDeleteRecipe = (id: string) => {
    setRecipes(recipes.filter(r => r.id !== id && String(r.id) !== String(id)));
    setSelectedRecipe(undefined);
    setCurrentView('main');
  };

  const handleRecipeClick = (id: string) => {
    const recipe = recipes.find(r => r.id === id || String(r.id) === String(id));
    if (recipe) {
      if (activeTab === 'recipes' && currentView === 'main') {
        recipesScrollPosRef.current = window.scrollY || document.documentElement.scrollTop || 0;
      }
      setSelectedRecipe(recipe);
      setCurrentView('recipe-detail');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  };

  const handleBack = () => {
    if (currentView === 'edit-recipe' && selectedRecipe) {
      setCurrentView('recipe-detail');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } else {
      const wasInRecipeDetail = currentView === 'recipe-detail';
      setCurrentView('main');
      if (wasInRecipeDetail && activeTab === 'recipes' && recipesScrollPosRef.current > 0) {
        requestAnimationFrame(() => {
          window.scrollTo({ top: recipesScrollPosRef.current, left: 0, behavior: 'instant' });
        });
      }
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentView('main');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const renderContent = () => {
    switch (currentView) {
      case 'edit-ingredient':
        return (
          <EditIngredientScreen 
            ingredient={selectedIngredient} 
            onBack={handleBack} 
            onSave={handleSaveIngredient}
            onDelete={handleDeleteIngredient}
          />
        );

      case 'create-recipe':
      case 'edit-recipe':
        return (
          <CreateRecipeScreen 
            recipe={selectedRecipe}
            onBack={handleBack} 
            onSave={handleSaveRecipe}
            onDelete={handleDeleteRecipe}
            onAddNewIngredient={handleNewIngredient}
          />
        );

      case 'recipe-detail':
        if (!selectedRecipe) return null;
        return (
          <RecipeDetailScreen 
            recipe={selectedRecipe} 
            onBack={handleBack} 
            onEdit={() => setCurrentView('edit-recipe')}
            onDelete={handleDeleteRecipe}
          />
        );

      case 'main':
      default:
        switch (activeTab) {
          case 'planner':
            return (
              <PlannerScreen 
                recipes={recipes}
                onRecipeClick={handleRecipeClick} 
                onBrowseRecipes={() => setActiveTab('recipes')}
              />
            );
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
              />
            );
          default:
            return <PlannerScreen onRecipeClick={handleRecipeClick} />;
        }
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col selection:bg-emerald-200 selection:text-emerald-950">
      {/* Unified Sticky Top Bar Across All Pages */}
      <TopBar 
        activeTab={activeTab}
        onTabChange={handleTabChange}
        currentView={currentView}
        pageTitle={
          currentView === 'recipe-detail' ? selectedRecipe?.title :
          currentView === 'create-recipe' ? 'Create Recipe' :
          currentView === 'edit-recipe' ? `Edit: ${selectedRecipe?.title}` :
          currentView === 'edit-ingredient' ? (selectedIngredient ? `Edit: ${selectedIngredient.name}` : 'New Ingredient') :
          undefined
        }
        onBack={handleBack}
        onCreateRecipe={handleNewRecipe}
        onCreateIngredient={handleNewIngredient}
        onEdit={() => setCurrentView('edit-recipe')}
        onDelete={() => selectedRecipe && handleDeleteRecipe(selectedRecipe.id)}
        onSave={() => {
          if (currentView === 'edit-ingredient') {
            document.getElementById('save-ingredient-form-btn')?.click();
          } else if (currentView === 'create-recipe' || currentView === 'edit-recipe') {
            document.getElementById('save-recipe-form-btn')?.click();
          }
        }}
        saveLabel={
          currentView === 'edit-ingredient' ? (selectedIngredient ? 'Save Changes' : 'Create Ingredient') :
          currentView === 'edit-recipe' ? 'Update Recipe' : 'Save Recipe'
        }
      />

      {/* Main Responsive Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 pt-5 pb-24">
        {renderContent()}
      </main>

      {/* Mobile Bottom Navigation (Only visible on mobile and on main views) */}
      {currentView === 'main' && (
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      )}
    </div>
  );
}
