from datetime import datetime

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import relationship

from .database import Base


class Ingredient(Base):
    __tablename__ = "ingredients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    shelf_life = Column(Integer, default=7)
    available = Column(Boolean, default=False)
    last_available = Column(DateTime, nullable=True)
    serving_unit = Column(String(50), nullable=False, default="g")
    serving_size = Column(Float, nullable=False, default=100.0)
    protein = Column(Float, default=0.0)
    carbs = Column(Float, default=0.0)
    fat = Column(Float, default=0.0)
    fiber = Column(Float, default=0.0)
    energy = Column(Float, default=0.0)
    iron_mg = Column(Float, default=0.0)
    magnesium_mg = Column(Float, default=0.0)
    calcium_mg = Column(Float, default=0.0)
    potassium_mg = Column(Float, default=0.0)
    sodium_mg = Column(Float, default=0.0)
    vitamin_c_mg = Column(Float, default=0.0)
    category = Column(String(100), nullable=False, default="other_miscellaneous")

    recipe_ingredients = relationship(
        "RecipeIngredient", back_populates="ingredient", lazy="selectin"
    )


class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(500), nullable=False, index=True)
    serves = Column(Integer, default=1)
    instructions = Column(Text, nullable=True)
    meal_type = Column(String(50), nullable=False, default="lunch")
    is_vegetarian = Column(Boolean, default=False)
    protein = Column(Float, default=0.0)
    carbs = Column(Float, default=0.0)
    fat = Column(Float, default=0.0)
    fiber = Column(Float, default=0.0)
    energy = Column(Float, default=0.0)
    iron_mg = Column(Float, default=0.0)
    magnesium_mg = Column(Float, default=0.0)
    calcium_mg = Column(Float, default=0.0)
    potassium_mg = Column(Float, default=0.0)
    sodium_mg = Column(Float, default=0.0)
    vitamin_c_mg = Column(Float, default=0.0)

    ingredients = relationship(
        "RecipeIngredient", back_populates="recipe", lazy="selectin", cascade="all, delete-orphan"
    )


class RecipeIngredient(Base):
    __tablename__ = "recipe_ingredients"

    id = Column(Integer, primary_key=True, autoincrement=True)
    recipe_id = Column(Integer, ForeignKey("recipes.id", ondelete="CASCADE"), nullable=False)
    ingredient_id = Column(Integer, ForeignKey("ingredients.id", ondelete="SET NULL"), nullable=True)
    name = Column(String(255), nullable=False)
    quantity = Column(Float, nullable=False, default=0.0)
    serving_unit = Column(String(50), nullable=False, default="g")

    recipe = relationship("Recipe", back_populates="ingredients")
    ingredient = relationship("Ingredient", back_populates="recipe_ingredients", lazy="selectin")


class WeeklyPlan(Base):
    __tablename__ = "weekly_plan"

    id = Column(Integer, primary_key=True, index=True)
    day = Column(String(20), nullable=False)
    meal_type = Column(String(50), nullable=False)
    recipe_ids = Column(ARRAY(Integer), default=[])
