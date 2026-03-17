import React from 'react';
import { motion } from 'motion/react';
import { X, Camera, Timer, Users, Star, PlusCircle, Trash2, CheckCircle, BarChart3 } from 'lucide-react';
import { Recipe, Ingredient } from '../types';
import { IngredientPicker } from '../components/IngredientPicker';
import { INITIAL_INGREDIENTS } from '../constants';

interface CreateRecipeScreenProps {
  recipe?: Recipe;
  onBack: () => void;
  onSave: (recipe: Partial<Recipe>) => void;
  onDelete?: (id: string) => void;
  onAddNewIngredient?: () => void;
}

export const CreateRecipeScreen: React.FC<CreateRecipeScreenProps> = ({ 
  recipe, 
  onBack, 
  onSave, 
  onDelete,
  onAddNewIngredient 
}) => {
  const [title, setTitle] = React.useState(recipe?.title || '');
  const [description, setDescription] = React.useState(recipe?.description || '');
  const [prepTime, setPrepTime] = React.useState(recipe?.prepTime || 30);
  const [servings, setServings] = React.useState(recipe?.servings || 2);
  const [difficulty, setDifficulty] = React.useState(recipe?.difficulty || 'Intermediate');
  const [ingredients, setIngredients] = React.useState(recipe?.ingredients || []);
  const [instructions, setInstructions] = React.useState(recipe?.instructions || ['']);
  const [tags, setTags] = React.useState<string[]>(recipe?.tags || []);
  const [newTag, setNewTag] = React.useState('');
  const [isPickerOpen, setIsPickerOpen] = React.useState(false);

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      if (!tags.includes(newTag.trim().toUpperCase())) {
        setTags([...tags, newTag.trim().toUpperCase()]);
      }
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSelectIngredient = (ing: Ingredient) => {
    setIngredients([...ingredients, { 
      ingredientId: ing.id, 
      quantity: 1, 
      unit: ing.baseUnit 
    }]);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleAddStep = () => {
    setInstructions([...instructions, '']);
  };

  const handleRemoveStep = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const handleUpdateStep = (index: number, value: string) => {
    const newSteps = [...instructions];
    newSteps[index] = value;
    setInstructions(newSteps);
  };

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
          <h1 className="text-2xl font-bold tracking-tight">{recipe ? 'Edit Recipe' : 'Create Recipe'}</h1>
        </div>
        {recipe && onDelete && (
          <button 
            onClick={() => {
              if (confirm('Are you sure you want to delete this recipe?')) {
                onDelete(recipe.id);
              }
            }}
            className="flex items-center gap-2 text-error font-bold text-sm hover:bg-error/10 px-4 py-2 rounded-full transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        )}
      </div>

      {/* Hero Image Upload */}
      <section className="relative group cursor-pointer">
        <div className="w-full h-80 bg-surface-container-low rounded-lg overflow-hidden flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/30 transition-all hover:bg-surface-container-high">
          {recipe?.image ? (
            <img src={recipe.image} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <>
              <div className="bg-surface-lowest p-6 rounded-full shadow-sm mb-4">
                <Camera className="w-10 h-10 text-primary" />
              </div>
              <p className="font-bold text-on-surface">Upload Hero Image</p>
              <p className="text-on-surface-variant text-sm mt-1">High-quality editorial shots work best</p>
            </>
          )}
        </div>
      </section>

      {/* Identity */}
      <section className="space-y-6">
        <input 
          className="w-full bg-surface-container-low border-none rounded-lg px-6 py-5 text-4xl font-extrabold tracking-tight focus:ring-2 focus:ring-primary/30 placeholder:text-on-surface-variant/40" 
          placeholder="Recipe Title (e.g., Summer Harvest Salad)" 
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea 
          className="w-full bg-surface-container-low border-none rounded-lg px-6 py-4 text-lg font-medium focus:ring-2 focus:ring-primary/30 placeholder:text-on-surface-variant/40 resize-none" 
          placeholder="Brief description of the recipe..." 
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-tertiary-fixed text-on-tertiary-fixed px-5 py-2 rounded-full text-sm font-semibold">
            <Timer className="w-4 h-4" /> 
            <input 
              type="number" 
              value={prepTime} 
              onChange={(e) => setPrepTime(parseInt(e.target.value))}
              className="bg-transparent border-none p-0 w-12 focus:ring-0 font-bold"
            /> Mins
          </div>
          <div className="flex items-center gap-2 bg-surface-container-low text-on-surface-variant px-5 py-2 rounded-full text-sm font-semibold">
            <Users className="w-4 h-4" /> 
            <input 
              type="number" 
              value={servings} 
              onChange={(e) => setServings(parseInt(e.target.value))}
              className="bg-transparent border-none p-0 w-8 focus:ring-0 font-bold"
            /> Servings
          </div>
          <select 
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as any)}
            className="bg-surface-container-low text-on-surface-variant px-5 py-2 rounded-full text-sm font-semibold border-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="Easy">Easy</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Tags Section */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Tags</p>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <span key={tag} className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                {tag}
                <button onClick={() => handleRemoveTag(tag)} className="hover:text-error transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <input 
              type="text"
              placeholder="Add tag + Enter"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleAddTag}
              className="bg-surface-container-low border-none rounded-full px-4 py-1 text-xs font-bold focus:ring-2 focus:ring-primary/30 min-w-[120px]"
            />
          </div>
        </div>
      </section>

      {/* Ingredients & Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <section className="md:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Ingredients</h2>
            <span className="text-on-surface-variant text-sm font-semibold">{ingredients.length} Items</span>
          </div>
          <div className="space-y-3">
            {ingredients.map((ing, i) => {
              const ingredientDetails = INITIAL_INGREDIENTS.find(item => item.id === ing.ingredientId);
              return (
                <div key={i} className="flex items-center gap-3 p-3 bg-surface-container-low rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-surface-lowest flex items-center justify-center text-lg">
                    {ingredientDetails?.icon || '🥗'}
                  </div>
                  <div className="flex-grow">
                    <p className="font-bold text-sm">{ingredientDetails?.name || 'Unknown Ingredient'}</p>
                    <p className="text-[10px] text-on-surface-variant uppercase font-medium">{ingredientDetails?.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      value={ing.quantity}
                      onChange={(e) => {
                        const newIngs = [...ingredients];
                        newIngs[i].quantity = parseFloat(e.target.value);
                        setIngredients(newIngs);
                      }}
                      className="w-16 bg-surface-lowest border-none rounded-lg px-2 py-1 text-center font-bold text-sm"
                    />
                    <span className="text-xs font-bold text-on-surface-variant min-w-[40px]">{ing.unit}</span>
                  </div>
                  <button onClick={() => handleRemoveIngredient(i)} className="p-2 text-error hover:bg-error/10 rounded-full transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
            <button 
              onClick={() => setIsPickerOpen(true)}
              className="w-full py-4 rounded-lg bg-surface-container-low border-2 border-dashed border-outline-variant/20 text-on-surface-variant font-bold flex items-center justify-center gap-2 hover:bg-surface-container-high transition-colors"
            >
              <PlusCircle className="w-5 h-5" /> Add Ingredient
            </button>
          </div>
        </section>

        <section className="md:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Instructions</h2>
            <button onClick={handleAddStep} className="text-primary text-sm font-bold uppercase tracking-wider">Add Step</button>
          </div>
          <div className="space-y-6">
            {instructions.map((step, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm">{i + 1}</div>
                <div className="flex-grow space-y-2">
                  <textarea 
                    className="w-full bg-transparent border-none p-0 focus:ring-0 text-on-surface font-body leading-relaxed resize-none" 
                    placeholder="Step description..." 
                    rows={3}
                    value={step}
                    onChange={(e) => handleUpdateStep(i, e.target.value)}
                  />
                  <button onClick={() => handleRemoveStep(i)} className="text-error text-[10px] font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity">Remove Step</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <IngredientPicker 
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onSelect={handleSelectIngredient}
        onAddNew={() => onAddNewIngredient?.()}
      />

      {/* Nutrition Summary */}
      <section className="bg-surface-lowest rounded-lg p-8 shadow-sm">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-secondary" /> Estimated Nutrition
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Calories', val: recipe?.calories || 0, unit: 'kcal' },
            { label: 'Protein', val: recipe?.protein || 0, unit: 'g' },
            { label: 'Carbs', val: recipe?.carbs || 0, unit: 'g' },
            { label: 'Fats', val: recipe?.fats || 0, unit: 'g' }
          ].map(stat => (
            <div key={stat.label} className="text-center md:text-left">
              <p className="text-on-surface-variant text-[10px] font-bold mb-1 uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-extrabold text-on-surface">{stat.val}<span className="text-lg font-medium text-on-surface-variant/40 ml-1">{stat.unit}</span></p>
            </div>
          ))}
        </div>
      </section>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 w-full z-50 glass px-4 pb-6 pt-4 border-t border-surface-container">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button onClick={onBack} className="flex-1 py-4 rounded-full bg-surface-container-low text-on-surface font-bold hover:bg-surface-container-high transition-colors">
            Cancel
          </button>
          <button 
            onClick={() => onSave({ title, description, prepTime, servings, difficulty, ingredients, instructions, tags })}
            className="flex-[2] py-4 rounded-full gradient-primary text-on-primary font-bold shadow-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" /> {recipe ? 'Update Recipe' : 'Save Recipe'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
