import { z } from "zod";
import { useMultiStepForm } from "./MultiStepFormContext";

// Schema for Step 3
export const step3Schema = z.object({
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  comments: z.string(),
});

export type Step3Data = z.infer<typeof step3Schema>;

export function Step3AdditionalInfo() {
  const { form, goToPrevStep, getAllFormData } = useMultiStepForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Validate step 3 fields
    const step3Values = form.getFieldValue("step3");
    try {
      step3Schema.parse(step3Values);
      console.log("Step 3 validation passed:", step3Values);

      // Get all form data for final submission
      const allData = getAllFormData();
      console.log("Final form submission - All data:", allData);

      alert(`Form submitted successfully! Check console for complete data.`);
    } catch (error) {
      console.error("Step 3 validation failed:", error);
      if (error instanceof z.ZodError) {
        const errorMessages = error.issues
          .map((err: any) => err.message)
          .join(", ");
        alert(`Please fix the following errors: ${errorMessages}`);
      }
    }
  };

  const allFormData = getAllFormData();

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Step 3: Additional Information
        </h2>
        <p className="text-white/80">Tell us more about yourself</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <form.Field
          name="step3.company"
          children={(field: any) => (
            <div>
              <label className="block text-white/80 text-sm mb-1">
                Company/Organization
              </label>
              <input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                placeholder="Enter your company or organization"
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
          name="step3.role"
          children={(field: any) => (
            <div>
              <label className="block text-white/80 text-sm mb-1">
                Your Role/Position
              </label>
              <input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                placeholder="Enter your role or position"
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
          name="step3.comments"
          children={(field: any) => (
            <div>
              <label className="block text-white/80 text-sm mb-1">
                Additional Comments (Optional)
              </label>
              <textarea
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 h-24"
                placeholder="Any additional comments..."
              />
              {field.state.meta.errors && (
                <div className="text-red-400 text-sm mt-1">
                  {field.state.meta.errors.join(", ")}
                </div>
              )}
            </div>
          )}
        />

        {/* Form Summary */}
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <h4 className="text-white font-semibold mb-2">
            Review Your Information:
          </h4>
          <div className="text-white/70 text-sm space-y-1">
            <p>
              <strong>Project:</strong>{" "}
              {allFormData.step1?.title || "Not provided"}
            </p>
            <p>
              <strong>Name:</strong> {allFormData.step2?.name || "Not provided"}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              {allFormData.step2?.email || "Not provided"}
            </p>
          </div>
        </div>

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
            className="px-6 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition-colors"
          >
            Submit Form
          </button>
        </div>
      </form>
    </div>
  );
}
