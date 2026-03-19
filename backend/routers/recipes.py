from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from ..database import get_db
from ..models import Recipe, RecipeIngredient
from ..schemas import (
    RecipeCreate,
    RecipeIngredientBase,
    RecipeListResponse,
    RecipeResponse,
    RecipeUpdate,
)

router = APIRouter(prefix="/api/recipes", tags=["recipes"])


@router.get("", response_model=list[RecipeListResponse])
async def list_recipes(
    meal_type: Optional[str] = Query(None),
    is_vegetarian: Optional[bool] = Query(None),
    search: Optional[str] = Query(None),
    limit: int = Query(100, le=500),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(Recipe)
    if meal_type:
        stmt = stmt.where(Recipe.meal_type == meal_type)
    if is_vegetarian is not None:
        stmt = stmt.where(Recipe.is_vegetarian == is_vegetarian)
    if search:
        stmt = stmt.where(Recipe.name.ilike(f"%{search}%"))
    stmt = stmt.order_by(Recipe.id).offset(offset).limit(limit)
    result = await db.execute(stmt)
    return result.scalars().all()


@router.get("/meal-types", response_model=list[str])
async def list_meal_types(db: AsyncSession = Depends(get_db)):
    stmt = select(Recipe.meal_type).distinct().order_by(Recipe.meal_type)
    result = await db.execute(stmt)
    return result.scalars().all()


@router.get("/count")
async def count_recipes(db: AsyncSession = Depends(get_db)):
    stmt = select(func.count(Recipe.id))
    result = await db.execute(stmt)
    return {"count": result.scalar()}


@router.get("/{recipe_id}", response_model=RecipeResponse)
async def get_recipe(recipe_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Recipe).where(Recipe.id == recipe_id))
    recipe = result.scalar_one_or_none()
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return recipe


@router.post("", response_model=RecipeResponse, status_code=201)
async def create_recipe(data: RecipeCreate, db: AsyncSession = Depends(get_db)):
    ingredients_data = data.ingredients
    recipe_dict = data.model_dump(exclude={"ingredients"})
    recipe = Recipe(**recipe_dict)

    for ing_data in ingredients_data:
        ri = RecipeIngredient(**ing_data.model_dump())
        recipe.ingredients.append(ri)

    db.add(recipe)
    await db.commit()
    await db.refresh(recipe)
    return recipe


@router.put("/{recipe_id}", response_model=RecipeResponse)
async def update_recipe(
    recipe_id: int, data: RecipeUpdate, db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Recipe).where(Recipe.id == recipe_id))
    recipe = result.scalar_one_or_none()
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")

    update_data = data.model_dump(exclude_unset=True)
    ingredients_data = update_data.pop("ingredients", None)

    for key, value in update_data.items():
        setattr(recipe, key, value)

    if ingredients_data is not None:
        # Replace all ingredients
        await db.execute(
            select(RecipeIngredient).where(RecipeIngredient.recipe_id == recipe_id)
        )
        # Delete existing
        for ri in list(recipe.ingredients):
            await db.delete(ri)
        await db.flush()

        # Add new
        for ing_data in ingredients_data:
            ri = RecipeIngredient(
                recipe_id=recipe_id,
                ingredient_id=ing_data.get("ingredient_id"),
                name=ing_data["name"],
                quantity=ing_data.get("quantity", 0),
                serving_unit=ing_data.get("serving_unit", "g"),
            )
            db.add(ri)

    await db.commit()
    await db.refresh(recipe)
    return recipe


@router.delete("/{recipe_id}", status_code=204)
async def delete_recipe(recipe_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Recipe).where(Recipe.id == recipe_id))
    recipe = result.scalar_one_or_none()
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    await db.delete(recipe)
    await db.commit()
