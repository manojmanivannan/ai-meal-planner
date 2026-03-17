import { useState } from 'react';
import { TopBar, BottomNav } from './components/Navigation';
import { PlannerScreen, RecipesScreen, IngredientsScreen } from './screens/MainScreens';
import { EditIngredientScreen } from './screens/EditIngredientScreen';
import { CreateRecipeScreen } from './screens/CreateRecipeScreen';
import { Ingredient, Recipe } from './types';
import { INITIAL_INGREDIENTS } from './constants';

type ViewState = 'main' | 'edit-ingredient' | 'create-recipe';

export default function App() {
  const [activeTab, setActiveTab] = useState('planner');
  const [currentView, setCurrentView] = useState<ViewState>('main');
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | undefined>();

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
    setCurrentView('create-recipe');
  };

  const renderMainContent = () => {
    switch (activeTab) {
      case 'planner':
        return <PlannerScreen />;
      case 'recipes':
        return <RecipesScreen />;
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

  if (currentView === 'create-recipe') {
    return (
      <div className="min-h-screen bg-surface p-6">
        <CreateRecipeScreen 
          onBack={() => setCurrentView('main')} 
          onSave={() => setCurrentView('main')}
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
