import React from "react";
import Button from "../Button/Button";

const ServiceBanner = ({
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
      <div className="flex justify-center lg:pl-20 mobile:px-5 py-10 flex-col gap-12">
        <div className="flex flex-col gap-4 items-center ">
          <p
            className="lg:text-4xl md:text-xl mobile:text-xl font-semibold"
            dangerouslySetInnerHTML={{ __html: highlightedText }}
          />
          <p className="text-base font-normal">{subheadingText}</p>
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

export default ServiceBanner;