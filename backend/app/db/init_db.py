from sqlalchemy import inspect
from sqlalchemy.engine import Connection, Inspector
from app.db.base import Base
from app.db.session import engine
from app.core.config import get_settings

settings = get_settings()

# Определяем синхронную вспомогательную функцию для использования run_sync
def _get_table_names_sync(sync_conn: Connection) -> list[str]:
    """Вспомогательная функция для получения имен таблиц из синхронного соединения."""
    inspector: Inspector = inspect(sync_conn)
    return inspector.get_table_names()

async def init_db() -> None:
    """Инициализация базы данных"""
    existing_tables: list[str] = []
    async with engine.connect() as conn:
        # Передаем синхронную вспомогательную функцию в run_sync.
        # run_sync неявно передаст синхронное соединение в _get_table_names_sync.
        existing_tables = await conn.run_sync(_get_table_names_sync)

    # Создаем таблицы, если их нет
    if not existing_tables:
        async with engine.begin() as conn_for_ddl:
            await conn_for_ddl.run_sync(Base.metadata.create_all)
            print("База данных инициализирована")
    else:
        print("Таблицы уже существуют, пропускаем создание")
