import type {
  FieldValues,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { cn } from "../../../utils/cn";

interface FormSizeSelectProps<TFormValues extends FieldValues> {
  name: keyof TFormValues; // RHF field name
  options: string[]; // list of values
  label?: string;
  controlHelpers: {
    watch: UseFormWatch<TFormValues>;
    setValue: UseFormSetValue<TFormValues>;
  };
  multiple?: boolean; // allow multi-select
  className?: string; // container class
  selectedClass?: string; // class when selected
  unselectedClass?: string; // class when not selected
}

const FormSizeSelect = <TFormValues extends FieldValues>({
  name,
  options,
  label,
  controlHelpers,
  multiple = true,
  className,
  selectedClass = "bg-brand text-white border-blue-500",
  unselectedClass = "bg-[#E8E8E8] text-gray-700 border-gray-300 hover:bg-gray-100",
}: FormSizeSelectProps<TFormValues>) => {
  const { watch, setValue } = controlHelpers;

  const selectedValues: string[] = (watch(name as any) as string[]) || [];

  const handleClick = (value: string) => {
    const current = selectedValues || [];

    let newValue: string[];
    if (multiple) {
      if (current.includes(value)) {
        newValue = current.filter((v) => v !== value);
      } else {
        newValue = [...current, value];
      }
    } else {
      newValue = [value];
    }

 
    setValue(name as any, newValue as any, { shouldValidate: true });
  };

  return (
    <div className={className}>
      {label && (
        <p className="text-sm font-normal text-[#413E55] mb-2">{label}</p>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selectedValues.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => handleClick(option)}
              className={cn(
                " rounded-sm p-2.5 border font-medium text-sm transition-all",
                isSelected ? selectedClass : unselectedClass
              )}
            >
              {option.toUpperCase()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FormSizeSelect;
