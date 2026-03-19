from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


# ── Ingredient ──────────────────────────────────────────────────────────────────


class IngredientBase(BaseModel):
    name: str
    shelf_life: int = 7
    available: bool = False
    last_available: Optional[datetime] = None
    serving_unit: str = "g"
    serving_size: float = 100.0
    protein: float = 0.0
    carbs: float = 0.0
    fat: float = 0.0
    fiber: float = 0.0
    energy: float = 0.0
    iron_mg: float = 0.0
    magnesium_mg: float = 0.0
    calcium_mg: float = 0.0
    potassium_mg: float = 0.0
    sodium_mg: float = 0.0
    vitamin_c_mg: float = 0.0
    category: str = "other_miscellaneous"


class IngredientCreate(IngredientBase):
    pass


class IngredientUpdate(BaseModel):
    name: Optional[str] = None
    shelf_life: Optional[int] = None
    available: Optional[bool] = None
    last_available: Optional[datetime] = None
    serving_unit: Optional[str] = None
    serving_size: Optional[float] = None
    protein: Optional[float] = None
    carbs: Optional[float] = None
    fat: Optional[float] = None
    fiber: Optional[float] = None
    energy: Optional[float] = None
    iron_mg: Optional[float] = None
    magnesium_mg: Optional[float] = None
    calcium_mg: Optional[float] = None
    potassium_mg: Optional[float] = None
    sodium_mg: Optional[float] = None
    vitamin_c_mg: Optional[float] = None
    category: Optional[str] = None


class IngredientResponse(IngredientBase):
    model_config = ConfigDict(from_attributes=True)
    id: int


# ── Recipe Ingredient ───────────────────────────────────────────────────────────


class RecipeIngredientBase(BaseModel):
    ingredient_id: Optional[int] = None
    name: str
    quantity: float = 0.0
    serving_unit: str = "g"


class RecipeIngredientResponse(RecipeIngredientBase):
    model_config = ConfigDict(from_attributes=True)
    id: int


# ── Recipe ──────────────────────────────────────────────────────────────────────


class RecipeBase(BaseModel):
    name: str
    prep_time_minutes: int = 15
    serves: int = 1
    instructions: Optional[str] = None
    meal_type: str = "lunch"
    is_vegetarian: bool = False
    protein: float = 0.0
    carbs: float = 0.0
    fat: float = 0.0
    fiber: float = 0.0
    energy: float = 0.0
    iron_mg: float = 0.0
    magnesium_mg: float = 0.0
    calcium_mg: float = 0.0
    potassium_mg: float = 0.0
    sodium_mg: float = 0.0
    vitamin_c_mg: float = 0.0
    image_url: Optional[str] = None


class RecipeCreate(RecipeBase):
    ingredients: list[RecipeIngredientBase] = []


class RecipeUpdate(BaseModel):
    name: Optional[str] = None
    prep_time_minutes: Optional[int] = None
    serves: Optional[int] = None
    instructions: Optional[str] = None
    meal_type: Optional[str] = None
    is_vegetarian: Optional[bool] = None
    protein: Optional[float] = None
    carbs: Optional[float] = None
    fat: Optional[float] = None
    fiber: Optional[float] = None
    energy: Optional[float] = None
    iron_mg: Optional[float] = None
    magnesium_mg: Optional[float] = None
    calcium_mg: Optional[float] = None
    potassium_mg: Optional[float] = None
    sodium_mg: Optional[float] = None
    vitamin_c_mg: Optional[float] = None
    image_url: Optional[str] = None
    ingredients: Optional[list[RecipeIngredientBase]] = None


class RecipeResponse(RecipeBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    ingredients: list[RecipeIngredientResponse] = []


class RecipeListResponse(RecipeBase):
    """Lightweight recipe response without ingredients for list endpoints."""
    model_config = ConfigDict(from_attributes=True)
    id: int


# ── Weekly Plan ─────────────────────────────────────────────────────────────────


class WeeklyPlanBase(BaseModel):
    day: str
    meal_type: str
    recipe_ids: list[int] = []


class WeeklyPlanUpdate(BaseModel):
    recipe_ids: list[int] = []


class WeeklyPlanResponse(WeeklyPlanBase):
    model_config = ConfigDict(from_attributes=True)
    id: int


# ── Health ──────────────────────────────────────────────────────────────────────


class HealthResponse(BaseModel):
    status: str
    database: str
