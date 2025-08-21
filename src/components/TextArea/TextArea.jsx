import React, { useState, useEffect, useRef } from "react";

const TextArea = ({
  step,
  label,
  placeholder,
  value,
  initialValue,
  fieldName,
  required,
  validate,
  errorMessage,
  size = "medium", // Default size is small
  onChange,
  type = "text",
  disabled = false,
  icon,
  min,
  onBlur,
  max,
  validateMsg,
  handleBlur = () => {},
  ...props
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState(initialValue || value);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleValueChange = (e) => {
    setIsTouched(false);
    setInputValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  const handleInputBlur = (e) => {
    setIsTouched(true);
    handleBlur(e);
    if (validate && typeof validate === "function") {
      const validationError = validate(e.target.value);
      setError(validationError || "");
    } else if (!validate && errorMessage) {
      setError(errorMessage);
    }
  };

  useEffect(() => {
    if (isTouched && errorMessage) {
      setError(errorMessage);
    }
  }, [isTouched, errorMessage]);

  // Determine which message to show
  const displayError = isTouched && error ? error : validateMsg;

  return (
    <div
      className={`flex flex-col gap-[4px] w-full ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <label
        htmlFor={fieldName}
        className={`text-slate-500 text-sm font-medium font-['Poppins'] leading-snug ${
          disabled ? "text-neutral-400" : ""
        }`}
      >
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <textarea
        ref={textareaRef}
        className={`placeholder:text-neutral-500 outline-none rounded-[8px] border font-['Poppins'] leading-snug appearance-none ${
          disabled
            ? "bg-[#f9fafa] shadow border border-[#dee5ec] cursor-not-allowed text-[#9fafc5]"
            : "border"
        } ${
          size === "large"
            ? " h-24 px-6 py-4"
            : size === "medium"
            ? "text-md h-[44px] px-4 py-3"
            : "text-sm h-[38px] px-3 py-2"
        }`}
        id={fieldName}
        name={fieldName}
        placeholder={placeholder}
        type={type}
        min={min}
        step={step}
        value={type === "number" && inputValue < 0 ? 0 : inputValue}
        onChange={handleValueChange}
        onBlur={onBlur || handleInputBlur}
        disabled={disabled}
        max={max}
        {...props}
      />
      {icon && <div className="Input-icon">{icon}</div>}
      {displayError && (
        <div className="Input__validation">
          <span className="text-red-500 text-[12px]">{displayError}</span>
        </div>
      )}
    </div>
  );
};

export default TextArea;
