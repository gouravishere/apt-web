import React, { useEffect, useState } from "react";
import CardContainer from "../../Dashboard/DashboardComponents/CardContainer/CardContainer";
import Heading from "../../../components/Heading/Heading";
import Seprator from "../../../components/Seprator/Seprator";
import Button from "../../../components/Button/Button";
import Subtitle from "../../../components/Subtitle/Subtitle";
import { CONSTANTS } from "../PricingConstant";
import arrow from "../../../assets/icons/arrow-down.svg";

const QuestionPage = ({
  title = "title",
  question = "",
  answers = [],
  onSelectOption,
  nestedQues = [],
  onSubmit,
  isSubmit,
  loading = 50,
  isFooter = true,
  questionIndex = 0,
  onBack,
}) => {
  const handleAnsSubmit = (e, ans) => {
    onSelectOption(e, ans);
  };

  const [selectedOptions, setSelectedOptions] = useState({});
  const [financialOption, setFinancialOption] = useState("");

  const [bg, setBg] = useState({});

  const bgHandle = (index, e) => {
    setBg((prev) => ({ ...prev, [index]: e }));
  };



  useEffect(() => {
    if (question.toLowerCase() === "choose the financial year") {
      setFinancialOption(question);
    }
  }, [question]);

  useEffect(() => {
    if (isFooter) {
      window.scrollTo(0, 0);
    }
  }, [isFooter]);

  return (
    <div className="min-h-[90vh] flex justify-between flex-col px-4">
      <CardContainer
        className={
          "my-20 relative flex items-center justify-center flex-col min-h-[70vh]"
        }
      >
        <div
          onClick={onBack}
          className="absolute flex items-center top-4 left-4 z-50 cursor-pointer "
        >
          {questionIndex < 1 ? (
            <div className="flex items-center gap-2">
              <img className="rotate-[90deg]" src={arrow} alt="" /> Back to
              Pricing
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <img className="rotate-[90deg]" src={arrow} alt="" /> Back
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center items-center gap-12 w-full max-w-[726px]">
          <div>
            <Heading variant="xl">{title}</Heading>
            <Subtitle className="text-center" variant="sm">
              {selectedOptions?.[0] &&
                financialOption.toLowerCase() === "choose the financial year" &&
                `FY ${selectedOptions?.[0]}`}
            </Subtitle>
          </div>
          <Seprator />

          <div className="flex flex-col gap-10 justify-center items-center">
            <div
              className={`grow relative w-full max-w-[319px] shrink basis-0 h-2.5 bg-neutral-200 rounded-[99px]`}
            >
              <div
                style={{ width: loading + "%" }}
                className={`h-full bg-primary-500 rounded-[99px]`}
              >
                &nbsp;
              </div>
            </div>

            <Heading className={"text-center"} variant="xxl">
              {question}
            </Heading>
            <div className="max-w-[500px] w-full flex justify-center gap-2">
              {answers?.map((data, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedOptions((prev) => ({
                      ...prev,
                      [questionIndex]: data, // Track selected option for the current question index
                    }));
                    handleAnsSubmit(data); // Submit answer
                  }}
                  className={`${
                    selectedOptions[questionIndex] === data
                      ? "bg-black text-white"
                      : ""
                  } rounded-3xl px-4 py-3 border border-black`}
                >
                  {CONSTANTS[data] || data}
                </button>
              ))}
            </div>

            {!answers._id && (
              <div className="max-w-[800px] w-full flex flex-col justify-center gap-6">
                {nestedQues?.map((data, index) => (
                  <div className="w-full flex flex-col justify-start items-start gap-4 md:flex-row md:justify-between">
                    <Subtitle color="black">{data.text}</Subtitle>
                    <div className="flex items-center justify-center gap-2">
                      {data?.options?.map((ans) => (
                        <button
                          className={`${
                            bg[index] === ans
                              ? "bg-black text-white"
                              : "bg-white text-black"
                          } border rounded-[99px] border-black py-3 px-6 text-sm `}
                          onClick={(e) => {
                            handleAnsSubmit(data, ans);
                            bgHandle(index, ans);
                          }}
                          variant="outline"
                        >
                          {CONSTANTS[ans] || ans}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {isSubmit && (
            <div className="py-10">
              {Object.keys(bg).length === nestedQues.length ? (
                <Button onClick={onSubmit} variant="black">
                  Submit Information
                </Button>
              ) : (
                <Button variant="disabled">Submit Information</Button>
              )}
            </div>
          )}
        </div>
      </CardContainer>

      {isFooter && (
        <div className="w-full relative mt-auto">
          <div className="absolute bottom-0 w-screen translate-middle bg-primary-100 flex justify-center items-center py-10 gap-10">
            <Subtitle color="black">Call now at <a href="tel:+916359599999">+91 63595 99999</a></Subtitle>
            <Subtitle color="black">Email us at <a href="mailto:support@ezyfiling.com">support@ezyfiling.com</a></Subtitle>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionPage;
