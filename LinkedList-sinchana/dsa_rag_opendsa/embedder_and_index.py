# dsa_rag_opendsa/embedder_and_index.py
import os
import pickle
import numpy as np
from sentence_transformers import SentenceTransformer
import faiss
from pathlib import Path
from dsa_rag_opendsa.config import EMBED_MODEL, EMB_DIR, FAISS_INDEX_PATH, CHUNK_META
from tqdm import tqdm

EMB_DIR.mkdir(parents=True, exist_ok=True)

def generate_embeddings(chunk_file, index_dir=EMB_DIR, model_name=EMBED_MODEL, use_gpu=False):
    model = SentenceTransformer(model_name, device="cuda" if use_gpu else "cpu")

    with open(chunk_file, "rb") as f:
        chunks = pickle.load(f)

    texts = [c["text"] for c in chunks]
    print("Computing embeddings for", len(texts), "chunks...")
    embeddings = model.encode(texts, show_progress_bar=True, batch_size=64, convert_to_numpy=True)

    dim = embeddings.shape[1]
    # use HNSW Index for fast recall and low latency
    index = faiss.IndexHNSWFlat(dim, 32)  # M=32
    # normalize to use inner product if wanted; but we'll use L2 here. Normalize optional:
    # faiss.normalize_L2(embeddings)
    index.add(embeddings.astype('float32'))

    faiss.write_index(index, str(index_dir / "faiss_index.index"))
    with open(index_dir / "chunk_metadata.pkl", "wb") as f:
        pickle.dump(chunks, f)
    # Also store embeddings (optional)
    with open(index_dir / "embeddings.npy", "wb") as f:
        np.save(f, embeddings)
    print("Index and metadata saved.")

if __name__ == "__main__":
    import argparse
    p = argparse.ArgumentParser()
    p.add_argument("--chunks", default="dsa_rag_opendsa/chunks/textbook_chunks.pkl")
    args = p.parse_args()
    generate_embeddings(args.chunks)
