<div align="center">
  <img src="frontend/public/favicon.svg" alt="CareerAgent Logo" width="120" />
  
  # CareerAgent
  
  **Enterprise-grade AI Career Platform.**  
  Automates job discovery, dynamically aligns resumes to JD requirements, and generates pristine LaTeX PDFs for flawless ATS parsing.

  [![GitHub Stars](https://img.shields.io/github/stars/koteshrv/career-agent.svg)](https://github.com/koteshrv/career-agent/stargazers)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
  [![FastAPI](https://img.shields.io/badge/FastAPI-0.109-green.svg)](https://fastapi.tiangolo.com/)

</div>

<br/>

CareerAgent is an open-source, multi-LLM platform engineered to automate your job search while maintaining the highest standards of data privacy and professional formatting. 

It finds jobs via custom Playwright scrapers (job boards, company pages), extracts competencies using AI, perfectly aligns your qualifications with the job description, and compiles professionally formatted LaTeX PDFs designed to be accurately parsed by corporate Applicant Tracking Systems (ATS).

## ✨ Features

- **Automated Job Discovery**: Scrapes job boards and company career pages in real-time to instantly find roles that match your exact profile and preferences.
- **Chrome Extension Integration**: Manually add and parse jobs directly from LinkedIn, Naukri, and other external boards with a single click using the included browser extension.
- **AI Match Scoring**: Instantly evaluates your profile against the job description, providing a definitive match score to help you prioritize your best opportunities.
- **Dynamic Resumes & Cover Letters**: Automatically aligns your qualifications with the JD to compile professionally formatted LaTeX resumes and cover letters for flawless ATS parsing.
- **Flexible AI Engine**: Fully agnostic architecture. Route via OpenAI, Anthropic, or Gemini—or run 100% locally and privately with Ollama. The choice is yours.

## 🏢 Supported Companies (43+)

CareerAgent natively integrates with the career portals and ATS systems (Greenhouse, Lever, Zwayam, custom Workday/Oracle SPAs) of the following top-tier companies:

**Big Tech & Unicorns:** Google, Amazon, Microsoft, Apple, Meta, Atlassian, Stripe, Airbnb, Snowflake, Databricks, Coinbase, Figma, Notion  
**Banking & Finance:** JP Morgan Chase, Wells Fargo, Mastercard, Barclays, Citi, Visa  
**Consulting & IT Services:** Accenture, IBM, Deloitte, TCS, Infosys, Cognizant, Capgemini, LTIMindtree, Wipro, HCLTech, Tech Mahindra, Hexaware Technologies, Mphasis, Persistent Systems  
**Indian Tech Giants:** Meesho, PhonePe, Flipkart, Swiggy, Paytm, Cred, Razorpay, Zepto, Zoho  
*(Plus automatic parsing for any generic Greenhouse or Lever job board!)*

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+)
- Python (3.11+)
- API Keys (OpenAI, Gemini, Anthropic) or local Ollama running.

### 1. Start the Backend (FastAPI)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload --port 8000
```

### 2. Start the Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` to access the CareerAgent dashboard.

## 📸 Demo Mode
Want to see the UI without running a backend? You can run the frontend in demo mode with mocked data:
```bash
cd frontend
VITE_DEMO_MODE=true npm run dev
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/koteshrv/career-agent/issues).

## 📄 License
This project is [MIT](https://opensource.org/licenses/MIT) licensed.
