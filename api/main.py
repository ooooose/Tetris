from fastapi import FastAPI
from routers import user

app = FastAPI()

//TODO: URLは環境変数として管理するよう修正
origins = [
  "https://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_creditionals=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(user.router)

@app.get("/hello")
async def hello():
    return {"message": "hello!!"}
