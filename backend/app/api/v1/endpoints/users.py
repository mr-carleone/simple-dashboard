from typing import List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from app.db.session import get_db
from app.models.user import User
from app.schemas.user import User as UserSchema
from app.schemas.user import UserCreate, UserUpdate

router = APIRouter()

@router.get("/", response_model=List[UserSchema])
async def get_users(
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100
) -> List[User]:
    """Получить список пользователей"""
    result = await db.execute(select(User).offset(skip).limit(limit))
    users = result.scalars().all()
    return users

@router.get("/{user_id}", response_model=UserSchema)
async def get_user(
    user_id: int,
    db: AsyncSession = Depends(get_db)
) -> User:
    """Получить пользователя по ID"""
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/", response_model=UserSchema)
async def create_user(
    user: UserCreate,
    db: AsyncSession = Depends(get_db)
) -> User:
    """Создать нового пользователя"""
    # Проверяем, существует ли пользователь с таким email
    result = await db.execute(select(User).where(User.email == user.email))
    if result.scalar_one_or_none():
        raise HTTPException(
            status_code=400,
            detail="User with this email already exists"
        )

    # Проверяем, существует ли пользователь с таким username
    result = await db.execute(select(User).where(User.username == user.username))
    if result.scalar_one_or_none():
        raise HTTPException(
            status_code=400,
            detail="User with this username already exists"
        )

    try:
        db_user = User(
            email=user.email,
            username=user.username,
            hashed_password="hashed_" + user.password,  # TODO: Add proper password hashing
            is_active=True
        )
        db.add(db_user)
        await db.commit()
        await db.refresh(db_user)
        return db_user
    except IntegrityError:
        await db.rollback()
        raise HTTPException(
            status_code=400,
            detail="User creation failed"
        )

@router.put("/{user_id}", response_model=UserSchema)
async def update_user(
    user_id: int,
    user: UserUpdate,
    db: AsyncSession = Depends(get_db)
) -> User:
    """Обновить пользователя"""
    result = await db.execute(select(User).where(User.id == user_id))
    db_user = result.scalar_one_or_none()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    update_data = user.model_dump(exclude_unset=True)
    if "password" in update_data:
        update_data["hashed_password"] = "hashed_" + update_data.pop("password")

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
    result = await db.execute(select(User).where(User.id == user_id))
    db_user = result.scalar_one_or_none()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    await db.delete(db_user)
    await db.commit()
    return {"message": "User deleted successfully"}
