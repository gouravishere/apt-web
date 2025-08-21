import React from "react";


const CalculatorInputsContainer = ({ children }) => {
  return (
    <div className="w-full flex flex-col md:p-[40px] px-[12px] py-4 pt-8 justify-center items-center drop-shadow-2xl bg-white md:rounded-[40px] rounded-2xl gap-[40px]">
      {children}
    </div>
  );
};

export default CalculatorInputsContainer;
