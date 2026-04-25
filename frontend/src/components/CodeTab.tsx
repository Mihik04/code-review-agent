import { useState } from "react";

const LANGUAGES = ["python", "javascript", "typescript", "java", "c++", "c", "go", "rust"];

export default function CodeTab({ onReview, loading }: { onReview: (b: any) => void; loading: boolean }) {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [context, setContext] = useState("");

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm"
        >
          {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
        <input
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Brief context (optional) — e.g. 'sorts an array'"
          className="flex-1 bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm placeholder-gray-500"
        />
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here..."
        rows={14}
        className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm font-mono placeholder-gray-500 focus:outline-none focus:border-blue-500"
      />

      <button
        onClick={() => onReview({ code, language, context })}
        disabled={loading || !code.trim()}
        className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 text-white font-medium rounded-lg transition-all"
      >
        {loading ? "Reviewing..." : "Review Code"}
      </button>
    </div>
  );
}