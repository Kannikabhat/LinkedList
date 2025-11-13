# dsa_rag_opendsa/config.py
from pathlib import Path
import os

BASE = Path(__file__).resolve().parent

DATA_DIR = BASE / "data"
CHUNKS_PATH = BASE / "chunks" / "textbook_chunks.pkl"
EMB_DIR = BASE / "embeddings"
FAISS_INDEX_PATH = EMB_DIR / "faiss_index.index"
CHUNK_META = EMB_DIR / "chunk_metadata.pkl"

# chunking settings
MAX_TOKENS = 200  # chunk size (tokens)
OVERLAP_TOKENS = 20

# retrieval
DENSE_TOPK = 15
BM25_TOPK = 15
RERANK_TOPK = 2

# LLM backend: options: "local" (huggingface) or "openai" (or "gemini" etc)
LLM_BACKEND = os.getenv("LLM_BACKEND", "local")

# OpenAI/Gen API config (if you prefer)
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

# sentence-transformer model
EMBED_MODEL = "all-MiniLM-L6-v2"  # small + fast; swap for better accuracy if needed

# cross-encoder for reranking (small fast cross-encoder)
CROSS_ENCODER = "cross-encoder/ms-marco-MiniLM-L-6-v2"
