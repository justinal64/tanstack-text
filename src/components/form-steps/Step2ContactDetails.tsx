import { z } from "zod";
import { useMultiStepForm } from "./MultiStepFormContext";

// Schema for Step 2
export const step2Schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

export type Step2Data = z.infer<typeof step2Schema>;

export function Step2ContactDetails() {
  const { form, goToNextStep, goToPrevStep } = useMultiStepForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Validate step 2 fields
    const step2Values = form.getFieldValue("step2");
    try {
      step2Schema.parse(step2Values);
      console.log("Step 2 validation passed:", step2Values);
      goToNextStep();
    } catch (error) {
      console.error("Step 2 validation failed:", error);
      if (error instanceof z.ZodError) {
        const errorMessages = error.issues
          .map((err: any) => err.message)
          .join(", ");
        alert(`Please fix the following errors: ${errorMessages}`);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Step 2: Contact Details
        </h2>
        <p className="text-white/80">How can we reach you?</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <form.Field
          name="step2.name"
          children={(field: any) => (
            <div>
              <label className="block text-white/80 text-sm mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                placeholder="Enter your full name"
              />
              {field.state.meta.errors && (
                <div className="text-red-400 text-sm mt-1">
                  {field.state.meta.errors.join(", ")}
                </div>
              )}
            </div>
          )}
        />

        <form.Field
          name="step2.email"
          children={(field: any) => (
            <div>
              <label className="block text-white/80 text-sm mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                placeholder="Enter your email address"
              />
              {field.state.meta.errors && (
                <div className="text-red-400 text-sm mt-1">
                  {field.state.meta.errors.join(", ")}
                </div>
              )}
            </div>
          )}
        />

        <form.Field
          name="step2.phone"
          children={(field: any) => (
            <div>
              <label className="block text-white/80 text-sm mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                placeholder="Enter your phone number"
              />
              {field.state.meta.errors && (
                <div className="text-red-400 text-sm mt-1">
                  {field.state.meta.errors.join(", ")}
                </div>
              )}
            </div>
          )}
        />

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={goToPrevStep}
            className="px-6 py-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors"
          >
            Previous
          </button>

          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Next Step
          </button>
        </div>
      </form>
    </div>
  );
}
