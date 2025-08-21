import React from "react";
import exportIcon from "../../assets/icons/export.svg"

const LinkOpenerCard = ({label}) => {
  return (
    <div className="md:px-6 px-3 md:py-4 py-2 bg-white rounded-lg border border-neutral-300 justify-center items-center gap-4 inline-flex">
      <div className="text-neutral-900 md:text-base text-sm text-now font-medium font-['Poppins'] leading-normal">
        {label}
      </div>
      <div className="w-6 h-6 justify-center items-center flex">
        <img src={exportIcon} alt="" />
      </div>
    </div>
  );
};

export default LinkOpenerCard;
