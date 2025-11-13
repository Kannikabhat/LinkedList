# dsa_rag_opendsa/api_app.py
from fastapi import FastAPI, Request
from pydantic import BaseModel
from dsa_rag_opendsa.retriever import Retriever
from dsa_rag_opendsa.generator import Generator
import uvicorn
from typing import List, Optional
from dotenv import load_dotenv
load_dotenv()

app = FastAPI()
retriever = Retriever()
generator = Generator()

class ChatRequest(BaseModel):
    question: str
    top_k: Optional[int] = 5

@app.post("/chat")
async def chat(req: ChatRequest):
    q = req.question
    # retrieve
    candidates = retriever.hybrid_search(q, rerank_k=req.top_k)
    # generate
    answer = generator.generate(q, candidates, max_tokens=256)
    # return candidate ids & snippet for transparency
    sources = [{"id": c["id"], "snippet": c["text"][:400]} for c in candidates]
    return {"answer": answer, "sources": sources}

if __name__ == "__main__":
    uvicorn.run("dsa_rag_opendsa.api_app:app", host="0.0.0.0", port=8000, reload=False)
