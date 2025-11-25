# scrape_gfg.py
import requests
from bs4 import BeautifulSoup
import os

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
}

def scrape_gfg(url: str, output_path: str):
    print(f"Scraping GFG: {url}")
    response = requests.get(url, headers=HEADERS, timeout=10)

    if response.status_code != 200:
        raise Exception(f"Failed to fetch: {url}")

    soup = BeautifulSoup(response.text, "html.parser")

    # GFG articles usually inside <article> or <div class="text">
    article = soup.find("article")
    if not article:
        article = soup.find("div", {"class": "text"})
    if not article:
        article = soup

    paragraphs = article.find_all(["p", "li"])

    # Make directory if missing
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    text = ""
    for p in paragraphs:
        cleaned = p.get_text().strip()
        if cleaned:
            text += cleaned + "\n"

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(text)

    print(f"Saved → {output_path}")


if __name__ == "__main__":
    scrape_gfg(
        url="https://www.geeksforgeeks.org/data-structures/linked-list/",
        output_path="data/gfg_linked_list.txt"
    )

    scrape_gfg(
        url="https://www.geeksforgeeks.org/hashing-data-structure/",
        output_path="data/gfg_hashing.txt"
    )
