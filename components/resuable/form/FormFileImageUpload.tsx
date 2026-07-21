/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { useRef } from "react";
import type { FieldError, ControllerRenderProps } from "react-hook-form";
import { FaUpload } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

interface FormFileImageUploadProps {
  label: string;
  field: ControllerRenderProps<any, any>;
  error?: FieldError;
  className?: string;
  previewClassName?: string;
  url?: string;
}

const FormFileImageUpload = ({
  label,
  field,
  error,
  previewClassName,
  url,
}: FormFileImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const file = field.value || null;

  const handleUploadClick = () => inputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    field.onChange(selectedFile);
    e.target.value = "";
  };

  const removeFile = () => {
    field.onChange(null);
  };

  const getFileSrc = (file: string | File) => {
    if (typeof file === "string") {
      return url ? `${url}/${file}` : file;
    }
    return URL.createObjectURL(file);
  };

  const isImage = (file: string | File) => {
    if (typeof file === "string") {
      return /\.(jpg|jpeg|png|webp|gif)$/i.test(file);
    }
    return file.type.startsWith("image/");
  };

  return (
    <div>
      {/* Upload Area */}
      <div
        className="bg-[#F8F9FD] border border-[#DEDEDE] rounded-xl flex flex-col justify-center items-center py-6 gap-1 cursor-pointer hover:bg-[#E3E6F5] transition-colors"
        onClick={handleUploadClick}
      >
        <FaUpload />
        <p className="text-sm font-normal text-[#413E55] flex gap-1 mt-3.5">
          <span className="text-brand underline">Upload</span> {label}
        </p>
        <span className="text-[#605E71] text-xs">
          JPG, PNG, PDF, DOC less than 10MB
        </span>

        <input
          type="file"
          accept="image/*,.pdf,.doc,.docx"
          ref={inputRef}
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {/* Preview */}
      {file && (
        <div className="mt-3 grid grid-cols-4 gap-4">
          <div className="relative">
            {isImage(file) ? (
              <img
                src={getFileSrc(file)}
                alt="preview"
                className={cn(
                  "w-full h-24 object-cover rounded-lg",
                  previewClassName,
                )}
              />
            ) : (
              <div className="w-full h-24 flex items-center justify-center bg-gray-100 rounded-lg text-xs text-gray-600 text-center px-2">
                {typeof file === "string" ? file.split("/").pop() : file.name}
              </div>
            )}

            <button
              type="button"
              onClick={removeFile}
              className="absolute -top-2 -right-2 bg-[#2A70FF]/60 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              <IoMdClose size={16} />
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default FormFileImageUpload;
