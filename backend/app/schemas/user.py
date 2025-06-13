from typing import Optional
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field

class UserBase(BaseModel):
    """Базовая схема пользователя"""
    email: EmailStr
    username: str = Field(..., min_length=3, max_length=50)
    is_active: bool = True

class UserCreate(UserBase):
    """Схема для создания пользователя"""
    password: str = Field(..., min_length=6)

class UserUpdate(BaseModel):
    """Схема для обновления пользователя"""
    email: Optional[EmailStr] = None
    username: Optional[str] = Field(None, min_length=3, max_length=50)
    password: Optional[str] = Field(None, min_length=6)
    is_active: Optional[bool] = None

class User(UserBase):
    """Схема пользователя"""
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class UserInDB(UserBase):
    hashed_password: str
