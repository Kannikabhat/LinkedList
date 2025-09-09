# dsa_rag_opendsa/llm_refiner.py
from transformers import pipeline

# Load a free, lightweight model from Hugging Face
qa_pipeline = pipeline("text2text-generation", model="google/flan-t5-base")

def generate_refined_answer(question, context):
    prompt = f"""You are a helpful tutor. Use the context below to answer the question.

Context:
{context}

Question: {question}
Answer:"""

    result = qa_pipeline(prompt, max_new_tokens=256, do_sample=False)
    return result[0]["generated_text"].strip()
