import { useState, useTransition } from "react";
import { FormData } from "./utils";

export function ActivityForm() {
  const [formData, setFormData] = useState<FormData>({
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
