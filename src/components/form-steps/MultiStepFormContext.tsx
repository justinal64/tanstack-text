import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

// Combined schema for all steps
const multiStepSchema = z.object({
  step1: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
  }),
  step2: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
  }),
  step3: z.object({
    company: z.string().min(1, "Company is required"),
    role: z.string().min(1, "Role is required"),
    comments: z.string(),
  }),
});

export type MultiStepFormData = z.infer<typeof multiStepSchema>;

// Create form context
const MultiStepFormContext = createContext<{
  form: any; // TanStack Form instance
  currentStep: number;
  setCurrentStep: (step: number) => void;
  completedSteps: number[];
  setCompletedSteps: (steps: number[]) => void;
  goToStep: (step: number) => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  getAllFormData: () => MultiStepFormData;
} | null>(null);

// Provider component
interface MultiStepFormProviderProps {
  children: ReactNode;
  onFinalSubmit: (data: MultiStepFormData) => void;
}

export function MultiStepFormProvider({
  children,
  onFinalSubmit,
}: MultiStepFormProviderProps) {
  const form = useForm({
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
      onSubmit: multiStepSchema,
    },
    onSubmit: ({ value }) => {
      console.log("Final multi-step form submission:", value);
      onFinalSubmit(value);
    },
  });

  // Step navigation state
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const goToStep = useCallback(
    (step: number) => {
      const maxAllowedStep = Math.max(...completedSteps, 1);
      if (step <= maxAllowedStep + 1 && step <= 3) {
        setCurrentStep(step);
      }
    },
    [completedSteps]
  );

  const goToNextStep = useCallback(() => {
    if (currentStep < 3) {
      setCompletedSteps((prev) => [...new Set([...prev, currentStep])]);
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep]);

  const goToPrevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const getAllFormData = useCallback(() => {
    return {
      step1: form.getFieldValue("step1") || { title: "", description: "" },
      step2: form.getFieldValue("step2") || { name: "", email: "", phone: "" },
      step3: form.getFieldValue("step3") || {
        company: "",
        role: "",
        comments: "",
      },
    };
  }, [form]);

  const contextValue = useMemo(
    () => ({
      form,
      currentStep,
      setCurrentStep,
      completedSteps,
      setCompletedSteps,
      goToStep,
      goToNextStep,
      goToPrevStep,
      getAllFormData,
    }),
    [
      form,
      currentStep,
      completedSteps,
      goToStep,
      goToNextStep,
      goToPrevStep,
      getAllFormData,
    ]
  );

  return (
    <MultiStepFormContext.Provider value={contextValue}>
      {children}
    </MultiStepFormContext.Provider>
  );
}

// Hook to use the form context
export function useMultiStepForm() {
  const context = useContext(MultiStepFormContext);
  if (!context) {
    throw new Error(
      "useMultiStepForm must be used within MultiStepFormProvider"
    );
  }
  return context;
}
