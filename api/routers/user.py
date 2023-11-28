from typing import List
from fastapi import APIRouter, Response, Request, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from sqlalchemy import select
from sqlalchemy.orm import Session
from logger.logger_config import get_logger

from models.user import User
from schemas.user import User as UserCreate, UserOrm, LoginUser
from schemas.csrf import SuccessMsg, UserInfo, Csrf
from settings.auth_utils import AuthJwtCsrf
from fastapi_csrf_protect import CsrfProtect
from usecases.user import UserUseCase

from setting import get_db

logger = get_logger(__name__)
router = APIRouter()
auth = AuthJwtCsrf()

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
    new_user = await UserUseCase(session=session).db_signup(data=user)
    return UserOrm(
        name=new_user.get("name"),
        email=new_user.get("email"),
    )

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
    token = UserUseCase(session=session).db_login(data=user)
    response.set_cookie(
        key="access_token", value=f"Bearer {token}", httponly=True, samesite="none", secure=True)
    return {"message": "Successfully logged-in"}


@router.post("/logout", response_model=SuccessMsg)
def logout(request: Request, response: Response, csrf_protect: CsrfProtect = Depends()):
    csrf_token = csrf_protect.get_csrf_from_headers(request.headers)
    csrf_protect.validate_csrf(csrf_token)
    response.set_cookie(key="access_token", value="", httponly=True, samesite="none", secure=True)
    return {'message': 'Successfully logged-out.'}

@router.get("/user", response_model=UserInfo)
def get_user_refresh_jwt(
        request: Request,
        response: Response,
        session: Session = Depends(get_db)):
    new_token, subject = auth.verify_update_jwt(request)
    response.set_cookie(
            key="access_token", value=f"Bearer {new_token}", httponly=True, samesite="none", secure=True)
    # current_userの取得
    current_user = UserUseCase(session=session).get_current_user(email=subject)

    return {'id': current_user.id, 'name': current_user.name, 'score': current_user.score}

@router.put("/users/{user_id}/score")
def update_score(request: Request,
                 response: Response,
                 user_id: int,
                 score: int,
                 csrf_protect: CsrfProtect = Depends()):
    new_token = auth.verify_csrf_update_jwt(
        request, csrf_protect, request.headers)
    update_user = UserUseCase(session=self.session).update_score(user_id=user_id, score=score)
    response.set_cookie(
        key="access_token", value=f"Bearer {new_token}", httponly=True, samesite="none", secure=True)
    if update_user:
        return update_user
    raise HTTPException(
        status_code=404, detail="Update score failed")