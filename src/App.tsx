import React, { useState, useEffect, useRef } from 'react';
import { TopBar, BottomNav } from './components/Navigation';
import { PlannerScreen, RecipesScreen, IngredientsScreen } from './screens/MainScreens';
import { EditIngredientScreen } from './screens/EditIngredientScreen';
import { CreateRecipeScreen } from './screens/CreateRecipeScreen';
import { RecipeDetailScreen } from './screens/RecipeDetailScreen';
import { AuthModal } from './components/AuthModal';
import { authStore, getEmptyWeeklyPlan } from './services/authStore';
import { Ingredient, Recipe, UserProfile, DayPlans } from './types';
import { INITIAL_INGREDIENTS, INITIAL_RECIPES } from './constants';

type ViewState = 'main' | 'edit-ingredient' | 'create-recipe' | 'edit-recipe' | 'recipe-detail';

export default function App() {
  const [activeTab, setActiveTab] = useState('planner');
  const [currentView, setCurrentView] = useState<ViewState>('main');

  // User & Auth State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => authStore.getCurrentUser());
  const [allUsers, setAllUsers] = useState<UserProfile[]>(() => authStore.getAllUsers());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'signin' | 'signup' | 'demo'>('signin');

  // Per-User Partitioned Data
  const [ingredients, setIngredients] = useState<Ingredient[]>(() => {
    const user = authStore.getCurrentUser();
    return user ? authStore.getUserData(user.id).ingredients : INITIAL_INGREDIENTS;
  });

  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    const user = authStore.getCurrentUser();
    return user ? authStore.getUserData(user.id).recipes : INITIAL_RECIPES;
  });

  const [weeklyPlan, setWeeklyPlan] = useState<DayPlans>(() => {
    const user = authStore.getCurrentUser();
    return user ? authStore.getUserData(user.id).weeklyPlan : getEmptyWeeklyPlan();
  });

  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | undefined>();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>();
  const recipesScrollPosRef = useRef<number>(0);

  // Load user data when switching active user
  const loadUserData = (userId: string) => {
    const userData = authStore.getUserData(userId);
    setIngredients(userData.ingredients);
    setRecipes(userData.recipes);
    setWeeklyPlan(userData.weeklyPlan);
  };

  const handleSwitchUser = (userId: string) => {
    const switched = authStore.switchUser(userId);
    if (switched) {
      setCurrentUser(switched);
      setAllUsers(authStore.getAllUsers());
      loadUserData(userId);
      setCurrentView('main');
    }
  };

  const handleAuthSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setAllUsers(authStore.getAllUsers());
    loadUserData(user.id);
    setCurrentView('main');
  };

  const handleSignOut = () => {
    authStore.signOut();
    setCurrentUser(null);
    setIngredients(INITIAL_INGREDIENTS);
    setRecipes(INITIAL_RECIPES);
    setWeeklyPlan(getEmptyWeeklyPlan());
    setCurrentView('main');
    setIsAuthModalOpen(true);
    setAuthModalTab('signin');
  };

  const handleOpenAuth = (tab: 'signin' | 'signup' | 'demo' = 'signin') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  // ── Ingredients Handlers ──────────────────────────────────────────────────
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
    let updated: Ingredient[];
    if (selectedIngredient) {
      updated = ingredients.map(i => i.id === selectedIngredient.id ? { ...i, ...ing } as Ingredient : i);
    } else {
      const newIng: Ingredient = {
        ...ing,
        id: Math.random().toString(36).substr(2, 9),
      } as Ingredient;
      updated = [...ingredients, newIng];
    }
    setIngredients(updated);
    if (currentUser) {
      authStore.saveUserData(currentUser.id, { ingredients: updated });
    }
    setCurrentView('main');
  };

  const handleDeleteIngredient = (id: string) => {
    const updated = ingredients.filter(i => i.id !== id);
    setIngredients(updated);
    if (selectedIngredient?.id === id) {
      setSelectedIngredient(undefined);
    }
    if (currentUser) {
      authStore.saveUserData(currentUser.id, { ingredients: updated });
    }
    setCurrentView('main');
  };

  // ── Recipes Handlers ───────────────────────────────────────────────────────
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
    let updated: Recipe[];
    if (selectedRecipe) {
      const updatedRecipe = { ...selectedRecipe, ...recipeData } as Recipe;
      updated = recipes.map(r => r.id === selectedRecipe.id ? updatedRecipe : r);
      setSelectedRecipe(updatedRecipe);
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
      updated = [newRecipe, ...recipes];
    }
    setRecipes(updated);
    if (currentUser) {
      authStore.saveUserData(currentUser.id, { recipes: updated });
    }
    setCurrentView('main');
  };

  const handleDeleteRecipe = (id: string) => {
    const updated = recipes.filter(r => r.id !== id && String(r.id) !== String(id));
    setRecipes(updated);
    setSelectedRecipe(undefined);
    if (currentUser) {
      authStore.saveUserData(currentUser.id, { recipes: updated });
    }
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

  // ── Weekly Plan Handlers ───────────────────────────────────────────────────
  const handleUpdateWeeklyPlan = (newPlan: DayPlans) => {
    setWeeklyPlan(newPlan);
    if (currentUser) {
      authStore.saveUserData(currentUser.id, { weeklyPlan: newPlan });
    }
  };

  const handlePopulateStarterWeek = () => {
    if (currentUser) {
      const updated = authStore.populateStarterWeek(currentUser.id);
      setWeeklyPlan(updated.weeklyPlan);
    }
  };

  const handleClearWeeklyPlan = () => {
    if (currentUser) {
      const updated = authStore.clearWeeklyPlan(currentUser.id);
      setWeeklyPlan(updated.weeklyPlan);
    } else {
      setWeeklyPlan(getEmptyWeeklyPlan());
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
                weeklyPlan={weeklyPlan}
                onUpdateWeeklyPlan={handleUpdateWeeklyPlan}
                onPopulateStarterWeek={handlePopulateStarterWeek}
                onClearWeeklyPlan={handleClearWeeklyPlan}
                userName={currentUser?.name}
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
        currentUser={currentUser}
        allUsers={allUsers}
        onSwitchUser={handleSwitchUser}
        onOpenAuth={handleOpenAuth}
        onSignOut={handleSignOut}
      />

      {/* Main Responsive Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 pt-5 pb-24">
        {renderContent()}
      </main>

      {/* Mobile Bottom Navigation (Only visible on mobile and on main views) */}
      {currentView === 'main' && (
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      )}

      {/* Authentication & Profile Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        initialTab={authModalTab}
      />
    </div>
  );
}
