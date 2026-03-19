import React from 'react';
import { motion } from 'motion/react';
import { X, Users, PlusCircle, Trash2, CheckCircle, BarChart3, Leaf, Image as ImageIcon, Upload, Clock } from 'lucide-react';
import { Recipe, Ingredient, RecipeIngredient } from '../types';
import { uploadImage } from '../api';
import { IngredientPicker } from '../components/IngredientPicker';
import { MEAL_TYPE_LABELS } from '../constants';

interface CreateRecipeScreenProps {
  recipe: Recipe | null;
  ingredients: Ingredient[];
  onBack: () => void;
  onSave: (recipe: Partial<Recipe>) => void;
  onDelete?: () => void;
}

export const CreateRecipeScreen: React.FC<CreateRecipeScreenProps> = ({ 
  recipe, 
  ingredients: allIngredients,
  onBack, 
  onSave, 
  onDelete,
}) => {
  const [name, setName] = React.useState(recipe?.name || '');
  const [serves, setServes] = React.useState(recipe?.serves || 2);
  const [prepTimeMinutes, setPrepTimeMinutes] = React.useState(recipe?.prep_time_minutes || 15);
  const [mealType, setMealType] = React.useState(recipe?.meal_type || 'lunch');
  const [isVegetarian, setIsVegetarian] = React.useState(recipe?.is_vegetarian || false);
  const [recipeIngredients, setRecipeIngredients] = React.useState<Array<{
    ingredient_id: number | null;
    name: string;
    quantity: number;
    serving_unit: string;
  }>>(
    recipe?.ingredients?.map(i => ({
      ingredient_id: i.ingredient_id,
      name: i.name,
      quantity: i.quantity,
      serving_unit: i.serving_unit,
    })) || []
  );
  const [instructionText, setInstructionText] = React.useState(recipe?.instructions || '');
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState<string | null>(recipe?.image_url || null);
  const [isPickerOpen, setIsPickerOpen] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);

  const handleSelectIngredient = (ing: Ingredient) => {
    setRecipeIngredients([...recipeIngredients, { 
      ingredient_id: ing.id, 
      name: ing.name,
      quantity: 100, 
      serving_unit: ing.serving_unit 
    }]);
  };

  const handleRemoveIngredient = (index: number) => {
    setRecipeIngredients(recipeIngredients.filter((_, i) => i !== index));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setIsUploading(true);
    let finalImageUrl = recipe?.image_url;
    if (imageFile) {
        try {
            finalImageUrl = await uploadImage(imageFile);
        } catch (err) {
            console.error("Failed to upload image", err);
        }
    }
    setIsUploading(false);

    onSave({
      name,
      serves,
      prep_time_minutes: prepTimeMinutes,
      meal_type: mealType as any,
      is_vegetarian: isVegetarian,
      instructions: instructionText,
      image_url: finalImageUrl,
      ingredients: recipeIngredients.map(i => ({
        id: 0,
        ingredient_id: i.ingredient_id,
        name: i.name,
        quantity: i.quantity,
        serving_unit: i.serving_unit,
      })),
    });
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
            onClick={onDelete}
            className="flex items-center gap-2 text-error font-bold text-sm hover:bg-error/10 px-4 py-2 rounded-full transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        )}
      </div>

      {/* Image Upload Hero */}
      <section className="relative w-full h-64 md:h-80 bg-surface-container-low rounded-3xl overflow-hidden group border-2 border-dashed border-outline-variant/30 flex items-center justify-center transition-all hover:border-primary/50">
        {imagePreviewUrl ? (
          <img src={imagePreviewUrl} alt="Recipe preview" className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-3 text-on-surface-variant group-hover:text-primary transition-colors">
            <ImageIcon className="w-12 h-12" />
            <p className="font-bold">Upload Recipe Image</p>
            <p className="text-xs opacity-70">PNG, JPG up to 10MB</p>
          </div>
        )}
        <label className="absolute inset-0 w-full h-full cursor-pointer bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          {imagePreviewUrl && <div className="opacity-0 group-hover:opacity-100 bg-surface text-on-surface px-6 py-3 rounded-full font-bold shadow-xl transition-all flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0"><Upload className="w-4 h-4"/> Change Image</div>}
        </label>
      </section>

      {/* Identity */}
      <section className="space-y-6">
        <input 
          className="w-full bg-surface-container-low border-none rounded-lg px-6 py-5 text-4xl font-extrabold tracking-tight focus:ring-2 focus:ring-primary/30 placeholder:text-on-surface-variant/40" 
          placeholder="Recipe Name" 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-surface-container-low text-on-surface-variant px-5 py-2 rounded-full text-sm font-semibold">
            <Users className="w-4 h-4" /> 
            <input 
              type="number" 
              value={serves} 
              onChange={(e) => setServes(parseInt(e.target.value) || 1)}
              className="bg-transparent border-none p-0 w-8 focus:ring-0 font-bold text-center"
            /> Servings
          </div>

          <div className="flex items-center gap-2 bg-surface-container-low text-on-surface-variant px-5 py-2 rounded-full text-sm font-semibold">
            <Clock className="w-4 h-4" /> 
            <input 
              type="number" 
              value={prepTimeMinutes} 
              onChange={(e) => setPrepTimeMinutes(parseInt(e.target.value) || 15)}
              className="bg-transparent border-none p-0 w-10 focus:ring-0 font-bold text-center"
            /> Min Prep
          </div>
          
          <select 
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            className="bg-tertiary-fixed text-on-tertiary-fixed px-5 py-2 rounded-full text-sm font-semibold border-none focus:ring-2 focus:ring-primary/30"
          >
            {Object.entries(MEAL_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>

          <button
            onClick={() => setIsVegetarian(!isVegetarian)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              isVegetarian 
                ? 'bg-green-500 text-white' 
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <Leaf className="w-4 h-4" /> {isVegetarian ? 'Vegetarian' : 'Non-Veg'}
          </button>
        </div>
      </section>

      {/* Ingredients & Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <section className="md:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Ingredients</h2>
            <span className="text-on-surface-variant text-sm font-semibold">{recipeIngredients.length} Items</span>
          </div>
          <div className="space-y-3">
            {recipeIngredients.map((ing, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-surface-container-low rounded-xl">
                <div className="w-8 h-8 rounded-full bg-surface-lowest flex items-center justify-center text-lg">
                  🥗
                </div>
                <div className="flex-grow">
                  <p className="font-bold text-sm">{ing.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    value={ing.quantity}
                    onChange={(e) => {
                      const newIngs = [...recipeIngredients];
                      newIngs[i] = { ...newIngs[i], quantity: parseFloat(e.target.value) || 0 };
                      setRecipeIngredients(newIngs);
                    }}
                    className="w-16 bg-surface-lowest border-none rounded-lg px-2 py-1 text-center font-bold text-sm"
                  />
                  <span className="text-xs font-bold text-on-surface-variant min-w-[40px]">{ing.serving_unit}</span>
                </div>
                <button onClick={() => handleRemoveIngredient(i)} className="p-2 text-error hover:bg-error/10 rounded-full transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button 
              onClick={() => setIsPickerOpen(true)}
              className="w-full py-4 rounded-lg bg-surface-container-low border-2 border-dashed border-outline-variant/20 text-on-surface-variant font-bold flex items-center justify-center gap-2 hover:bg-surface-container-high transition-colors"
            >
              <PlusCircle className="w-5 h-5" /> Add Ingredient
            </button>
          </div>
        </section>

        <section className="md:col-span-5 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Instructions</h2>
          <textarea 
            className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/30 text-on-surface font-body leading-relaxed resize-none min-h-[300px]" 
            placeholder="Write cooking instructions here... Separate steps with new lines." 
            value={instructionText}
            onChange={(e) => setInstructionText(e.target.value)}
          />
        </section>
      </div>

      <IngredientPicker 
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onSelect={handleSelectIngredient}
      />

      {/* Nutrition Summary */}
      <section className="bg-surface-lowest rounded-lg p-8 shadow-sm">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-secondary" /> Estimated Nutrition
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Energy', val: recipe?.energy || 0, unit: 'kcal' },
            { label: 'Protein', val: recipe?.protein || 0, unit: 'g' },
            { label: 'Carbs', val: recipe?.carbs || 0, unit: 'g' },
            { label: 'Fat', val: recipe?.fat || 0, unit: 'g' }
          ].map(stat => (
            <div key={stat.label} className="text-center md:text-left">
              <p className="text-on-surface-variant text-[10px] font-bold mb-1 uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-extrabold text-on-surface">{Math.round(stat.val)}<span className="text-lg font-medium text-on-surface-variant/40 ml-1">{stat.unit}</span></p>
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
            onClick={handleSave}
            disabled={isUploading}
            className="flex-[2] py-4 rounded-full gradient-primary text-on-primary font-bold shadow-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 disabled:opacity-70"
          >
            <CheckCircle className="w-5 h-5" /> {isUploading ? 'Uploading...' : (recipe ? 'Update Recipe' : 'Save Recipe')}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
