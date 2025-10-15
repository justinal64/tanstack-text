import { useState, Activity } from "react";

export function ActivityComponentDemo() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setData("Data loaded successfully!");
    setIsLoading(false);
  };

  return (
    <div className="bg-white/10 rounded-lg p-6 border border-white/20 backdrop-blur-sm">
      <h3 className="text-xl font-semibold mb-4">
        React 19.2 Activity Component
      </h3>
      <p className="text-white/80 mb-4">
        The Activity component controls the visibility of its children based on
        the mode prop.
      </p>

      <button
        onClick={fetchData}
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white px-6 py-2 rounded-lg transition-colors mb-4"
      >
        Load Data
      </button>

      <Activity mode={isLoading ? "visible" : "hidden"}>
        <div className="flex items-center gap-2 text-blue-300 mb-4">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-300"></div>
          <span>Loading data with Activity component...</span>
        </div>
      </Activity>

      <Activity mode={data && !isLoading ? "visible" : "hidden"}>
        <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
          <p className="text-green-200">{data}</p>
        </div>
      </Activity>
    </div>
  );
}
