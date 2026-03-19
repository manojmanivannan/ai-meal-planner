from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..database import get_db
from ..models import WeeklyPlan
from ..schemas import WeeklyPlanResponse, WeeklyPlanUpdate

router = APIRouter(prefix="/api/weekly-plan", tags=["weekly-plan"])


@router.get("", response_model=list[WeeklyPlanResponse])
async def list_weekly_plan(db: AsyncSession = Depends(get_db)):
    stmt = select(WeeklyPlan).order_by(WeeklyPlan.id)
    result = await db.execute(stmt)
    return result.scalars().all()


@router.get("/{plan_id}", response_model=WeeklyPlanResponse)
async def get_weekly_plan(plan_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(WeeklyPlan).where(WeeklyPlan.id == plan_id))
    plan = result.scalar_one_or_none()
    if not plan:
        raise HTTPException(status_code=404, detail="Weekly plan entry not found")
    return plan


@router.put("/{plan_id}", response_model=WeeklyPlanResponse)
async def update_weekly_plan(
    plan_id: int, data: WeeklyPlanUpdate, db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(WeeklyPlan).where(WeeklyPlan.id == plan_id))
    plan = result.scalar_one_or_none()
    if not plan:
        raise HTTPException(status_code=404, detail="Weekly plan entry not found")

    plan.recipe_ids = data.recipe_ids
    await db.commit()
    await db.refresh(plan)
    return plan
