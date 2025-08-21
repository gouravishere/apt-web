import { useState } from "react";

import sparkleIcon from "../../../assets/icons/Sparkle Icon.svg";
import PricingCard from "../../../components/PricingCard/PricingCard";
import ITRIcon from "../../../assets/icons/ITRicon.svg";
import ecaStandardIcon from "../../../assets/icons/ecastandardicon.svg";
import ecaAssistedIcon from "../../../assets/icons/ecaassistedicon.svg";
import FAQ from "./FAQ/FAQ";

const GetText = () => {
  return (
    <div className="flex justify-center w-full mt-20">
      <div className="text-3xl font-medium relative">
        <span>Pr</span>
        <span className="relative">
          i
          <span className="absolute left-1 -translate-x-1 bg-yellow-500 rounded-full w-2 h-2.5"></span>
        </span>
        cing
      </div>
    </div>
  );
};

const Des = () => {
  return (
    <div className="mt-7 mx-auto max-w-2xl text-center text-slate-500">
      The SIP Calculator helps you estimate the maturity value and pension
      amount you can expect from your National Pension Scheme (NPS) investments.
    </div>
  );
};

const Tabs = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
    if (onTabChange) {
      onTabChange(index);
    }
  };

  return (
    <div className="flex justify-center flex-wrap gap-4 mt-20">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg cursor-pointer text-sm sm:text-base whitespace-nowrap w-36 h-14
            ${
              activeTab === index
                ? "border-b-4 border-[#FDCE00] bg-[#f9f6e2]"
                : "bg-gray-50 shadow-lg"
            }`}
          onClick={() => handleTabClick(index)}
        >
          {tab.icon && (
            <img
              src={tab.icon}
              alt={tab.label}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
            />
          )}
          <span className="font-medium text-black">{tab.label}</span>
        </div>
      ))}
    </div>
  );
};

export default function Pricing() {
  const tabs = [
    { label: "Filing ITR" },
    { label: "GST" },
    { label: "FEMA" },
    { label: "ROC Filing" },
  ];

  const pricingData = [
    {
      icon: ITRIcon,
      heading: "ITR Filing with Agricultural Income",
      description:
        "Body information about the title in two or three lines,currently some random",
      features: [
        { feature1: "Feature 1" },
        { feature2: "Feature 2" },
        { feature3: "Feature 3" },
        { feature4: "Feature 4" },
      ],
      prices: 1199,
      buttonText: "File Now",
    },
    {
      icon: ecaStandardIcon,
      heading: "eCA Assisted - Standard method",
      description:
        "Body information about the title in two or three lines,currently some random",
      features: [
        { feature1: "Feature 1" },
        { feature2: "Feature 2" },
        { feature3: "Feature 3" },
        { feature4: "Feature 4" },
      ],
      prices: 999,
      buttonText: "File Now",
    },
    {
      icon: ecaAssistedIcon,
      heading: "eCA Assisted - Capital Gain",
      description:
        "Body information about the title in two or three lines,currently some random",
      features: [
        { feature1: "Feature 1" },
        { feature2: "Feature 2" },
        { feature3: "Feature 3" },
        { feature4: "Feature 4" },
      ],
      prices: 1999,
      buttonText: "File Now",
    },
  ];
  return (
    <div>
      <div className="relative flex justify-center items-center w-full mt-20">
        <img
          src={sparkleIcon}
          alt="sparkle icon"
          className="absolute mt-10 w-24 ml-36"
        />
        <GetText />
      </div>
      <Des />
      <Tabs
        tabs={tabs}
        onTabChange={(index) => console.log("Active Tab:", index)}
      />
      <div className="grid lg:grid-cols-3 mt-12 md:grid-cols-2 sm:grid-cols-1 gap-10">
        {pricingData.map((item, index) => (
          <PricingCard
            key={index}
            icon={item.icon}
            heading={item.heading}
            description={item.description}
            features={item.features}
            prices={item.prices}
            buttonText={item.buttonText}
          />
        ))}
      </div>
      <FAQ />
    </div>
  );
}
