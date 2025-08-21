import React from "react";
import Heading from "../../../components/Heading/Heading";
import Seprator from "../../../components/Seprator/Seprator";
import Button from "../../../components/Button/Button";
import Subtitle from "../../../components/Subtitle/Subtitle";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactGA from "react-ga4";
import { formatIndianCurrency } from "../../../utils";

const PricingCard = ({
  label,
  price,
  features,
  onClick,
  data,
  planData,
  notes,
  perHour,
  lumpsum = false,
  allData,
  metaData,
}) => {
  const handleClick = (e) => {
    if (onClick) {
      ReactGA.event({
        category: "User Interaction",
        action: "Service Click",
        label: allData?.name || "Unknown Service",
        value: allData?.price || 0, // Sending price as value
        nonInteraction: false, // Ensures it's an interactive event
      });
      onClick(e);
    }
  };

  const handleData = (e) => {
    if (data) {
      data(e);
    }
  };

  const { accessToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className="border bg-white rounded-2xl px-6 py-7 flex flex-col gap-4 w-full">
      <Heading variant="xl">{label}</Heading>
      <Seprator />
      <Subtitle variant="sm" weight="medium">
        Key Features
      </Subtitle>
      <ul className="list-disc pl-3">
        {features?.map((data, index) => (
          <li className="text-[#051227] text-xs font-normal" key={index}>
            {data}
          </li>
        ))}
      </ul>

      <div>
        {notes?.length > 0 && (
          <div className="md:font-semibold font-normal">Notes :</div>
        )}
        {notes && (
          <ul className="flex flex-col pl-3">
            {notes?.map((note, index) => (
              <li
                key={index}
                className="text-xs list-disc md:font-medium font-normal"
              >
                {note}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Seprator className={"mt-auto"} />

      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          {(lumpsum || allData?.priceType === "NON_FIXED") &&
            price === undefined && (
              <div className="text-slate-600 text-[10px] font-normal">
                Final price may vary as per the requirement
              </div>
            )}
          {(lumpsum || allData?.priceType === "NON_FIXED") && (
            <>
              {price !== undefined && (
                <Subtitle variant="xs">Starting from</Subtitle>
              )}
            </>
          )}
          {price !== undefined && (
            <Heading variant="xxl">
              ₹{formatIndianCurrency(price)} <span className="text-sm font-medium">+ taxes</span>
              <span className="text-sm">{perHour && " per hour"}</span>
            </Heading>
          )}
        </div>
        <div className="hidden md:block min-h-10">
          <Button
            onClick={(e) => {
              if (accessToken) {
                handleClick(e);
                handleData({ label, price, features, planData });
              } else {
                alert("Please login to continue");
                navigate("/login", {
                  state: { ...metaData, x: e.pageX, y: e.pageY },
                });
              }
            }}
            className="h-full"
            variant="black"
            size="md"
          >
            {!allData?.ctaType && "File Now"}
            {allData?.ctaType === "FILENOW" && "File Now"}
            {allData?.ctaType === "BUYNOW" && "Buy Now"}
          </Button>
        </div>
      </div>

      <Button
        onClick={(e) => {
          if (accessToken) {
            handleClick(e);
            handleData({ label, price, features, planData });
          } else {
            alert("Please login to continue");
            navigate("/login", {
              state: { ...metaData, x: e.pageX, y: e.pageY },
            });
          }
        }}
        className="md:hidden min-h-10"
        variant="black"
        size="sm"
      >
        {!allData?.ctaType && "File Now"}
        {allData?.ctaType === "FILENOW" && "File Now"}
        {allData?.ctaType === "BUYNOW" && "Buy Now"}
      </Button>
      {(lumpsum || allData?.priceType === "NON_FIXED") &&
        price !== undefined && (
          <div className="text-slate-600 text-[10px] font-normal">
            Final price may vary as per the requirement
          </div>
        )}
    </div>
  );
};

export default PricingCard;
