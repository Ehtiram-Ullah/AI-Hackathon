# backend/llm.py
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.output_parsers import PydanticOutputParser
from pydantic import BaseModel, Field
from typing import Literal
import asyncio

class MCQ(BaseModel):
    question: str = Field(description="The multiple-choice question")
    option_A: str = Field(description="Option A")
    option_B: str = Field(description="Option B")
    option_C: str = Field(description="Option C")
    option_D: str = Field(description="Option D")
    answer: Literal["A", "B", "C", "D"] = Field(description="Correct answer: A, B, C, or D")
    explanation: str = Field(description="One-sentence explanation of the correct answer")

parser = PydanticOutputParser(pydantic_object=MCQ)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant that generates exactly one school-level multiple-choice question (MCQ) on a given topic. "
               "Include 4 options (A, B, C, D), mark the correct answer, and provide a one-sentence explanation.\n{format_instructions}"),
    ("human", "Topic: {topic}")
])

llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    google_api_key="AIzaSyD3p7Ygc0TJAFwhkBTE-cSgZn9HOWoXP5g",
    temperature=0.7,
    convert_system_prompt_to_human=True
)

chain = prompt | llm | parser

async def generate_mcq(topic: str) -> MCQ:
    result = await chain.ainvoke({
        "topic": topic,
        "format_instructions": parser.get_format_instructions()
    })
    return result
