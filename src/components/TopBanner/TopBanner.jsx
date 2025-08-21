import React from "react";
import Button from "../Button/Button";
import star from "../../assets/icons/starFill.svg";

const Banner = ({
  imageSrc,
  headingText,
  subheadingText,
  buttonText,
  onButtonClick,
  background,
}) => {
  const highlightedText = headingText.replace(
    /ezyfiling/gi,
    (match) => `<span class="bg-[#fddc5e] px-1">${match}</span>`
  );

  return (
    <div
      className="lg:grid md:grid sm:flex mt-5 mobile:flex sm:flex-col-reverse mobile:flex-col-reverse items-center gap-x-14 grid-cols-2 rounded-3xl bg-white"
      style={{ background: background }}
    >
      <div className="flex justify-center lg:pl-20 mobile:px-5 py-10 flex-col gap-6">
        <div className="flex flex-col gap-4 items-center ">
          <p
            className="lg:text-4xl md:text-xl mobile:text-xl font-semibold"
            dangerouslySetInnerHTML={{ __html: highlightedText }}
          />
          <div className="self-start">
            <div className="text-3xl w-fit bg-[#fddc5e] px-1 self-start mt-1 font-semibold">
              ezyfiling
            </div>
            <p className="text-sm font-normal self-start">{subheadingText}</p>
          </div>
          <div className="text-xl w-fit self-start mt-1 font-semibold">
            Your Global Compliance Partner
          </div>
          <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2 justify-start self-start flex-col">
            <span className="flex items-center gap-2 text-nowrap">
              <img className="h-8" src={star} alt="" /> Company Incorporation{" "}
            </span>
            <span className="flex items-center gap-2 text-nowrap">
              <img className="h-8" src={star} alt="" />
              Business Consulting
            </span>
            <span className="flex items-center gap-2 text-nowrap">
              <img className="h-8" src={star} alt="" />
              Book Keeping & Accounting{" "}
            </span>
            <span className="flex items-center gap-2 text-nowrap">
              <img className="h-8" src={star} alt="" />
              Virtual CFO{" "}
            </span>

            <span className="flex items-center gap-2 text-nowrap">
              <img className="h-8" src={star} alt="" />
              Tax Filling & Compliances{" "}
            </span>
          </div>
          {/* <div className="text-xl w-fit self-start mt-1 font-semibold">
            Across the Countries
          </div>
          <ul className="list-disc pl-5 flex items-center flex-wrap gap-8 self-start custom-list">
            <li>India</li>
            <li>UAE</li>
            <li>Saudi Arabia</li>
            <li>Oman</li>
            <li>Qatar</li>
            <li>Kuwait</li>
            <li>Singapore</li>
          </ul> */}
        </div>
        <div className="">
          <Button variant="black" size="md" onClick={onButtonClick}>
            {buttonText}
          </Button>
        </div>
      </div>
      <div className="flex justify-end lg:h-[566px] mobile:[290px]">
        <img
          className="w-full h-full object-cover"
          src={imageSrc}
          alt="Banner"
        />
      </div>
    </div>
  );
};

export default Banner;
