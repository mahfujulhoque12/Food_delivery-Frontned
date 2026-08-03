import { cn } from "@/lib/utils";
import { useState } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface FormInputProps {
  label?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  type?: string;
  className?: string;
  value?: string | number;
  readOnly?: boolean;
  step?: number | string;
  min?: number;
  max?: number;
}
const FormInput = ({
  label,
  placeholder,
  register,
  error,
  type = "text",
  value,
  className,
  readOnly = false,
  step,
  min,
  max,
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="mt-4">
      {label && (
        <label className="text-sm font-normal text-[#413E55]">{label}</label>
      )}

      <div className="relative mt-1.5">
        <input
          type={inputType}
          step={step}
          min={min}
          max={max}
          {...register}
          placeholder={placeholder}
          value={value}
          readOnly={readOnly}
          className={cn(
            `w-full rounded-xl border bg-[#F8F9FD] px-3.5 py-2.5 pr-12 focus:outline-none
    ${error ? "border-red-500" : "border-[#CDCDCD66]"}`,
            className,
          )}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        )}
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
    </div>
  );
};

export default FormInput;
