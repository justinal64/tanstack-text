import { useState, useTransition } from "react";
import { User, fetchUserData } from "./utils";

interface UserProfileProps {
  userId: number;
}

export function UserProfile({ userId }: UserProfileProps) {
  const [user, setUser] = useState<User | null>(null);
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
