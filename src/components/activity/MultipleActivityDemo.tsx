import { useState, Activity } from "react";
import { ActivityState } from "./utils";

export function MultipleActivityDemo() {
  const [activeSection, setActiveSection] = useState<ActivityState>("none");

  const simulateAction = (type: "loading" | "success" | "error") => {
    setActiveSection("loading");
    setTimeout(() => {
      setActiveSection(type);
      if (type !== "loading") {
        setTimeout(() => setActiveSection("none"), 3000);
      }
    }, 1500);
  };

  return (
    <div className="bg-white/10 rounded-lg p-6 border border-white/20 backdrop-blur-sm">
      <h3 className="text-xl font-semibold mb-4">Multiple Activity States</h3>
      <p className="text-white/80 mb-4">
        Different Activity components showing various states based on visibility
        mode.
      </p>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => simulateAction("success")}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
        >
          Trigger Success
        </button>
        <button
          onClick={() => simulateAction("error")}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
        >
          Trigger Error
        </button>
        <button
          onClick={() => setActiveSection("none")}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
        >
          Reset
        </button>
      </div>

      <Activity mode={activeSection === "loading" ? "visible" : "hidden"}>
        <div className="flex items-center gap-2 text-blue-300 mb-4 p-3 bg-blue-500/20 rounded-lg border border-blue-500/50">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-300"></div>
          <span>Processing request...</span>
        </div>
      </Activity>

      <Activity mode={activeSection === "success" ? "visible" : "hidden"}>
        <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-4">
          <p className="text-green-200">✅ Operation completed successfully!</p>
        </div>
      </Activity>

      <Activity mode={activeSection === "error" ? "visible" : "hidden"}>
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-4">
          <p className="text-red-200">❌ Operation failed. Please try again.</p>
        </div>
      </Activity>

      <Activity mode={activeSection === "none" ? "visible" : "hidden"}>
        <div className="bg-gray-500/20 border border-gray-500/50 rounded-lg p-4">
          <p className="text-gray-200">
            Click a button above to see Activity components in action.
          </p>
        </div>
      </Activity>
    </div>
  );
}
