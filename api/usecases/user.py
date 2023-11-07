from decouple import config
from fastapi import HTTPException
from settings.auth_utils import AuthJwtCsft
from repositories.user import UserRepository
from sqlalchemy.orm import Session

auth = AuthJwtCsft()

def user_serializer(user) -> dict:
    return {
        "id": str(user["_id"]),
        "email": user["email"],
    }


class UserUseCase:
    def __init__(self, session: Session):
        self.session = session

    async def db_signup(self, data: dict) -> dict:
        email = data.get("email")
        password = data.get("password")

        overlap_user = await UserRepository(session=self.session).find_user_by_email(email=email)
        if overlap_user:
            raise HTTPException(status_code=400, detail='Email is already taken')

        if not password or len(password) < 6:
            raise HTTPException(status_code=400, detail='Password is too short')

        user = await UserRepository(session=self.session).insert_user(user_data=data)
        new_user = await UserRepository(session=self.session).find_user_by_id(id=user.id)
        return user_serializer(new_user)

    async def db_login(self, data: dict) -> str:
        email = data.get("email")
        password = data.get("password")
        user = await UserRepository(session=self.session).find_user_by_email(email=email)
        if not user or not auth.verify_pw(password, user["password"]):
            raise HTTPException(
                status_code=401, detail='Invalid email or password')
        token = auth.encode_jwt(user['email'])
        return token