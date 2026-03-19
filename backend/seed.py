"""
Seed the database from CSV files in etc/data/.

Handles:
  - ingredients.csv  (~553 rows)
  - recipes.csv      (~100 rows with embedded JSON ingredients)
  - weekly_plan.csv  (35 rows)
"""

import asyncio
import csv
import json
import os
import re
import sys
from datetime import datetime
from pathlib import Path

from sqlalchemy import select, text

# Add parent to path so we can import backend modules
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from backend.database import Base, async_session, engine
from backend.models import Ingredient, Recipe, RecipeIngredient, WeeklyPlan

DATA_DIR = Path(__file__).resolve().parent.parent / "etc" / "data"


def parse_bool(val: str) -> bool:
    return val.strip().lower() in ("t", "true", "1", "yes")


def parse_float(val: str, default: float = 0.0) -> float:
    try:
        return float(val.strip()) if val.strip() else default
    except (ValueError, TypeError):
        return default


def parse_int(val: str, default: int = 0) -> int:
    try:
        return int(float(val.strip())) if val.strip() else default
    except (ValueError, TypeError):
        return default


def parse_datetime(val: str):
    if not val or not val.strip():
        return None
    try:
        return datetime.fromisoformat(val.strip())
    except (ValueError, TypeError):
        return None


def parse_recipe_ids(val: str) -> list[int]:
    """Parse PostgreSQL-style array notation like {64} or {65,98} or {}."""
    val = val.strip().strip('"').strip("'")
    # Remove braces
    inner = val.strip("{}")
    if not inner:
        return []
    parts = inner.split(",")
    result = []
    for p in parts:
        p = p.strip()
        if p:
            try:
                result.append(int(float(p)))
            except (ValueError, TypeError):
                pass
    return result


def parse_ingredients_json(raw: str) -> list[dict]:
    """Parse the embedded JSON ingredients from recipes.csv.
    
    The CSV uses double-doubled quotes: ""id"" instead of "id".
    """
    if not raw or not raw.strip():
        return []

    raw = raw.strip()

    # The CSV escapes inner quotes by doubling them
    # Replace "" with " but preserve the outer structure
    cleaned = raw.replace('""', '"')

    # Sometimes the outer quotes are present
    if cleaned.startswith('"') and cleaned.endswith('"'):
        cleaned = cleaned[1:-1]

    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        # Try wrapping in array if needed
        try:
            if not cleaned.startswith("["):
                cleaned = f"[{cleaned}]"
            return json.loads(cleaned)
        except json.JSONDecodeError:
            print(f"  [WARN] Could not parse ingredients JSON: {raw[:80]}...")
            return []


