# scrape_wikipedia.py
import requests
from bs4 import BeautifulSoup

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
}

def scrape_wikipedia_page(title: str, output_path: str):
    url = f"https://en.wikipedia.org/wiki/{title}"
    print(f"Scraping Wikipedia: {url}")

    response = requests.get(url, headers=HEADERS, timeout=10)

    if response.status_code != 200:
        print("Status code:", response.status_code)
        print(response.text[:500])
        raise Exception(f"Failed to fetch: {url}")

    soup = BeautifulSoup(response.text, "html.parser")
    content = soup.find("div", {"id": "mw-content-text"})

    paragraphs = content.find_all("p")
    text = ""

    for p in paragraphs:
        cleaned = p.get_text().strip()
        if cleaned:
            text += cleaned + "\n"

    # Ensure folder exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(text)

    print(f"Saved → {output_path}")


if __name__ == "__main__":
    import os

    scrape_wikipedia_page(
        title="Linked_list",
        output_path="data/wikipedia_linked_list.txt"
    )

    scrape_wikipedia_page(
        title="Hash_function",
        output_path="data/wikipedia_hashing.txt"
    )

    scrape_wikipedia_page(
        title="Turing_machine",
        output_path="data/wikipedia_turing_machine.txt"
    )
    scrape_wikipedia_page(
        title="Array_(data_structure)",
        output_path="data/wikipedia_array.txt"
    )