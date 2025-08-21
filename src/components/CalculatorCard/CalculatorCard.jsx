import React from "react";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import ReactGA from "react-ga4";

const CalculatorCard = ({
  name,
  descripiton,
  route,
  isImage,
  isCTA = true,
  className,
  ctaText = "Calculate Now",
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Send event to GA4
    ReactGA.event({
      category: "Calculator Navigation",
      action: "Clicked on Calculator",
      label: name, // Track which calculator was clicked
    });
    navigate(route);
  };

  return (
    <div
      className={` w-full h-[255px] p-[24px] bg-white rounded-3xl border border-neutral-300 flex-col justify-start items-start gap-5 inline-flex ${className}`}
    >
      {isImage && (
        <div className="bg-gray-100 rounded-full">
          <img src={isImage} alt="" />
        </div>
      )}
      <div className="text-neutral-900 text-xl font-semibold font-['Poppins'] leading-[25px]">
        {name}
      </div>
      <div className="text-slate-600 text-sm font-normal font-['Poppins'] leading-snug">
        {descripiton}
      </div>
      {isCTA && (
        <Button
          onClick={handleClick}
          className="xl:min-h-[39px]"
          variant="outline"
        >
          {ctaText}
        </Button>
      )}
    </div>
  );
};

export default CalculatorCard;
