import React from 'react';
import { Settings } from 'lucide-react';

export const TopBar: React.FC = () => {
  return (
    <header className="bg-surface sticky top-0 z-40 border-b border-surface-container/50">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden">
            <img 
              alt="User profile" 
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100" 
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-extrabold text-gradient tracking-tight">Kitchen Table</h1>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors duration-200">
          <Settings className="w-6 h-6 text-on-surface-variant" />
        </button>
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
