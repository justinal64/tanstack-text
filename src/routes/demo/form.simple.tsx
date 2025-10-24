import { createFileRoute } from "@tanstack/react-router";

import {
  Step1BasicInfo,
  Step2ContactDetails,
  Step3AdditionalInfo,
  StepIndicator,
} from "@/components/form-steps";
import {
  MultiStepFormProvider,
  useMultiStepForm,
  type MultiStepFormData,
} from "@/components/form-steps/MultiStepFormContext";

export const Route = createFileRoute("/demo/form/simple")({
  component: MultiStepFormWrapper,
});

function MultiStepFormContent() {
  const { currentStep, completedSteps, goToStep, getAllFormData } =
    useMultiStepForm();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1BasicInfo showBackButton={false} />;
      case 2:
        return <Step2ContactDetails />;
      case 3:
        return <Step3AdditionalInfo />;
      default:
        return null;
    }
  };

  const allFormData = getAllFormData();

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

function MultiStepFormWrapper() {
  const handleFinalSubmit = (data: MultiStepFormData) => {
    console.log("Final form submission:", data);

    // Show success message with all collected data
    alert(`Form submitted successfully!

Data collected:
• Step 1: ${data.step1.title} - ${data.step1.description}
• Step 2: ${data.step2.name} (${data.step2.email}, ${data.step2.phone})
• Step 3: ${data.step3.role} at ${data.step3.company}
${data.step3.comments ? `• Comments: ${data.step3.comments}` : ""}`);
  };

  return (
    <MultiStepFormProvider onFinalSubmit={handleFinalSubmit}>
      <MultiStepFormContent />
    </MultiStepFormProvider>
  );
}
