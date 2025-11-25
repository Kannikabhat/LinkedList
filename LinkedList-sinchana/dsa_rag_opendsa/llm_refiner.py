# llm_refiner.py
from transformers import pipeline

MODEL_NAME = "google/flan-t5-base"   # better output
MAX_GEN_TOKENS = 100

qa_pipeline = pipeline(
    "text2text-generation",
    model=MODEL_NAME,
    device=-1  # CPU
)

def generate_refined_answer(question, context, max_new_tokens=MAX_GEN_TOKENS):
    prompt = f"""
You are a highly knowledgeable DSA tutor.
Using ONLY the context below, write a clear and complete explanation for the question.

Rules:
- 4 to 6 sentences
- beginner-friendly
- define the term clearly
- include how it works
- do NOT be vague
- do NOT output one-line answers
- Be clear and beginner friendly
- Do NOT add code
- Do NOT add extra topics
- Only answer the exact question


Context:
{context}

Question: {question}

Answer:
"""

    result = qa_pipeline(prompt, max_new_tokens=max_new_tokens, do_sample=False)
    return result[0]["generated_text"].strip()
