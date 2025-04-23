# 🐝 Ask Buzz – GT Calendar Assistant

A full-stack web application that aggregates Georgia Tech calendar events, provides intelligent search and summaries using LLMs, and offers a modern, responsive frontend.

---

## 🗂️ Project Structure
```
cs4675-project/
├── frontend/      # React + Vite web client
├── llm_proxy/     # Python (OpenAI) Lambda backend
├── scraping/      # Event scraper & feed generator
├── README.md      # This file
```

---

## 📦 Submodules
- **frontend/** – User-facing React app ([details](frontend/README.md))
- **llm_proxy/** – LLM-powered backend API ([details](llm_proxy/README.md))
- **scraping/** – Event feed scraper ([details](scraping/README.md))

---

## 🚀 Quick Start

### 1. Install Dependencies
Navigate to the project directory and run:
```bash
npm install
```

### 2. Run the Frontend
Navigate to the `frontend` directory and start the development server:
```bash
cd frontend
npm run dev
```
Open [localhost:5173](http://localhost:5173) in your browser to access Ask Buzz!

For backend and scraping setup, see the respective submodule README files.

---