import google.generativeai as genai
import json
import typing_extensions as typing # Required for TypedDict
from google.genai.types import GenerateContentConfig # Required for config

# Define the structure of the desired JSON output
class MCQ_Schema(typing.TypedDict):
    """Schema for a single multiple-choice question."""
    question: str
    option_A: str
    option_B: str
    option_C: str
    option_D: str
    answer: typing.Literal["A", "B", "C", "D"] # The answer must be A, B, C, or D
    explanation: str

# --- Configuration ---
# Replace "AIzaSy" with your actual API key or use an environment variable
# The client will automatically pick up the GEMINI_API_KEY environment variable.
# genai.configure(api_key="AIzaSy") # You might prefer client = genai.Client()

client = genai.Client(api_key="AIzaSy") 

# Define the prompt (can be simplified as the schema takes care of formatting)
prompt = """
Generate one unique multiple-choice question about the topic: "Pakistan Studies — Independence Movement".
- Provide exactly 4 options for A), B), C), D).
- The answer must be one of A, B, C, or D.
- Add a one-sentence explanation for the correct answer.
- Keep language simple and school-level.
"""

# Configure the model to enforce JSON output based on the schema
config = GenerateContentConfig(
    response_mime_type="application/json",
    response_schema=MCQ_Schema,
)

# Use a model that supports structured output (like gemini-2.5-flash)
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=[prompt],
    config=config,
)

# The response.text is a JSON string which can be loaded directly
try:
    json_output = json.loads(response.text)
    print(json.dumps(json_output, indent=4))
except json.JSONDecodeError as e:
    print(f"Error decoding JSON: {e}")
    print("Raw response text:", response.text)