import React from "react";

const Subtitle = ({
  children,
  variant = "default",
  color = "default",
  className = "",
  weight = "default",
}) => {
  let variantClass = "";
  let colorClass = "";
  let weightClass = "";

  // Handle variant-specific styles
  switch (variant) {
    case "xxl":
      variantClass = "text-2xl";
      break;
    case "xl":
      variantClass = "text-xl";
      break;
    case "base":
      variantClass = "text-base";
      break;
    case "sm":
      variantClass = "text-sm";
      break;
    case "xs":
      variantClass = "text-xs";
      break;
    default:
      variantClass = "text-sm sm:text-base ";
  }

  // Handle color-specific styles
  switch (color) {
    case "black":
      colorClass = "text-black";
      break;
    case "green":
      colorClass = "text-semantic-success-200";
      break;
      case "red":
      colorClass = "text-red-600";
      break;
    default:
      colorClass = "text-slate-500";
  }

  switch (weight) {
    case "medium":
      weightClass = "font-medium";
      break;
    default:
      weightClass = "font-normal";
  }

  return (
    <div
      className={`${variantClass} ${colorClass} ${weightClass} ${className}`}
    >
      {children}
    </div>
  );
};

export default Subtitle;
