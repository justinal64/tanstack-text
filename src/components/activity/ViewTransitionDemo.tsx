import { useState } from "react";
import {
  ViewType,
  demoItems,
  triggerViewTransition,
  isViewTransitionSupported,
} from "./utils";

export function ViewTransitionDemo() {
  const [currentView, setCurrentView] = useState<ViewType>("list");

  const changeView = (newView: ViewType) => {
    triggerViewTransition(() => {
      setCurrentView(newView);
    });
  };

  const renderContent = () => {
    switch (currentView) {
      case "list":
        return (
          <div className="space-y-2">
            {demoItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 bg-white/5 rounded border border-white/10"
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div>
                  <h4 className="font-medium text-white">{item.name}</h4>
                  <p className="text-white/70 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        );
      case "grid":
        return (
          <div className="grid grid-cols-2 gap-3">
            {demoItems.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white/5 rounded-lg border border-white/10 text-center"
              >
                <div className="w-8 h-8 bg-purple-400 rounded-lg mx-auto mb-2"></div>
                <h4 className="font-medium text-white text-sm">{item.name}</h4>
                <p className="text-white/70 text-xs mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        );
      case "cards":
        return (
          <div className="space-y-3">
            {demoItems.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded"></div>
                  <div>
                    <h4 className="font-medium text-white">{item.name}</h4>
                    <p className="text-white/70 text-sm">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white/10 rounded-lg p-6 border border-white/20 backdrop-blur-sm">
      <h3 className="text-xl font-semibold mb-4">ViewTransition API Demo</h3>
      <p className="text-white/80 mb-4">
        Click the buttons below to see smooth transitions between different
        layouts using the ViewTransition API.
      </p>

      <div className="flex gap-2 mb-4">
        {(["list", "grid", "cards"] as const).map((view) => (
          <button
            key={view}
            onClick={() => changeView(view)}
            className={`px-4 py-2 rounded-lg transition-colors capitalize ${
              currentView === view
                ? "bg-blue-600 text-white"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            {view}
          </button>
        ))}
      </div>

      <div className="min-h-[200px]">{renderContent()}</div>

      <div className="mt-4 text-xs text-white/60">
        {isViewTransitionSupported()
          ? "✅ ViewTransition API is available"
          : "❌ ViewTransition API not available in this browser"}
      </div>
    </div>
  );
}
