from typing import List, Dict, Sequence
import hashlib # Импортируем hashlib для MD5 хеширования
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.session import get_db
from app.models.user import User
from app.schemas.user import User as UserSchema, UserCreate, UserUpdate, UserInDB
from app.core.auth import get_current_user
from app.api.v1.endpoints.auth import get_password_hash

router = APIRouter()

@router.get("/me", response_model=UserSchema)
async def get_current_user_info(
    current_user: User = Depends(get_current_user)
) -> User:
    """Получить информацию о текущем пользователе"""
    return current_user

@router.get("/", response_model=List[UserInDB])
async def get_users(
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100
) -> Sequence[User]:
    """Получить список пользователей"""
    query = select(User).offset(skip).limit(limit)
    result = await db.execute(query)
    return result.scalars().all()

@router.get("/{user_id}", response_model=UserInDB)
async def get_user(
    user_id: int,
    db: AsyncSession = Depends(get_db)
) -> User:
    """Получить пользователя по ID"""
    query = select(User).where(User.id == user_id)
    result = await db.execute(query)
    user = result.scalar_one_or_none()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/", response_model=UserInDB)
async def create_user(user_in: UserCreate, db: AsyncSession = Depends(get_db)):
    """Создать нового пользователя"""
    db_user_check = await db.execute(select(User).where(User.email == user_in.email))
    if db_user_check.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = get_password_hash(user_in.password)

    # Генерируем URL Gravatar, если avatar_url не предоставлен
    avatar_url = user_in.avatar_url
    if not avatar_url:
        # Gravatar использует MD5 хеш email, обрезанный и в нижнем регистре
        email_hash = hashlib.md5(user_in.email.strip().lower().encode('utf-8')).hexdigest()
        avatar_url = f"https://www.gravatar.com/avatar/{email_hash}?d=identicon&s=128"

    db_user = User(
        email=user_in.email,
        username=user_in.username,
        hashed_password=hashed_password,
        is_active=user_in.is_active if user_in.is_active is not None else True, # Убеждаемся, что is_active корректно устанавливается
        role=user_in.role,
        avatar_url=avatar_url # Сохраняем сгенерированный или предоставленный аватар
    )
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user

@router.put("/{user_id}", response_model=UserInDB)
async def update_user(
    user_id: int,
    user_in: UserUpdate,
    db: AsyncSession = Depends(get_db)
) -> User:
    """Обновить пользователя"""
    query = select(User).where(User.id == user_id)
    result = await db.execute(query)
    db_user = result.scalar_one_or_none()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    update_data = user_in.model_dump(exclude_unset=True)
    if "password" in update_data:
        update_data["hashed_password"] = get_password_hash(update_data.pop("password"))

    # Обработка avatar_url при обновлении
    if "avatar_url" in update_data:
        if update_data["avatar_url"] == "":
            # Если пользователь явно отправил пустую строку, установить None (очистить аватар)
            update_data["avatar_url"] = None
    elif db_user.avatar_url is None and db_user.email is not None: # type: ignore # Проверяем значение email
        # Если avatar_url не был предоставлен в update_data И нет аватара в БД,
        # И у пользователя есть email, тогда генерируем аватар по умолчанию.
        email_hash = hashlib.md5(db_user.email.strip().lower().encode('utf-8')).hexdigest()
        update_data["avatar_url"] = f"https://www.gravatar.com/avatar/{email_hash}?d=identicon&s=128"

    for key, value in update_data.items():
        setattr(db_user, key, value)

    await db.commit()
    await db.refresh(db_user)
    return db_user

@router.delete("/{user_id}")
async def delete_user(
    user_id: int,
    db: AsyncSession = Depends(get_db)
) -> Dict[str, str]:
    """Удалить пользователя"""
    query = select(User).where(User.id == user_id)
    result = await db.execute(query)
    db_user = result.scalar_one_or_none()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    await db.delete(db_user)
    await db.commit()
    return {"message": "User deleted successfully"}
