import Button from "../../../../components/Button/Button";
import Seprator from "../../../../components/Seprator/Seprator";
import HeadingCard from "../HeadingCard/HeadingCard";
import fileIcon from "../../../../assets/icons/tax-document.svg";
import CardContainer from "../CardContainer/CardContainer";
const DetailedCard = ({
  isStatusTab = true,
  isDetails = true,
  details = [],
  heading,
  percentage = 50,
  onFirstClick,
  onSecondClick,
  idNumber,
  progressStatus,
  FirstButtonText,
  SecondButtonText,
  isTwoButton = false,
  variant,
  status,
  buttonVariant = "black",
  loaderColor = "primary-500",
}) => {
  const complete = percentage + "%";

  return (
    <CardContainer
      variant={variant}
      className={
        "p-3 md:p-8 w-full bg-white rounded-2xl gap-4 flex-col  inline-flex"
      }
    >
      <div className="w-full justify-between md:flex-row gap-4 flex-col items-center flex">
        <div className="flex gap-2 w-full justify-center items-center">
          <img src={fileIcon} alt="" />
          <div className="w-full flex-col justify-start items-start inline-flex">
            <div
              onClick={onFirstClick}
              className="cursor-pointer self-stretch text-nowrap text-neutral-900 text-lg font-medium font-['Poppins'] leading-[27px]"
            >
              {heading}
            </div>
            <div className="self-stretch text-slate-600 text-sm font-normal font-['Poppins'] leading-[21px]">
              {idNumber}
            </div>
          </div>
        </div>
        {isDetails && (
          <div className="w-full lg:flex lg:justify-end grid grid-cols-2 md:grid-cols-2 gap-3">
            {details?.map((data, index) => (
              <HeadingCard
                key={index}
                index={index}
                heading={data.label}
                content={data.content}
              />
            ))}
          </div>
        )}
      </div>

      {isStatusTab && (
        <>
          <Seprator />

          <div className="flex justify-between flex-col lg:flex-row md:gap-8 gap-2 items-center	w-full">
            <div className="text-neutral-900 text-start w-full flex flex-wrap text-xs sm:text-base font-normal font-['Poppins'] leading-normal">
              {progressStatus}
            </div>

            <div className="flex justify-between md:flex-row flex-col md:justify-end w-full sm:w-auto md:gap-4 gap-7 md:items-center items-start">
              {status?.toLowerCase() !== "closed" && (
                <div className="md:h-[21px] justify-start items-center gap-4 md:flex w-full">
                  <div className="text-slate-600 pb-2 md:pb-0 text-sm font-medium font-['Poppins'] leading-[21px]">
                    {percentage}% complete
                  </div>
                  <div
                    className={`grow md:w-[158px] shrink basis-0 w-full h-2.5 relative bg-neutral-200 rounded-[99px]`}
                  >
                    <div
                      style={{ width: complete }}
                      className={`h-full bg-${loaderColor} rounded-[99px]`}
                    ></div>
                  </div>
                </div>
              )}
              {isTwoButton ? (
                <div className="flex gap-4">
                  <Button onClick={onFirstClick} variant="outline">
                    {FirstButtonText}
                  </Button>
                  <Button onClick={onSecondClick} variant="yellow">
                    {SecondButtonText}
                  </Button>
                </div>
              ) : (
                <Button
                  className=" md:w-72 "
                  onClick={onFirstClick}
                  variant={buttonVariant}
                >
                  {FirstButtonText}
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </CardContainer>
  );
};

export default DetailedCard;
