import React from "react";

const AssessmentYearSelector = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        Assessment Year
      </label>
      <select
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="2023-2024">2023-2024</option>
        <option value="2024-2025">2024-2025</option>
      </select>
    </div>
  );
};

export default AssessmentYearSelector;
