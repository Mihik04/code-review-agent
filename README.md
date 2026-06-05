# Code Review Agent

An AI-powered code review platform that reviews pasted code and GitHub Pull Request diffs against software engineering standards. The system uses a FastAPI backend, Groq LLM API, GitHub API integration, and a React + TypeScript frontend to return structured review feedback with score, severity, category, issue explanation, and actionable fixes.

## Live Deployment

- Frontend: Add your deployed frontend link here
- Backend API: Add your deployed backend API link here
- GitHub Repository: https://github.com/Mihik04/code-review-agent

## Features

- Review pasted source code in multiple languages.
- Review public GitHub Pull Request diffs using a PR URL.
- Uses Groq LLM API with `llama-3.3-70b-versatile` for AI review generation.
- Returns structured JSON output instead of plain text.
- Shows review score out of 10.
- Categorizes findings into Time Complexity, Security, Scalability, Edge Case, and Code Quality.
- Marks severity as critical, warning, or info.
- Displays an Amazon SDE bar evaluation for the submitted code.
- React dashboard with separate tabs for code review and PR review.
- FastAPI backend with CORS enabled for frontend integration.

## Tech Stack

### Frontend

- React.js
- TypeScript
- Tailwind CSS
- Create React App

### Backend

- Python
- FastAPI
- Pydantic
- Groq API
- GitHub REST API
- Uvicorn
- python-dotenv

## Project Structure

```text
code-review-agent/
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── runtime.txt
│   ├── .env
│   │
│   ├── models/
│   │   ├── __init__.py
│   │   └── schemas.py
│   │
│   ├── routers/
│   │   ├── __init__.py
│   │   └── review.py
│   │
│   └── services/
│       ├── __init__.py
│       ├── gemini.py
│       └── github.py
│
├── frontend/
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── tsconfig.json
│   │
│   ├── public/
│   │   └── index.html
│   │
│   └── src/
│       ├── App.tsx
│       ├── App.css
│       ├── index.tsx
│       ├── index.css
│       │
│       └── components/
│           ├── CodeTab.tsx
│           ├── PRTab.tsx
│           └── ResultCard.tsx
│
└── .gitignore
```

> Note: The backend service file is named `gemini.py`, but the current implementation uses the Groq SDK and the `llama-3.3-70b-versatile` model.

## Backend API Endpoints

### Health Check

```http
GET /
```

Response:

```json
{
  "message": "Code Review Agent is running"
}
```

### Review Pasted Code

```http
POST /api/review
```

Request body:

```json
{
  "code": "def add(a, b): return a + b",
  "language": "python",
  "context": "simple addition function"
}
```

Response format:

```json
{
  "data": {
    "summary": "Overall review summary",
    "score": 8,
    "findings": [
      {
        "category": "Code Quality",
        "severity": "info",
        "issue": "Issue found in the code",
        "suggestion": "Suggested fix"
      }
    ],
    "amazon_bar": "Evaluation against Amazon SDE standards"
  },
  "error": null,
  "status": 200
}
```

### Review GitHub Pull Request

```http
POST /api/review-pr
```

Request body:

```json
{
  "pr_url": "https://github.com/owner/repo/pull/123"
}
```

The backend fetches the PR diff from GitHub, sends the diff to the LLM, and returns a structured review.

## Environment Variables

### Backend `.env`

Create a `.env` file inside the `backend` folder:

```env
GROQ_API_KEY=your_groq_api_key_here
GITHUB_TOKEN=your_github_token_here
```

`GITHUB_TOKEN` is optional for public repositories but recommended to avoid GitHub API rate limits. It is required for private repositories.

### Frontend `.env`

Create a `.env` file inside the `frontend` folder:

```env
REACT_APP_API_URL=http://localhost:8000/api
```

For deployment, replace the value with your live backend API URL:

```env
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

## Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Mihik04/code-review-agent.git
cd code-review-agent
```

### 2. Setup Backend

```bash
cd backend
python -m venv venv
```

Activate the virtual environment:

For Windows:

```bash
venv\Scripts\activate
```

For macOS/Linux:

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create `.env` file:

```env
GROQ_API_KEY=your_groq_api_key_here
GITHUB_TOKEN=your_github_token_here
```

Run the backend server:

```bash
uvicorn main:app --reload --port 8000
```

Backend will run at:

```text
http://localhost:8000
```

FastAPI Swagger documentation:

```text
http://localhost:8000/docs
```

### 3. Setup Frontend

Open a new terminal:

```bash
cd frontend
npm install
```

Create frontend `.env` file:

```env
REACT_APP_API_URL=http://localhost:8000/api
```

Run the frontend:

```bash
npm start
```

Frontend will run at:

```text
http://localhost:3000
```

## Deployment Guide

### Backend Deployment on Render

1. Create a new Web Service on Render.
2. Connect the GitHub repository.
3. Set the root directory as:

```text
backend
```

4. Set the build command:

```bash
pip install -r requirements.txt
```

5. Set the start command:

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

6. Add environment variables in Render:

```env
GROQ_API_KEY=your_groq_api_key_here
GITHUB_TOKEN=your_github_token_here
```

7. Deploy the backend and copy the generated backend URL.

### Frontend Deployment on Vercel

1. Import the GitHub repository into Vercel.
2. Set the root directory as:

```text
frontend
```

3. Set the build command:

```bash
npm run build
```

4. Set the output directory:

```text
build
```

5. Add the environment variable:

```env
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

6. Deploy the frontend.

## How It Works

1. The user selects either the Paste Code tab or the GitHub PR URL tab.
2. For pasted code, the frontend sends code, language, and optional context to `/api/review`.
3. For PR review, the frontend sends a PR URL to `/api/review-pr`.
4. The backend fetches the PR diff using GitHub API when a PR URL is submitted.
5. The backend builds a strict review prompt and sends it to the Groq LLM API.
6. The LLM returns a JSON review containing summary, score, findings, and Amazon SDE bar evaluation.
7. The React frontend displays the score, summary, severity-based findings, and suggestions.

## Review Output Format

The LLM is instructed to return only valid JSON in this structure:

```json
{
  "summary": "2 sentence overall verdict",
  "score": 8,
  "findings": [
    {
      "category": "Time Complexity|Security|Scalability|Edge Case|Code Quality",
      "severity": "critical|warning|info",
      "issue": "what the problem is",
      "suggestion": "exact fix with example if possible"
    }
  ],
  "amazon_bar": "Does this meet Amazon SDE bar? Why or why not?"
}
```

## Supported Code Review Languages

The frontend currently supports:

- Python
- JavaScript
- TypeScript
- Java
- C++
- C
- Go
- Rust

## Important Notes

- Do not commit `.env` files to GitHub.
- Do not expose `GROQ_API_KEY` or `GITHUB_TOKEN` in frontend code.
- The backend trims PR diffs to the first 4000 characters before sending them to the LLM.
- CORS is currently open to all origins using `allow_origins=["*"]`. For production, restrict it to your deployed frontend URL.
- For private GitHub repositories, a valid `GITHUB_TOKEN` is required.

## Future Improvements

- Add authentication for saved reviews.
- Store previous review history in a database.
- Add file upload support for multi-file review.
- Add repository-level code review instead of only PR diff review.
- Improve JSON parsing fallback when the LLM returns invalid JSON.
- Restrict CORS origin in production.
- Add test cases for backend routes and frontend components.
- Add support for custom review standards such as Google, Meta, or general clean-code review.

## Author

Mihik Sarkar

- GitHub: https://github.com/Mihik04
- LinkedIn: https://www.linkedin.com/in/mihik-sarkar-51b48b29a/
