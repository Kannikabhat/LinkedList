# dsa_rag_opendsa/chunker.py
import pickle
from dsa_rag_opendsa.token_utils import split_sentences, simple_token_count
from dsa_rag_opendsa.config import CHUNKS_PATH, MAX_TOKENS, OVERLAP_TOKENS
from pathlib import Path
from tqdm import tqdm

def chunk_text_file(input_txt, output_pkl=CHUNKS_PATH, max_tokens=MAX_TOKENS, overlap=OVERLAP_TOKENS):
    with open(input_txt, "r", encoding="utf-8") as f:
        text = f.read()

    sentences = split_sentences(text)
    chunks = []
    i = 0
    n = len(sentences)
    chunk_id = 0
    while i < n:
        cur_tokens = 0
        chunk_sents = []
        j = i
        while j < n:
            s = sentences[j]
            tcount = simple_token_count(s)
            if cur_tokens + tcount > max_tokens and len(chunk_sents) > 0:
                break
            chunk_sents.append(s)
            cur_tokens += tcount
            j += 1
        chunk_text = " ".join(chunk_sents).strip()
        if chunk_text:
            chunks.append({
                "id": chunk_id,
                "text": chunk_text,
                "start_sent": i,
                "end_sent": j-1
            })
            chunk_id += 1
        # move forward with overlap
        i = max(i + len(chunk_sents) - overlap // max(1, (max_tokens // 10)), i+1)

    # write pkl
    outdir = Path(output_pkl).parent
    outdir.mkdir(parents=True, exist_ok=True)
    with open(output_pkl, "wb") as f:
        pickle.dump(chunks, f)
    print(f"Saved {len(chunks)} chunks to {output_pkl}")
    return chunks

if __name__ == "__main__":
    import argparse
    p = argparse.ArgumentParser()
    p.add_argument("--input", default="dsa_rag_opendsa/data/textbook_clean.txt")
    p.add_argument("--output", default=str(CHUNKS_PATH))
    args = p.parse_args()
    chunk_text_file(args.input, args.output)
