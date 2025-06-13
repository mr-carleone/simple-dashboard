from datetime import datetime
from typing import Optional
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from app.db.base import Base

class User(Base):
    """Модель пользователя"""
    __tablename__ = "users"

    id: int = Column(Integer, primary_key=True, index=True)
    email: str = Column(String, unique=True, index=True)
    username: str = Column(String, unique=True, index=True)
    hashed_password: str = Column(String)
    is_active: bool = Column(Boolean, default=True)
    created_at: datetime = Column(DateTime(timezone=True), server_default=func.now())
    updated_at: Optional[datetime] = Column(DateTime(timezone=True), onupdate=func.now())
