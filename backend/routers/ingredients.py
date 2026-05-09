from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from ..database import get_db
from ..models import Ingredient
from ..schemas import IngredientCreate, IngredientResponse, IngredientUpdate

router = APIRouter(prefix="/api/ingredients", tags=["ingredients"])


@router.get("", response_model=list[IngredientResponse])
async def list_ingredients(
    category: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    available: Optional[bool] = Query(None),
    limit: int = Query(100, le=1000),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(Ingredient)
    if category:
        stmt = stmt.where(Ingredient.category == category)
    if search:
        stmt = stmt.where(Ingredient.name.ilike(f"%{search}%"))
    if available is not None:
        stmt = stmt.where(Ingredient.available == available)
    stmt = stmt.order_by(Ingredient.name).offset(offset).limit(limit)
    result = await db.execute(stmt)
    return result.scalars().all()


@router.get("/categories", response_model=list[str])
async def list_categories(db: AsyncSession = Depends(get_db)):
    stmt = select(Ingredient.category).distinct().order_by(Ingredient.category)
    result = await db.execute(stmt)
    return result.scalars().all()


@router.get("/count")
async def count_ingredients(db: AsyncSession = Depends(get_db)):
    stmt = select(func.count(Ingredient.id))
    result = await db.execute(stmt)
    return {"count": result.scalar()}


@router.get("/{ingredient_id}", response_model=IngredientResponse)
async def get_ingredient(ingredient_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Ingredient).where(Ingredient.id == ingredient_id))
    ingredient = result.scalar_one_or_none()
    if not ingredient:
        raise HTTPException(status_code=404, detail="Ingredient not found")
    return ingredient


@router.post("", response_model=IngredientResponse, status_code=201)
async def create_ingredient(data: IngredientCreate, db: AsyncSession = Depends(get_db)):
    ingredient = Ingredient(**data.model_dump())
    db.add(ingredient)
    await db.commit()
    await db.refresh(ingredient)
    return ingredient


@router.put("/{ingredient_id}", response_model=IngredientResponse)
async def update_ingredient(
    ingredient_id: int, data: IngredientUpdate, db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Ingredient).where(Ingredient.id == ingredient_id))
    ingredient = result.scalar_one_or_none()
    if not ingredient:
        raise HTTPException(status_code=404, detail="Ingredient not found")

    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(ingredient, key, value)

    await db.commit()
    await db.refresh(ingredient)
    return ingredient


@router.delete("/{ingredient_id}", status_code=204)
async def delete_ingredient(ingredient_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Ingredient).where(Ingredient.id == ingredient_id))
    ingredient = result.scalar_one_or_none()
    if not ingredient:
        raise HTTPException(status_code=404, detail="Ingredient not found")
    await db.delete(ingredient)
    await db.commit()
