import { useState } from "react";

export default function PRTab({ onReview, loading }: { onReview: (b: any) => void; loading: boolean }) {
  const [prUrl, setPrUrl] = useState("");

  return (
    <div className="space-y-4">
      <input
        value={prUrl}
        onChange={(e) => setPrUrl(e.target.value)}
        placeholder="https://github.com/owner/repo/pull/123"
        className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
      />
      <p className="text-gray-500 text-xs">Works with public repositories. For private repos add GITHUB_TOKEN to backend .env</p>
      <button
        onClick={() => onReview({ pr_url: prUrl })}
        disabled={loading || !prUrl.trim()}
        className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 text-white font-medium rounded-lg transition-all"
      >
        {loading ? "Fetching & Reviewing..." : "Review PR"}
      </button>
    </div>
  );
}