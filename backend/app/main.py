from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import get_settings
from app.core.logging import logger
from app.api.v1.api import api_router
from app.db.session import engine
from app.db.base import Base

settings = get_settings()

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Обработчик событий жизненного цикла приложения"""
    # Запуск
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    logger.info("Приложение запускается...")
    yield
    # Завершение
    logger.info("Приложение завершает работу...")

app = FastAPI(
    title="Simple Dashboard API",
    description="Simple Dashboard Backend API",
    version="1.0.0",
    lifespan=lifespan
)

# Настройки CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключаем API роутер
app.include_router(api_router, prefix="/api/v1")

@app.get("/")
async def root():
    logger.debug("Получен запрос к главной странице")
    return {"message": "Добро пожаловать в Simple Dashboard API"}
