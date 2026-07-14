/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";
import type { FieldError, ControllerRenderProps } from "react-hook-form";
import { FiChevronDown } from "react-icons/fi";

interface Option {
  label: string;
  value: string | number;
}

interface FormSelectProps {
  label?: string;
  options: Option[];
  placeholder?: string;
  field?: ControllerRenderProps<any, any>; // Controller only (clean)
  error?: FieldError;
  className?: string;
  onChange?: (value: string | number) => void;
  value?: string | number | null;
  disabled?: boolean;
}

const FormSelect = ({
  label,
  options,
  placeholder = "Select an option",
  field,
  error,
  className,
  onChange,

  value,
  disabled = false,
}: FormSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 🎯 SINGLE SOURCE OF TRUTH
  const selectedValue = value ?? field?.value ?? null;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string | number) => {
    if (disabled) return;

    field?.onChange?.(val);
    onChange?.(val);
    setIsOpen(false);
  };

  const selectedLabel =
    options.find((opt) => String(opt.value) === String(selectedValue))?.label ??
    placeholder;

  return (
    <div className="mt-4 relative" ref={dropdownRef}>
      {label && (
        <label className="text-sm font-normal text-[#413E55]">{label}</label>
      )}

      {/* Select Box */}
      <div
        className={cn(
          `relative bg-[#F8F9FD] border rounded-xl px-3.5 py-2.5 w-full mt-1.5 cursor-pointer
           flex items-center justify-between
           ${error ? "border-red-500" : "border-[#CDCDCD66]"} transition-colors`,
          className,
        )}
        onClick={() => {
          if (disabled) return;
          setIsOpen((prev) => !prev);
        }}
      >
        <span
          className={`${
            selectedValue !== undefined ? "text-black" : "text-gray-400"
          }`}
        >
          {selectedLabel}
        </span>

        <FiChevronDown
          className={cn(
            "text-gray-500 transition-transform",
            isOpen ? "rotate-180" : "rotate-0",
          )}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-[#CDCDCD66] rounded-xl shadow-lg max-h-60 overflow-auto">
          {options.length > 0 ? (
            options.map((option) => (
              <div
                key={option.value}
                className={cn(
                  "px-3.5 py-2.5 hover:bg-[#F0F0F0] cursor-pointer",
                  String(selectedValue) === String(option.value) &&
                    "bg-[#E8E8E8]",
                )}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="px-3.5 py-2.5 text-gray-400">
              No options available
            </div>
          )}
        </div>
      )}

      {/* Error */}
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default FormSelect;
