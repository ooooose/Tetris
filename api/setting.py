from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

DATABASE_URL = "mysql+aiomysql://root@db:3306/demo?charset=utf8"

# データベースエンジンを作成
engine = create_engine(DATABASE_URL)

# セッションファクトリを作成
Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# モデルを定義するための基本となるBaseクラスを作成
Base = declarative_base()

def get_db():
    db = Session()
    try:
        yield db
    finally:
        db.close()
