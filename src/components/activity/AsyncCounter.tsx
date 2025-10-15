import { useState, useTransition } from "react";

export function AsyncCounter() {
  const [count, setCount] = useState(0);
  const [isPending, startTransition] = useTransition();

  const incrementAsync = () => {
    startTransition(() => {
      // Simulate heavy computation
      const start = Date.now();
      while (Date.now() - start < 100) {
        // Block for 100ms to simulate heavy work
      }
      setCount((c) => c + 1);
    });
  };

  return (
    <div className="bg-white/10 rounded-lg p-6 border border-white/20 backdrop-blur-sm">
      <h3 className="text-xl font-semibold mb-4">Concurrent Counter</h3>
      <p className="text-white/80 mb-4">
        This counter uses useTransition to prevent blocking the UI during
        updates. The increment operation is wrapped in startTransition to make
        it interruptible.
      </p>

      <div className="flex items-center gap-4 mb-4">
        <span className="text-2xl font-bold">Count: {count}</span>
        {isPending && (
          <div className="flex items-center gap-2 text-yellow-300">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-300"></div>
            <span className="text-sm">Updating...</span>
          </div>
        )}
      </div>

      <button
        onClick={incrementAsync}
        disabled={isPending}
        className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 text-white px-6 py-2 rounded-lg transition-colors"
      >
        {isPending ? "Processing..." : "Increment (Heavy Operation)"}
      </button>
    </div>
  );
}
