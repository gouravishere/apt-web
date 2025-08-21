import React, { useState, useEffect } from "react";

const MultiSelectTabs = ({ options, allowMultiSelect = false, onSelect }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    if (options?.length > 0) {
      // Automatically select the first option on initial render
      const initialSelection = [options[0]?.documentId];
      setSelectedOptions(initialSelection);

      // Notify the parent about the initial selection
      if (onSelect) {
        onSelect(initialSelection);
      }
    }
  }, [options]);

  const toggleOption = (option) => {
    let updatedSelections;

    if (allowMultiSelect) {
      if (selectedOptions.includes(option.documentId)) {
        updatedSelections = selectedOptions.filter(
          (id) => id !== option.documentId
        );
      } else {
        updatedSelections = [...selectedOptions, option.documentId];
      }
    } else {
      updatedSelections = [option.documentId];
    }

    setSelectedOptions(updatedSelections);

    // Notify the parent about the updated selections
    if (onSelect) {
      onSelect(updatedSelections);
    }
  };

  return (
      <div className="flex gap-2 overflow-x-auto pb-6 ">
        {options?.map((option) => (
          <button
            key={option.documentId}
            onClick={() => toggleOption(option)}
            className={`px-3 py-2 text-nowrap rounded-lg text-sm font-medium transition-all ${
              selectedOptions.includes(option.documentId)
                ? "bg-yellow-100 border-b-4 border-[#fedc60] text-black"
                : "bg-white border-b-4 border-gray-200 text-gray-500 hover:bg-gray-100"
            }`}
          >
            {option.name}
          </button>
        ))}
      </div>
  );
};

export default MultiSelectTabs;
