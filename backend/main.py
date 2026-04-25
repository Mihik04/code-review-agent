from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import review

app = FastAPI(title="Code Review Agent")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://code-review-agent-two.vercel.app",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(review.router)

@app.get("/")
def root():
    return {"message": "Code Review Agent is running"}