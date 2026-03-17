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
  const [ingredients, setIngredients] = useState<Ingredient[]>(INITIAL_INGREDIENTS);
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | undefined>();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>();

  const handleEditIngredient = (id: string) => {
    const ing = ingredients.find(i => i.id === id);
    setSelectedIngredient(ing);
    setCurrentView('edit-ingredient');
  };

  const handleNewIngredient = () => {
    setSelectedIngredient(undefined);
    setCurrentView('edit-ingredient');
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

  const handleNewRecipe = () => {
    setSelectedRecipe(undefined);
    setCurrentView('create-recipe');
  };

  const handleEditRecipe = (id: string) => {
    const recipe = recipes.find(r => r.id === id);
    if (recipe) {
      setSelectedRecipe(recipe);
      setCurrentView('edit-recipe');
    }
  };

  const handleSaveRecipe = (recipeData: Partial<Recipe>) => {
    if (selectedRecipe) {
      setRecipes(recipes.map(r => r.id === selectedRecipe.id ? { ...r, ...recipeData } as Recipe : r));
    } else {
      const newRecipe: Recipe = {
        ...recipeData,
        id: Math.random().toString(36).substr(2, 9),
        tags: recipeData.tags || [],
        ingredients: recipeData.ingredients || [],
        instructions: recipeData.instructions || [],
        image: recipeData.image || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=800',
        calories: recipeData.calories || 0,
        protein: recipeData.protein || 0,
        carbs: recipeData.carbs || 0,
        fats: recipeData.fats || 0,
      } as Recipe;
      setRecipes([...recipes, newRecipe]);
    }
    setCurrentView('main');
  };

  const handleDeleteRecipe = (id: string) => {
    setRecipes(recipes.filter(r => r.id !== id));
    setCurrentView('main');
  };

  const handleRecipeClick = (id: string) => {
    const recipe = recipes.find(r => r.id === id);
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
        return <RecipesScreen recipes={recipes} onRecipeClick={handleRecipeClick} onEditRecipe={handleEditRecipe} />;
      case 'ingredients':
        return (
          <div className="relative">
            <IngredientsScreen ingredients={ingredients} onEditIngredient={handleEditIngredient} onNewIngredient={handleNewIngredient} />
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
          onSave={handleSaveIngredient}
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
          onSave={handleSaveRecipe}
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
