import React from "react";
import { breadcrumbLinks } from "../../pages/BlogsArticles/dummyData";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import design from "../../assets/icons/yellowQuaterCircle.svg";
import arrow from "../../assets/icons/full-yellow-black-arrow.svg";
import sparkle from "../../assets/icons/sparksBlack.svg";
import blogCloud from "../../assets/icons/BlogCloud.svg";
const HeadingBreadCrumb = ({
  isId = true,
  heading,
  description,
  rightDesign,
  leftDesign,
  isHeadingDesign = false,
  isBreadCrumb = true,
  isHeadingDesignArrow = false,
  subHeading,
  designCloud,
  sparkleRight = false,
  yellowDotLeft = false,
  yellowDotRight = false,
  oldAndNew = false,
  gratuity,
  faqArrow,
  faqQuestionIcon,
  excludePaths,
}) => {
  return (
    <div className="flex relative items-center justify-center flex-col lg:py-[80px] sm:py-[40px] py-[20px] pb-[20px] ">
      {leftDesign && (
        <img
          className="absolute -left-32 top-0 hidden md:block"
          src={design}
          alt=""
        />
      )}
      {rightDesign && (
        <img
          className="rotate-90 absolute -right-32 top-0 hidden md:block"
          src={design}
          alt=""
        />
      )}
      {isBreadCrumb && (
        <div className="mb-[24px]">
          <Breadcrumb
            excludePaths={excludePaths}
            isId={isId}
            links={breadcrumbLinks}
          />
        </div>
      )}
      <h1 className="relative xl:text-[40px] md:text-[30px] text-[20px] text-center font-semibold ">
        {heading}
        {designCloud && (
          <img
            src={blogCloud}
            alt=""
            className="absolute hidden md:block -top-5 -right-20"
          />
        )}
        {isHeadingDesignArrow && (
          <img
            src={arrow}
            className="absolute hidden md:block -left-[50%] -top-7"
            alt=""
          />
        )}
        {isHeadingDesign && (
          <img
            src={sparkle}
            className="absolute -rotate-[86deg] h-12 md:h-16 -left-9 -top-5"
            alt=""
          />
        )}
        {sparkleRight && (
          <img
            src={sparkle}
            alt=""
            className="absolute h-12 md:h-16 -top-5  -right-10 hidden md:block"
          />
        )}
        {yellowDotLeft && (
          <div className="absolute -left-5 top-3  hidden md:block bg-yellow-500 rounded-full w-2 h-2.5"></div>
        )}
        {yellowDotRight && (
          <div className="absolute -right-5 top-8 hidden md:block  bg-yellow-500 rounded-full w-2 h-2.5"></div>
        )}
        {oldAndNew && (
          <div className="absolute right-[68px] top-2  hidden md:block bg-yellow-500 rounded-full w-2 h-2.5"></div>
        )}
        {gratuity && (
          <div className="absolute left-[118px] top-2 hidden md:block bg-yellow-500 rounded-full w-2 h-2.5"></div>
        )}
      </h1>
      {subHeading && (
        <p className="text-sm text-center text-neutral-700">{subHeading}</p>
      )}
      {description && (
        <div className="relative max-w-[566px] text-center text-slate-600 md:text-sm text-[12px] font-normal leading-snug">
          {description}
          {faqArrow && (
            <>
              <img
              alt=""
                src={faqArrow}
                className="absolute -left-32 hidden md:block bottom-0"
              />
              <img
              alt=""
                src={faqQuestionIcon}
                className="absolute hidden md:block bottom-0 -right-24"
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default HeadingBreadCrumb;
