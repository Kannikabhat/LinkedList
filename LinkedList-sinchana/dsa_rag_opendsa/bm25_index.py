# dsa_rag_opendsa/bm25_index.py
import pickle
from rank_bm25 import BM25Okapi
from pathlib import Path

def build_bm25(chunk_pkl, out_path):
    with open(chunk_pkl, "rb") as f:
        chunks = pickle.load(f)
    docs = [c["text"].split() for c in chunks]
    bm25 = BM25Okapi(docs)
    with open(out_path, "wb") as f:
        pickle.dump({"bm25": bm25, "chunks": chunks}, f)
    print("BM25 saved to", out_path)
    return bm25, chunks

if __name__ == "__main__":
    import argparse
    p = argparse.ArgumentParser()
    p.add_argument("--chunks", default="dsa_rag_opendsa/chunks/textbook_chunks.pkl")
    p.add_argument("--out", default="dsa_rag_opendsa/embeddings/bm25.pkl")
    args = p.parse_args()
    build_bm25(args.chunks, args.out)
