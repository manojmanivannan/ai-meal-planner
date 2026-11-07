<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/c08f35f2-7c97-45f2-b773-84277c993502

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Run with Docker Compose

After cloning the repository, you can run the entire application locally with zero manual setup.

**Prerequisites:** Docker & Docker Compose installed on your machine.

### Running Locally
```bash
docker compose up --build
```
- **Web App**: [http://localhost:3000](http://localhost:3000)
- **Backend API & Swagger Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **PostgreSQL Database**: `localhost:5432` (User: `mealplanner`, Pass: `mealplanner`, DB: `mealplanner`)

### Stopping Services
```bash
docker compose down
# Or to reset data and volumes:
docker compose down -v
```

## Database & Data Seeding

The repository comes pre-configured with curated recipe, ingredient, and weekly meal plan data sourced from [manojmanivannan/MealPlanner](https://github.com/manojmanivannan/MealPlanner/tree/master/backend/data).

### Seeded Datasets
- **Ingredients (`backend/data/ingredients.csv` & `etc/data/ingredients.csv`)**: 233 ingredients categorized into Produce, Dairy, Protein, Grains, Spices, Pantry, and Bakery with full macro (protein, carbs, fat, fiber) and micro (calcium, iron, magnesium, potassium, sodium, vitamin C) nutrient profiles.
- **Recipes (`backend/data/recipes.csv` & `etc/data/recipes.csv`)**: 97 recipes complete with ingredient quantities, preparation instructions, meal types, and nutritional values.
- **Weekly Meal Plan (`backend/data/weekly_plan.csv` & `etc/data/weekly_plan.csv`)**: Canonical 35-slot weekly meal schedule (Pre-Breakfast, Breakfast, Lunch, Snack, Dinner).

### How Seeding Works

1. **Automatic on Docker Startup**:
   When launching via `docker compose up`, the backend service checks if the PostgreSQL database contains records. If empty, the FastAPI startup lifecycle automatically executes `backend.seed.run_seed()`, populates all tables, and sets PostgreSQL primary key sequences to `MAX(id) + 1`.

2. **Data Preservation**:
   On subsequent container restarts, seeding is skipped if records already exist, preserving user modifications.

3. **Force Reseeding**:
   To reset or refresh the database with the latest seed files at any time:
   ```bash
   # Option A: Force reseed in the running container
   docker compose exec backend python -m backend.seed --force

   # Option B: Launch with the FORCE_SEED flag
   FORCE_SEED=true docker compose up

   # Option C: Recreate the volume completely
   docker compose down -v && docker compose up
   ```

4. **Standalone Local Seeding (without Docker)**:
   Ensure your PostgreSQL instance is running and `DATABASE_URL` is configured, then run:
   ```bash
   python -m backend.seed
   # Or to force reseed:
   python -m backend.seed --force
   ```

5. **Frontend Standalone Seeding**:
   The web application is also pre-seeded with the full dataset in `src/data/ingredients.ts` and `src/data/recipes.ts` (re-exported via `src/constants.ts`), allowing the UI to function standalone during local frontend development (`npm run dev`).

