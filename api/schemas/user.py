from datetime import datetime
from pydantic import BaseModel, Field

class UserBase(BaseModel):
    name: str
    score: int = Field(default=0)

class User(UserBase):
    email: str
    password: str

class LoginUser(BaseModel):
    email: str
    password: str

class UserOrm(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes=True