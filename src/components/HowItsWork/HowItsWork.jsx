import React from "react";
import StepTracker from "../StepCard/StepTracker";
import Tabs from "../Tabs/Tabs";

const HowItsWork = () => {
  const Icon =
    "https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg";
  const stepsData = [
    {
      icon: Icon,
      title: "Understand",
      description:
        "Lorem ipsum dolor sit amet consectetur. Ligula in a donec purus n a donec purus",
    },
    {
      icon: Icon,
      title: "Upload Documents",
      description:
        "Lorem ipsum dolor sit amet consectetur. Ligula in a donec purus n a donec purus",
    },
    {
      icon: Icon,
      title: "Draft Submission",
      description:
        "Lorem ipsum dolor sit amet consectetur. Ligula in a donec purus n a donec purus",
    },
    {
      icon: Icon,
      title: "Return File",
      description:
        "Lorem ipsum dolor sit amet consectetur. Ligula in a donec purus n a donec purus",
    },
  ];

  const stepsList = [
    {
      label: "Income tax return",
      content: (
        <div className="">
          <StepTracker steps={stepsData} />
        </div>
      ),
    },
    {
      label: "NRI Services",
      content: (
        <div className="">
          <StepTracker steps={stepsData} />
        </div>
      ),
    },
    {
      label: "Business Services",
      content: (
        <div className="">
          <StepTracker steps={stepsData} />
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-20 pt-10">
      <div className="text-[32px] font-medium text-center">How it works</div>

      <div className="">
        <Tabs tabs={stepsList} onTabChange={(index) => console.log(index)} />
      </div>
    </div>
  );
};

export default HowItsWork;
