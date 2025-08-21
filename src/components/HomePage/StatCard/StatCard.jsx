import React from "react";

const StatCard = ({ number, textColor, title, description }) => {
  return (
    <div className="flex flex-col gap-8 items-center ">
      <div className="relative p-6 flex items-center justify-center">
        {/* Badge Container */}
        <div
          className={`relative w-60 h-32 bg-primary-500 rounded-lg flex items-center justify-center`}
        >
          {/* Number */}
          <span className={`text-5xl font-semibold ${textColor}`}>
            {number}
          </span>
          {/* Cutout Effect */}
          <div className="absolute -bottom-6 -right-6 w-[74px] h-[74px] bg-[#fbfbfb] rounded-full"></div>
          <div className="absolute -bottom-4 right-10 w-10 h-10 bg-[#fbfbfb]  rounded-full"></div>
        </div>
      </div>
      <div className="text-center">
        {/* Title */}
        <h3 className="text-2xl font-semibold">{title}</h3>
        {/* Description */}
        <p className="text-sm text-gray-600 font-normal">{description}</p>
      </div>
    </div>
  );
};

export default StatCard;
