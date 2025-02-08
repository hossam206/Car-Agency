import * as React from "react";
import { cn } from "@/lib/utils";

type InputProps = {
  name: string;
  placeholder: string;
  value: string;
  id?: string;
  labelName?: string;
  className?: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
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
      onChange,
      onBlur,
      error,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col items-start justify-center w-full">
        {/* Label */}
        {labelName && (
          <label htmlFor={id} className="text-sm font-medium mb-1 text-gray-500">
            {labelName}
          </label>
        )}

        {/* Input Field - Use `input` instead of `Input` */}
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={cn(
            "flex h-10 w-full rounded-md border border-solid border-gray-300 bg-transparent px-3 py-2 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-md",
            className
          )}
          ref={ref}
          {...props}
        />

        {/* Error Message */}
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
