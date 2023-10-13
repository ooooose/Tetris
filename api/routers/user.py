from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from models.user import User
from schemas.user import User as UserCreate, UserOrm

from setting import get_db

router = APIRouter()

@router.get('/ranking')
async def get_ranking():
    return {"message": "ranking!!"}