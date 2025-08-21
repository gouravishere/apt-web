import { useState } from "react";
// import worldMap from "../../../../../src/assets/images/World Map.jpg";
import callIcon from "../../../../assets/icons/callIcon.svg";
import emailIcon from "../../../../assets/icons/emailIcon.svg";
// import visitUsIcon from "../../../../assets/icons/visitUSIcon.svg";
import Accordion from "../../../../components/Accordion/Accordion";
import { jobOpenings } from "../../../../components/HomePage/FAQs/dummyData";
import TaxCard from "../../../../components/HomePage/TaxCard/TaxCard";
// import WorldMap from "../../../../components/WorldMap/WorldMap";

const GetText = () => {
  return (
    <div className="flex justify-center w-full mt-8">
      <div className="text-3xl font-medium space-x-3">
        <span>Get</span>
        <span className="relative ">
          i
          <span className="absolute left-1 -translate-x-1 bg-yellow-500 rounded-full w-2 h-2.5"></span>
        </span>
        n<span>Touch With Our Team</span>
      </div>
    </div>
  );
};
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div>
      <div>
        <div>
          <div className="flex justify-center w-full mt-52 mb-16">
            <div className="text-3xl font-medium ">
              <span>Frequently asked quest</span>
              <span className="relative ">
                i
                <span className="absolute left-1 -translate-x-1 bg-yellow-500 rounded-full w-2 h-2.5"></span>
              </span>
              ons
            </div>
          </div>
        </div>
        <div className="space-y-6 mx-16">
          {jobOpenings?.map((ele, i) => (
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
      </div>
    </div>
  );
};
export default function GetInTouchWithTeam() {
  const taxServices = [
    {
      icon: callIcon,
      title: "Chat to support",
      description:
        "Connect with our support team to have your queries resolved promptly.",
      buttonText: "Chat Now",
    },
    {
      icon: emailIcon,
      title: "Email us",
      description:
        "Kindly email us your concern, including the relevant subject and detailed information.",
      buttonText: "Email Now",
    },
  ];
  return (
    <div>
      <div className="text-center">
        <GetText />
      </div>
      {/* <WorldMap /> */}
      <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-12">
        {taxServices.map((service, index) => (
          <TaxCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
            buttonText={service.buttonText}
          />
        ))}
      </div>
      <FAQ />
    </div>
  );
}
