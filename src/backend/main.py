# backend/main.py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from llm import generate_mcq

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Backend is running!"}

@app.post("/predict")
async def predict(request: Request):
    data = await request.json()
    topic = data.get("topic")
    if not topic:
        return {"error": "Topic is required"}
    try:
        result = await generate_mcq(topic)
        return result.dict()
    except Exception as e:
        return {"error": "Failed to generate MCQ", "details": str(e)}
