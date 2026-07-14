import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface RadioOption {
  label: string;
  value: string;
}

interface FormRadioGroupProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: RadioOption[];
  rules?: object;
  className?: string;
}

const FormRadioGroup = <T extends FieldValues>({
  name,
  control,
  label,
  options,
  rules,
  className = "",
}: FormRadioGroupProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className={`mt-4 ${className}`}>
          <label className="text-sm font-normal text-[#413E55]">{label}</label>

          <div className="flex flex-wrap items-center gap-6 mt-2">
            {options.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <input
                  type="radio"
                  value={option.value}
                  checked={field.value === option.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>

          {fieldState.error && (
            <p className="text-xs text-red-500 mt-1">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default FormRadioGroup;
