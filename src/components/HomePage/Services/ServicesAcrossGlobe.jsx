import React, { useEffect, useState } from "react";
import TaxCard from "../TaxCard/TaxCard";
import {
  taxServices,
  uaeServices,
  saudiArabiaServices,
  kuwaitServices,
  qatarServices,
  singaporeServices,
  omanServices,
} from "./dummyData";
import Tabs from "../../Tabs/Tabs";
import IndiaFlag from "../../../assets/icons/indiaFlag.svg";
import UAEFlag from "../../../assets/icons/uaeFlag.svg";
import QatarFlag from "../../../assets/icons/qatarFlag.svg";
import ArabiaFlag from "../../../assets/icons/arabiaFlag.svg";
import SingaporeFlag from "../../../assets/icons/singaporeFlag.svg";
import OmanFlag from "../../../assets/icons/oman-flag-round-icon.svg";
import KuwaitFlag from "../../../assets/icons/kuwait-flag-round-circle-icon.svg";
import lockDesign from "../../../assets/icons/lockDesign.svg";
import topArrows from "../../../assets/icons/ArrowsTopBlack.svg";
import leftArrow from "../../../assets/icons/arrowHome.svg";
import quaterCircle from "../../../assets/icons/yellowQuaterCircle.svg";

const ServicesAcrossGlobe = () => {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the screen size is mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleViewAllClick = () => {
    setShowAll(true);
  };
  const countries = [
    {
      icon: IndiaFlag,
      label: "India",
      content: (
        <div>
          <div className=" grid lg:grid-cols-2 sm:grid-cols-1 mobile:grid-cols-1 md:grid-cols-2 gap-10">
            {(showAll || !isMobile ? taxServices : taxServices.slice(0, 3)).map(
              (service, index) => (
                <TaxCard
                  key={index}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  buttonText={service.buttonText}
                  onButtonClick={service.onButtonClick}
                />
              )
            )}
          </div>
          {isMobile && taxServices.length > 3 && !showAll && (
            <div className="text-center mt-4">
              <button
                className="px-6 py-3 rounded-full border bg-white text-sm font-medium"
                onClick={handleViewAllClick}
              >
                View All Services
              </button>
            </div>
          )}
        </div>
      ),
    },
    {
      icon: UAEFlag,
      label: "UAE",
      content: (
        <div>
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 mobile:grid-cols-1 md:grid-cols-2 gap-10">
            {(showAll || !isMobile ? uaeServices : uaeServices.slice(0, 3)).map(
              (service, index) => (
                <TaxCard
                  key={index}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  buttonText={service.buttonText}
                  onButtonClick={service.onButtonClick}
                />
              )
            )}
          </div>
          {isMobile && uaeServices.length > 3 && !showAll && (
            <div className="text-center mt-4">
              <button
                className="px-6 py-3 rounded-full border bg-white text-sm font-medium"
                onClick={handleViewAllClick}
              >
                View All Services
              </button>
            </div>
          )}
        </div>
      ),
    },
    {
      icon: ArabiaFlag,
      label: "Saudi Arabia",
      content: (
        <div>
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 mobile:grid-cols-1 md:grid-cols-2 gap-10">
            {(showAll || !isMobile
              ? saudiArabiaServices
              : saudiArabiaServices.slice(0, 3)
            ).map((service, index) => (
              <TaxCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                buttonText={service.buttonText}
                onButtonClick={service.onButtonClick}
              />
            ))}
          </div>
          {isMobile && saudiArabiaServices.length > 3 && !showAll && (
            <div className="text-center mt-4">
              <button
                className="px-6 py-3 rounded-full border bg-white text-sm font-medium"
                onClick={handleViewAllClick}
              >
                View All Services
              </button>
            </div>
          )}
        </div>
      ),
    },
    {
      icon: OmanFlag,
      label: "Oman",
      content: (
        <div>
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 mobile:grid-cols-1 md:grid-cols-2 gap-10">
            {(showAll || !isMobile
              ? omanServices
              : omanServices.slice(0, 3)
            ).map((service, index) => (
              <TaxCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                buttonText={service.buttonText}
                onButtonClick={service.onButtonClick}
              />
            ))}
          </div>
          {isMobile && omanServices.length > 3 && !showAll && (
            <div className="text-center mt-4">
              <button
                className="px-6 py-3 rounded-full border bg-white text-sm font-medium"
                onClick={handleViewAllClick}
              >
                View All Services
              </button>
            </div>
          )}
        </div>
      ),
    },
    {
      icon: QatarFlag,
      label: "Qatar",
      content: (
        <div>
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 mobile:grid-cols-1 md:grid-cols-2 gap-10">
            {(showAll || !isMobile
              ? qatarServices
              : qatarServices.slice(0, 3)
            ).map((service, index) => (
              <TaxCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                buttonText={service.buttonText}
                onButtonClick={service.onButtonClick}
              />
            ))}
          </div>
          {isMobile && qatarServices.length > 3 && !showAll && (
            <div className="text-center mt-4">
              <button
                className="px-6 py-3 rounded-full border bg-white text-sm font-medium"
                onClick={handleViewAllClick}
              >
                View All Services
              </button>
            </div>
          )}
        </div>
      ),
    },
    {
      icon: KuwaitFlag,
      label: "Kuwait",
      content: (
        <div>
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 mobile:grid-cols-1 md:grid-cols-2 gap-10">
            {(showAll || !isMobile
              ? kuwaitServices
              : kuwaitServices.slice(0, 3)
            ).map((service, index) => (
              <TaxCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                buttonText={service.buttonText}
                onButtonClick={service.onButtonClick}
              />
            ))}
          </div>
          {isMobile && kuwaitServices.length > 3 && !showAll && (
            <div className="text-center mt-4">
              <button
                className="px-6 py-3 rounded-full border bg-white text-sm font-medium"
                onClick={handleViewAllClick}
              >
                View All Services
              </button>
            </div>
          )}
        </div>
      ),
    },
    {
      icon: SingaporeFlag,
      label: "Singapore",
      content: (
        <div>
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 mobile:grid-cols-1 md:grid-cols-2 gap-10">
            {(showAll || !isMobile
              ? singaporeServices
              : singaporeServices.slice(0, 3)
            ).map((service, index) => (
              <TaxCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                buttonText={service.buttonText}
                onButtonClick={service.onButtonClick}
              />
            ))}
          </div>
          {isMobile && singaporeServices.length > 3 && !showAll && (
            <div className="text-center mt-4">
              <button
                className="px-6 py-3 rounded-full border bg-white text-sm font-medium"
                onClick={handleViewAllClick}
              >
                View All Services
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];
  return (
    <div className="flex relative flex-col gap-20 my-24">
      <img
        className="hidden xl:block absolute -left-40 top-24"
        src={leftArrow}
        alt=""
      />
      <img
        className="hidden xl:block absolute -left-28 top-[60%]"
        src={topArrows}
        alt=""
      />
      <img
        className="hidden xl:block absolute -right-36 top-[80%]"
        src={lockDesign}
        alt=""
      />
      <img
        className="hidden xl:block absolute -right-40 rotate-90 -top-24"
        src={quaterCircle}
        alt=""
      />
      <div className="text-[32px] font-medium text-center">
        Services Across the Globe
      </div>
      <div className="">
        <Tabs tabs={countries} onTabChange={(index) => console.log(index)} />
      </div>
    </div>
  );
};

export default ServicesAcrossGlobe;
