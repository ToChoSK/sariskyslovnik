import csv
import json
import re
import unicodedata
from collections import defaultdict, Counter

INPUT_FILE = "slovnik.csv"
OUTPUT_FILE = "slovnik.json"

# Voliteľné: skratky/poznámky, ktoré chceš z textu odstraňovať
LABELS_TO_REMOVE = [
    "expr.", "zast.", "náreč.", "pren.", "hanl.", "pejor.", "kniž."
]


def strip_diacritics(text: str) -> str:
    normalized = unicodedata.normalize("NFD", text)
    return "".join(ch for ch in normalized if unicodedata.category(ch) != "Mn")


def remove_known_labels(text: str) -> str:
    for label in LABELS_TO_REMOVE:
        text = text.replace(label, "")
    return re.sub(r"\s+", " ", text).strip()


def base_clean(text: str) -> str:
    if text is None:
        return ""

    text = str(text).strip().strip(";").strip()

    # whitespace normalizácia
    text = text.replace("\u00A0", " ")
    text = text.replace("\t", " ")
    text = text.replace("\n", " ")
    text = text.replace("\r", " ")

    # odstránenie úvodzoviek
    text = re.sub(r'[\"„“”\'«»]', '', text)

    # odstránenie zátvoriek, ale ponechanie obsahu
    text = re.sub(r'[\(\)\[\]\{\}]', '', text)

    # odstránenie pomocného '='
    text = text.replace("=", "")

    # zjednotenie pomlčiek
    text = text.replace("–", "-").replace("—", "-")

    # odstránenie známych skratiek/labelov
    text = remove_known_labels(text)

    # zjednotenie medzier
    text = re.sub(r'\s+', ' ', text).strip()

    return text


def normalize_visible_text(text: str) -> str:
    text = base_clean(text)

    # odstráni len okrajovú interpunkciu
    text = re.sub(r'^[,.:;!?/\\\-]+', '', text)
    text = re.sub(r'[,.:;!?/\\\-]+$', '', text)

    text = re.sub(r'\s+', ' ', text).strip()
    return text


def normalize_key(text: str) -> str:
    text = normalize_visible_text(text)
    text = text.lower()
    text = strip_diacritics(text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text


def has_diacritics(text: str) -> bool:
    return strip_diacritics(text) != text


def split_slovak_meanings(text: str) -> list[str]:
    parts = [normalize_visible_text(part) for part in text.split(",")]
    return [part for part in parts if part]


def slugify(text: str) -> str:
    text = normalize_visible_text(text)
    text = text.lower()
    text = strip_diacritics(text)
    text = re.sub(r"\s+", "-", text)
    text = re.sub(r"[^a-z0-9\-]", "", text)
    text = re.sub(r"-{2,}", "-", text).strip("-")
    return text


def choose_canonical_form(forms_counter: Counter) -> str:
    forms = list(forms_counter.items())

    forms.sort(
        key=lambda item: (
            -item[1],                         # najčastejší výskyt
            -int(has_diacritics(item[0])),    # preferuj diakritiku
            item[0] != item[0].lower(),       # preferuj lowercase
            item[0].lower()
        )
    )

    return normalize_visible_text(forms[0][0].lower())


def make_unique_urls(items: list[dict]) -> list[dict]:
    used = defaultdict(int)

    for item in items:
        base_url = item["url"]
        used[base_url] += 1

        if used[base_url] == 1:
            continue

        item["url"] = f"{base_url}-{used[base_url]}"

    return items


def main():
    # normalizovaný slovenský kľúč -> množina šarišských slov
    slovak_to_saris = defaultdict(set)

    # normalizovaný slovenský kľúč -> počty pôvodných slovenských foriem
    slovak_forms = defaultdict(Counter)

    with open(INPUT_FILE, "r", encoding="utf-8", newline="") as f:
        reader = csv.reader(f, delimiter=";")

        for row_num, row in enumerate(reader, start=1):
            if len(row) < 2:
                continue

            saris_word = normalize_visible_text(row[0])
            slovak_text = normalize_visible_text(row[1])

            if not saris_word or not slovak_text:
                continue

            slovak_words = split_slovak_meanings(slovak_text)

            for slovak_word in slovak_words:
                slovak_word = normalize_visible_text(slovak_word)
                norm_key = normalize_key(slovak_word)

                if not norm_key:
                    continue

                slovak_to_saris[norm_key].add(saris_word)
                slovak_forms[norm_key][slovak_word] += 1

    result = []

    for norm_key in sorted(slovak_to_saris.keys()):
        canonical_slovak = choose_canonical_form(slovak_forms[norm_key])

        result.append({
            "url": slugify(canonical_slovak),
            "slovenske": canonical_slovak,
            "sariske": sorted(slovak_to_saris[norm_key])
        })

    result = make_unique_urls(result)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    print(f"Hotovo. Výstup uložený do: {OUTPUT_FILE}")
    print(f"Počet slovenských hesiel: {len(result)}")


if __name__ == "__main__":
    main()