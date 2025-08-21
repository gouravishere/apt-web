import React, { useState } from "react";
import { jobOpenings } from "./dummyData";
import Accordion from "../../Accordion/Accordion";
import Button from "../../Button/Button";
import link from "../../../assets/icons/export.svg"
import { useNavigate } from "react-router-dom";

const FAQs = () => {
  const navigate=useNavigate()
  const [openIndex, setOpenIndex] = useState(null);
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const handleClickQuestions=()=>{
    navigate("/FAQs")
  }

  return (
    <div className="flex flex-col gap-20 py-24">
      <div className="text-[32px] font-medium text-center">
        Frequently Asked Questions
      </div>
      <div className="w-[70%] mx-auto">
        {jobOpenings?.map((ele, i) => (
          <Accordion
          key={i}
            heading={ele?.title}
            isOpen={openIndex === i}
            onToggle={() => handleToggle(i)}
            containerClass="border-b-[1px]  border-b-neutral-400"
            titleClass="text-base py-6 px-4 font-normal"
            childClass="pl-4 py-2"
          >
            <>
              <p>{ele?.desc}</p>
            </>
          </Accordion>
        ))}
      </div>
      <div className="flex flex-col gap-3 items-center">
        <p className="text-sm text-center">
        Not find the answers you’re looking for, checkout more FAQs here
        </p>
        <Button variant="outline" size="md" onClick={handleClickQuestions}>
          View all questions
          <img className="ml-2" src={link} alt="" />
        </Button>
      </div>
    </div>
  );
};

export default FAQs;
