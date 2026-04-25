from pydantic import BaseModel

class ReviewRequest(BaseModel):
    code: str
    language: str
    context: str = ""

class PRRequest(BaseModel):
    pr_url: str