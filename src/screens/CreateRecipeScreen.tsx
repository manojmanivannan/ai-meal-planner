import React from 'react';
import { motion } from 'motion/react';
import { X, Camera, Timer, Users, Star, PlusCircle, Trash2, CheckCircle, BarChart3 } from 'lucide-react';
import { Recipe } from '../types';

interface CreateRecipeScreenProps {
  onBack: () => void;
  onSave: (recipe: Partial<Recipe>) => void;
}

export const CreateRecipeScreen: React.FC<CreateRecipeScreenProps> = ({ onBack, onSave }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-12 pb-32"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-surface-container-high transition-colors">
            <X className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold tracking-tight">Create Recipe</h1>
        </div>
      </div>

      {/* Hero Image Upload */}
      <section className="relative group cursor-pointer">
        <div className="w-full h-80 bg-surface-container-low rounded-lg overflow-hidden flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/30 transition-all hover:bg-surface-container-high">
          <div className="bg-surface-lowest p-6 rounded-full shadow-sm mb-4">
            <Camera className="w-10 h-10 text-primary" />
          </div>
          <p className="font-bold text-on-surface">Upload Hero Image</p>
          <p className="text-on-surface-variant text-sm mt-1">High-quality editorial shots work best</p>
        </div>
      </section>

      {/* Identity */}
      <section className="space-y-6">
        <input 
          className="w-full bg-surface-container-low border-none rounded-lg px-6 py-5 text-4xl font-extrabold tracking-tight focus:ring-2 focus:ring-primary/30 placeholder:text-on-surface-variant/40" 
          placeholder="Recipe Title (e.g., Summer Harvest Salad)" 
          type="text"
        />
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 bg-tertiary-fixed text-on-tertiary-fixed px-5 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-transform">
            <Timer className="w-4 h-4" /> 25 Mins
          </button>
          <button className="flex items-center gap-2 bg-surface-container-low text-on-surface-variant px-5 py-2 rounded-full text-sm font-semibold hover:bg-surface-container-high transition-colors">
            <Users className="w-4 h-4" /> 2 Servings
          </button>
          <button className="flex items-center gap-2 bg-surface-container-low text-on-surface-variant px-5 py-2 rounded-full text-sm font-semibold hover:bg-surface-container-high transition-colors">
            <Star className="w-4 h-4" /> Intermediate
          </button>
        </div>
      </section>

      {/* Ingredients & Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <section className="md:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Ingredients</h2>
            <span className="text-on-surface-variant text-sm font-semibold">0 Items</span>
          </div>
          <div className="space-y-3">
            <button className="w-full py-4 rounded-lg bg-surface-container-low border-2 border-dashed border-outline-variant/20 text-on-surface-variant font-bold flex items-center justify-center gap-2 hover:bg-surface-container-high transition-colors">
              <PlusCircle className="w-5 h-5" /> Add from Ingredient Hub
            </button>
          </div>
        </section>

        <section className="md:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Instructions</h2>
            <button className="text-primary text-sm font-bold uppercase tracking-wider">Add Step</button>
          </div>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm">1</div>
              <textarea 
                className="flex-grow bg-transparent border-none p-0 focus:ring-0 text-on-surface font-body leading-relaxed resize-none" 
                placeholder="Preheat oven to 400°F (200°C)..." 
                rows={3}
              />
            </div>
          </div>
        </section>
      </div>

      {/* Nutrition Summary */}
      <section className="bg-surface-lowest rounded-lg p-8 shadow-sm">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-secondary" /> Estimated Nutrition
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Calories', val: '0', unit: 'kcal' },
            { label: 'Protein', val: '0', unit: 'g' },
            { label: 'Carbs', val: '0', unit: 'g' },
            { label: 'Fats', val: '0', unit: 'g' }
          ].map(stat => (
            <div key={stat.label} className="text-center md:text-left">
              <p className="text-on-surface-variant text-[10px] font-bold mb-1 uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-extrabold text-on-surface">{stat.val}<span className="text-lg font-medium text-on-surface-variant/40 ml-1">{stat.unit}</span></p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex h-2 rounded-full overflow-hidden bg-surface-container">
          <div className="bg-primary w-[10%]" />
          <div className="bg-secondary-container w-[10%]" />
          <div className="bg-tertiary-fixed w-[10%]" />
        </div>
      </section>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 w-full z-50 glass px-4 pb-6 pt-4 border-t border-surface-container">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button onClick={onBack} className="flex-1 py-4 rounded-full bg-surface-container-low text-on-surface font-bold hover:bg-surface-container-high transition-colors">
            Save Draft
          </button>
          <button 
            onClick={() => onSave({})}
            className="flex-[2] py-4 rounded-full gradient-primary text-on-primary font-bold shadow-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" /> Save Recipe
          </button>
        </div>
      </div>
    </motion.div>
  );
};
