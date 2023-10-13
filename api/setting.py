from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

DATABASE_URL = "postgresql://postgres:password@postgres-db:5432/postgres"

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
