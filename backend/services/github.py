import requests, os
from dotenv import load_dotenv
load_dotenv()

def fetch_pr_diff(pr_url: str) -> dict:
    parts = pr_url.rstrip("/").split("/")
    owner = parts[-4]
    repo = parts[-3]
    pr_num = parts[-1]

    token = os.getenv("GITHUB_TOKEN", "")
    headers = {"Authorization": f"token {token}"} if token else {}
    diff_headers = {**headers, "Accept": "application/vnd.github.v3.diff"}

    api_url = f"https://api.github.com/repos/{owner}/{repo}/pulls/{pr_num}"

    diff = requests.get(api_url, headers=diff_headers).text
    meta = requests.get(api_url, headers=headers).json()

    return {
        "diff": diff[:4000],
        "title": meta.get("title", ""),
        "description": meta.get("body", "") or ""
    }