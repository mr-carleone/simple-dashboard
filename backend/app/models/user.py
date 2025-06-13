from sqlalchemy import Column, Integer, String, Boolean, DateTime, func
from sqlalchemy.sql import func
from app.db.base import Base

class User(Base):
    __tablename__ = "users"

    # Роли пользователей
    ROLE_ADMIN = 'admin'
    ROLE_MODERATOR = 'moderator'
    ROLE_DEVELOPER = 'developer'
    ROLE_ARCHITECT = 'architect'
    ROLE_GUEST = 'guest'

    # Список всех ролей
    ROLES = [
        ROLE_ADMIN,
        ROLE_MODERATOR,
        ROLE_DEVELOPER,
        ROLE_ARCHITECT,
        ROLE_GUEST
    ]

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    role = Column(String, nullable=False, default=ROLE_GUEST)
    avatar_url = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
