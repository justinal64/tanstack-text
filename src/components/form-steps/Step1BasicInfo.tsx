import { z } from "zod";
import { useMultiStepForm } from "./MultiStepFormContext";

// Schema for Step 1
export const step1Schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

export type Step1Data = z.infer<typeof step1Schema>;

interface Step1BasicInfoProps {
  showBackButton?: boolean;
}

export function Step1BasicInfo({
  showBackButton = false,
}: Step1BasicInfoProps) {
  const { form, goToNextStep, goToPrevStep } = useMultiStepForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Validate step 1 fields
    const step1Values = form.getFieldValue("step1");
    try {
      step1Schema.parse(step1Values);
      console.log("Step 1 validation passed:", step1Values);
      goToNextStep();
    } catch (error) {
      console.error("Step 1 validation failed:", error);
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
          Step 1: Basic Information
        </h2>
        <p className="text-white/80">Tell us about your project</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <form.Field
          name="step1.title"
          children={(field: any) => (
            <div>
              <label className="block text-white/80 text-sm mb-1">
                Project Title
              </label>
              <input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                placeholder="Enter project title"
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
          name="step1.description"
          children={(field: any) => (
            <div>
              <label className="block text-white/80 text-sm mb-1">
                Project Description
              </label>
              <textarea
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 h-24"
                placeholder="Describe your project"
              />
              {field.state.meta.errors && (
                <div className="text-red-400 text-sm mt-1">
                  {field.state.meta.errors.join(", ")}
                </div>
              )}
            </div>
          )}
        />

        <div className="flex justify-between pt-6">
          {showBackButton ? (
            <button
              type="button"
              onClick={goToPrevStep}
              className="px-6 py-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors"
            >
              Previous
            </button>
          ) : (
            <div></div>
          )}

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
