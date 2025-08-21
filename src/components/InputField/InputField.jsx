import React from "react";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  pattern,
  height,
  errorMessage,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm text-[#64748B] mb-2">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        pattern={pattern}
        className={`w-full border border-gray-300 rounded-lg px-[16px] py-[13px] focus:outline-none focus:ring-2 focus:ring-black h-${height}`}
      />
      {errorMessage && (
        <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputField;
