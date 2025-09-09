from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import pickle
import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load .env.local to get GEMINI_API_KEY
load_dotenv(dotenv_path=".env.local")  # ensure your .env.local is in the same folder

# Get the API key
api_key = os.getenv("GEMINI_API_KEY")
if api_key is None:
    raise ValueError("GEMINI_API_KEY not found in .env.local")

# Configure Gemini
genai.configure(api_key=api_key)

# Load embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

def load_index_and_chunks(path="dsa_rag_opendsa/embeddings"):
    index = faiss.read_index(os.path.join(path, "faiss_index.index"))
    with open(os.path.join(path, "chunk_metadata.pkl"), "rb") as f:
        chunks = pickle.load(f)
    return index, chunks

def query_index(question, top_k=3):
    index, chunks = load_index_and_chunks()
    query_vec = model.encode([question])
    D, I = index.search(np.array(query_vec), top_k)
    return [chunks[i] for i in I[0]]

def ask_gemini(question, retrieved_chunks):
    # Build the context
    context = "\n\n".join(retrieved_chunks)
    prompt = f"""
    You are a helpful DSA tutor. 
    Use only the following context to answer the question.
    Be clear and concise. If the context is insufficient, say so.

    Context:
    {context}

    Question:
    {question}
    """

    # Call Gemini
    model = genai.GenerativeModel("gemini-pro")
    response = model.generate_content(prompt)
    return response.text

if __name__ == "__main__":
    q = input("Ask a question: ")
    retrieved_chunks = query_index(q, top_k=5)  # get top 5 chunks
    print("\nRetrieved chunks (for debugging):")
    for c in retrieved_chunks:
        print("-", c)

    print("\nGemini's Answer:")
    answer = ask_gemini(q, retrieved_chunks)
    print(answer)
