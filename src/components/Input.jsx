import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref,
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-2 inline-block text-sm font-semibold text-[#F9FAFB]">
          {label}
        </label>
      )}

      <input
        {...props}
        id={id}
        type={type}
        ref={ref}
        className={`
          w-full
          rounded-lg
          border
          border-[#374151]
          bg-[#273449]
          px-3.5
          py-2.5
          text-[#F9FAFB]
          outline-none
          transition-all
          duration-200
          placeholder:text-[#6B7280]
          focus:border-[#2A9D8F]
          focus:ring-2
          focus:ring-[#2A9D8F]/15
          ${className}
        `}
      />
    </div>
  );
});

export default Input;
