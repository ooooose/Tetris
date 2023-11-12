from fastapi import HTTPException
from typing import Union
from models.user import User
from schemas.user import UserOrm, LoginUser
from sqlalchemy import select
from sqlalchemy.orm import Session

class UserRepository:
    def __init__(self, session: Session):
        self.session = session

    def find_user_by_email(self, email: str) -> Union[UserOrm, None]:
        """
        emailと一致するUserモデルのインスタンスを返す
        """
        try:
            user = self.session.scalar(select(User).where(User.email == email))
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
        print(user_data)
        user = User(**user_data)
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