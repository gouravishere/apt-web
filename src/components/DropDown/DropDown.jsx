import React, { useState, useEffect, useRef } from "react";
import dropdownIcon from "../../assets/icons/dropDownArrow.svg";
import { CONSTANTS } from "../../pages/PricingPage/PricingConstant";

const DropDown = ({
  options = [],
  onOptionSelect,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  className = "",
  label,
  fieldName,
  required,
  errorMessage,
  validate,
  searchAble = false,
  selectedValue,
  defaultValue,
  borderRequired = true,
  resetDropdown,
  setResetDropdown,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState(
    options.find((option) => option.name === defaultValue) || null
  ); // Set default value
  const [isTouched, setIsTouched] = useState(false);
  const [error, setError] = useState("");

  const dropdownRef = useRef(null);

  // Sync internal selectedOption with external selectedValue
  useEffect(() => {
    if (selectedValue) {
      const matchedOption = options.find(
        (option) => option.name === selectedValue
      );
      setSelectedOption(matchedOption || null);
    }
  }, [selectedValue, options]);

  // Reset the selectedOption if resetDropdown is true
  useEffect(() => {
    if (resetDropdown) {
      setSelectedOption(null);
      setResetDropdown(false);
    }
  }, [resetDropdown]);

  const filteredOptions = options.filter((option) =>
    option?.label?.toLowerCase().includes(search.toLowerCase())
  );

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setSearch("");
    if (onOptionSelect) onOptionSelect(option);
  };

  const handleBlur = () => {
    setIsTouched(true);
    if (validate) {
      const validationError = validate(
        selectedOption ? selectedOption.label : ""
      );
      setError(validationError);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

  return (
    <div
      className={`relative flex flex-col gap-[4px] w-full ${className}`}
      ref={dropdownRef}
      {...props}
    >
      {label && (
        <label
          htmlFor={fieldName}
          className="text-slate-500 text-sm font-medium font-['Poppins'] "
        >
          {label} {required && <span className="text-red-600">*</span>}
        </label>
      )}
      <div
        className={`relative ${
          borderRequired ? "border border-neutral-400" : ""
        } rounded-[8px] px-[16px] py-[11px] flex justify-between items-center cursor-pointer bg-white`}
        onClick={() => setIsOpen(!isOpen)}
        onBlur={handleBlur}
      >
        <span>
          {selectedOption ? (
            <span className="mr-2">
              {CONSTANTS[selectedOption.name] || selectedOption.name}
            </span>
          ) : (
            placeholder
          )}
        </span>
        <span className="text-gray-500">
          <img src={dropdownIcon} alt="" />
        </span>
      </div>

      {isOpen && (
        <div className="absolute h-auto top-[100%] border border-neutral-400 rounded-md bg-white shadow-lg w-full z-10 ">
          <ul className="max-h-40 overflow-y-auto ">
            {searchAble && (
              <input
                type="text"
                className="w-full px-[16px] py-[13px] border-b placeholder:text-[#515964] placeholder:text-[14px] outline-none text-sm font-normal font-['Poppins'] leading-snug"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            )}
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                className="px-[16px] py-[13px] hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={() => handleOptionClick(option)}
              >
                <span className="mr-2">
                  {CONSTANTS[option.name] || option.name}
                </span>
              </li>
            ))}
            {filteredOptions.length === 0 && (
              <li className="px-[16px] py-[13px] text-gray-500">
                No results found
              </li>
            )}
          </ul>
        </div>
      )}
      {isTouched && error && (
        <div className="Input__validation">
          <span className="text-red-500 text-[12px]">
            {errorMessage || error}
          </span>
        </div>
      )}
    </div>
  );
};

export default DropDown;
