import { cn } from "@/lib/utils";
import type {
  FieldValues,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

interface FormColorSelectProps<TFormValues extends FieldValues> {
  name: keyof TFormValues;
  colors: string[]; // any CSS color (hex, rgb, named color)
  label?: string;
  controlHelpers: {
    watch: UseFormWatch<TFormValues>;
    setValue: UseFormSetValue<TFormValues>;
  };
  multiple?: boolean;
  className?: string;
  selectedClass?: string;
  unselectedClass?: string;
}

const FormColorSelect = <TFormValues extends FieldValues>({
  name,
  colors,
  label,
  controlHelpers,
  multiple = true,
  className,
  selectedClass = "ring-2 ring-offset-2 ring-blue-500",
  unselectedClass = "ring-1 ring-gray-300",
}: FormColorSelectProps<TFormValues>) => {
  const { watch, setValue } = controlHelpers;
  const selectedValues: string[] = (watch(name as any) as string[]) || [];

  const handleClick = (color: string) => {
    let newValue: string[];
    if (multiple) {
      if (selectedValues.includes(color)) {
        newValue = selectedValues.filter((c) => c !== color);
      } else {
        newValue = [...selectedValues, color];
      }
    } else {
      newValue = [color];
    }
    setValue(name as any, newValue as any, { shouldValidate: true });
  };

  return (
    <div className={className}>
      {label && (
        <p className="text-sm font-medium text-gray-700 mb-1">{label}</p>
      )}
      <div className="flex flex-wrap gap-3 mt-2">
        {colors.map((color) => {
          const isSelected = selectedValues.includes(color);
          return (
            <button
              key={color}
              type="button"
              onClick={() => handleClick(color)}
              className={cn(
                "rounded bg-[#E8E8E8] p-2 transition-all flex items-center justify-center",
                isSelected ? selectedClass : unselectedClass,
              )}
            >
              <span
                className="block w-6 h-6 rounded-full"
                style={{ backgroundColor: color }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FormColorSelect;
