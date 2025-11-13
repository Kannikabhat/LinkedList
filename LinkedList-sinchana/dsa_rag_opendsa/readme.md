# 📘 DSA Tutor – Retrieval Augmented Generation (RAG) System

A high-accuracy **Retrieval-Augmented Generation (RAG)** backend that answers **Data Structures & Algorithms (DSA)** questions using:

- Textbook: *Data Structures in C and C++ — Langsam, Augenstein & Tenenbaum*
- Dense embeddings (FAISS)
- Sparse search (BM25)
- Cross-encoder reranking
- Local / OpenAI / Gemini LLM backend

This powers a chatbot that can answer questions about **linked lists, hashing, searching, sorting, trees**, and more.

---

# 🛠️ Installation (Windows)

## 1️⃣ Create virtual environmen

```powershell
python -m venv venv
2️⃣ Activate venv

.\venv\Scripts\Activate.ps1
If you get script execution disabled:


Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Activate again.

3️⃣ Install dependencies

pip install -r requirements.txt
🔑 Environment Setup (.env)
Create file:

dsa_rag_opendsa/.env
Choose ONE backend:

✔️ OpenAI (recommended)
ini
Copy code
LLM_BACKEND=openai
OPENAI_API_KEY=your_key_here
✔️ Gemini
ini
Copy code
LLM_BACKEND=gemini
GEMINI_API_KEY=your_key_here
✔️ Local (no API key)

LLM_BACKEND=local
📘 Data Pipeline
(Run ALL commands from project root: LinkedList-sinchana/)

1️⃣ Extract PDF → Raw Text → Clean Text
python -m dsa_rag_opendsa.extract_and_clean --pdf dsa_rag_opendsa/data/textbook.pdf --raw dsa_rag_opendsa/data/textbook_raw.txt --clean dsa_rag_opendsa/data/textbook_clean.txt
2️⃣ Chunk the cleaned text
python -m dsa_rag_opendsa.chunker --input dsa_rag_opendsa/data/textbook_clean.txt --output dsa_rag_opendsa/chunks/textbook_chunks.pkl
3️⃣ Build FAISS dense embeddings
python -m dsa_rag_opendsa.embedder_and_index --chunks dsa_rag_opendsa/chunks/textbook_chunks.pkl
Creates:

embeddings/faiss_index.index  
embeddings/chunk_metadata.pkl
4️⃣ Build BM25 sparse index

python -m dsa_rag_opendsa.bm25_index --chunks dsa_rag_opendsa/chunks/textbook_chunks.pkl --out dsa_rag_opendsa/embeddings/bm25.pkl
🚀 Run the API Server

python -m dsa_rag_opendsa.api_app
Server starts at:

http://127.0.0.1:8000
🧪 Testing the API
✔️ Using Postman
Method: POST

URL: http://127.0.0.1:8000/chat

Headers:

Content-Type: application/json
Body:

{
  "question": "How does insertion work in a singly linked list?"
}
✔️ Using curl

curl -X POST "http://127.0.0.1:8000/chat" ^
     -H "Content-Type: application/json" ^
     -d "{\"question\":\"Explain hashing with chaining\"}"
🧹 .gitignore (Recommended)

# Virtual environments
venv/
*/venv/

# API keys
.env
*/.env

# Python cache
__pycache__/
*.pyc

# Auto-generated indexes
dsa_rag_opendsa/chunks/
dsa_rag_opendsa/embeddings/


---
