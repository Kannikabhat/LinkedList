# chunk_text.py
import re
import pickle

def split_sentences(text):
    # simple sentence splitter (keeps abbreviations roughly ok)
    sentences = re.split(r'(?<=[.!?])\s+', text)
    sentences = [s.strip() for s in sentences if s.strip()]
    return sentences

def chunk_text(input_path, output_path, chunk_size=4, stride=2):
    """
    chunk_size = number of sentences per chunk
    stride = overlap between chunks (e.g., 2 => 50% overlap)
    """
    with open(input_path, 'r', encoding='utf-8') as f:
        text = f.read()

    sentences = split_sentences(text)
    chunks = []
    for i in range(0, max(1, len(sentences) - chunk_size + 1), stride):
        chunk = " ".join(sentences[i:i+chunk_size]).strip()
        if len(chunk) > 20:
            chunks.append(chunk)
    # also add last tail if not covered
    if len(sentences) < chunk_size:
        chunk = " ".join(sentences).strip()
        if chunk:
            chunks = [chunk]
    elif (len(sentences) - chunk_size) % stride != 0:
        tail = " ".join(sentences[-chunk_size:]).strip()
        if tail and tail not in chunks:
            chunks.append(tail)

    with open(output_path, 'wb') as f:
        pickle.dump(chunks, f)

if __name__ == "__main__":
    chunk_text(
        input_path="data/combined_corpus.txt",
        output_path="chunks/master_chunks.pkl",
        chunk_size=4,
        stride=2
    )
