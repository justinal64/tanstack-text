import { useState, useTransition, Activity } from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/demo/activity")({
  component: ActivityDemo,
});

// Simulate async data fetching
const fetchUserData = async (
  userId: number
): Promise<{ id: number; name: string; email: string; bio: string }> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const users = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      bio: "Software engineer with a passion for React and TypeScript. Loves building user-friendly applications.",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      bio: "Full-stack developer who enjoys working with modern web technologies and creating scalable solutions.",
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol@example.com",
      bio: "UX/UI designer turned developer. Focuses on creating beautiful and accessible user interfaces.",
    },
  ];

  const user = users[userId - 1];
  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

// Component that demonstrates React 19.2's Activity component
function ActivityComponentDemo() {
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
          {/* <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-300"></div> */}
          <span>Loading data with Activity component...</span>
        </div>
      </Activity>

      <Activity mode={data && !isLoading ? "visible" : "hidden"}>
        {/* <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4"> */}
        <p className="text-green-200">{data}</p>
        {/* </div> */}
      </Activity>
    </div>
  );
}

// Component that uses React 19.2's useTransition for comparison
function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState<{
    id: number;
    name: string;
    email: string;
    bio: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Use React 19.2's useTransition for better UX
  const [isPending, startTransition] = useTransition();

  const loadUser = () => {
    startTransition(async () => {
      try {
        setError(null);
        const userData = await fetchUserData(userId);
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load user");
        setUser(null);
      }
    });
  };

  return (
    <div className="bg-white/10 rounded-lg p-6 border border-white/20 backdrop-blur-sm">
      <h3 className="text-xl font-semibold mb-4">User Profile Loader</h3>

      <div className="flex gap-2 mb-4">
        {[1, 2, 3].map((id) => (
          <button
            key={id}
            onClick={() => loadUser()}
            disabled={isPending}
            className={`px-4 py-2 rounded ${
              userId === id
                ? "bg-blue-600 text-white"
                : "bg-white/20 text-white hover:bg-white/30"
            } disabled:opacity-50 transition-colors`}
          >
            Load User {id}
          </button>
        ))}
      </div>

      {isPending && (
        <div className="flex items-center gap-2 text-blue-300 mb-4">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-300"></div>
          <span>Loading user data...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-4">
          <p className="text-red-200">Error: {error}</p>
        </div>
      )}

      {user && !isPending && (
        <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
          <h4 className="font-semibold text-green-200">{user.name}</h4>
          <p className="text-green-300 text-sm mb-2">{user.email}</p>
          <p className="text-white/80 text-sm">{user.bio}</p>
        </div>
      )}
    </div>
  );
}

// Concurrent rendering example with Suspense
function AsyncCounter() {
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

// Multiple Activity components with different visibility modes
function MultipleActivityDemo() {
  const [activeSection, setActiveSection] = useState<
    "none" | "loading" | "success" | "error"
  >("none");

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

// Activity tracking for form submissions
function ActivityForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });

      // Reset submitted state after showing success
      setTimeout(() => setSubmitted(false), 3000);
    });
  };

  return (
    <div className="bg-white/10 rounded-lg p-6 border border-white/20 backdrop-blur-sm">
      <h3 className="text-xl font-semibold mb-4">
        Form with Activity Tracking
      </h3>

      {submitted && (
        <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-4">
          <p className="text-green-200">Form submitted successfully! ✅</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white/80 text-sm mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
            placeholder="Your name"
            disabled={isPending}
          />
        </div>

        <div>
          <label className="block text-white/80 text-sm mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
            placeholder="your@email.com"
            disabled={isPending}
          />
        </div>

        <div>
          <label className="block text-white/80 text-sm mb-1">Message</label>
          <textarea
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 h-20"
            placeholder="Your message"
            disabled={isPending}
          />
        </div>

        <button
          type="submit"
          disabled={isPending || !formData.name || !formData.email}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Submitting...
            </>
          ) : (
            "Submit Form"
          )}
        </button>
      </form>
    </div>
  );
}

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
            React 19.2 Activity Component Demo
          </h1>
          <p className="text-white/80 text-lg max-w-3xl mx-auto">
            Explore React 19.2's new Activity component for declarative
            visibility control, along with useTransition for managing
            asynchronous operations, better loading states, and non-blocking
            updates.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <ActivityComponentDemo />
          <UserProfile userId={selectedUser} />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <AsyncCounter />
          <MultipleActivityDemo />
        </div>

        <div className="grid md:grid-cols-1 gap-8">
          <ActivityForm />
        </div>

        <div className="mt-12 bg-white/5 rounded-lg p-6 border border-white/10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            🚀 React 19.2 Features Demonstrated
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
              <h3 className="font-semibold text-white mb-2">useTransition</h3>
              <p className="text-sm">
                Mark state updates as non-urgent to keep the UI responsive
                during heavy operations. Perfect for search, filtering, and data
                fetching.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">
                Concurrent Rendering
              </h3>
              <p className="text-sm">
                React can interrupt and prioritize work, ensuring high-priority
                updates (like user input) aren't blocked by low-priority
                updates.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">
                State Management
              </h3>
              <p className="text-sm">
                Combine Activity components with state management for better
                loading states and activity indicators that integrate with
                React's concurrent features.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
