import React from "react";

const CardContainer = ({
  variant = "default",
  children,
  className,
  padding = "default",
}) => {
  let cardStyle = "";
  let paddingStyle = "";
  const commonClasses = "bg-white sm:rounded-lg md:rounded-2xl";

  switch (variant) {
    case "border":
      cardStyle = " border border-neutral-200";
      break;
    case "yellow-border":
      cardStyle = " border-l-4 border-primary-500";
      break;
    default:
      cardStyle = " drop-shadow-md";
      break;
  }

  switch (padding) {
    case "p-4":
      paddingStyle = "p-4";
      break;
    default:
      paddingStyle = "md:p-8 p-3";
      break;
  }

  return (
    <div className={`${cardStyle} ${className} ${paddingStyle} ${commonClasses} w-full h-auto`}>
      {children}
    </div>
  );
};

export default CardContainer;
