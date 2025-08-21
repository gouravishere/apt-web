import React from "react";
import DetailedProgressCard from "../Dashboard/DashboardComponents/DetailedProgressCard/DetailedProgressCard";
import DetailedCard from "../Dashboard/DashboardComponents/DetailedCard/DetailedCard";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Heading from "../../components/Heading/Heading";

const DetailedCardDetails = [
  { label: "PAN", content: "ABCDE9999A" },
  { label: "Assessment year", content: "AY 2024 - 2025" },
  { label: "Country", content: "India" },
  { label: "Last Updated on", content: "07 Nov 2024" },
];

const LeadDetailsPage = () => {
  return (
    <div className="flex flex-col w-full gap-4 py-8 ">
     
      <DetailedCard
        details={DetailedCardDetails}
        variant="border"
        FirstButtonText={"Upload Documents"}
        progressStatus={
          "Finish your pending steps now to stay on track and avoid delays."
        }
        percentage={60}
        heading={"Income Tax Return File"}
        idNumber={"#9428376"}
        isStatusTab={false}
      />
      <DetailedProgressCard />
    </div>
  );
};

export default LeadDetailsPage;
