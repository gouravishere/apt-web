import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";

import "react-phone-input-2/lib/bootstrap.css";

const InputPhone = ({
  label = "Phone Number",
  fieldName = "phoneNumber",
  required = false,
  disabled = false,
  error = "",
  isTouched = false,
  onChange,
  value = "",
  isLabel = true,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");

  const handleChange = (value, country) => {
    let dialCode = country?.dialCode || "";

    // If value is empty (backspace pressed on an empty input)
    if (!value) {
      setPhoneNumber("");
      setCountryCode("");
      if (onChange) {
        onChange({ countryCode: "", phoneNumber: "" });
      }
      return;
    }

    // Remove dial code if it's still present
    let newPhoneNumber = value.startsWith(`+${dialCode}`)
      ? value.slice(dialCode.length + 1).trim() // Remove dial code including the "+"
      : value;

    // Prevent re-adding the country code
    if (newPhoneNumber === "") {
      setPhoneNumber("");
      setCountryCode("");
    } else {
      setPhoneNumber(newPhoneNumber);
      setCountryCode(""); // Ensure country code is cleared
    }

    if (onChange) {
      onChange({
        countryCode: "",
        phoneNumber: newPhoneNumber,
      });
    }
  };

  return (
    <div
      className={`flex flex-col gap-[4px] w-full ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {isLabel && (
        <label
          htmlFor={fieldName}
          className={`text-slate-500 text-sm font-medium text-nowrap font-['Poppins'] leading-snug ${
            disabled ? "text-neutral-400" : ""
          }`}
        >
          {label} {required && <span className="text-red-600">*</span>}
        </label>
      )}
      <PhoneInput
        className={`placeholder:text-neutral-500 placeholder:text-[14px] outline-none rounded-[8px] border text-sm font-normal font-['Poppins'] leading-snug appearance-none ring-0 active:ring-0 focus:ring-0 `}
        country={"in"}
        placeholder="Enter phone number"
        value={value ? value : `${countryCode}${phoneNumber}`}
        onChange={(e, phone) => handleChange(e, phone, fieldName)}
        // onlyCountries={["in", "ae", "sg", "sa", "om", "kw", "qa"]}
        inputStyle={{
          border: "none",
          height: "100%",
          width: "100%",
          paddingTop: "13px",
          paddingBottom: "13px",
          outline: "none",
          boxShadow: "none",
        }}
        // disableDropdown={true}
        inputProps={{
          disableDropdown: false,
          required: true,
          autoFocus: false,
        }}
      />
      {isTouched && error && (
        <div className="Input__validation">
          <span className="text-red-500 text-[12px]">{error}</span>
        </div>
      )}
    </div>
  );
};

export default InputPhone;
