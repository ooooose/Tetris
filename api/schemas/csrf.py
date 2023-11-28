from pydantic import BaseModel
from typing import Optional
from decouple import config

CSRF_KEY = config('CSRF_KEY')

class CsrfSettings(BaseModel):
    secret_key: str = CSRF_KEY

class Csrf(BaseModel):
    csrf_token: str

class UserInfo(BaseModel):
    id: Optional[int]
    name: str
    score: int

class SuccessMsg(BaseModel):
    message: str
