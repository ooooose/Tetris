from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional

class UserBase(BaseModel):
    name: str
    score: int = Field(default=0)

class User(UserBase):
    email: str
    password: str

class LoginUser(BaseModel):
    email: str
    password: str

class Score(BaseModel):
    score: int

class UserOrm(UserBase):
    id: Optional[int]

    class Config:
        orm_mode = True