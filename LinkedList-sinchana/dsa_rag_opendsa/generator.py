# dsa_rag_opendsa/generator.py

import os
from dsa_rag_opendsa.config import LLM_BACKEND, OPENAI_API_KEY, GEMINI_API_KEY

class Generator:
    def __init__(self, backend=LLM_BACKEND):
        self.backend = backend

        if backend == "local":
            from transformers import pipeline
            model_name = os.getenv("LOCAL_GENERATOR_MODEL", "google/flan-t5-large")
            device = 0 if self._has_gpu() else -1
            self.pipe = pipeline(
                "text2text-generation",
                model=model_name,
                device=device
            )

        elif backend == "openai":
            import openai
            openai.api_key = OPENAI_API_KEY
            self.openai = openai

        elif backend == "gemini":
            import google.generativeai as genai
            genai.configure(api_key=GEMINI_API_KEY)
            self.gemini = genai.GenerativeModel("gemini-pro")

        else:
            raise ValueError(f"Invalid LLM_BACKEND: {backend}")


    # ----------------------------
    # GPU Check
    # ----------------------------
    def _has_gpu(self):
        try:
            import torch
            return torch.cuda.is_available()
        except:
            return False


    # ----------------------------
    # BUILD PROMPT  (IMPORTANT!)
    # ----------------------------
    def build_prompt(self, question, context):
        # Build readable context
        ctx = "\n\n".join(
            [f"[Source {i+1}]\n{chunk['text']}" for i, chunk in enumerate(context)]
        )

        # STRICT tutor-style prompt
        prompt = f"""
You are a **strict DSA tutor**.

### RULES:
- Use ONLY the information in the provided context.
- If the context does not contain the answer, reply exactly: "Insufficient context."
- Keep answers SHORT, DIRECT, and ACCURATE.
- Prefer step-by-step logic when explaining linked list or hashing operations.
- Do NOT hallucinate. Do NOT add extra details.
- If code is needed, use valid C or C++ syntax.

### CONTEXT:
{ctx}

### QUESTION:
{question}

### FINAL ANSWER (concise and context-only):
"""
        return prompt


    # ----------------------------
    # GENERATE
    # ----------------------------
    def generate(self, question, context, max_tokens=256):
        prompt = self.build_prompt(question, context)

        # LOCAL MODEL (Flan-T5 etc.)
        if self.backend == "local":
            out = self.pipe(prompt, max_new_tokens=max_tokens, do_sample=False)
            return out[0]["generated_text"].strip()

        # OPENAI
        elif self.backend == "openai":
            response = self.openai.ChatCompletion.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are a helpful DSA tutor."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=max_tokens,
                temperature=0
            )
            return response["choices"][0]["message"]["content"].strip()

        # GEMINI
        elif self.backend == "gemini":
            result = self.gemini.generate_content(prompt)
            return result.text

        else:
            return "Error: Unknown LLM backend."
