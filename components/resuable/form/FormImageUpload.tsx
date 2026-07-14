import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import type { FieldError, ControllerRenderProps } from "react-hook-form";
import { FaUpload } from "react-icons/fa";

import { IoMdClose } from "react-icons/io";

interface FormImageUploadProps {
  label: string;
  field: ControllerRenderProps<any, any>;
  error?: FieldError;
  className?: string;
  previewClassName?: string;
  url?: string; // optional base URL for server image
}

const FormImageUpload = ({
  label,
  field,
  error,
  previewClassName,
  url,
}: FormImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  console.log(url, "ur");

  // Update preview if field.value changes (server URL or filename)
  useEffect(() => {
    if (!field.value) {
      setPreview(null);
      return;
    }

    if (typeof field.value === "string") {
      // If URL prop provided, append filename
      setPreview(url ? `${url}/${field.value}` : field.value);
    } else if (field.value instanceof File) {
      setPreview(URL.createObjectURL(field.value));
    }
  }, [field.value, url]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      field.onChange(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setPreview(null);
    field.onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleUploadClick = () => inputRef.current?.click();

  return (
    <div>
      {/* Upload Area */}
      <div
        className="bg-[#F8F9FD] border border-[#DEDEDE] rounded-xl flex flex-col justify-center items-center py-6 gap-1 cursor-pointer hover:bg-[#E3E6F5] transition-colors"
        onClick={handleUploadClick}
      >
        <FaUpload />
        <p className="text-sm font-normal text-[#413E55] flex gap-1 mt-3.5">
          <span className="text-brand underline flex gap-1">Upload</span>
          {label}
        </p>
        <span className="text-[#605E71] text-xs font-normal">
          JPG, PNG less than 10 MB
        </span>

        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {/* Preview */}
      {preview && (
        <div className="mt-3 relative w-32 h-32">
          <img
            src={preview}
            alt="Preview"
            className={cn(
              "w-full h-20 object-cover rounded-lg",
              previewClassName,
            )}
          />

          <button
            type="button"
            onClick={removeImage}
            className="absolute cursor-pointer -top-2 -right-2 bg-[#2A70FF]/60 text-white rounded-full w-6 h-6 flex items-center justify-center"
          >
            <IoMdClose size={16} />
          </button>
        </div>
      )}

      {/* Error */}
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default FormImageUpload;
