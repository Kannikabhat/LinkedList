def clean_text(input_path, output_path):
    with open(input_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    cleaned = []
    for line in lines:
        line = line.strip()
        if line.isdigit() or line.lower().startswith("chapter") or len(line) < 3:
            continue
        cleaned.append(line)

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write("\n".join(cleaned))

if __name__ == "__main__":
    clean_text(
        input_path="dsa_rag_opendsa/data/textbook_raw.txt",
        output_path="dsa_rag_opendsa/data/textbook_clean.txt"
    )
