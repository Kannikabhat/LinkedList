# embed_generator.py
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import pickle
import os

MODEL_NAME = "all-MiniLM-L6-v2"  # good speed/quality
BATCH_SIZE = 64

def generate_embeddings(chunk_file, index_dir):
    os.makedirs(index_dir, exist_ok=True)
    with open(chunk_file, "rb") as f:
        chunks = pickle.load(f)

    model = SentenceTransformer(MODEL_NAME)
    embeddings = model.encode(chunks, show_progress_bar=True, convert_to_numpy=True, batch_size=BATCH_SIZE)
    # normalize for cosine with inner product
    norms = np.linalg.norm(embeddings, axis=1, keepdims=True)
    norms[norms == 0] = 1e-9
    embeddings = embeddings / norms

    dim = embeddings.shape[1]
    index = faiss.IndexFlatIP(dim)  # inner product on normalized => cosine
    index.add(np.array(embeddings).astype('float32'))

    # save index and supporting files
    faiss.write_index(index, os.path.join(index_dir, "faiss_index.index"))
    np.save(os.path.join(index_dir, "embeddings.npy"), embeddings)
    with open(os.path.join(index_dir, "chunk_metadata.pkl"), "wb") as f:
        pickle.dump(chunks, f)

    print(f"Saved index to {index_dir}")

if __name__ == "__main__":
    generate_embeddings(
        chunk_file="chunks/master_chunks.pkl",
        index_dir="embeddings"
    )
