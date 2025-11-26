# combine_corpus.py
files = [
    "data/textbook_clean.txt",
    "data/wikipedia_linked_list.txt",
    "data/wikipedia_hashing.txt",
    "data/gfg_linked_list.txt",
    "data/gfg_hashing.txt",
    "data/wikipedia_turing_machine.txt",
    "data/gfg_turing_machine.txt",
    "data/wikipedia_array.txt",
    "data/gfg_array.txt",
    "data/gfg_array_guide.txt",
]

output = "data/combined_corpus.txt"
final_text = ""

for path in files:
    try:
        with open(path, "r", encoding="utf-8") as f:
            final_text += f.read() + "\n\n"
    except:
        print(f"Skipping file: {path}")

with open(output, "w", encoding="utf-8") as f:
    f.write(final_text)

print("Combined →", output)
