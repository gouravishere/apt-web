import React from "react";
import CardContainer from "../CardContainer/CardContainer";
import Button from "../../../../components/Button/Button";
import Seprator from "../../../../components/Seprator/Seprator";
import Heading from "../../../../components/Heading/Heading";
import Steper from "../../../../components/Steper/Steper";

const DetailedProgressCard = ({
  onUploadClick,
  stepsData,
  details,
  planName,
}) => {
  return (
    <CardContainer
      variant="border"
      className={"flex flex-col pb-10 w-full gap-4"}
    >
      <div className="flex justify-between w-full">
        <div className="flex gap-3 items-center">
          <div className="text-neutral-900 text-xl font-medium font-['Poppins'] leading-[30px]">
            Summary
          </div>

          <div className="h-[37px] px-4 py-2 bg-[#f8f9fa] rounded-[32px] border border-neutral-200 justify-center items-center gap-2 inline-flex">
            {planName && (
              <div className="text-center text-slate-600 text-sm font-medium font-['Poppins'] leading-[21px]">
                {planName}
              </div>
            )}
          </div>
        </div>
        <Button
          onClick={onUploadClick}
          className="sm:inline-block hidden"
          variant="outline"
        >
          Upload Documents
        </Button>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 md:flex gap-4 items-center justify-between">
        <Button
          className="inline-block sm:hidden max-w-[197px]"
          variant="outline"
        >
          Upload Documents
        </Button>
      </div>

      <Seprator />
      
      <Heading dvariant="lg">Service Timeline</Heading>
      {stepsData?.length === 0 && (
        <Heading className={"mx-auto"} weight="medium" size={"xl"}>
          No Timeline
        </Heading>
      )}
      <Steper data={stepsData} />
    </CardContainer>
  );
};

export default DetailedProgressCard;
