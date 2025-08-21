import React from "react";
import ComplianceCard from "../ComplianceCard/ComplianceCard";
import { dummyData } from "./dummyData";

const WhyChooseUs = () => {
  return (
    <div className="flex flex-col gap-20 py-24 bg-[#F5F5F5] xl:px-32 sm:px-16 px-0">
      <div className="text-[32px] font-medium text-center">Why Choose Us</div>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12">
        {dummyData.map((item) => (
          <ComplianceCard
            key={item.id}
            title={item.title}
            description={item.description}
            iconUrl={item.iconUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
