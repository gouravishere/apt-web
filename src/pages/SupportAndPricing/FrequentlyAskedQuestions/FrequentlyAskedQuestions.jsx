import { useState } from "react";
import Accordion from "../../../components/Accordion/Accordion";
import HeadingBreadCrumb from "../../../components/HeadingBreadCrumb/HeadingBreadCrumb";
import TabsVertical from "../../../components/TabsVertical/TabsVertical";
import FaqCountryBased from "../../../utils/FaqCountryBasedJson/FaqCountryBased";
import CountryTabs from "../../../components/CountryTabs/CountryTabs";
import IndiaFlag from "../../../assets/icons/indiaFlag.svg";
import UAEFlag from "../../../assets/icons/uaeFlag.svg";
import QatarFlag from "../../../assets/icons/qatarFlag.svg";
import ArabiaFlag from "../../../assets/icons/arabiaFlag.svg";
import SingaporeFlag from "../../../assets/icons/singaporeFlag.svg";
import KuwaitFlag from "../../../assets/icons/kuwait-flag-round-circle-icon.svg";
import OmanFlag from "../../../assets/icons/oman-flag-round-icon.svg";
import Banner from "../../../components/Banner/Banner";
import FaqQuestionIcon from "../../../assets/icons/FaqQuestion.svg";
import FaqArrow from "../../../assets/icons/FaqArrow.svg";
import FaqYellowarrow from "../../../assets/icons/FaqYellowarrow.svg";

export default function FrequentlyAskedQuestions() {
  const [openIndex, setOpenIndex] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [currentCountry, setCurrentCountry] = useState(0);
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const onTabChange = (index) => {
    setCurrentTab(index);
    setOpenIndex(null);
  };

  const onCountryChange = (index) => {
    setCurrentCountry(index);
    setCurrentTab(0);
    setOpenIndex(null);
  };

  const countryNumber = {
    0: "India",
    1: "UAE",
    2: "SaudiArabia",
    3: "Oman",
    4: "Qatar",
    5: "Kuwait",
    6: "Singapore",
  };
  const countryTabLabel = [
    { label: "India", icon: IndiaFlag },
    { label: "UAE", icon: UAEFlag },
    { label: "Saudi Arabia", icon: ArabiaFlag },
    { label: "Oman", icon: OmanFlag },
    { label: "Qatar", icon: QatarFlag },
    { label: "Kuwait", icon: KuwaitFlag },
    { label: "Singapore", icon: SingaporeFlag },
  ];

  const tabVerticalLabel = [
    { label: "Login" },
    { label: "Tax Filing" },
    { label: "GST Service" },
    { label: "FEMA" },
    { label: "ROC Filing" },
  ];

  const tabVerticalLabelOthers = [
    { label: "Login" },
    { label: "Company Setup" },
    { label: "Tax Filing" },
    { label: "Accounting and Management" },
  ];

  return (
    <div className="px-12 md:px-8 lg:px-16 py-8">
      {/* Heading Section */}
      <div className="relative">
        <HeadingBreadCrumb
          faqArrow={FaqArrow}
          faqQuestionIcon={FaqQuestionIcon}
          heading="Frequently Asked Questions"
          description="Have questions? We've compiled a list of the most common queries to help you navigate our platform with ease."
        />
      </div>

      <div className="flex justify-center">
        <CountryTabs tabs={countryTabLabel} onTabChange={onCountryChange} />
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row mt-8 gap-8">
        {/* Tabs Section */}
        <div className="w-full md:w-1/5">
          <TabsVertical
            key={currentCountry}
            className="justify-center"
            tabs={
              currentCountry == 0 ? tabVerticalLabel : tabVerticalLabelOthers
            }
            onTabChange={onTabChange}
          />
        </div>

        {/* FAQ Content Section */}
        <div className="w-full md:w-3/4 relative">
          <div className="relative text-xl mb-6 font-bold">
            <div className="absolute top-1/2 -translate-y-1/2 grid grid-cols-2 gap-1">
              <div className="w-4 h-4 border-2 border-black rounded-md"></div>
              <div className="w-4 h-4 border-2 border-black rounded-md"></div>
              <div className="w-4 h-4 border-2 border-black rounded-md"></div>
              <div className="w-4 h-4 border-2 border-black rounded-md"></div>
            </div>
            <span className="pl-12">
              {
                (currentCountry === 0
                  ? tabVerticalLabel
                  : tabVerticalLabelOthers)[currentTab]?.label
              }
            </span>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-6">
            {FaqCountryBased[currentCountry][countryNumber[currentCountry]][
              currentTab
            ]?.map((ele, i) => (
              <Accordion
                key={i}
                heading={ele?.title}
                isOpen={openIndex === i}
                onToggle={() => handleToggle(i)}
                containerClass="border-b-[1px] border-b-neutral-400"
                titleClass="text-base py-4 px-4"
                childClass="pl-4 py-2"
              >
                <p>{ele?.desc}</p>
              </Accordion>
            ))}
          </div>
          <img
            src={FaqYellowarrow}
            className="absolute -left-1/4  bottom-1/4"
          />
        </div>
      </div>
      <Banner />
    </div>
  );
}
