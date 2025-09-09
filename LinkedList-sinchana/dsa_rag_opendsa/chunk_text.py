import re
import pickle

def chunk_text(input_path, output_path, chunk_size=4):
    with open(input_path, 'r', encoding='utf-8') as f:
        text = f.read()

    sentences = re.split(r'(?<=[.!?])\s+', text)
    chunks = []
    for i in range(0, len(sentences), chunk_size):
        chunk = " ".join(sentences[i:i+chunk_size])
        chunks.append(chunk.strip())

    with open(output_path, 'wb') as f:
        pickle.dump(chunks, f)

if __name__ == "__main__":
    chunk_text(
        input_path="dsa_rag_opendsa/data/textbook_clean.txt",
        output_path="dsa_rag_opendsa/chunks/textbook_chunks.pkl"
    )
