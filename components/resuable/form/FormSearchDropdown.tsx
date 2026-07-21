import { cn } from "@/lib/utils";
import { useEffect, useMemo, useRef, useState } from "react";
import type { FieldError, ControllerRenderProps } from "react-hook-form";

import { IoIosArrowDown } from "react-icons/io";

interface BaseOption {
  label: string;
  value: string;
}

interface FormSearchDropdownProps<T extends BaseOption> {
  label: string;
  field: ControllerRenderProps<any, any>;
  options: T[];
  placeholder?: string;
  error?: FieldError;
  disabled?: boolean;
}

function FormSearchDropdown<T extends BaseOption>({
  label,
  field,
  options,
  placeholder = "Select option",
  error,
  disabled = false,
}: FormSearchDropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtered options
  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.label.toLowerCase().includes(search.toLowerCase()),
    );
  }, [options, search]);

  const selectedOption = options.find((opt) => opt.value === field.value);

  return (
    <div className="w-full space-y-2" ref={containerRef}>
      <label className="text-sm font-normal text-[#413E55]">{label}</label>

      <div className="relative mt-2">
        {/* Trigger */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen((prev) => !prev)}
          className={cn(
            "w-full h-11 px-3 rounded-lg border text-left text-sm",
            "bg-[#F8F9FD] focus:outline-none  ",
            "flex items-center justify-between whitespace-nowrap overflow-hidden cursor-pointer",
            error ? "border-red-500" : "border-gray-200",
          )}
        >
          <span className="truncate">
            {selectedOption?.label || placeholder}
          </span>
          <span className="ml-2 text-gray-400">
            {" "}
            <IoIosArrowDown />
          </span>
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute z-50 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
            {/* Search input */}
            <div className="p-2 border-b border-gray-200">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-9 px-3 rounded-md border border-gray-200 text-sm focus:outline-none "
              />
            </div>

            {/* Options */}
            <ul className="max-h-52 overflow-y-auto text-sm">
              {filteredOptions.length === 0 && (
                <li className="px-3 py-2 text-gray-400">No options found</li>
              )}

              {filteredOptions.map((option) => (
                <li
                  key={option.value}
                  onClick={() => {
                    field.onChange(option.value);
                    setOpen(false);
                    setSearch("");
                  }}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer truncate"
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-500 mt-1">{error.message}</p>}
    </div>
  );
}

export default FormSearchDropdown;
