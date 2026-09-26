import React from "react";

const Button = React.forwardRef(function Button(
  {
    children,
    type = "button",
    bgColor = "bg-blue-500",
    className = "",
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={`px-4 py-2 rounded-lg text-white ${bgColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;