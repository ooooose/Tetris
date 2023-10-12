from fastapi import FastAPI
from routers import user

app = FastAPI()

app.include_router(user.router)

@app.get("/hello")
async def hello():
    return {"message": "hello!!"}
