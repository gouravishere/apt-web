import React from "react";

const AgeSelector = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        Age Group
      </label>
      <select
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="Below 60">Below 60</option>
        <option value="60-80">60-80</option>
        <option value="Above 80">Above 80</option>
      </select>
    </div>
  );
};

export default AgeSelector;
