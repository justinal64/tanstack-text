import { z } from "zod";
import type { MultiStepState } from "./OfficialTanStackFormContext";

// Schema for Step 1
export const step1Schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

export type Step1Data = z.infer<typeof step1Schema>;

interface OfficialStep1Props extends Pick<MultiStepState, 'goToNextStep' | 'goToPrevStep'> {
  showBackButton?: boolean;
  form: any; // The official TanStack form instance with pre-bound components
}

export function OfficialStep1BasicInfo({ 
  showBackButton = false,
  goToNextStep,
  goToPrevStep,
  form
}: OfficialStep1Props) {

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Validate step 1 fields using TanStack Form's built-in validation
    const step1Values = form.getFieldValue('step1');
    try {
      step1Schema.parse(step1Values);
      console.log("Step 1 validation passed:", step1Values);
      goToNextStep();
    } catch (error) {
      console.error("Step 1 validation failed:", error);
      if (error instanceof z.ZodError) {
        const errorMessages = error.issues.map((err: any) => err.message).join(", ");
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
        {/* Using TanStack's pre-bound field components */}
        <form.Field 
          name="step1.title"
          children={() => (
            <form.TextField 
              label="Project Title" 
              placeholder="Enter project title"
            />
          )}
        />

        <form.Field 
          name="step1.description"
          children={() => (
            <form.TextAreaField 
              label="Project Description" 
              placeholder="Describe your project"
            />
          )}
        />

        {/* Navigation Buttons using official components */}
        <div className="flex justify-between pt-6">
          {showBackButton ? (
            <form.NavigationButton 
              label="Previous" 
              onClick={goToPrevStep}
              variant="secondary"
            />
          ) : (
            <div></div>
          )}

          <form.SubmitButton 
            label="Next Step" 
            color="blue"
          />
        </div>
      </form>
    </div>
  );
}