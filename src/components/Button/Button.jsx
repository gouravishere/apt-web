import React from "react";
import "./Button.css";
const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  isLoading = false,
  isDisabled = false,
  className = "",
  iconLeft = null,
  iconRight = null,
}) => {
  const baseStyles =
    "button-animation inline-flex items-center justify-center text-nowrap font-medium rounded focus:outline-none transition duration-50 ease-in-out";

  let animationClasses;
  let variantStyles;
  let textColor;
  switch (variant) {
    case "primary":
      variantStyles =
        'h-12 text-xs md:px-6 px-4 py-2 md:py-3.5 bg-primary-500 rounded-[99px] justify-center items-center flex';
      break;
    case "secondary":
      variantStyles =
        "bg-gray-500 text-white hover:bg-gray-600 focus:ring focus:ring-gray-300";
      break;
    case "danger":
      variantStyles =
        "bg-red-500 text-white hover:bg-red-600 focus:ring focus:ring-red-300";
      break;
    case "yellow":
      variantStyles =
        "h-12 text-xs md:px-6 px-4 py-2 md:py-3.5 bg-primary-200 rounded-[99px] justify-center items-center flex";
      break;
    case "outline":
      animationClasses = "bg-neutral-900 text-white";
      variantStyles =
        "border rounded-full text-xs border-black hover:text-white";
      break;
    case "link":
      variantStyles =
        "text-blue-500 hover:underline focus:ring focus:ring-blue-300";
      break;
    case "black":
      animationClasses = "bg-primary-500 ";
      variantStyles =
        "bg-black text-white hover:text-black rounded-full text-xs";
      break;
    case "disabled":
      animationClasses = "";
      variantStyles =
        "bg-gray-500 cursor-not-allowed text-white rounded-full text-xs";
      break;
    default:
      variantStyles =
        "bg-blue-500 text-white hover:bg-blue-600 focus:ring focus:ring-blue-300";
      break;
  }

  let sizeStyles;
  switch (size) {
    case "sm":
      sizeStyles = "px-3 py-1.5 text-sm";
      break;
    case "md":
      sizeStyles = "md:px-6 px-4 md:py-3 py-2 text-base";
      break;
    case "lg":
      sizeStyles = "px-5 py-3 text-lg";
      break;
    default:
      sizeStyles = "px-4 py-2 text-base";
      break;
  }

  const disabledStyles = "opacity-50 cursor-not-allowed";

  const buttonClasses = `${baseStyles} ${
    isDisabled || isLoading ? disabledStyles : ""
  } ${className}`;

  return (
    <button
      type={type}
      onClick={!isDisabled && !isLoading ? onClick : undefined}
      disabled={isDisabled || isLoading}
      className={`${buttonClasses}  ${variantStyles} overflow-hidden`}
    >
      {isLoading ? (
        <span className="flex items-center">
          <span className="loader w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          Loading...
        </span>
      ) : (
        <>
          {iconLeft && <span className="mr-2">{iconLeft}</span>}
          <ul className={` ${variantStyles} h-full w-full`}>
            <li
              className={` ${sizeStyles} ${textColor} text-nowrap flex flex-nowrap justify-center items-center`}
            >
              {children}
              <span className={`${animationClasses}`}></span>
              <span className={`${animationClasses}`}></span>
              <span className={`${animationClasses}`}></span>
              <span className={`${animationClasses}`}></span>
            </li>
          </ul>
          {iconRight && <span className="ml-2">{iconRight}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
