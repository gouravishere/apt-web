import React from "react";
import CardContainer from "../DashboardComponents/CardContainer/CardContainer";
import DetailedCard from "../DashboardComponents/DetailedCard/DetailedCard";
import Heading from "../../../components/Heading/Heading";
import DashBoardHeading from "../DashboardComponents/DashBoardHeading/DashboardHeading";

const DetailedCardDetails = [
  { label: "PAN", content: "ABCDE9999A" },
  { label: "Assessment year", content: "AY 2024 - 2025" },
  { label: "Country", content: "India" },
  { label: "Last Updated on", content: "07 Nov 2024" },
];

const DocumentsTab = () => {
  return (
    <div className="flex w-full flex-col gap-8">
      <DashBoardHeading heading={"Documents"} />
      <CardContainer className={"flex w-full flex-col gap-8"}>
        <Heading variant="xl">Active Services</Heading>
        <DetailedCard
          variant="border"
          FirstButtonText={"Upload Documents"}
          borderVariant={"yellow"}
          progressStatus={"1 of 4 documents submitted"}
          loaderColor="semantic-success-200"
          percentage={60}
          heading={"Income Tax Return File"}
          idNumber={"#9428376"}
          details={DetailedCardDetails}
        />
      </CardContainer>
      <CardContainer className={"flex w-full flex-col gap-8"}>
        <Heading variant="xl">Past Services</Heading>
        <DetailedCard
          variant="border"
          FirstButtonText={"Upload Documents"}
          borderVariant={"yellow"}
          progressStatus={"1 of 4 documents submitted"}
          loaderColor="semantic-success-200"
          percentage={60}
          heading={"Income Tax Return File"}
          idNumber={"#9428376"}
          details={DetailedCardDetails}
          buttonVariant="outline"
        />
        <DetailedCard
          variant="border"
          FirstButtonText={"Upload Documents"}
          borderVariant={"yellow"}
          progressStatus={"1 of 4 documents submitted"}
          loaderColor="semantic-success-200"
          percentage={60}
          heading={"Income Tax Return File"}
          idNumber={"#9428376"}
          details={DetailedCardDetails}
          buttonVariant="outline"
        />
        <DetailedCard
          variant="border"
          FirstButtonText={"Upload Documents"}
          borderVariant={"yellow"}
          progressStatus={"1 of 4 documents submitted"}
          loaderColor="semantic-success-200"
          percentage={60}
          heading={"Income Tax Return File"}
          idNumber={"#9428376"}
          details={DetailedCardDetails}
          buttonVariant="outline"
        />
       
      </CardContainer>
    </div>
  );
};

export default DocumentsTab;
