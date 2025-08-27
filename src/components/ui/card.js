import React from "react";

export const Card = ({ className, children }) => (
  <div className={`rounded-2xl shadow-lg border border-gray-700 bg-black/60 backdrop-blur-xl ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ className, children }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);
