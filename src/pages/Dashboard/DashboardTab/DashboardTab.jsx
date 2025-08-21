import Button from "../../../components/Button/Button";
import fileIcon from "../../../assets/icons/tax-document.svg";
import React, { useEffect, useState } from "react";
import Container from "../../../components/Container/Container";
import CalculatorCard from "../../../components/CalculatorCard/CalculatorCard";
import ServiceCard from "../../../components/ServiceCard/ServiceCard";
import Seprator from "../../../components/Seprator/Seprator";
import DescriptionHeading from "../DashboardComponents/DescriptionHeading/DescriptionHeading";
import DashBoardHeading from "../DashboardComponents/DashBoardHeading/DashboardHeading";
import HelpingContactCard from "../DashboardComponents/HelpingContactCard/HelpingContactCard";
import HeadingCard from "../DashboardComponents/HeadingCard/HeadingCard";
import CardContainer from "../DashboardComponents/CardContainer/CardContainer";
import greenCheckLogo from "../../../assets/icons/grrencheckmark.svg";
import Heading from "../../../components/Heading/Heading";
import redCross from "../../../assets/icons/redCross.svg";
import cross from "../../../assets/icons/close-circle.svg";
import { useLocation, useNavigate } from "react-router-dom";
import {
  fetchLatestLead,
  fetchRecentLead,
} from "../../../redux/ServiceDetailsSlice/ServiceDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { CONSTANTS } from "../../PricingPage/PricingConstant";
import emptyFolder from "../../../assets/icons/empty-folder.svg";
import arrowRight from "../../../assets/icons/arrow-right.svg";
import DropDown from "../../../components/DropDown/DropDown";
import { CountryServices } from "../../../ServiceData";
import { toast, ToastContainer } from "react-toastify";
import { toggleChatbot } from "../../../redux/chatBotSlice/chatBotSlice";
import ChatBot from "../../../components/ChatBot/ChatBot";

