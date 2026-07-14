/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import type { FieldError, ControllerRenderProps } from "react-hook-form";
import { cn } from "../../../utils/cn";
import { UploadIcon } from "../../icons/Icons";
import { IoMdClose } from "react-icons/io";

interface FormMultiImageUploadProps {
  label: string;
  field: ControllerRenderProps<any, any>;
  error?: FieldError;
  className?: string;
  previewClassName?: string;
  url?: string; // optional base URL
}

const FormMultiImageUpload = ({
  label,
  field,
  error,
  previewClassName,
  url,
}: FormMultiImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const images = field.value || [];

  const handleUploadClick = () => inputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    field.onChange([...(field.value || []), ...fileArray]);
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    const updated = images.filter((_: any, i: number) => i !== index);
    field.onChange(updated);
  };

  const getImageSrc = (img: string | File) => {
    if (typeof img === "string") {
      return url ? `${url}/${img}` : img;
    }
    return URL.createObjectURL(img);
  };

  return (
    <div>
      {/* Upload Area */}
      <div
        className="bg-[#F8F9FD] border border-[#DEDEDE] rounded-xl flex flex-col justify-center items-center py-6 gap-1 cursor-pointer hover:bg-[#E3E6F5] transition-colors"
        onClick={handleUploadClick}
      >
        <UploadIcon />
        <p className="text-sm font-normal text-[#413E55] flex gap-1 mt-3.5">
          <span className="text-brand underline">Upload</span> {label}
        </p>
        <span className="text-[#605E71] text-xs">JPG, PNG less than 10MB</span>

        <input
          type="file"
          accept="image/*"
          multiple
          ref={inputRef}
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {/* Preview */}
      {images.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-4">
          {images.map((img: string | File, index: number) => (
            <div
              key={index}
              className="relative max-h-40 max-w-40 w-full h-full"
            >
              <img
                src={getImageSrc(img)}
                alt="preview"
                className={cn(
                  "object-cover rounded-lg h-full w-full",
                  previewClassName,
                )}
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-[#2A70FF]/60 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                <IoMdClose size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default FormMultiImageUpload;
