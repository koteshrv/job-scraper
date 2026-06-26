# Job Tracker Pro 

A self-hosted, full-stack Personal Applicant Tracking System (ATS) designed to automate job searching and streamline application workflows. Job Tracker Pro scrapes job listings from top enterprise ATS portals, helps you track your pipeline with a Kanban board, and leverages Gemini AI to generate tailored `.tex` resumes and cover letters for each specific role.

## Features

- **Automated Hybrid Job Scraper:** 
  - Uses fast JSON parsing for Lever and Greenhouse endpoints.
  - Uses a headless Playwright engine (with stealth capabilities) to bypass Web Application Firewalls (like Akamai) and scrape enterprise portals (Taleo, Workday, etc.).
  - Deduplicates jobs into a local SQLite database (`jobs.db`) to ensure you never receive duplicate alerts.
- **Kanban Application Pipeline:** A beautiful React + Vite frontend with Tailwind CSS and glassmorphism. Effortlessly drag-and-drop jobs through stages (New, Applied, Interviewing, Rejected) or perform bulk multi-select actions for fast triage.
- **AI-Tailored Resumes & Cover Letters:** Integrates with Gemini AI to generate bespoke resumes (exportable as raw `.tex` or PDF via jsPDF) and cover letters specifically tuned to the extracted job description.
- **Multi-Resume Management:** Upload and manage multiple base resumes (`.pdf` and `.tex`), and select which one to use when generating tailored applications.
- **Secure & Containerized:**
  - Full JWT authentication (username/password) to keep your pipeline secure.
  - Runs in a multi-container Docker Compose setup featuring a FastAPI backend and a Vite frontend.
- **Telegram Bot Integration:** Get batched real-time alerts for new job postings directly to your phone.

---

## 🛠️ Setup Instructions

### 1. Configure Environment
Clone this repository and set up your environment variables:
```bash
git clone <your-repo-url>
cd job-scraper
cp .env.example .env
```
Open `.env` and fill in your credentials.
- Set `APP_USERNAME` and `APP_PASSWORD` to secure your web dashboard.
- Add your `GEMINI_API_KEY` for AI resume tailoring.
- (Optional) Add your `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` if you want mobile alerts.

### 2. Build & Run
The easiest way to run both the backend and frontend is via Docker Compose:
```bash
docker-compose up -d --build
```
Alternatively, you can run the services locally using the provided script:
```bash
./start.sh
```
This will start the FastAPI Backend on `http://localhost:8000` and the Vite Frontend on `http://localhost:5173` (or `5174` if the port is busy).

### 3. Log In
Open your browser to the frontend URL (e.g., `http://localhost:5173`). 
Log in using the credentials you defined in your `.env` file.

---

## 🎯 Configuration & Targets

### `targets.json`
This file controls which companies are scraped. 
- For **Greenhouse** and **Lever**, you only need the company name and their ATS Board Token.
- For **Playwright**, you provide the search URL. The engine extracts direct job URLs or falls back to presence detection if the site structure is heavily obfuscated.

### Search Settings
You can modify search keywords, active companies, and cron schedules directly from the **Settings** page in the web dashboard! No need to modify code.

---

## 💻 Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Lucide Icons, jsPDF.
- **Backend:** Python, FastAPI, SQLite, Playwright, PyPDF2, Google Generative AI (Gemini).
- **Deployment:** Docker, Docker Compose, GitHub Actions.
