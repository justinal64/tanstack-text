import { createFormHookContexts, createFormHook } from "@tanstack/react-form";
import { useState } from "react";
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

// Create official TanStack Form contexts
export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

// Pre-bound field components using official TanStack pattern
function TextField({
  label,
  placeholder,
}: {
  label: string;
  placeholder?: string;
}) {
  const field = useFieldContext<string>();

  return (
    <div>
      <label className="block text-white/80 text-sm mb-1">{label}</label>
      <input
        type="text"
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
        placeholder={placeholder}
      />
      {field.state.meta.errors && (
        <div className="text-red-400 text-sm mt-1">
          {field.state.meta.errors.join(", ")}
        </div>
      )}
    </div>
  );
}

function TextAreaField({
  label,
  placeholder,
}: {
  label: string;
  placeholder?: string;
}) {
  const field = useFieldContext<string>();

  return (
    <div>
      <label className="block text-white/80 text-sm mb-1">{label}</label>
      <textarea
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 h-24"
        placeholder={placeholder}
      />
      {field.state.meta.errors && (
        <div className="text-red-400 text-sm mt-1">
          {field.state.meta.errors.join(", ")}
        </div>
      )}
    </div>
  );
}

function EmailField({
  label,
  placeholder,
}: {
  label: string;
  placeholder?: string;
}) {
  const field = useFieldContext<string>();

  return (
    <div>
      <label className="block text-white/80 text-sm mb-1">{label}</label>
      <input
        type="email"
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
        placeholder={placeholder}
      />
      {field.state.meta.errors && (
        <div className="text-red-400 text-sm mt-1">
          {field.state.meta.errors.join(", ")}
        </div>
      )}
    </div>
  );
}

function PhoneField({
  label,
  placeholder,
}: {
  label: string;
  placeholder?: string;
}) {
  const field = useFieldContext<string>();

  return (
    <div>
      <label className="block text-white/80 text-sm mb-1">{label}</label>
      <input
        type="tel"
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
        placeholder={placeholder}
      />
      {field.state.meta.errors && (
        <div className="text-red-400 text-sm mt-1">
          {field.state.meta.errors.join(", ")}
        </div>
      )}
    </div>
  );
}

// Pre-bound form components
function SubmitButton({
  label,
  color = "blue",
  type = "submit",
}: {
  label: string;
  color?: "blue" | "green" | "pink";
  type?: "submit" | "button";
}) {
  const form = useFormContext();

  const colorClasses = {
    blue: "bg-blue-600 hover:bg-blue-700",
    green: "bg-green-600 hover:bg-green-700",
    pink: "bg-pink-600 hover:bg-pink-700",
  };

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <button
          type={type}
          disabled={isSubmitting}
          className={`px-6 py-2 rounded-lg ${colorClasses[color]} text-white transition-colors`}
        >
          {isSubmitting ? "..." : label}
        </button>
      )}
    </form.Subscribe>
  );
}

function NavigationButton({
  label,
  onClick,
  variant = "secondary",
}: {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}) {
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-white/20 hover:bg-white/30 text-white",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-6 py-2 rounded-lg ${variantClasses[variant]} transition-colors`}
    >
      {label}
    </button>
  );
}

// Create the official TanStack custom form hook
export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    TextAreaField,
    EmailField,
    PhoneField,
  },
  formComponents: {
    SubmitButton,
    NavigationButton,
  },
  fieldContext,
  formContext,
});

// Multi-step navigation state manager (can be used with the official TanStack form)
export interface MultiStepState {
  currentStep: number;
  completedSteps: number[];
  goToStep: (step: number) => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;
}

export function useMultiStepState(): MultiStepState {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const goToStep = (step: number) => {
    const maxAllowedStep = Math.max(...completedSteps, 1);
    if (step <= maxAllowedStep + 1 && step <= 3) {
      setCurrentStep(step);
    }
  };

  const goToNextStep = () => {
    if (currentStep < 3) {
      setCompletedSteps((prev) => [...new Set([...prev, currentStep])]);
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return {
    currentStep,
    completedSteps,
    goToStep,
    goToNextStep,
    goToPrevStep,
  };
}

// Helper function to get all form data
export function getAllFormData(form: any) {
  return {
    step1: form.getFieldValue("step1"),
    step2: form.getFieldValue("step2"),
    step3: form.getFieldValue("step3"),
  };
}
