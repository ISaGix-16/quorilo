/* eslint-disable no-unused-vars */
// import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <div
      className={`px-4 py-4 rounded-lg ${bgColor} ${textColor} ${className}`}
      {...props}>
      {children}
    </div>
  );
}

export default Button;
