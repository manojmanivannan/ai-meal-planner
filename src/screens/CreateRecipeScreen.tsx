import React from 'react';
import { motion } from 'motion/react';
import { X, Camera, Timer, Users, Star, PlusCircle, Trash2, CheckCircle, BarChart3, Plus } from 'lucide-react';
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
  React.useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [recipe?.id]);
  const [title, setTitle] = React.useState(recipe?.title || '');
  const [description, setDescription] = React.useState(recipe?.description || '');
  const [prepTime, setPrepTime] = React.useState(recipe?.prepTime || 30);
  const [servings, setServings] = React.useState(recipe?.servings || 2);
  const [difficulty, setDifficulty] = React.useState(recipe?.difficulty || 'Intermediate');
  const [ingredients, setIngredients] = React.useState(recipe?.ingredients || []);
  const [instructions, setInstructions] = React.useState(recipe?.instructions || ['Prepare fresh ingredients and mise en place.']);
  const [tags, setTags] = React.useState<string[]>(recipe?.tags || ['HEALTHY', 'DINNER']);
  const [newTag, setNewTag] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState(recipe?.image || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=800');
  const [isPickerOpen, setIsPickerOpen] = React.useState(false);

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      const cleanTag = newTag.trim().toUpperCase();
      if (!tags.includes(cleanTag)) {
        setTags([...tags, cleanTag]);
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
      name: ing.name,
      quantity: ing.baseQuantity || 1, 
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

  const submitForm = () => {
    onSave({ 
      title: title.trim() || 'Untitled Recipe', 
      description: description.trim() || 'A delicious home-cooked meal.', 
      prepTime: Number(prepTime) || 15, 
      servings: Number(servings) || 1, 
      difficulty, 
      ingredients, 
      instructions: instructions.filter(s => s.trim().length > 0), 
      tags,
      image: imageUrl,
      calories: recipe?.calories || 420,
      protein: recipe?.protein || 28,
      carbs: recipe?.carbs || 36,
      fats: recipe?.fats || 14,
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="max-w-4xl mx-auto space-y-8 pb-32"
    >
      {/* Page Title & Context Header */}
      <div className="flex items-center justify-between pb-4 border-b border-surface-container">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-on-surface tracking-tight">
            {recipe ? 'Edit Recipe' : 'Create Recipe'}
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Build your recipe with ingredients, timing, and nutritional profile.
          </p>
        </div>
        {recipe && onDelete && (
          <button 
            onClick={() => {
              if (confirm('Are you sure you want to delete this recipe?')) {
                onDelete(recipe.id);
              }
            }}
            className="flex items-center gap-1.5 text-rose-600 hover:bg-rose-50 border border-rose-200 font-bold text-xs px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>
        )}
      </div>

      {/* Hero Image Section */}
      <section className="bg-surface-lowest rounded-2xl p-5 border border-surface-container shadow-2xs space-y-3">
        <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
          Recipe Visual
        </label>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="w-full sm:w-48 h-32 rounded-xl overflow-hidden bg-surface-low border border-surface-container shrink-0">
            <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 w-full space-y-2">
            <input 
              type="text"
              placeholder="Paste Image URL (e.g. Unsplash URL)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-low border border-surface-container rounded-xl text-xs font-mono text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <p className="text-[11px] text-on-surface-variant">
              High-resolution culinary photography delivers the best aesthetic appearance.
            </p>
          </div>
        </div>
      </section>

      {/* Identity & Basic Info */}
      <section className="bg-surface-lowest rounded-2xl p-5 sm:p-6 border border-surface-container shadow-2xs space-y-5">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
            Recipe Name
          </label>
          <input 
            className="w-full bg-surface-low border border-surface-container rounded-xl px-4 py-3 text-lg sm:text-xl font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-on-surface-variant/40" 
            placeholder="Recipe Name" 
            aria-label="Recipe Name"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
            Description
          </label>
          <textarea 
            className="w-full bg-surface-low border border-surface-container rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-on-surface-variant/40 resize-none leading-relaxed" 
            placeholder="Brief editorial summary of flavors, textures, and origins..." 
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Prep Time, Servings, Difficulty */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-surface-low border border-surface-container rounded-xl flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
              <Timer className="w-3.5 h-3.5 text-primary" />
              <span>Prep (mins)</span>
            </span>
            <input 
              type="number" 
              value={prepTime} 
              onChange={(e) => setPrepTime(parseInt(e.target.value) || 0)}
              className="w-16 bg-surface-lowest border border-surface-container rounded-lg px-2 py-1 text-center font-mono font-bold text-sm text-on-surface"
            />
          </div>

          <div className="p-3 bg-surface-low border border-surface-container rounded-xl flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
              <Users className="w-3.5 h-3.5 text-primary" />
              <span>Servings</span>
            </span>
            <input 
              type="number" 
              value={servings} 
              onChange={(e) => setServings(parseInt(e.target.value) || 1)}
              className="w-16 bg-surface-lowest border border-surface-container rounded-lg px-2 py-1 text-center font-mono font-bold text-sm text-on-surface"
            />
          </div>

          <div className="p-3 bg-surface-low border border-surface-container rounded-xl flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 text-primary" />
              <span>Difficulty</span>
            </span>
            <select 
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as any)}
              className="bg-surface-lowest border border-surface-container rounded-lg px-2.5 py-1 text-xs font-bold text-on-surface cursor-pointer"
            >
              <option value="Easy">Easy</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
            Category Tags
          </label>
          <div className="flex flex-wrap items-center gap-2">
            {tags.map(tag => (
              <span key={tag} className="flex items-center gap-1.5 bg-primary-light text-primary px-3 py-1 rounded-lg text-xs font-bold">
                <span>{tag}</span>
                <button onClick={() => handleRemoveTag(tag)} className="hover:text-rose-600 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <input 
              type="text"
              placeholder="+ Add tag & Enter"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleAddTag}
              className="bg-surface-low border border-surface-container rounded-lg px-3 py-1 text-xs font-medium text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </section>

      {/* Ingredients & Instructions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Ingredients (7 cols) */}
        <section className="md:col-span-7 bg-surface-lowest rounded-2xl p-5 sm:p-6 border border-surface-container shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-surface-container">
            <div>
              <h2 className="text-lg font-bold text-on-surface">Ingredients List</h2>
              <span className="text-xs text-on-surface-variant">{ingredients.length} items added</span>
            </div>
            <button 
              onClick={() => setIsPickerOpen(true)}
              className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover px-3 py-1.5 rounded-lg bg-primary-light/60 hover:bg-primary-light transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Item</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {ingredients.map((ing, i) => {
              const matched = INITIAL_INGREDIENTS.find(item => item.id === ing.ingredientId);
              return (
                <div key={i} className="flex items-center gap-3 p-2.5 bg-surface-low rounded-xl border border-surface-container/60">
                  <span className="w-7 h-7 rounded-lg bg-surface-lowest border border-surface-container flex items-center justify-center text-sm shrink-0">
                    {matched?.icon || '🥗'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-xs sm:text-sm text-on-surface truncate">
                      {ing.name || matched?.name || 'Ingredient'}
                    </p>
                    <p className="text-[10px] text-on-surface-variant uppercase">{matched?.category || 'Staple'}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <input 
                      type="number" 
                      value={ing.quantity}
                      onChange={(e) => {
                        const newIngs = [...ingredients];
                        newIngs[i].quantity = parseFloat(e.target.value) || 0;
                        setIngredients(newIngs);
                      }}
                      className="w-14 bg-surface-lowest border border-surface-container rounded-lg px-1.5 py-1 text-center font-mono font-bold text-xs"
                    />
                    <span className="text-xs font-bold text-on-surface-variant min-w-[36px]">{ing.unit}</span>
                  </div>
                  <button 
                    onClick={() => handleRemoveIngredient(i)} 
                    className="p-1 text-on-surface-variant hover:text-rose-600 rounded transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}

            {ingredients.length === 0 && (
              <div 
                onClick={() => setIsPickerOpen(true)}
                className="py-8 border-2 border-dashed border-surface-container rounded-xl text-center cursor-pointer hover:bg-surface-low/50 transition-colors"
              >
                <PlusCircle className="w-6 h-6 text-primary mx-auto mb-1.5" />
                <p className="text-xs font-bold text-on-surface">No ingredients added yet</p>
                <p className="text-[11px] text-on-surface-variant mt-0.5">Click to browse your pantry and select ingredients</p>
              </div>
            )}
          </div>
        </section>

        {/* Instructions (5 cols) */}
        <section className="md:col-span-5 bg-surface-lowest rounded-2xl p-5 sm:p-6 border border-surface-container shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-surface-container">
            <div>
              <h2 className="text-lg font-bold text-on-surface">Preparation Steps</h2>
              <span className="text-xs text-on-surface-variant">{instructions.length} steps</span>
            </div>
            <button 
              onClick={handleAddStep}
              className="text-xs font-bold text-primary hover:underline uppercase tracking-wider"
            >
              + Step
            </button>
          </div>

          <div className="space-y-3">
            {instructions.map((step, i) => (
              <div key={i} className="flex gap-2.5 items-start group">
                <span className="shrink-0 w-6 h-6 rounded-md bg-primary-light text-primary flex items-center justify-center font-bold text-xs mt-1">
                  {i + 1}
                </span>
                <div className="flex-1 space-y-1">
                  <textarea 
                    className="w-full bg-surface-low border border-surface-container rounded-xl p-2.5 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed resize-none" 
                    placeholder="Step instruction..." 
                    rows={2}
                    value={step}
                    onChange={(e) => handleUpdateStep(i, e.target.value)}
                  />
                  {instructions.length > 1 && (
                    <button 
                      onClick={() => handleRemoveStep(i)} 
                      className="text-rose-600 text-[10px] font-bold uppercase opacity-60 hover:opacity-100 transition-opacity"
                    >
                      Remove Step
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Ingredient Picker Modal */}
      <IngredientPicker 
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onSelect={handleSelectIngredient}
        onAddNew={() => onAddNewIngredient?.()}
      />

      {/* Fixed Sticky Footer for Mobile & Quick Access */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-surface/95 backdrop-blur-md px-4 py-3 border-t border-surface-container shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-end gap-3">
          <button 
            onClick={onBack} 
            className="px-5 py-2.5 rounded-xl bg-surface-lowest hover:bg-surface-low text-on-surface font-bold text-xs border border-surface-container transition-colors"
          >
            Cancel
          </button>
          <button 
            id="save-recipe-form-btn"
            onClick={submitForm}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-2xs transition-all active:scale-95 cursor-pointer"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Save Recipe</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
