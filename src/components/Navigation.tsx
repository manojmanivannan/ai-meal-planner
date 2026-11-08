import React from 'react';
import { Calendar, UtensilsCrossed, Apple, Plus, ArrowLeft, Edit2, Trash2, Check, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { UserMenu } from './UserMenu';
import { UserProfile } from '../types';

export interface TopBarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  currentView?: 'main' | 'edit-ingredient' | 'create-recipe' | 'edit-recipe' | 'recipe-detail';
  pageTitle?: string;
  onBack?: () => void;
  onCreateRecipe?: () => void;
  onCreateIngredient?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onSave?: () => void;
  saveLabel?: string;
  currentUser?: UserProfile | null;
  allUsers?: UserProfile[];
  onSwitchUser?: (userId: string) => void;
  onOpenAuth?: (tab?: 'signin' | 'signup' | 'demo') => void;
  onSignOut?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab = 'planner',
  onTabChange,
  currentView = 'main',
  pageTitle,
  onBack,
  onCreateRecipe,
  onCreateIngredient,
  onEdit,
  onDelete,
  onSave,
  saveLabel = 'Save',
  currentUser,
  allUsers = [],
  onSwitchUser = () => {},
  onOpenAuth = () => {},
  onSignOut = () => {},
}) => {
  const isSubView = currentView !== 'main';

  const navLinks = [
    { id: 'planner', label: 'Planner', icon: Calendar },
    { id: 'recipes', label: 'Recipes', icon: UtensilsCrossed },
    { id: 'ingredients', label: 'Ingredients', icon: Apple },
  ];

  return (
    <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-surface-container h-16 transition-all duration-200">
      <div className="flex justify-between items-center w-full h-full px-4 md:px-6 max-w-7xl mx-auto gap-4">
        
        {/* Left Zone: Brand or Back Link */}
        <div className="flex items-center gap-3 shrink-0">
          {isSubView && onBack ? (
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                aria-label={currentView === 'recipe-detail' ? 'Back to recipes' : 'Back'}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-lowest hover:bg-surface-container-high border border-surface-container text-on-surface text-xs font-bold transition-all shadow-2xs active:scale-95 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-primary shrink-0" />
                <span className="hidden sm:inline">Back</span>
              </button>
              <div className="h-4 w-px bg-surface-container hidden sm:block" />
              <div 
                onClick={onBack} 
                className="flex items-center gap-2 cursor-pointer hover:opacity-85 transition-opacity"
              >
                <BrandLogo size={28} />
                <span className="font-extrabold text-sm tracking-tight text-on-surface hidden md:inline">
                  Kitchen Table
                </span>
              </div>
            </div>
          ) : (
            <div 
              onClick={() => onTabChange?.('planner')} 
              className="flex items-center gap-3 cursor-pointer group"
            >
              <BrandLogo size={36} />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-lg md:text-xl font-black tracking-tight text-on-surface group-hover:text-primary transition-colors leading-tight">
                    Kitchen Table
                  </span>
                  <span className="hidden sm:inline-block text-[9px] uppercase font-bold tracking-widest text-primary/80 bg-primary-light/60 px-1.5 py-0.5 rounded">
                    CULINARY HUB
                  </span>
                </div>
                <span className="text-[10px] text-on-surface-variant hidden sm:block -mt-0.5">
                  Meal Planning & Recipe Architecture
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Center Zone: Contextual Title or Desktop Navigation */}
        <div className="flex items-center justify-center flex-1 min-w-0">
          {isSubView ? (
            <h2 className="text-sm md:text-base font-bold text-on-surface truncate text-center max-w-xs md:max-w-md">
              {pageTitle || (
                currentView === 'create-recipe' ? 'Create Recipe' :
                currentView === 'edit-recipe' ? 'Edit Recipe' :
                currentView === 'edit-ingredient' ? 'Edit Ingredient' : 'Recipe Details'
              )}
            </h2>
          ) : (
            <nav className="hidden md:flex items-center p-1 bg-surface-low rounded-xl border border-surface-container gap-1">
              {navLinks.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange?.(tab.id)}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-surface-lowest text-primary shadow-2xs'
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-lowest/50'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-primary' : 'text-on-surface-variant'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          )}
        </div>

        {/* Right Zone: Contextual Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {currentView === 'recipe-detail' ? (
            <>
              {onEdit && (
                <button
                  onClick={onEdit}
                  aria-label="Edit recipe"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all shadow-2xs active:scale-95 cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Recipe</span>
                </button>
              )}
              {onDelete && (
                <button
                  onClick={onDelete}
                  aria-label="Delete recipe"
                  title="Delete recipe"
                  className="p-1.5 rounded-xl text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors active:scale-95 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </>
          ) : currentView === 'create-recipe' || currentView === 'edit-recipe' ? (
            <div className="flex items-center gap-2">
              {onBack && (
                <button
                  onClick={onBack}
                  className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl text-on-surface-variant hover:bg-surface-container text-xs font-semibold transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Cancel</span>
                </button>
              )}
              {onSave && (
                <button
                  onClick={onSave}
                  aria-label="Save Recipe"
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all shadow-2xs active:scale-95 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{saveLabel}</span>
                </button>
              )}
            </div>
          ) : currentView === 'edit-ingredient' ? (
            <div className="flex items-center gap-2">
              {onBack && (
                <button
                  onClick={onBack}
                  className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl text-on-surface-variant hover:bg-surface-container text-xs font-semibold transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Cancel</span>
                </button>
              )}
              {onSave && (
                <button
                  onClick={onSave}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all shadow-2xs active:scale-95 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{saveLabel}</span>
                </button>
              )}
            </div>
          ) : (
            /* Main Views Action */
            <>
              {activeTab === 'ingredients' && onCreateIngredient && (
                <button
                  onClick={onCreateIngredient}
                  aria-label="New Ingredient"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-low hover:bg-surface-container text-on-surface text-xs font-bold transition-all border border-surface-container shadow-2xs active:scale-95 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-primary" />
                  <span className="hidden sm:inline">New Ingredient</span>
                </button>
              )}
              {onCreateRecipe && (
                <button
                  onClick={onCreateRecipe}
                  aria-label="Create Recipe"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all shadow-2xs active:scale-95 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">New Recipe</span>
                  <span className="sm:hidden">Recipe</span>
                </button>
              )}
              <UserMenu
                currentUser={currentUser || null}
                allUsers={allUsers}
                onSwitchUser={onSwitchUser}
                onOpenAuth={onOpenAuth}
                onSignOut={onSignOut}
              />
            </>
          )}
        </div>

      </div>
    </header>
  );
};

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'planner', label: 'Planner', icon: Calendar },
    { id: 'recipes', label: 'Recipes', icon: UtensilsCrossed },
    { id: 'ingredients', label: 'Ingredients', icon: Apple },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-40 bg-surface/95 backdrop-blur-md border-t border-surface-container flex justify-around items-center px-4 py-2 shadow-sm">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-4 rounded-xl transition-all ${
              isActive
                ? 'text-primary font-bold'
                : 'text-on-surface-variant hover:text-on-surface font-medium'
            }`}
          >
            <div className={`p-1 rounded-lg ${isActive ? 'bg-primary-light/70' : ''}`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[11px] mt-0.5">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
