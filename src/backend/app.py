# backend/app.py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import json
import typing_extensions as typing
from google.genai.types import GenerateContentConfig

# ---------------------------
# ⚙️ FastAPI Setup
# ---------------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow frontend access
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------
# 🧠 Gemini Config
# ---------------------------
API_KEY = "AIzaSy..."  # <-- replace with your actual key
client = genai.Client(api_key=API_KEY)

# Define schema for structured output
class MCQ_Schema(typing.TypedDict):
    question: str
    option_A: str
    option_B: str
    option_C: str
    option_D: str
    answer: typing.Literal["A", "B", "C", "D"]
    explanation: str


# ---------------------------
# 🚀 Routes
# ---------------------------

@app.get("/")
def home():
    return {"message": "Backend is running!"}


@app.post("/predict")
async def predict(request: Request):
    """Generate an MCQ based on topic sent from frontend."""
    data = await request.json()
    topic = data.get("topic", "Pakistan Studies — Independence Movement")

    # Create prompt dynamically from frontend topic
    prompt = f"""
    Generate one unique multiple-choice question about the topic: "{topic}".
    - Provide exactly 4 options for A), B), C), D).
    - The answer must be one of A, B, C, or D.
    - Add a one-sentence explanation for the correct answer.
    - Keep language simple and school-level.
    """

    # Configure the model to enforce JSON output
    config = GenerateContentConfig(
        response_mime_type="application/json",
        response_schema=MCQ_Schema,
    )

    # Generate structured output
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[prompt],
        config=config,
    )

    # Parse the response text as JSON
    try:
        json_output = json.loads(response.text)
        return json_output  # directly return to frontend
    except json.JSONDecodeError:
        return {"error": "Could not decode model output", "raw": response.text}
