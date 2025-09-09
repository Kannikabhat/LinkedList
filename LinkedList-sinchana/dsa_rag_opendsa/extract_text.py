import pdfplumber

def extract_text_from_pdf(pdf_path, output_txt):
    with pdfplumber.open(pdf_path) as pdf:
        text = ''
        for page in pdf.pages:
            text += page.extract_text() + '\n'
    with open(output_txt, 'w', encoding='utf-8') as f:
        f.write(text)

if __name__ == "__main__":
    extract_text_from_pdf(
        pdf_path="dsa_rag_opendsa/data/textbook.pdf",
        output_txt="dsa_rag_opendsa/data/textbook_raw.txt"
    )
