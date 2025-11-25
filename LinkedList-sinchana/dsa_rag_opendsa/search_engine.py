# search_engine.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import pickle
import os
from functools import lru_cache
import time
from typing import List
from fastapi.middleware.cors import CORSMiddleware

# local refiner
from llm_refiner import generate_refined_answer

EMB_DIR = "embeddings"
EMB_MODEL_NAME = "all-MiniLM-L6-v2"
TOP_K = 1
MAX_CONTEXT_CHARS = 2500  # keep prompt small

app = FastAPI(title="DSA RAG (fast)")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    question: str
    top_k: int = TOP_K

# Global holders set at startup
INDEX = None
CHUNKS = None
EMB_MODEL = None
EMBEDDINGS = None

@app.on_event("startup")
def load_index_and_model():
    global INDEX, CHUNKS, EMB_MODEL, EMBEDDINGS
    # load index
    idx_path = os.path.join(EMB_DIR, "faiss_index.index")
    meta_path = os.path.join(EMB_DIR, "chunk_metadata.pkl")
    emb_npy = os.path.join(EMB_DIR, "embeddings.npy")

    if not os.path.exists(idx_path) or not os.path.exists(meta_path) or not os.path.exists(emb_npy):
        raise RuntimeError("Embeddings/index not found. Run embed_generator.py first.")

    INDEX = faiss.read_index(idx_path)
    with open(meta_path, "rb") as f:
        CHUNKS = pickle.load(f)
    EMBEDDINGS = np.load(emb_npy)
    EMB_MODEL = SentenceTransformer(EMB_MODEL_NAME)

    # warm up encode
    _ = EMB_MODEL.encode(["warm up"], convert_to_numpy=True)

    print("Loaded index, chunks, and embedding model.")


def cosine_search(query, top_k=TOP_K):
    # encode q and normalize
    qv = EMB_MODEL.encode([query], convert_to_numpy=True)[0]
    qv = qv / (np.linalg.norm(qv) + 1e-9)
    D, I = INDEX.search(np.array([qv]).astype('float32'), top_k)
    scores = D[0].tolist()
    ids = I[0].tolist()
    return ids, scores

# small LRU cache for popular queries
@lru_cache(maxsize=1024)
def cached_retrieval(query_text: str, top_k: int):
    ids, scores = cosine_search(query_text, top_k)
    chunks = []
    for _id, _score in zip(ids, scores):
        try:
            chunks.append({"id": int(_id), "score": float(_score), "text": CHUNKS[int(_id)]})
        except Exception:
            pass
    return chunks

def build_context(chunks: List[dict], max_chars=MAX_CONTEXT_CHARS):
    # join chunks and truncate to max_chars
    pieces = []
    total = 0
    for ch in chunks:
        text = ch["text"]
        if total + len(text) > max_chars:
            remain = max_chars - total
            if remain > 32:
                pieces.append(text[:remain].rsplit(' ', 1)[0])
            break
        pieces.append(text)
        total += len(text)
    return "\n\n".join(pieces)

@app.post("/query")
def query(q: Query):
    start = time.time()
    question = q.question.strip()
    if not question:
        raise HTTPException(status_code=400, detail="Empty question")

    top_k = min(max(1, q.top_k), 10)

    # 1) retrieve (cached)
    retrieved = cached_retrieval(question, top_k)
    if len(retrieved) == 0:
        raise HTTPException(status_code=404, detail="No relevant chunks found")

    # 2) build limited context (avoid huge prompts)
    context = build_context(retrieved, max_chars=MAX_CONTEXT_CHARS)

    # 3) refine answer with LLM (fast small model). If context insufficient, llm should say so.
    answer = generate_refined_answer(question, context)

    latency = time.time() - start
    return {
        "question": question,
        "answer": answer,
        "retrieved": [{"id": r["id"], "score": r["score"], "snippet": r["text"][:200]} for r in retrieved],
        "latency_s": round(latency, 3)
    }
