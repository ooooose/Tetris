from datetime import datetime
from pydantic import BaseModel, Field

class UserBase(BaseModel):
    name: str
    score: int = Field(default=0)

class User(UserBase):
    pass

class UserOrm(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode=True