const DashBoardDetailedCard = ({
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
  buttonVariant = "black",
  loaderColor = "primary-500",
  isSuccess = true,
  banner = false,
  onStatusClose = () => {},
}) => {
  return (
    <CardContainer
      variant={variant}
      className={
        "p-3 md:p-8 w-full bg-white rounded-2xl gap-4 flex-col  inline-flex"
      }
    >
      {isSuccess && banner && (
        <div className="p-8 relative bg-green-50 rounded-2xl flex flex-col md:flex-row gap-6">
          <img
            className="hidden md:block max-w-20"
            src={greenCheckLogo}
            alt=""
          />

          <div className="flex md:hidden items-center gap-2">
            <img src={greenCheckLogo} alt="" />
            <Heading weight="medium" size={"xl"}>
              Payment is successful!
            </Heading>
          </div>

          <img
            onClick={onStatusClose}
            className="absolute top-4 right-4 cursor-pointer rounded-full"
            src={cross}
            alt=""
          />

          <div className="flex flex-col gap-2">
            <Heading
              className={"hidden md:inline-block"}
              weight="medium"
              size={"xl"}
            >
              Payment is successful!
            </Heading>
            <div className="text-slate-600 text-sm font-normal font-['Poppins'] leading-snug">
              Your trusted partner in effortless and accurate tax filing,
              guiding you every step of the way.
            </div>
          </div>
        </div>
      )}

      {!isSuccess && banner && (
        <div className="p-8 relative bg-red-50 rounded-2xl flex flex-col md:flex-row gap-6">
          <img className="hidden md:block max-w-20" src={redCross} alt="" />

          <div className="flex md:hidden items-center gap-2">
            <img src={redCross} alt="" />
            <Heading weight="medium" size={"xl"}>
              Payment is failed!
            </Heading>
          </div>

          <img
            onClick={onStatusClose}
            className="absolute top-4 right-4 cursor-pointer rounded-full"
            src={cross}
            alt=""
          />

          <div className="flex flex-col gap-2">
            <Heading
              className={"hidden md:inline-block"}
              weight="medium"
              size={"xl"}
            >
              Payment is Failed!
            </Heading>
            <div className="text-slate-600 text-sm font-normal font-['Poppins'] leading-snug">
              We're here to help you navigate through payment issues, ensuring a
              smooth resolution every step of the way.
            </div>
            {/* <div className="flex items-center gap-4 mt-4">
              <Button variant="black">Retry Payment</Button>
            </div> */}
          </div>
        </div>
      )}

      {isSuccess && (
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
      )}

      {isSuccess && (
        <>
          {isStatusTab && (
            <>
              <Seprator />

              <div className="flex justify-between flex-col lg:flex-row md:gap-8 gap-2 items-center	w-full">
                <div className="text-neutral-900 text-start w-full flex flex-wrap text-xs sm:text-base font-normal font-['Poppins'] leading-normal">
                  {progressStatus}
                </div>

                <div className="flex justify-between md:flex-row flex-col md:justify-end w-full sm:w-auto md:gap-4 gap-7 md:items-center items-start">
                  <div className="md:h-[21px] justify-start items-center gap-4 md:flex w-full">
                    <div className="text-slate-600 pb-2 md:pb-0 text-sm font-medium font-['Poppins'] leading-[21px]">
                      {percentage}% complete
                    </div>
                    <div
                      className={`grow md:w-[158px] shrink basis-0 w-full h-2.5 relative bg-neutral-200 rounded-[99px]`}
                    >
                      <div
                        style={{ width: `${percentage}%` }}
                        className={`h-full bg-${loaderColor} rounded-[99px]`}
                      ></div>
                    </div>
                  </div>
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
                      className="md:w-72"
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
        </>
      )}
    </CardContainer>
  );
};

const NoServiceCard = ({ onClick }) => {
  return (
    <div className="p-8 rounded-xl bg-white flex flex-col xl:flex-row  items-start xl:items-center justify-between">
      <div className="flex gap-8 items-center">
        <img src={emptyFolder} alt="" />
        <div className="flex flex-col">
          <Heading weight="medium" size={"xl"}>
            No Ongoing Services
          </Heading>
          <div className="text-slate-600 text-sm font-normal ">
            Looks like we don't have any services to show you right now. Why not
            check out what we have to offer?
          </div>
        </div>
      </div>
      <Button
        onClick={onClick}
        className="flex items-center gap-2 mt-4 xl:mt-0"
        variant="black"
      >
        Explore Service
        <img className="text-white" src={arrowRight} alt="" />
      </Button>
    </div>
  );
};

const DashboardTab = () => {
  const params = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isPaymentSuccessCard, setIsPaymentSuccessCard] = useState(false);
  const [isPaymentCard, setIsPaymentCard] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("india");

  const latestLeadSelector = useSelector(
    (state) => state.Leads.latestLead?.[0]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (params.search.includes("non-fix")) {
      toast.success("Availed Successfully");
      navigate("/dashboard");
    }
  }, []);

  const recentServices = useSelector((state) => state.Leads.latestLead);

  const DetailedCardDetails = [
    {
      label: "Started On",
      content: dayjs(latestLeadSelector?.startDate).format("DD MMM YYYY"),
    },
    {
      label: "Country",
      content: latestLeadSelector?.plan?.service?.countries?.[0]?.name,
    },
    {
      label: "Last Updated on",
      content: dayjs(latestLeadSelector?.updatedAt).format("DD MMM YYYY"),
    },
  ];

  const countryOptions = [
    { label: "india", name: "India" },
    { label: "uae", name: "UAE" },
    { label: "saudi", name: "Saudi Arabia" },
    { label: "oman", name: "Oman" },
    { label: "kuwait", name: "Kuwait" },
    { label: "qatar", name: "Qatar" },
    { label: "singapore", name: "Singapore" },
  ];

  useEffect(() => {
    if (params.search.includes("status")) {
      navigate("/dashboard");
      setIsPaymentCard(true);
    }
    if (params.search.includes("COMPLETED")) {
      navigate("/dashboard");
      setIsPaymentSuccessCard(true);
    }
    if (params.search.includes("FAILED")) {
      navigate("/dashboard");
      setIsPaymentSuccessCard(false);
    }
  }, [params, navigate]);

  useEffect(() => {
    dispatch(fetchLatestLead());
    dispatch(fetchRecentLead());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-[29px] w-full">
      <DashBoardHeading heading={"Dashboard"} />
      {/* <ToastContainer /> */}
      {latestLeadSelector ? (
        <>
          {isPaymentCard ? (
            <DashBoardDetailedCard
              isSuccess={isPaymentSuccessCard}
              banner={isPaymentCard}
              onStatusClose={() => {
                setIsPaymentCard(false);
              }}
              variant="yellow-border"
              FirstButtonText={"Upload Documents"}
              borderVariant={"yellow"}
              progressStatus={
                "Finish your pending steps now to stay on track and avoid delays."
              }
              percentage={latestLeadSelector?.documentProgress?.percentage}
              heading={
                CONSTANTS[latestLeadSelector?.plan?.name] ||
                latestLeadSelector?.plan?.name
              }
              idNumber={latestLeadSelector?.leadNo}
              details={DetailedCardDetails}
              onFirstClick={() => {
                navigate(
                  `/dashboard/services/service-details/${latestLeadSelector._id}`
                );
              }}
            />
          ) : (
            <DashBoardDetailedCard
              isSuccess={true}
              banner={false}
              onStatusClose={() => {
                setIsPaymentCard(false);
              }}
              variant="yellow-border"
              FirstButtonText={"Upload Documents"}
              borderVariant={"yellow"}
              progressStatus={
                "Finish your pending steps now to stay on track and avoid delays."
              }
              percentage={latestLeadSelector?.documentProgress?.percentage}
              heading={
                CONSTANTS[latestLeadSelector?.plan?.name] ||
                latestLeadSelector?.plan?.name
              }
              idNumber={latestLeadSelector?.leadNo}
              details={DetailedCardDetails}
              onFirstClick={() => {
                navigate(
                  `/dashboard/services/service-details/${latestLeadSelector._id}`
                );
              }}
            />
          )}
        </>
      ) : (
        <NoServiceCard onClick={() => navigate("/pricing")} />
      )}

      <HelpingContactCard
        onChat={() => {
          dispatch(toggleChatbot());
        }}
      />

      <Container>
        {recentServices?.filter((data) => data.status === "CLOSED")?.length !==
          0 && (
          <>
            <DescriptionHeading
              heading={"Recent Services"}
              descripiton="The recent completed services you had taken from us"
            />

            <div className="grid gap-10 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full place-items-center">
              {recentServices
                ?.filter((data) => data.status === "CLOSED")
                ?.map((data) => (
                  <ServiceCard
                    key={data._id}
                    heading={
                      CONSTANTS[data?.plan?.service?.name] ||
                      data?.plan?.service?.name
                    }
                    name={data?.createdBy?.fullName}
                    date={dayjs(data?.endDate).format("DD MMM YY") || "NA"}
                  />
                ))}
            </div>

            <Seprator variant="dotted" />
          </>
        )}

        <div className="flex items-center justify-between w-full">
          <DescriptionHeading
            heading={"Explore our services"}
            descripiton="The collection of services that we have expertise "
          />
          <div className="w-72">
            <DropDown
              onOptionSelect={(e) => setSelectedCountry(e.label)}
              options={countryOptions}
              placeholder="India"
            />
          </div>
        </div>
        <div className="grid gap-[40px] xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full place-items-center">
          {CountryServices?.[selectedCountry]?.services.map((data, index) => (
            <CalculatorCard
              key={index}
              route={`/${data.path}`}
              name={data.serviceName}
              ctaText={"Explore"}
              descripiton={data.description}
            />
          ))}
        </div>

        <Seprator variant="dotted" />

        <DescriptionHeading
          heading={"Checkout the calculators here"}
          descripiton={
            "The collection of calculators that helps from the ITR to the home loans and many other requirements "
          }
        />

        <div className="grid gap-10 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full place-items-center">
          <CalculatorCard
            route={"/calculators/Income-tax"}
            name={"Income Tax Calculator"}
            descripiton={
              "Get an accurate estimate of your income tax liability."
            }
          />
          <CalculatorCard
            route={"/calculators/home-loan-emi"}
            name={"Home Loan Calculator"}
            descripiton={
              "Get your monthly EMI and total loan amount for a home loan."
            }
          />
          <CalculatorCard
            route={"/calculators/sip"}
            name={"SIP Calculator"}
            descripiton={
              "Estimate your returns on Systematic Investment Plans (SIPs)."
            }
          />
        </div>
      </Container>
      <ChatBot />
    </div>
  );
};

export default DashboardTab;
