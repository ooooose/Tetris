from fastapi import HTTPException
from typing import Union
from models.user import User
from schemas.user import UserOrm, LoginUser
from sqlalchemy import select, desc
from sqlalchemy.orm import Session
from settings.auth_utils import AuthJwtCsrf

auth = AuthJwtCsrf()

class UserRepository:
    def __init__(self, session: Session):
        self.session = session

    def find_user_by_email(self, email: str) -> Union[UserOrm, None]:
        """
        emailと一致するUserモデルのインスタンスを返す
        """
        try:
            user =  self.session.scalar(select(User).where(User.email == email))
        except ValueError:
            user = None
        return user

    def find_user_by_id(self, id: int) -> UserOrm:
        """
        idと一致するUserモデルのインスタンスを返す
        """
        user = self.session.scalar(select(User).where(User.id == id))
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")

        return user

    def insert_user(self, user_data: dict) -> UserOrm:
        """
        userを登録
        """
        password = user_data.get('password')
        user = User(
            name=user_data.get("name"),
            email=user_data.get('email'),
            password=auth.generate_hashed_pw(password=password)
        )
        self.session.add(user)
        self.session.commit()
        self.session.refresh(user)
        return user

    def find_user_by_password(self, password: str) -> UserOrm:
        """
        passwordと一致するUserモデルのインスタンスを返す
        """
        user = self.session.scalar(select(User).where(User.password == password))
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")

        return user

    def update_user_score(self, user: User, score: int) -> UserOrm:
        user.score += score
        self.session.add(user)
        self.session.commit()
        self.session.refresh(user)

        return user

    def get_ranking_users(self) -> list[UserOrm]:
        stmt = select(User).order_by(desc(User.score)).limit(5)
        users = self.session.scalars(stmt).all()

        return users