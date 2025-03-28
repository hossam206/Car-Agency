import * as React from "react";
import { cn } from "@/lib/utils";

type InputProps = {
  name: string;
  placeholder: string;
  value: string;
  dir?: string;
  id?: string;
  labelName?: string;
  className?: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      placeholder,
      value,
      id,
      labelName,
      className,
      type,
      dir,
      onChange,
      onBlur,
      error,
      disabled = false,
      required = false,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col w-full">
        {/* Label */}
        {labelName && (
          <label
            htmlFor={id}
            className={`text-sm font-medium text-gray-600 mb-1 ${
              dir === "rtl" ? "text-right" : "text-left"
            }`}
          >
            {labelName} {required && <span className="text-red-500">*</span>}
          </label>
        )}

        {/* Input Field */}
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          min={0}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          dir={dir}
          className={cn(
            "customInput border-gray-300  transition",
            disabled && "bg-gray-100 cursor-not-allowed",
            className
          )}
          ref={ref}
          {...props}
        />

        {/* Error Message */}
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
