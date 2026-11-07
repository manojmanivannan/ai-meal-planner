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

BACKEND_DATA_DIR = Path(__file__).resolve().parent / "data"
ETC_DATA_DIR = Path(__file__).resolve().parent.parent / "etc" / "data"


def get_data_dir() -> Path:
    if BACKEND_DATA_DIR.exists() and (BACKEND_DATA_DIR / "recipes.csv").exists():
        return BACKEND_DATA_DIR
    return ETC_DATA_DIR


def infer_category(name: str) -> str:
    n = name.lower()
    if any(k in n for k in ['chicken', 'egg', 'fish', 'salmon', 'prawn', 'shrimp', 'protein powder', 'tofu', 'turkey', 'meat', 'beef', 'mutton', 'paneer']):
        if 'bread' in n:
            return 'Bakery'
        return 'Protein'
    if any(k in n for k in ['milk', 'yogurt', 'curd', 'cheese', 'butter', 'ghee', 'kefir', 'cream']):
        return 'Dairy'
    if any(k in n for k in ['bread', 'toast', 'tortilla', 'wrap', 'pastry', 'bun', 'croissant', 'bagel', 'pita']):
        return 'Bakery'
    if any(k in n for k in ['rice', 'oat', 'quinoa', 'flour', 'pasta', 'noodle', 'millet', 'ragi', 'aval', 'poha', 'semolina', 'suji', 'wheat', 'spaghetti', 'linguine', 'vermicelli']):
        return 'Grains'
    if any(k in n for k in ['cumin', 'pepper', 'turmeric', 'chilli', 'chili', 'cardamom', 'clove', 'cinnamon', 'fenugreek', 'coriander whole', 'mustard', 'asafoetida', 'garam masala', 'fennel', 'bay leaves', 'salt', 'saffron', 'nutmeg', 'paprika', 'oregano', 'thyme', 'spice']):
        return 'Spices'
    if any(k in n for k in ['oil', 'vinegar', 'honey', 'seed', 'nut', 'almond', 'walnut', 'cashew', 'lentil', 'dal', 'chickpea', 'bean', 'gram', 'peanut', 'sauce', 'paste', 'sugar', 'jaggery', 'baking', 'hummus', 'tahini']):
        return 'Pantry'
    return 'Produce'


async def seed_ingredients(session) -> tuple[set[int], dict[str, int]]:
    """Seed ingredients and return the set of valid ingredient IDs and a name-to-id mapping."""
    data_dir = get_data_dir()
    csv_path = data_dir / "ingredients.csv"
    if not csv_path.exists():
        print(f"  [SKIP] {csv_path} not found")
        return set(), {}

    valid_ids: set[int] = set()
    name_to_id: dict[str, int] = {}
    count = 0
    with open(csv_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            ing_id = parse_int(row.get("id", ""))
            name = row.get("name", "").strip()
            raw_cat = (row.get("category") or "").strip()
            category = raw_cat if raw_cat else infer_category(name)

            ing = Ingredient(
                id=ing_id,
                name=name,
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
                category=category,
            )
            session.add(ing)
            if ing_id:
                valid_ids.add(ing_id)
                if name:
                    name_to_id[name.lower()] = ing_id
            count += 1

    await session.flush()
    print(f"  ✓ Seeded {count} ingredients from {csv_path}")
    return valid_ids, name_to_id


async def seed_recipes(session, valid_ingredient_ids: set[int], name_to_id: dict[str, int]) -> int:
    data_dir = get_data_dir()
    csv_path = data_dir / "recipes.csv"
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
                ing_name = ing_data.get("name", "unknown")
                ingredient_id = None
                if raw_id and int(raw_id) in valid_ingredient_ids:
                    ingredient_id = int(raw_id)
                elif ing_name.lower().strip() in name_to_id:
                    ingredient_id = name_to_id[ing_name.lower().strip()]

                ri = RecipeIngredient(
                    recipe_id=recipe_id,
                    ingredient_id=ingredient_id,
                    name=ing_name,
                    quantity=parse_float(str(ing_data.get("quantity", 0))),
                    serving_unit=ing_data.get("serving_unit", "g"),
                )
                session.add(ri)

            count += 1

    await session.flush()
    print(f"  ✓ Seeded {count} recipes (with ingredients) from {csv_path}")
    return count


async def seed_weekly_plan(session) -> int:
    data_dir = get_data_dir()
    csv_path = data_dir / "weekly_plan.csv"
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

            valid_ingredient_ids, name_to_id = await seed_ingredients(session)
            await seed_recipes(session, valid_ingredient_ids, name_to_id)
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