async def seed_ingredients(session) -> set[int]:
    """Seed ingredients and return the set of valid ingredient IDs."""
    csv_path = DATA_DIR / "ingredients.csv"
    if not csv_path.exists():
        print(f"  [SKIP] {csv_path} not found")
        return set()

    valid_ids: set[int] = set()
    count = 0
    with open(csv_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            ing_id = parse_int(row.get("id", ""))
            ing = Ingredient(
                id=ing_id,
                name=row.get("name", "").strip(),
                shelf_life=parse_int(row.get("shelf_life", ""), 7),
                available=parse_bool(row.get("available", "f")),
                last_available=parse_datetime(row.get("last_available", "")),
                serving_unit=row.get("serving_unit", "g").strip(),
                serving_size=parse_float(row.get("serving_size", ""), 100.0),
                protein=parse_float(row.get("protein", "")),
                carbs=parse_float(row.get("carbs", "")),
                fat=parse_float(row.get("fat", "")),
                fiber=parse_float(row.get("fiber", "")),
                energy=parse_float(row.get("energy", "")),
                iron_mg=parse_float(row.get("iron_mg", "")),
                magnesium_mg=parse_float(row.get("magnesium_mg", "")),
                calcium_mg=parse_float(row.get("calcium_mg", "")),
                potassium_mg=parse_float(row.get("potassium_mg", "")),
                sodium_mg=parse_float(row.get("sodium_mg", "")),
                vitamin_c_mg=parse_float(row.get("vitamin_c_mg", "")),
                category=row.get("category", "other_miscellaneous").strip(),
            )
            session.add(ing)
            if ing_id:
                valid_ids.add(ing_id)
            count += 1

    await session.flush()
    print(f"  ✓ Seeded {count} ingredients")
    return valid_ids


async def seed_recipes(session, valid_ingredient_ids: set[int]) -> int:
    csv_path = DATA_DIR / "recipes.csv"
    if not csv_path.exists():
        print(f"  [SKIP] {csv_path} not found")
        return 0

    count = 0
    with open(csv_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            recipe_id = parse_int(row.get("id", ""))
            if not recipe_id:
                continue

            recipe = Recipe(
                id=recipe_id,
                name=row.get("name", "").strip(),
                serves=parse_int(row.get("serves", ""), 1),
                instructions=row.get("instructions", "").strip(),
                meal_type=row.get("meal_type", "lunch").strip(),
                is_vegetarian=parse_bool(row.get("is_vegetarian", "f")),
                protein=parse_float(row.get("protein", "")),
                carbs=parse_float(row.get("carbs", "")),
                fat=parse_float(row.get("fat", "")),
                fiber=parse_float(row.get("fiber", "")),
                energy=parse_float(row.get("energy", "")),
                iron_mg=parse_float(row.get("iron_mg", "")),
                magnesium_mg=parse_float(row.get("magnesium_mg", "")),
                calcium_mg=parse_float(row.get("calcium_mg", "")),
                potassium_mg=parse_float(row.get("potassium_mg", "")),
                sodium_mg=parse_float(row.get("sodium_mg", "")),
                vitamin_c_mg=parse_float(row.get("vitamin_c_mg", "")),
            )
            session.add(recipe)
            await session.flush()

            # Parse embedded ingredients JSON
            ingredients_raw = row.get("ingredients", "")
            ingredients_list = parse_ingredients_json(ingredients_raw)

            for ing_data in ingredients_list:
                raw_id = ing_data.get("id")
                # Validate FK: set to None if ingredient doesn't exist
                ingredient_id = int(raw_id) if raw_id and int(raw_id) in valid_ingredient_ids else None
                ri = RecipeIngredient(
                    recipe_id=recipe_id,
                    ingredient_id=ingredient_id,
                    name=ing_data.get("name", "unknown"),
                    quantity=parse_float(str(ing_data.get("quantity", 0))),
                    serving_unit=ing_data.get("serving_unit", "g"),
                )
                session.add(ri)

            count += 1

    await session.flush()
    print(f"  ✓ Seeded {count} recipes (with ingredients)")
    return count


async def seed_weekly_plan(session) -> int:
    csv_path = DATA_DIR / "weekly_plan.csv"
    if not csv_path.exists():
        print(f"  [SKIP] {csv_path} not found")
        return 0

    count = 0
    with open(csv_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            plan = WeeklyPlan(
                id=parse_int(row.get("id", "")),
                day=row.get("day", "").strip(),
                meal_type=row.get("meal_type", "").strip(),
                recipe_ids=parse_recipe_ids(row.get("recipe_ids", "{}")),
            )
            session.add(plan)
            count += 1

    await session.flush()
    print(f"  ✓ Seeded {count} weekly plan entries")
    return count


async def run_seed():
    print("[seed] Creating database tables...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with async_session() as session:
        # Check if data already exists
        result = await session.execute(select(Ingredient).limit(1))
        if result.scalar_one_or_none() is not None:
            print("[seed] Database already seeded — skipping.")
            return

        print("[seed] Seeding database from CSV files...")
        try:
            # Use raw SQL to allow explicit ID insertion
            await session.execute(text("SET session_replication_role = 'replica';"))

            valid_ingredient_ids = await seed_ingredients(session)
            await seed_recipes(session, valid_ingredient_ids)
            await seed_weekly_plan(session)

            await session.commit()

            # Reset sequences to max id + 1
            for table, col in [
                ("ingredients", "id"),
                ("recipes", "id"),
                ("recipe_ingredients", "id"),
                ("weekly_plan", "id"),
            ]:
                try:
                    await session.execute(
                        text(
                            f"SELECT setval(pg_get_serial_sequence('{table}', '{col}'), "
                            f"COALESCE((SELECT MAX({col}) FROM {table}), 0) + 1, false);"
                        )
                    )
                except Exception:
                    pass  # Table might not have a sequence

            await session.commit()
            await session.execute(text("SET session_replication_role = 'origin';"))
            await session.commit()

            print("[seed] ✓ Database seeding complete!")

        except Exception as e:
            await session.rollback()
            print(f"[seed] ✗ Seeding failed: {e}")
            raise


if __name__ == "__main__":
    asyncio.run(run_seed())
