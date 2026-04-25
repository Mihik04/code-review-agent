const severityStyles: Record<string, string> = {
  critical: "bg-red-900/40 border-red-500/50 text-red-300",
  warning: "bg-yellow-900/40 border-yellow-500/50 text-yellow-300",
  info: "bg-blue-900/40 border-blue-500/50 text-blue-300",
};

const severityDot: Record<string, string> = {
  critical: "bg-red-500",
  warning: "bg-yellow-500",
  info: "bg-blue-500",
};

const scoreColor = (s: number) => {
  if (s >= 8) return "text-green-400";
  if (s >= 5) return "text-yellow-400";
  return "text-red-400";
};

export default function ResultCard({ result }: { result: any }) {
  return (
    <div className="mt-6 space-y-4">

      <div className="flex items-center gap-4 p-5 bg-gray-800 rounded-xl border border-gray-700">
        <div className={`text-5xl font-bold ${scoreColor(result.score)}`}>
          {result.score}<span className="text-xl text-gray-500">/10</span>
        </div>
        <div>
          <p className="text-white text-sm leading-relaxed">{result.summary}</p>
        </div>
      </div>

      <div className="p-4 bg-gray-800 rounded-xl border border-gray-700">
        <p className="text-xs text-gray-400 uppercase font-medium mb-1">Amazon SDE Bar</p>
        <p className="text-gray-300 text-sm">{result.amazon_bar}</p>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-400 uppercase">Findings ({result.findings?.length || 0})</p>
        {result.findings?.map((f: any, i: number) => (
          <div key={i} className={`p-4 rounded-xl border ${severityStyles[f.severity]}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2 h-2 rounded-full ${severityDot[f.severity]}`} />
              <span className="text-xs font-medium uppercase">{f.severity}</span>
              <span className="text-xs px-2 py-0.5 bg-gray-700 text-gray-300 rounded-full">{f.category}</span>
            </div>
            <p className="text-sm font-medium mb-1">{f.issue}</p>
            <p className="text-xs opacity-80">{f.suggestion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}