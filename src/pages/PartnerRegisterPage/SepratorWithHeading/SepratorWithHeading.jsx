import React from "react";
import Seprator from "../../../components/Seprator/Seprator";

const SepratorWithHeading = ({heading , isBold=false}) => {
  return (
    <div className="w-full flex gap-4 items-center">
      <div className={`text-slate-600 text-nowrap text-sm ${isBold ? "font-bold" : "font-normal"}`}>{heading}</div>
      <Seprator/>
    </div>
  );
};

export default SepratorWithHeading;
