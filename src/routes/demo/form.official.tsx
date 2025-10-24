import { createFileRoute } from "@tanstack/react-router";
import {
  useAppForm,
  useMultiStepState,
  getAllFormData,
  type MultiStepFormData,
} from "@/components/form-steps/OfficialTanStackFormContext";
import { StepIndicator } from "@/components/form-steps";

export const Route = createFileRoute("/demo/form/official")({
  component: OfficialMultiStepForm,
});

function OfficialMultiStepForm() {
  // Use the official TanStack custom form hook
  const form = useAppForm({
    defaultValues: {
      step1: {
        title: "",
        description: "",
      },
      step2: {
        name: "",
        email: "",
        phone: "",
      },
      step3: {
        company: "",
        role: "",
        comments: "",
      },
    },
    validators: {
      // We can add form-level validation here if needed
    },
    onSubmit: ({ value }: { value: MultiStepFormData }) => {
      console.log("Final form submission:", value);

      // Show success message with all collected data
      alert(`Form submitted successfully!

Data collected:
• Step 1: ${value.step1.title} - ${value.step1.description}
• Step 2: ${value.step2.name} (${value.step2.email}, ${value.step2.phone})
• Step 3: ${value.step3.role} at ${value.step3.company}
${value.step3.comments ? `• Comments: ${value.step3.comments}` : ""}`);
    },
  });

  // Use multi-step state management
  const { currentStep, completedSteps, goToStep, goToNextStep, goToPrevStep } =
    useMultiStepState();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Step 1: Basic Information
              </h2>
              <p className="text-white/80">Tell us about your project</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                goToNextStep();
              }}
              className="space-y-6"
            >
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

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <div></div>

                <form.SubmitButton label="Next Step" color="blue" />
              </div>
            </form>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Step 2: Contact Details
              </h2>
              <p className="text-white/80">How can we reach you?</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                goToNextStep();
              }}
              className="space-y-6"
            >
              <form.Field
                name="step2.name"
                children={() => (
                  <form.TextField
                    label="Full Name"
                    placeholder="Enter your full name"
                  />
                )}
              />

              <form.Field
                name="step2.email"
                children={() => (
                  <form.EmailField
                    label="Email Address"
                    placeholder="Enter your email address"
                  />
                )}
              />

              <form.Field
                name="step2.phone"
                children={() => (
                  <form.PhoneField
                    label="Phone Number"
                    placeholder="Enter your phone number"
                  />
                )}
              />

              <div className="flex justify-between pt-6">
                <form.NavigationButton
                  label="Previous"
                  onClick={goToPrevStep}
                  variant="secondary"
                />

                <form.SubmitButton label="Next Step" color="blue" />
              </div>
            </form>
          </div>
        );
      case 3:
        const allData = getAllFormData(form);
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Step 3: Additional Information
              </h2>
              <p className="text-white/80">Tell us more about yourself</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="space-y-6"
            >
              <form.Field
                name="step3.company"
                children={() => (
                  <form.TextField
                    label="Company/Organization"
                    placeholder="Enter your company or organization"
                  />
                )}
              />

              <form.Field
                name="step3.role"
                children={() => (
                  <form.TextField
                    label="Your Role/Position"
                    placeholder="Enter your role or position"
                  />
                )}
              />

              <form.Field
                name="step3.comments"
                children={() => (
                  <form.TextAreaField
                    label="Additional Comments (Optional)"
                    placeholder="Any additional comments..."
                  />
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
                    {allData.step1?.title || "Not provided"}
                  </p>
                  <p>
                    <strong>Name:</strong>{" "}
                    {allData.step2?.name || "Not provided"}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    {allData.step2?.email || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <form.NavigationButton
                  label="Previous"
                  onClick={goToPrevStep}
                  variant="secondary"
                />

                <form.SubmitButton label="Submit Form" color="pink" />
              </div>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  const allFormData = getAllFormData(form);

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-white"
      style={{
        backgroundImage:
          "radial-gradient(50% 50% at 5% 40%, #add8e6 0%, #0000ff 70%, #00008b 100%)",
      }}
    >
      <div className="w-full max-w-3xl p-8 rounded-xl backdrop-blur-md bg-black/50 shadow-xl border-8 border-black/10">
        {/* Step Indicator */}
        <StepIndicator
          currentStep={currentStep}
          completedSteps={completedSteps}
          totalSteps={3}
          onStepClick={goToStep}
        />

        {/* Render Current Step */}
        {renderStep()}

        {/* Progress Info */}
        <div className="mt-6 text-center text-white/60 text-sm">
          Step {currentStep} of 3 • {completedSteps.length} step
          {completedSteps.length !== 1 ? "s" : ""} completed
          {allFormData.step1?.title && <span> • Basic info saved</span>}
          {allFormData.step2?.name && <span> • Contact info saved</span>}
          {allFormData.step3?.company && <span> • Additional info saved</span>}
        </div>
      </div>
    </div>
  );
}
