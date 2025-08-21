import React from "react";

const SelectBox = ({ label, name, checked = false, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      {/* Checkbox Input */}
      <input
        type="checkbox"
        id={name}
        name={name}
        // checked={checked}
        onChange={onChange}
        className="w-5 h-5 border-[#DFE5EC] border-none rounded-lg cursor-pointer checked:bg-black checked:border-transparent"
      />

      {/* Label */}
      <label
        htmlFor={name}
        className="text-gray-900 text-sm font-medium cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
};

export default SelectBox;
