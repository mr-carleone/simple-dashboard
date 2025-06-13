from sqlalchemy import inspect
from sqlalchemy.engine import Connection, Inspector
from sqlalchemy import select
from app.db.base import Base
from app.db.session import engine, async_session
from app.core.config import get_settings
from app.models.user import User
from app.api.v1.endpoints.auth import get_password_hash

settings = get_settings()

# Определяем синхронную вспомогательную функцию для использования run_sync
def _get_table_names_sync(sync_conn: Connection) -> list[str]:
    """Вспомогательная функция для получения имен таблиц из синхронного соединения."""
    inspector: Inspector = inspect(sync_conn)
    return inspector.get_table_names()

async def create_initial_admin() -> None:
    """Создание начального админа при инициализации базы данных"""
    async with async_session() as session:
        # Проверяем, существует ли уже админ
        result = await session.execute(
            select(User).where(User.email == "admin@admin.com")
        )
        admin = result.scalar_one_or_none()

        if not admin:
            # Создаем админа с более сложным паролем
            admin = User(
                email="admin@admin.com",
                username="admin",
                hashed_password=get_password_hash("Admin@123!@#"),
                role="admin",
                is_active=True
            )
            session.add(admin)
            await session.commit()
            print("Админ создан")
        else:
            print("Админ уже существует")

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
            await conn_for_ddl.commit()  # Явно фиксируем создание таблиц
            print("База данных инициализирована")

            # Создаем админа после создания и фиксации таблиц
            await create_initial_admin()
    else:
        print("Таблицы уже существуют, пропускаем создание")
