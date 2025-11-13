# 📘 DSA Tutor – Retrieval Augmented Generation (RAG) System

A high-accuracy **Retrieval-Augmented Generation (RAG)** backend that answers **Data Structures & Algorithms (DSA)** questions using:

- Textbook: *Data Structures in C and C++ — Langsam, Augenstein & Tenenbaum*
- Dense embeddings (FAISS)
- Sparse search (BM25)
- Cross-encoder reranking
- Local / OpenAI / Gemini LLM backend

This powers a chatbot that can answer questions about **linked lists, hashing, searching, sorting, trees**, and more.

---

# 📂 Project Structure

dsa_rag_opendsa/
│
├── api_app.py
├── chunker.py
├── embedder_and_index.py
├── bm25_index.py
├── retriever.py
├── generator.py
├── token_utils.py
├── extract_and_clean.py
├── config.py
├── init.py
│
├── data/
│ ├── textbook.pdf
│ ├── textbook_raw.txt
│ └── textbook_clean.txt
│
├── chunks/
└── embeddings/

---

# 🛠️ Installation (Windows)

## 1️⃣ Create virtual environment

```powershell
python -m venv venv
2️⃣ Activate venv
powershell
Copy code
.\venv\Scripts\Activate.ps1
If you get script execution disabled:

powershell
Copy code
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Activate again.

3️⃣ Install dependencies
powershell
Copy code
pip install -r requirements.txt
🔑 Environment Setup (.env)
Create file:

bash
Copy code
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
ini
Copy code
LLM_BACKEND=local
📘 Data Pipeline
(Run ALL commands from project root: LinkedList-sinchana/)

1️⃣ Extract PDF → Raw Text → Clean Text
powershell
Copy code
python -m dsa_rag_opendsa.extract_and_clean --pdf dsa_rag_opendsa/data/textbook.pdf --raw dsa_rag_opendsa/data/textbook_raw.txt --clean dsa_rag_opendsa/data/textbook_clean.txt
2️⃣ Chunk the cleaned text
powershell
Copy code
python -m dsa_rag_opendsa.chunker --input dsa_rag_opendsa/data/textbook_clean.txt --output dsa_rag_opendsa/chunks/textbook_chunks.pkl
3️⃣ Build FAISS dense embeddings
powershell
Copy code
python -m dsa_rag_opendsa.embedder_and_index --chunks dsa_rag_opendsa/chunks/textbook_chunks.pkl
Creates:

bash
Copy code
embeddings/faiss_index.index  
embeddings/chunk_metadata.pkl
4️⃣ Build BM25 sparse index
powershell
Copy code
python -m dsa_rag_opendsa.bm25_index --chunks dsa_rag_opendsa/chunks/textbook_chunks.pkl --out dsa_rag_opendsa/embeddings/bm25.pkl
🚀 Run the API Server
powershell
Copy code
python -m dsa_rag_opendsa.api_app
Server starts at:

cpp
Copy code
http://127.0.0.1:8000
🧪 Testing the API
✔️ Using Postman
Method: POST

URL: http://127.0.0.1:8000/chat

Headers:

pgsql
Copy code
Content-Type: application/json
Body:

json
Copy code
{
  "question": "How does insertion work in a singly linked list?"
}
✔️ Using curl
powershell
Copy code
curl -X POST "http://127.0.0.1:8000/chat" ^
     -H "Content-Type: application/json" ^
     -d "{\"question\":\"Explain hashing with chaining\"}"
🧹 .gitignore (Recommended)
bash
Copy code
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

# IDE configs
.vscode/
.idea/

# OS junk
.DS_Store
Thumbs.db
🔍 Troubleshooting
❌ ModuleNotFoundError: No module named dsa_rag_opendsa
✔️ You MUST run from project root:

shell
Copy code
LinkedList-sinchana>
✔️ Use module-style commands:

nginx
Copy code
python -m dsa_rag_opendsa.chunker
❌ Answers are long / incorrect
Fix:

Reduce chunk size (MAX_TOKENS=200)

Enable reranking (CROSS_ENCODER)

Use OpenAI backend instead of local

❌ PDF not found
Ensure:

bash
Copy code
dsa_rag_opendsa/data/textbook.pdf
exists.

🤝 Contributing
Pull requests welcome! Keep code modular and documented.

📜 License
MIT License

⭐ Need Frontend?
A React chatbot UI can be generated instantly.
Just ask:

arduino
Copy code
"Build frontend UI"
yaml
Copy code

---
