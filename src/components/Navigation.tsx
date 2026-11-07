import React from 'react';
import { Settings } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const TopBar: React.FC = () => {
  return (
    <header className="bg-surface/95 backdrop-blur-md sticky top-0 z-40 border-b border-surface-container/50 h-16">
      <div className="flex justify-between items-center w-full h-full px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <BrandLogo size={36} />
          <div className="flex flex-col">
            <h1 className="text-xl font-extrabold tracking-tight text-on-surface leading-tight">Kitchen Table</h1>
            <span className="text-[9px] uppercase font-bold tracking-widest text-emerald-400">MEAL PLANNER</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors duration-200"
            title="Settings"
          >
            <Settings className="w-5 h-5 text-on-surface-variant" />
          </button>
          <div className="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center text-xs">
            KT
          </div>
        </div>
      </div>
    </header>
  );
};

import { Calendar, UtensilsCrossed, Apple } from 'lucide-react';

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
    <nav className="fixed bottom-0 left-0 w-full z-50 glass shadow-[0_-8px_24px_rgba(25,28,27,0.06)] rounded-t-[2rem] flex justify-around items-center px-4 pb-6 pt-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center px-6 py-2 rounded-full transition-all duration-300 ${
              isActive 
                ? 'bg-tertiary-fixed text-on-tertiary-fixed scale-105' 
                : 'text-on-surface-variant hover:scale-105'
            }`}
          >
            <Icon className={`w-6 h-6 mb-1 ${isActive ? 'fill-current' : ''}`} />
            <span className="text-xs font-bold">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
