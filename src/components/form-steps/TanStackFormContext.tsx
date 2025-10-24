import { createFormHookContexts, createFormHook } from "@tanstack/react-form";
import { z } from "zod";

// Create the official TanStack Form contexts
export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

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
}: {
  label: string;
  color?: "blue" | "green" | "pink";
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
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-2 rounded-lg ${colorClasses[color]} text-white transition-colors`}
        >
          {isSubmitting ? "..." : label}
        </button>
      )}
    </form.Subscribe>
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
  },
  fieldContext,
  formContext,
});
