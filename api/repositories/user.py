from fastapi import HTTPException
from api.schemas.user import UserOrm
from api.schemas.user import User
from sqlalchemy import select
from sqlalchemy.orm import Session

class UserRepository:
    def __init__(self, session: Session):
        self.session = session

    def find_user_by_email(self, email: str) -> UserOrm:
        """
        emailと一致するUserモデルのインスタンスを返す
        """
        user = self.session.scalar(select(User).where(User.email == email))
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")

        return user

    def insert_user(self, user_data: User) -> UserOrm:
        """
        userを登録
        """
        user = User(**user_data.dict())
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