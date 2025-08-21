import React from "react";

const EmailInput = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        Email (Optional)
      </label>
      <input
        type="email"
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your email"
      />
    </div>
  );
};

export default EmailInput;
