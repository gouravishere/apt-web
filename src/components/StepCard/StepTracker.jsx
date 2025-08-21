import React from "react";
import StepCard from "./StepCard";

const StepTracker = ({ steps }) => {
  return (
    <div className="relative">
      {/* Steps Section */}
      <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 bg-white  relative w-full sm:w-11/12 m-auto border-b-[20px]  border-yellow-400 sm:border-none rounded-[32px] overflow-hidden px-6 sm:px-0  z-40">
        {steps.map((step, index) => (
          <>
            <StepCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              isLast={index === steps.length - 1}
              isFirst={index === 0}
            />
          </>
        ))}
      </div>

      {/* Yellow Section with Dots */}
      <div className="relative hidden lg:visible md:visible  bottom-[170px] rounded-[48px] lg:flex md:flex items-center w-full bg-primary-500 h-[286px]">
        {/* Dotted Line */}

        <div className="absolute bottom-[22.33%] w-[60%] m-auto left-5 right-5 border-t-2 border-dashed border-primary-200"></div>

        {/* Step Numbers */}
        <div className="flex absolute bottom-8 justify-evenly  w-full p-2 md:p-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className="relative flex items-center justify-center w-12 h-12 bg-primary-200 text-black font-bold rounded-full"
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepTracker;
