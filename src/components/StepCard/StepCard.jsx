import React from "react";

const StepCard = ({ icon, title, description, isLast, isFirst }) => {
  return (
    <div
      className={`flex flex-col gap-6 items-center text-center md:bg-white border-b sm:border-none border-gray-300 py-10 px-4 min-w-60 relative ${
        isLast ? "border-none  xl:rounded-r-[32px]" : "border-gray-300"
      } ${isFirst ? "xl:rounded-l-[32px]" : ""}`}
    >
      {/* Custom right border */}
      {!isLast && (
        <div className="absolute top-[10%] right-0 h-[80%] w-0.5 xl:bg-gray-300"></div>
      )}

      <div className="flex items-center justify-center bg-yellow-300 rounded-full w-24 h-28">
        <img src={icon} alt={title} className="w-[50%]" />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

export default StepCard;
