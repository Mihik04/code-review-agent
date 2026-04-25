from fastapi import APIRouter, HTTPException
from models.schemas import ReviewRequest, PRRequest
from services.gemini import analyze_code
from services.github import fetch_pr_diff

router = APIRouter(prefix="/api")

@router.post("/review")
async def review_code(req: ReviewRequest):
    try:
        result = await analyze_code(req.code, req.language, req.context)
        return {"data": result, "error": None, "status": 200}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/review-pr")
async def review_pr(req: PRRequest):
    try:
        pr_data = fetch_pr_diff(req.pr_url)
        result = await analyze_code(
            pr_data["diff"],
            "git diff",
            f"PR: {pr_data['title']}. {pr_data['description']}"
        )
        return {"data": result, "error": None, "status": 200}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))