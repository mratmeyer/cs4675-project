# 🗂️ scraping – Event Feed Generator

`scraper.py` keeps Ask Buzz up to date by downloading and parsing official Georgia Tech RSS feeds, aggregating events across categories, and outputting a unified `feed.data` file for the backend ([llm_proxy/lambda_function.py](../llm_proxy/lambda_function.py)). Easily extensible for new feeds, it ensures event data is always fresh.

---

## ⚙️ Setup
1. **Install dependencies** (from the `scraping` directory):
   ```bash
   pip install requests feedparser beautifulsoup4
   ```

---

## 🚀 How to Run
Run the scraper (from the `scraping` directory):
```bash
python scraper.py
```

---

## 🛠️ Customization
- To add or remove feeds, edit the `feeds` dictionary at the top of `scraper.py`.
- The script is designed to be easily extensible for new event sources.

---

## 📤 Output
- Generates `feed.data` with all parsed events in a unified format for the backend to read and answer queries.

---

## 📄 Script Logic
- Fetches each RSS feed and parses all entries
- Extracts event metadata (title, date, description, etc.)
- Deduplicates events by GUID
- Logs progress and warnings for malformed feeds

---

## 🛟 Troubleshooting
- If a feed fails to parse, check your internet connection and feed URLs in `scraper.py`.
- For Python errors, ensure all dependencies are installed and using Python 3.9+.

---
See the main [README](../README.md) for project-wide details.
