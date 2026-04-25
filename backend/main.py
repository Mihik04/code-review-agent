from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import review
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="Code Review Agent API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(review.router)

@app.get("/")
async def root():
    return {"message": "Code Review Agent API is running"}

@app.get("/health")
async def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
