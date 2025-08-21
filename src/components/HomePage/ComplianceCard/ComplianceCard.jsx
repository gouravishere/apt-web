import React from "react";
import lightPentagon from "../../../assets/icons/PolygonLight.svg";
import darkPentagon from "../../../assets/icons/PolygonDark.svg";

const ComplianceCard = ({ title, description, iconUrl }) => {
  return (
    <div className="flex xl:min-w-[368px] flex-col gap-4 text-center w-auto">
      <div className="relative sm:h-32 h-24 flex items-center justify-center">
        <img
          className="absolute sm:h-32 h-24 sm:w-32 w-24 translate-middle"
          src={lightPentagon}
          alt=""
        />
        <img
          className="absolute sm:h-20 h-20 sm:w-28 w-24 translate-middle"
          src={darkPentagon}
          alt=""
        />
        <img
          className="w-8 h-8 translate-middle absolute"
          src={iconUrl}
          alt="icon"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-medium">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default ComplianceCard;
