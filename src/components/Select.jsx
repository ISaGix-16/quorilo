import React, { useId } from "react";

function Select({ options, label, className = "", ...props }, ref) {
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

      <select
        {...props}
        id={id}
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
          focus:border-[#2A9D8F]
          focus:ring-2
          focus:ring-[#2A9D8F]/15
          ${className}
        `}>
        {options?.map((option) => (
          <option
            key={option}
            value={option}
            className="bg-[#1F2937] text-[#F9FAFB]">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
