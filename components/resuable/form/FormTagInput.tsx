import { useState, useRef } from "react";
import type { ControllerRenderProps, FieldError } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { cn } from "../../../utils/cn";

interface FormTagInputProps {
  field: ControllerRenderProps<any, any>;
  error?: FieldError;
  placeholder?: string;
  label?: string;
  className?: string;
}

const FormTagInput = ({
  field,
  error,
  placeholder,
  label,
  className,
}: FormTagInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Add tag
  const addTag = (value: string) => {
    const trimmed = value.trim();
    if (trimmed && !field.value.includes(trimmed)) {
      field.onChange([...field.value, trimmed]);
    }
  };

  // Remove tag
  const removeTag = (index: number) => {
    field.onChange(field.value.filter((_: string, i: number) => i !== index));
  };

  // Handle key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
      setInputValue("");
    } else if (e.key === "Backspace" && inputValue === "") {
      removeTag(field.value.length - 1);
    }
  };

  return (
    <div className={className}>
      {label && (
        <p className="text-sm font-normal text-[#413E55] mt-4">{label}</p>
      )}

      <div
        className={cn(
          `bg-[#F8F9FD]  border-[#DEDEDE] border rounded-xl px-3.5 py-2.5 w-full mt-1.5 focus:right-0 focus:outline-none
          ${error ? "border-red-500" : "border-[#CDCDCD66]"}
        `,
          className,
        )}
        onClick={() => inputRef.current?.focus()}
      >
        {field.value.map((tag: string, index: number) => (
          <div
            key={index}
            className="flex items-center bg-brand/20 text-brand px-2 py-1 rounded-full text-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="ml-1 text-xs"
            >
              <IoMdClose />
            </button>
          </div>
        ))}

        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 outline-none text-sm p-1 min-w-[120px]"
        />
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default FormTagInput;
