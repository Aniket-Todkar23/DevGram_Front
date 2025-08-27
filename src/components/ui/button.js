import React from "react";

export const Button = ({ className, children, ...props }) => (
  <button
    className={`w-full py-2 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-lg transition ${className}`}
    {...props}
  >
    {children}
  </button>
);
