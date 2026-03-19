import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from .database import Base, async_session, engine
from .routers import ingredients, recipes, weekly_plan

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup: create tables and seed data."""
    logger.info("Starting up — creating tables and seeding data...")

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # Seed data on startup if DB is empty
    try:
        from .seed import run_seed

        await run_seed()
    except Exception as e:
        logger.error(f"Seeding failed: {e}")

    yield

    logger.info("Shutting down...")
    await engine.dispose()


app = FastAPI(
    title="Kitchen Table API",
    description="API for the AI Meal Planner — Kitchen Table",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS — allow frontend origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount routers
app.include_router(ingredients.router)
app.include_router(recipes.router)
app.include_router(weekly_plan.router)


@app.get("/api/health")
async def health_check():
    """Health check endpoint for Docker / load balancers."""
    try:
        async with async_session() as session:
            await session.execute(text("SELECT 1"))
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "database": str(e)}
