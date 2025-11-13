# dsa_rag_opendsa/token_utils.py
import re

def simple_token_count(text):
    # approximate tokenizer: split on whitespace and punctuation
    tokens = re.findall(r"\w+|[^\s\w]", text, flags=re.UNICODE)
    return len(tokens)

def split_sentences(text):
    import re
    sentences = re.split(r'(?<=[.!?])\s+', text)
    return [s.strip() for s in sentences if s.strip()]
