from typing import List
from fastapi import APIRouter, Response, Request, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from models.user import User
from schemas.user import User as UserCreate, UserOrm, LoginUser
from schemas.csrf import SuccessMsg, UserInfo, Csrf
from settings.auth_utils import AuthJwtCsft
from fastapi_csrf_protect import CsrfProtect
from usecases.user import UserUseCase

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

@router.get("/csrf-token", response_model=Csrf)
def get_csrf_token(csrf_protect: CsrfProtect = Depends()):
    csrf_token = csrf_protect.generate_csrf()
    res = {'csrf_token': csrf_token}
    print(res)
    return res

@router.post("/register", response_model=UserOrm)
async def signup(
        request: Request,
        user: UserCreate,
        csrf_protect: CsrfProtect = Depends(),
        session: Session = Depends(get_db)):
    csrf_token = csrf_protect.get_csrf_from_headers(request.headers)
    csrf_protect.validate_csrf(csrf_token)
    user = jsonable_encoder(user)
    print(user)
    new_user = await UserUseCase(session=session).db_signup(data=user)
    print(new_user)
    return new_user

@router.post("/login", response_model=SuccessMsg)
async def login(
        request: Request,
        response: Response,
        user: LoginUser,
        csrf_protect: CsrfProtect = Depends(),
        session: Session = Depends(get_db)):
    csrf_token = csrf_protect.get_csrf_from_headers(request.headers)
    csrf_protect.validate_csrf(csrf_token)
    user = jsonable_encoder(user)
    token = await UserUseCase(session=session).db_login(data=user)
    response.set_cookie(
        key="access_token", value=f"Bearer {token}", httponly=True, samesite="none", secure=True)
    return {"message": "Successfully logged-in"}


@router.post("/logout", response_model=SuccessMsg)
def logout(request: Request, response: Response, csrf_protect: CsrfProtect = Depends()):
    csrf_token = csrf_protect.get_csrf_from_headers(request.headers)
    csrf_protect.validate_csrf(csrf_token)
    response.set_cookie(key="access_token", value="", httponly=True, samesite="none", secure=True)
    return {'message': 'Successfully logged-out.'}

@router.get("/api/user", response_model=UserInfo)
def get_user_refresh_jwt(request: Request,  response: Response):
    new_token, subject = auth.verify_update_jwt(request)
    response.set_cookie(
            key="access_token", value=f"Bearer {new_token}", httponly=True, samesite="none", secure=True)
    return {'email': subject}