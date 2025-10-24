interface StepIndicatorProps {
  currentStep: number;
  completedSteps: number[];
  totalSteps: number;
  onStepClick: (step: number) => void;
}

export function StepIndicator({
  currentStep,
  completedSteps,
  totalSteps,
  onStepClick,
}: StepIndicatorProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-4">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex items-center">
            <button
              onClick={() => onStepClick(step)}
              disabled={step > Math.max(...completedSteps, currentStep)}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                step === currentStep
                  ? "bg-blue-600 text-white"
                  : completedSteps.includes(step)
                    ? "bg-green-600 text-white cursor-pointer hover:bg-green-700"
                    : step <= Math.max(...completedSteps, currentStep)
                      ? "bg-white/20 text-white cursor-pointer hover:bg-white/30"
                      : "bg-white/10 text-white/50 cursor-not-allowed"
              }`}
            >
              {completedSteps.includes(step) ? "✓" : step}
            </button>
            {step < totalSteps && (
              <div
                className={`w-8 h-0.5 mx-2 ${
                  completedSteps.includes(step) ? "bg-green-600" : "bg-white/20"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
