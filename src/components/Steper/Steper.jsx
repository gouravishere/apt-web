import React from "react";

const Step = ({ data, isLast }) => {
  return (
    <div className="">
      <div className="flex w-full relative items-center justify-between">
        <div className="relative flex items-center flex-row gap-4 justify-between w-full">
          <div className="flex items-center gap-4">
            <img
              className="w-5 h-5 rounded-full object-cover object-center"
              src={data?.img}
              alt=""
            />
            <div className="text-neutral-900 relative text-sm md:text-base font-medium font-['Poppins'] leading-tight">
              {data?.label}
            </div>
          </div>
          <div className="sm:static absolute -bottom-5 left-9 text-neutral-900 text-sm font-normal">
            {data.date} {/* Jul 18, 2024 at 108 PM */}
          </div>
        </div>
      </div>
      {(!isLast || data.children) && (
        <div className="ml-2 border-l border-[#f2f2f2] py-6 sm:py-4 px-8">
          {data?.children}
        </div>
      )}
    </div>
  );
};

const Steper = ({ data }) => {
  return (
    <div>
      {data?.map((item, index) => (
        <Step
          key={index}
          data={item}
          isLast={index === data.length - 1} 
        />
      ))}
    </div> 
  );
};

export default Steper;
