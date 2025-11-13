# dsa_rag_opendsa/extract_and_clean.py
import pdfplumber
import re
from pathlib import Path

def extract_text_from_pdf(pdf_path, output_txt):
    pdf_path = Path(pdf_path)
    text_parts = []
    with pdfplumber.open(str(pdf_path)) as pdf:
        for i, page in enumerate(pdf.pages, start=1):
            page_text = page.extract_text()
            if not page_text:
                continue
            # Basic preprocessing - collapse multiple spaces, strip weird hyphenations
            page_text = page_text.replace("-\n", "")  # join hyphenated words at line breaks
            page_text = re.sub(r'\n+', '\n', page_text)
            text_parts.append(f"<PAGE {i}>\n" + page_text.strip() + "\n")
    with open(output_txt, "w", encoding="utf-8") as f:
        f.write("\n".join(text_parts))

def clean_text(input_path, output_path):
    lines = []
    with open(input_path, "r", encoding="utf-8") as f:
        for line in f:
            s = line.strip()
            # remove lines that are too short or numeric page numbers or chapter headings
            if not s:
                continue
            if s.isdigit():
                continue
            if len(s) < 3:
                continue
            if s.lower().startswith("chapter") or re.match(r'^page\s*\d+', s.lower()):
                continue
            lines.append(s)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

if __name__ == "__main__":
    import argparse
    p = argparse.ArgumentParser()
    p.add_argument("--pdf", default="dsa_rag_opendsa/data/textbook.pdf")
    p.add_argument("--raw", default="dsa_rag_opendsa/data/textbook_raw.txt")
    p.add_argument("--clean", default="dsa_rag_opendsa/data/textbook_clean.txt")
    args = p.parse_args()
    extract_text_from_pdf(args.pdf, args.raw)
    clean_text(args.raw, args.clean)
    print("Extracted & cleaned.")
