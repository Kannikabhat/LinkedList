# dsa_rag_opendsa/retriever.py
import numpy as np
import os
import pickle
from sentence_transformers import SentenceTransformer
import faiss
from dsa_rag_opendsa.config import EMB_DIR, FAISS_INDEX_PATH, CHUNK_META, EMBED_MODEL, DENSE_TOPK, BM25_TOPK, RERANK_TOPK, CROSS_ENCODER
from rank_bm25 import BM25Okapi
from sentence_transformers import CrossEncoder
from pathlib import Path

class Retriever:
    def __init__(self, embed_model=EMBED_MODEL, index_dir=EMB_DIR):
        self.model = SentenceTransformer(embed_model)
        self.index_dir = Path(index_dir)
        self.index = faiss.read_index(str(self.index_dir / "faiss_index.index"))
        with open(self.index_dir / "chunk_metadata.pkl", "rb") as f:
            self.chunks = pickle.load(f)
        # Load BM25 if available
        bm25_path = self.index_dir / "bm25.pkl"
        if bm25_path.exists():
            with open(bm25_path, "rb") as f:
                obj = pickle.load(f)
                self.bm25 = obj["bm25"]
                self.bm25_chunks = obj["chunks"]
        else:
            self.bm25 = None
        # cross-encoder reranker
        self.reranker = CrossEncoder(CROSS_ENCODER)

    def dense_search(self, query, topk=DENSE_TOPK):
        qv = self.model.encode([query], convert_to_numpy=True)
        D, I = self.index.search(np.array(qv).astype('float32'), topk)
        results = []
        for idx in I[0]:
            if idx < 0 or idx >= len(self.chunks):
                continue
            results.append(self.chunks[int(idx)])
        return results

    def bm25_search(self, query, topk=BM25_TOPK):
        if not self.bm25:
            return []
        tokenized = query.split()
        scores = self.bm25.get_scores(tokenized)
        top_idx = np.argsort(scores)[::-1][:topk]
        return [self.bm25_chunks[int(i)] for i in top_idx if scores[int(i)] > 0]

    def hybrid_search(self, query, dense_k=DENSE_TOPK, bm25_k=BM25_TOPK, rerank_k=RERANK_TOPK):
        dense = self.dense_search(query, dense_k)
        bm25 = self.bm25_search(query, bm25_k) if self.bm25 else []
        # union by chunk id
        uniq = {c["id"]: c for c in (dense + bm25)}
        candidates = list(uniq.values())
        if not candidates:
            return []
        # rerank using cross-encoder (higher = better)
        texts = [c["text"] for c in candidates]
        inputs = [[query, t] for t in texts]
        scores = self.reranker.predict(inputs)
        ranked = sorted(zip(candidates, scores), key=lambda x: x[1], reverse=True)
        top = [c for c, s in ranked[:rerank_k]]
        return top

if __name__ == "__main__":
    r = Retriever()
    q = input("Query: ")
    top = r.hybrid_search(q)
    for t in top:
        print("ID:", t["id"], "text:", t["text"][:300], "...")
