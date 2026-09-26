import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-[#2A9D8F]",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`
        inline-flex
        items-center
        justify-center
        rounded-lg
        px-5
        py-2.5
        text-sm
        font-semibold
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:shadow-md
        active:translate-y-0
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${bgColor}
        ${textColor}
        ${className}
      `}
      {...props}>
      {children}
    </button>
  );
}

export default Button;
