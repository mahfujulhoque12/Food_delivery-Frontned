/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";
import type {
  FieldError,
  ControllerRenderProps,
  UseFormRegisterReturn,
} from "react-hook-form";
import { FiChevronDown } from "react-icons/fi";
import { cn } from "../../../utils/cn";
import { FaPlus } from "react-icons/fa";
import AddCashbookCategoryModal from "@/components/cashbook/AddCashbookCategoryModal";

interface Option {
  label: string;
  value: string | number;
}

interface FormSelectAddNewProps {
  label?: string;
  options: Option[];
  placeholder?: string;
  field?: ControllerRenderProps<any, any>;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  className?: string;
  onChange?: (value: string) => void;
  value?: string | number;
}

const FormSelectAddNew = ({
  label,
  options,
  placeholder = "Select an option",
  field,
  register,
  error,
  className,
  onChange,
  value,
}: FormSelectAddNewProps) => {
  const selectProps = field ?? register;
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | number>(
    value ?? field?.value ?? "",
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Auto-select if only one option
  useEffect(() => {
    if (options.length === 1) {
      const onlyValue = options[0].value;
      const stringValue = String(onlyValue);

      setSelectedValue(stringValue);

      if (field && field.value !== stringValue) {
        field.onChange(stringValue);
      }

      if (!field && register?.onChange) {
        register.onChange({ target: { value: stringValue } } as any);
      }

      onChange?.(stringValue);
    }
  }, [options, field, register, onChange]);

  // Sync value from props/field
  useEffect(() => {
    if (value !== undefined) setSelectedValue(value);
    else if (field?.value !== undefined) setSelectedValue(field.value);
  }, [value, field?.value]);

  // Close dropdown when clicking outside
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
    setSelectedValue(val);
    setIsOpen(false);
    selectProps?.onChange?.({ target: { value: val } } as any); // react-hook-form
    onChange?.(String(val)); // custom
  };

  const selectedLabel =
    options.find((opt) => opt.value === selectedValue)?.label ?? placeholder;

  return (
    <>
      <div className="mt-4" ref={dropdownRef}>
        {label && (
          <label className="text-sm font-normal text-[#413E55]">{label}</label>
        )}

        <div
          className={cn(
            `relative bg-[#F8F9FD] border rounded-xl px-3.5 py-2.5 w-full mt-1.5 cursor-pointer
           flex items-center justify-between
           ${error ? "border-red-500" : "border-[#CDCDCD66]"} transition-colors`,
            className,
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`${selectedValue ? "text-black" : "text-gray-400"}`}>
            {selectedLabel}
          </span>
          <FiChevronDown
            className={cn(
              "text-gray-500 transition-transform",
              isOpen ? "rotate-180" : "rotate-0",
            )}
          />
        </div>

        {isOpen && (
          <div className="absolute z-50 mt-1 w-[90%] bg-white border border-[#CDCDCD66] rounded-xl shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <div
                key={option.value}
                className={cn(
                  "px-3.5 py-2.5 hover:bg-[#F0F0F0] cursor-pointer",
                  selectedValue === option.value && "bg-[#E8E8E8]",
                )}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </div>
            ))}

            <div className="">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex justify-center items-center gap-3 bg-brand py-2 px-5 text-white w-full cursor-pointer"
              >
                <FaPlus /> Add New Category
              </button>
            </div>
          </div>
        )}

        {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
      </div>
      {/* Modal */}
      {isModalOpen && (
        <AddCashbookCategoryModal setIsModalOpen={setIsModalOpen} />
      )}
    </>
  );
};

export default FormSelectAddNew;
