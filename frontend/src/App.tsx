import { useState } from "react";
import CodeTab from "./components/CodeTab";
import PRTab from "./components/PRTab";
import ResultCard from "./components/ResultCard";

const API = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

export default function App() {
  const [tab, setTab] = useState<"code" | "pr">("code");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReview = async (endpoint: string, body: object) => {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(`${API}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setResult(json.data);
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-3xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Code Review Agent</h1>
          <p className="text-gray-400 mt-1">AI-powered code review against Amazon SDE standards</p>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => { setTab("code"); setResult(null); setError(""); }}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === "code"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Paste Code
          </button>
          <button
            onClick={() => { setTab("pr"); setResult(null); setError(""); }}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === "pr"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            GitHub PR URL
          </button>
        </div>

        {tab === "code" ? (
          <CodeTab onReview={(body) => handleReview("review", body)} loading={loading} />
        ) : (
          <PRTab onReview={(body) => handleReview("review-pr", body)} loading={loading} />
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-900/40 border border-red-500/50 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}

        {result && <ResultCard result={result} />}
      </div>
    </div>
  );
}