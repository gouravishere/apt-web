import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calenderLogo from "../../assets/icons/calenderLogo.svg";

const Datepicker = ({
  label,
  selected,
  onChange,
  placeholderText = "Choose a date",
  className = "",
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-[4px] w-full ${className}`} {...props}>
      <label
        htmlFor="date-picker"
        className="text-slate-500 relative text-sm font-medium text-nowrap font-['Poppins'] leading-snug"
      >
        {label}
        <label htmlFor="datePicker">
          <img
            className="absolute right-5 top-9 z-40"
            src={calenderLogo}
            alt="calendar"
          />
        </label>
      </label>

      <DatePicker
        id="datePicker"
        onChange={onChange}
        className="placeholder:text-neutral-500 w-full placeholder:text-[14px] outline-none rounded-[8px] border-neutral-400 border text-sm font-normal font-['Poppins'] leading-snug px-[16px] py-[13px] appearance-none -webkit-appearance-none -moz-appearance-none"
        selected={selected}
        placeholderText={placeholderText}
        dateFormat="dd MMM yyyy" // Display only day, month (abbreviated), and year
      />
    </div>
  );
};

export default Datepicker;
