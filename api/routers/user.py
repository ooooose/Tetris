from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from models.user import User
from schemas.user import User as UserCreate, UserOrm

from setting import get_db

router = APIRouter()

@router.get('/ranking', response_model=List[UserOrm])
async def get_ranking(db: Session = Depends(get_db)):
    """
    ランキングを取得するエンドポイント
    （現在は、User一覧を取得するエンドポイントとして暫定的に作成している）
    """

    users = db.scalars(select(User)).all()
    return users


@router.post('/users', response_model=UserOrm)
async def create_user(user_data: UserCreate, db: Session = Depends(get_db)):
    """
    Userを一件分作成するためのエンドポイント
    """

    user = User(**user_data.dict())
    db.add(user)
    db.commit()
    db.refresh(user)

    return user
