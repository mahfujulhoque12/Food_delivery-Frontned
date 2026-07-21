import { cn } from "@/lib/utils";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormTextareaProps {
  label: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  className?: string;
  rows?: number;
  value?: string;
}

const FormTextarea = ({
  label,
  placeholder,
  register,
  error,
  className,
  value,
  rows = 4,
}: FormTextareaProps) => {
  return (
    <div className="mt-4">
      <label className="text-sm font-normal text-[#413E55]">{label}</label>

      <textarea
        {...register}
        placeholder={placeholder}
        rows={rows}
        value={value}
        className={cn(
          `bg-[#F8F9FD] border border-[#DEDEDE] rounded-xl px-3.5 py-2.5 w-full mt-1.5 resize-none focus:outline-none
          ${error ? "border-red-500" : "border-[#CDCDCD66]"}`,
          className,
        )}
      />

      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default FormTextarea;
