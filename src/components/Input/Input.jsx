import React, { useState, useEffect } from "react";

const Input = ({
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
  readOnly,
  handleBlur = () => {},
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState();

  useEffect(() => {
    if (initialValue) {
      setInputValue(initialValue);
    } else {
      setInputValue(value);
    }
  }, [initialValue, value]);

  const handleValueChange = (e) => {
    setIsTouched(false);
    if (type === "number") {
      const numericValue = e.target.value.replace(/[^0-9]/g, "");
      if (max && max > numericValue) {
        setInputValue(numericValue);
      }
    } else {
      setInputValue(e.target.value);
    }
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
      <input
        readOnly={readOnly}
        className={`placeholder:text-neutral-500 outline-none rounded-[8px] border font-['Poppins'] leading-snug appearance-none ${
          disabled
            ? "bg-[#f9fafa] shadow border border-[#dee5ec] cursor-not-allowed appearance-none text-[#9fafc5]"
            : "border"
        } ${
          size === "large"
            ? " h-24 px-6 py-4"
            : size === "medium"
            ? "text-md h-[44px] px-4 py-3"
            : "text-sm h-[38px] px-3 py-2"
        }`}
        style={{ appearance: 'textfield', MozAppearance: 'textfield' }} 
        id={fieldName}
        name={fieldName}
        placeholder={placeholder}
        type={type}
        min={min}
        step={step}
        value={inputValue}
        onChange={handleValueChange}
        onBlur={onBlur || handleInputBlur}
        disabled={disabled}
        max={max}
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

export default Input;
