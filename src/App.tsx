import { useState } from 'react';
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
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | undefined>();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>();

  const handleEditIngredient = (id: string) => {
    const ing = INITIAL_INGREDIENTS.find(i => i.id === id);
    setSelectedIngredient(ing);
    setCurrentView('edit-ingredient');
  };

  const handleNewIngredient = () => {
    setSelectedIngredient(undefined);
    setCurrentView('edit-ingredient');
  };

  const handleNewRecipe = () => {
    setSelectedRecipe(undefined);
    setCurrentView('create-recipe');
  };

  const handleEditRecipe = (id: string) => {
    const recipe = INITIAL_RECIPES.find(r => r.id === id);
    if (recipe) {
      setSelectedRecipe(recipe);
      setCurrentView('edit-recipe');
    }
  };

  const handleDeleteRecipe = (id: string) => {
    // In a real app, we'd remove it from state/DB
    console.log('Deleting recipe:', id);
    setCurrentView('main');
  };

  const handleRecipeClick = (id: string) => {
    const recipe = INITIAL_RECIPES.find(r => r.id === id);
    if (recipe) {
      setSelectedRecipe(recipe);
      setCurrentView('recipe-detail');
    }
  };

  const renderMainContent = () => {
    switch (activeTab) {
      case 'planner':
        return <PlannerScreen onRecipeClick={handleRecipeClick} />;
      case 'recipes':
        return <RecipesScreen onRecipeClick={handleRecipeClick} onEditRecipe={handleEditRecipe} />;
      case 'ingredients':
        return (
          <div className="relative">
            <IngredientsScreen onEditIngredient={handleEditIngredient} onNewIngredient={handleNewIngredient} />
            {/* FAB for Ingredients */}
            <button 
              onClick={handleNewIngredient}
              className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-lg md:hidden active:scale-90 transition-transform"
            >
              <span className="text-3xl font-bold">+</span>
            </button>
          </div>
        );
      default:
        return <PlannerScreen />;
    }
  };

  if (currentView === 'edit-ingredient') {
    return (
      <div className="min-h-screen bg-surface p-6">
        <EditIngredientScreen 
          ingredient={selectedIngredient} 
          onBack={() => setCurrentView('main')} 
          onSave={() => setCurrentView('main')}
        />
      </div>
    );
  }

  if (currentView === 'create-recipe' || currentView === 'edit-recipe') {
    return (
      <div className="min-h-screen bg-surface p-6">
        <CreateRecipeScreen 
          recipe={selectedRecipe}
          onBack={() => setCurrentView('main')} 
          onSave={() => setCurrentView('main')}
          onDelete={handleDeleteRecipe}
          onAddNewIngredient={handleNewIngredient}
        />
      </div>
    );
  }

  if (currentView === 'recipe-detail' && selectedRecipe) {
    return (
      <div className="min-h-screen bg-surface">
        <RecipeDetailScreen 
          recipe={selectedRecipe} 
          onBack={() => setCurrentView('main')} 
          onEdit={() => setCurrentView('edit-recipe')}
          onDelete={handleDeleteRecipe}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <TopBar />
      <main className="max-w-7xl mx-auto px-6 pt-8 pb-32">
        {renderMainContent()}
      </main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Global FAB for Recipes/Planner */}
      {activeTab !== 'ingredients' && (
        <button 
          onClick={handleNewRecipe}
          className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-lg md:hidden active:scale-90 transition-transform"
        >
          <span className="text-3xl font-bold">+</span>
        </button>
      )}
    </div>
  );
}
