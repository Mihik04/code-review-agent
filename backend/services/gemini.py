from groq import Groq
import os, json
from dotenv import load_dotenv
load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

async def analyze_code(code: str, language: str, context: str):
    prompt = f"""You are a strict Amazon SDE code reviewer.
Review this {language} code.
Context: {context}

Code:
{code}

Return ONLY a valid JSON object. No markdown, no backticks, no extra text.
Exact structure:
{{
  "summary": "2 sentence overall verdict",
  "score": <integer 1-10>,
  "findings": [
    {{
      "category": "Time Complexity|Security|Scalability|Edge Case|Code Quality",
      "severity": "critical|warning|info",
      "issue": "what the problem is",
      "suggestion": "exact fix with example if possible"
    }}
  ],
  "amazon_bar": "Does this meet Amazon SDE bar? Why/why not in 2 sentences."
}}"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3
    )

    text = response.choices[0].message.content.strip()

    if text.startswith("```"):
        text = text.split("```")[1]
        if text.startswith("json"):
            text = text[4:]

    return json.loads(text.strip())