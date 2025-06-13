from pydantic_settings import BaseSettings
from functools import lru_cache
import os
from typing import Optional

class Settings(BaseSettings):
    # Основные настройки
    PROJECT_NAME: str = "Sova API"
    VERSION: str = "1.0.0"
    API_V1_PREFIX: str = "/api/v1"
    DEBUG: bool = True

    # Настройки базы данных
    DATABASE_URL: str = "postgresql://postgres:postgres@db:5432/sova"

    # Настройки CORS
    CORS_ORIGINS: list[str] = ["http://localhost:5173"]

    # Настройки безопасности
    SECRET_KEY: Optional[str] = None
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = ".env.dev" if os.getenv("ENV") == "development" else ".env.prod"
        case_sensitive = True

@lru_cache()
def get_settings() -> Settings:
    return Settings()
