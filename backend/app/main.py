from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import get_settings
from app.api.v1.api import api_router
from app.api.v1.endpoints import auth
from app.db.init_db import init_db

settings = get_settings()

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Обработчик событий жизненного цикла приложения"""
    # Запуск: инициализируем базу данных, если таблицы еще не созданы
    await init_db()
    yield
    # Завершение

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    debug=settings.DEBUG,
    lifespan=lifespan
)

# Настройки CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключаем API роутеры
app.include_router(api_router, prefix=settings.API_V1_STR)
app.include_router(auth.router, prefix=settings.API_V1_STR, tags=["auth"])

@app.get("/")
async def root():
    return {"message": "Добро пожаловать в Simple Dashboard API"}
