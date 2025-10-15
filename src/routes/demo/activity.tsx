import { createFileRoute } from "@tanstack/react-router";
import {
  // ActivityComponentDemo,
  ViewTransitionDemo,
  // UserProfile,
  // AsyncCounter,
  // MultipleActivityDemo,
  // ActivityForm,
} from "@/components/activity";

export const Route = createFileRoute("/demo/activity")({
  component: ActivityDemo,
});

function ActivityDemo() {
  const selectedUser = 1;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8"
      style={{
        backgroundImage:
          "radial-gradient(70% 70% at 20% 20%, #7C3AED 0%, #1E40AF 60%, #1E1B4B 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            React 19 Canary - Activity & ViewTransition Demo
          </h1>
          <p className="text-white/80 text-lg max-w-3xl mx-auto">
            Explore React 19 canary features including the Activity component
            for declarative visibility control, ViewTransition API for smooth
            animations, and useTransition for managing asynchronous operations
            with enhanced loading states.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* <ActivityComponentDemo /> */}
          <ViewTransitionDemo />
        </div>

        {/* <div className="grid md:grid-cols-2 gap-8 mb-8">
          <UserProfile userId={selectedUser} />
          <AsyncCounter />
        </div> */}

        {/* <div className="grid md:grid-cols-2 gap-8 mb-8">
          <MultipleActivityDemo />
        </div> */}

        {/* <div className="grid md:grid-cols-1 gap-8">
          <ActivityForm />
        </div> */}

        <div className="mt-12 bg-white/5 rounded-lg p-6 border border-white/10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            🚀 React 19 Features Demonstrated
          </h2>
          <div className="grid md:grid-cols-4 gap-6 text-white/80">
            <div>
              <h3 className="font-semibold text-white mb-2">
                Activity Component
              </h3>
              <p className="text-sm">
                The new Activity component controls visibility of UI elements
                based on mode prop. Use 'visible' or 'hidden' to show/hide
                content declaratively.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">
                ViewTransition API
              </h3>
              <p className="text-sm">
                Smooth animations between different UI states using the native
                ViewTransition API. Provides seamless morphing effects without
                custom CSS transitions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">useTransition</h3>
              <p className="text-sm">
                Mark state updates as non-urgent to keep the UI responsive
                during heavy operations. Perfect for search, filtering, and data
                fetching.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">
                Concurrent Features
              </h3>
              <p className="text-sm">
                React can interrupt and prioritize work, ensuring high-priority
                updates (like user input) aren't blocked by low-priority
                updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
