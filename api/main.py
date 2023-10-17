from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import user

app = FastAPI()

# TODO: URLは環境変数として管理するよう修正
origins = [
  "https://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)

@app.get("/hello")
async def hello():
    return {"message": "hello!!"}
