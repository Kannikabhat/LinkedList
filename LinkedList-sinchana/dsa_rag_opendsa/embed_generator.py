from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import pickle
import os

model = SentenceTransformer("all-MiniLM-L6-v2")

def generate_embeddings(chunk_file, index_dir):
    with open(chunk_file, "rb") as f:
        chunks = pickle.load(f)

    embeddings = model.encode(chunks, show_progress_bar=True)
    dim = embeddings[0].shape[0]
    index = faiss.IndexFlatL2(dim)
    index.add(np.array(embeddings))

    os.makedirs(index_dir, exist_ok=True)
    faiss.write_index(index, os.path.join(index_dir, "faiss_index.index"))
    with open(os.path.join(index_dir, "chunk_metadata.pkl"), "wb") as f:
        pickle.dump(chunks, f)

if __name__ == "__main__":
    generate_embeddings(
        chunk_file="dsa_rag_opendsa/chunks/textbook_chunks.pkl",
        index_dir="dsa_rag_opendsa/embeddings"
    )
