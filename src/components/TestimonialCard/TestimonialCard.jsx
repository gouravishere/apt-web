import React from "react";
import collenIcon from "../../assets/icons/collenIcon.svg";

const TestimonialCard = ({ image, name, title, company, quote }) => {
  return (
    <div className="flex items-center justify-between gap-8 rounded-lg">
      <div className="lg:h-[538px] h-auto flex gap-10 items-center ">
        <div className="hidden mobile:hidden sm:hidden lg:block md:block h-full w-full max-w-[374px] max-h-[538px]">
          <img src={image} alt={name} className=" object-cover object-center h-full w-full rounded-3xl" />
        </div>
        <div className="py-[58px] h-full rounded-3xl bg-[#F7F7F7] px-[70px]">
          <div className="flex flex-col gap-10">
            <img src={collenIcon} alt="icon" className="h-12 w-12" />
            <p className=" font-light italic text-2xl">{quote}</p>
            <div className="flex gap-5 items-center">
              <div className="lg:hidden md:hidden">
                <img
                  src={image}
                  alt={name}
                  className="rounded-3xl mobile:rounded-full mobile:h-[56px] mobile:w-[56px]"
                />
              </div>
              <div>
                <p className="text-base font-semibold">{name}</p>
                <p className="font-light">
                  {title},{company}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
