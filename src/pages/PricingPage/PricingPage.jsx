import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import HeadingBreadCrumb from "../../components/HeadingBreadCrumb/HeadingBreadCrumb";
import PricingCard from "./PricingCard/PricingCard";
import TabSwitcher from "../../components/TabSwitcher/TabSwitcher";
import Banner from "../../components/Banner/Banner";
import FAQs from "../../components/HomePage/FAQs/FAQs";
import {
  emptyPlans,
  emptyServices,
  fetchAllPricing,
  fetchPlans,
  getPlanGroups,
} from "../../redux/priceSlice/priceSlice";
import { CONSTANTS } from "./PricingConstant";
import QuestionPage from "./QuestionPage/QuestionPage";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import SmallLoading from "../../components/LoadingSpinner/SmallLoading";
import IndiaFlag from "../../assets/icons/indiaFlag.svg";
import UAEFlag from "../../assets/icons/uaeFlag.svg";
import QatarFlag from "../../assets/icons/qatarFlag.svg";
import ArabiaFlag from "../../assets/icons/arabiaFlag.svg";
import SingaporeFlag from "../../assets/icons/singaporeFlag.svg";
import OmanFlag from "../../assets/icons/oman-flag-round-icon.svg";
import KuwaitFlag from "../../assets/icons/kuwait-flag-round-circle-icon.svg";

const countries = [
  {
    icon: IndiaFlag,
    label: "India",
  },
  {
    icon: UAEFlag,
    label: "UAE",
  },
  {
    icon: ArabiaFlag,
    label: "Saudi Arabia",
  },
  {
    icon: OmanFlag,
    label: "Oman",
  },
  {
    icon: QatarFlag,
    label: "Qatar",
  },
  {
    icon: KuwaitFlag,
    label: "Kuwait",
  },
  {
    icon: SingaporeFlag,
    label: "Singapore",
  },
];

const CountryTab = ({ tabs, onTabChange, activeTab }) => {
  const handleTabClick = (index) => {
    if (onTabChange) {
      onTabChange(index);
    }
  };

  return (
    <div className="overflow-x-auto pb-6">
      <div className="flex items-center gap-4 w-max mx-auto">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg cursor-pointer text-sm sm:text-base whitespace-nowrap
                  ${
                    activeTab === tab.label
                      ? "border-b-4 border-[#FDCE00] bg-[#f9f6e2]"
                      : "bg-gray-50 shadow-lg"
                  }`}
            onClick={() => handleTabClick(tab.label)}
          >
            {tab.icon && (
              <img
                src={tab.icon}
                alt={tab.label}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
              />
            )}
            <span className="font-medium text-black">{tab.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const PricingPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [sideActiveTab, setSideActiveTab] = useState(0);
  const [isQuestionPage, setIsQuestionPage] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [subgroupId, setSubgroupId] = useState("");

  const dispatch = useDispatch();
  const pricingData = useSelector((state) => state?.pricing?.pricing);
  const planData = useSelector((state) => state?.pricing.planGroups);
  const plans = useSelector((state) => state?.pricing?.plans.data);
  const isSubGroupsLoading = useSelector((state) => state?.pricing.loading);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCountry, setActiveCountry] = useState("India");
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (location.state?.path === "/pricing") {
      setActiveTab(location.state.activeTab);
      setSideActiveTab(location.state.sideActiveTab);
      if (location.state.x && location.state.y) {
        setTimeout(() => {
          window.scrollTo({
            top: location.state.y - 500, // Adjust for current scroll position
            left: location.state.x,
            behavior: "smooth",
          });
        }, 100);
      }
      navigate({ state: null });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location, navigate]);

  useEffect(() => {
    if (plans?.length === 1) {
      setIsLoading(true);
      const singlePlan = plans[0];
      if (isAuthenticated) {
        navigate("/pay-card", { state: { pricingData: singlePlan } });
      } else {
        navigate("/login", { state: { pricingData: singlePlan } });
      }
    }
  }, [plans, navigate, isAuthenticated]);

  useEffect(() => {
    if (planData?.data?.plans?.length === 1) {
      setIsLoading(true);
      // If only one plan, redirect to the payment page
      const singlePlan = planData?.data?.plans?.[0];
      if (isAuthenticated) {
        navigate("/pay-card", { state: { pricingData: singlePlan } });
      } else {
        navigate("/login", { state: { pricingData: singlePlan } });
      }
    }
  }, [planData, navigate, isAuthenticated]);

  useEffect(() => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
  }, [sideActiveTab, activeTab, activeCountry]);

  useEffect(() => {
    dispatch(emptyPlans());
  }, [activeTab, dispatch, sideActiveTab]);

  useEffect(() => {
    dispatch(emptyServices());
  }, [activeCountry, dispatch]);

  useEffect(() => {
    dispatch(fetchAllPricing({ country: activeCountry }));
  }, [dispatch, activeCountry]);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  const handleFetchPlanGroups = (id) => {
    dispatch(getPlanGroups(id));
  };

  const handleOptionSelect = (selectedAnswer, ans) => {
    const currentQuestion = planData?.data?.questions[currentQuestionIndex];

    setUserAnswers((prev) => ({
      ...prev,
      [selectedAnswer.questionId || currentQuestion.questionId]:
        ans || selectedAnswer,
    }));

    if (currentQuestionIndex < planData?.data?.questions?.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isQuestionPage) {
    return (
      <div>
        <QuestionPage
          onBack={() => {
            if (currentQuestionIndex === 0) {
              setIsQuestionPage(false);
              setActiveTab(0);
              setSideActiveTab(0);
              dispatch(emptyPlans());
            } else {
              setCurrentQuestionIndex((prev) => prev - 1);
            }
          }}
          data={planData?.data}
          questionIndex={currentQuestionIndex}
          question={planData?.data?.questions[currentQuestionIndex]?.text}
          answers={planData?.data?.questions[currentQuestionIndex]?.options}
          title={planData?.data?.description}
          onSelectOption={handleOptionSelect}
          nestedQues={
            planData?.data?.questions[currentQuestionIndex]?.questions
          }
          isSubmit={
            currentQuestionIndex === planData?.data?.questions?.length - 1
          }
          loading={
            (100 / planData?.data?.questions?.length) * currentQuestionIndex
          }
          onSubmit={async () => {
            const res = await dispatch(
              fetchPlans({
                planGroupId: subgroupId,
                answers: { ...userAnswers },
              })
            );

            if (res?.payload?.data?.length !== 1) {
              setIsQuestionPage(false);
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className=" w-full px-4 md:px-0">
      <div className="relative">
        <HeadingBreadCrumb
          sparkleRight={true}
          rightDesign={true}
          isBreadCrumb={false}
          heading={"Pricing"}
          description={
            "We offer a range of services tailored to meet your unique needs and requirements, all at competitive pricing that ensures you get the best value for your investment."
          }
        />
      </div>

      <div className="flex justify-center mb-6">
        <CountryTab
          tabs={countries}
          activeTab={activeCountry}
          onTabChange={(e) => {
            setActiveCountry(e);
          }}
        />
      </div>
      {!!!pricingData?.data?.[activeTab].plans.length &&
        !!!plans?.length &&
        !!!planData?.data?.plans?.length &&
        !!!pricingData?.data?.[activeTab]?.planGroups?.[sideActiveTab]
          ?.subGroups.length &&
        !isSubGroupsLoading && (
          <h2 className="mt-4 text-2xl font-semibold text-center">
            No Plans Available
          </h2>
        )}

      <div className="md:pb-20 pb-6 flex justify-center">
        <TabSwitcher
          isFixedWidth={false}
          activeTab={activeTab}
          setActiveTab={(e) => setActiveTab(e)}
          tabs={
            pricingData?.data?.map((data) => ({
              title: CONSTANTS[data.name] || data.name,
            })) || []
          }
        />
      </div>

      <div className="md:hidden pb-2">
        <TabSwitcher
          setActiveTab={(e) => setSideActiveTab(e)}
          tabs={
            pricingData.data
              ? pricingData?.data[activeTab]?.planGroups?.map((data) => ({
                  title: CONSTANTS[data.name] || data.name,
                  id: data?.id,
                }))
              : []
          }
          activeTab={sideActiveTab}
          isGap={false}
          className={" "}
          variant="white"
          onClick={(e) => {
            handleFetchPlanGroups(e.id);
          }}
        />
      </div>

      <div className="min-h-[80vh]">
        <div className="flex gap-16">
          <div className="w-76 h-10 hidden md:block">
            <TabSwitcher
              setActiveTab={(e) => setSideActiveTab(e)}
              tabs={
                pricingData.data
                  ? pricingData?.data[activeTab]?.planGroups?.map((data) => ({
                      title: data.name,
                      id: data?.id,
                    }))
                  : []
              }
              isVerticle={true}
              activeTab={sideActiveTab}
              isGap={false}
              className={" "}
              variant="white"
              onClick={(e) => {
                handleFetchPlanGroups(e.id);
              }}
            />
          </div>

          {isSubGroupsLoading ? (
            <div className="flex justify-center items-center h-96 w-full">
              <SmallLoading />
            </div>
          ) : (
            <>
              {
                <div className="grid xl:grid-cols-2 grid-cols-1 gap-10 w-full">
                  {!planData?.data?.plans.length &&
                    !plans &&
                    !isSubGroupsLoading && (
                      <>
                        {pricingData.data &&
                          pricingData?.data[activeTab]?.planGroups[
                            sideActiveTab
                          ]?.subGroups?.map((data, index) => (
                            <PricingCard
                              lumpsum={
                                data?.lumpsum || data?.priceType === "lumpsum"
                                  ? true
                                  : false
                              }
                              allData={data}
                              key={index}
                              perHour={data?.per_hour}
                              metaData={{
                                activeTab,
                                sideActiveTab,
                                path: "/pricing",
                              }}
                              onClick={() => {
                                setSubgroupId(data.id);
                                dispatch(getPlanGroups(data.id));
                                if (
                                  pricingData.data &&
                                  pricingData?.data[activeTab]?.planGroups[
                                    sideActiveTab
                                  ]?.subGroups[index]?.questions.length > 0
                                ) {
                                  setIsQuestionPage(true);
                                }
                              }}
                              label={CONSTANTS[data.name] || data.name}
                              price={data.price}
                              features={data.features}
                              notes={data?.notes}
                            />
                          ))}
                      </>
                    )}

                  {!plans?.length &&
                    planData?.data?.plans?.length > 1 &&
                    planData?.data?.plans?.map((data, index) => (
                      <PricingCard
                        lumpsum={
                          data?.lumpsum || data?.priceType === "lumpsum"
                            ? true
                            : false
                        }
                        allData={data}
                        planData={data}
                        key={index}
                        label={CONSTANTS[data.name] || data.name}
                        price={data.price}
                        perHour={data?.per_hour}
                        metaData={{
                          activeTab,
                          sideActiveTab,
                          path: "/pricing",
                        }}
                        notes={data?.notes}
                        features={data.features}
                        data={(e) => {
                          if (isAuthenticated) {
                            navigate("/pay-card", {
                              state: { pricingData: data },
                            });
                          } else {
                            navigate("/login", {
                              state: { pricingData: data },
                            });
                          }
                        }}
                      />
                    ))}

                  {plans?.length > 1 &&
                    plans?.map((data, index) => (
                      <PricingCard
                        lumpsum={
                          data?.lumpsum || data?.priceType === "lumpsum"
                            ? true
                            : false
                        }
                        notes={data?.notes}
                        key={index}
                        label={CONSTANTS[data.name] || data.name}
                        price={data.price}
                        planData={data}
                        allData={data}
                        perHour={data?.per_hour}
                        metaData={{
                          activeTab,
                          sideActiveTab,
                          path: "/pricing",
                        }}
                        features={data.features}
                        data={(e) => {
                          if (isAuthenticated) {
                            navigate("/pay-card", {
                              state: { pricingData: data },
                            });
                          } else {
                            alert("Please Login First");
                            navigate("/login", {
                              state: { pricingData: data },
                            });
                          }
                        }}
                      />
                    ))}

                  {/* other than ITR service */}
                  {pricingData?.data?.[activeTab].plans?.map((data, index) => (
                    <PricingCard
                      lumpsum={
                        data?.lumpsum || data?.priceType === "lumpsum"
                          ? true
                          : false
                      }
                      notes={data?.notes}
                      key={index}
                      label={CONSTANTS[data.name] || data.name}
                      price={data.price}
                      allData={data}
                      perHour={data?.per_hour}
                      planData={data}
                      metaData={{ activeTab, sideActiveTab, path: "/pricing" }}
                      features={data.features}
                      data={(e) => {
                        if (isAuthenticated) {
                          navigate("/pay-card", {
                            state: { pricingData: data },
                          });
                        } else {
                          alert("Please Login First");
                          navigate("/login", { state: { pricingData: data } });
                        }
                      }}
                    />
                  ))}
                </div>
              }
            </>
          )}
        </div>
      </div>
      <Banner />
      <FAQs />
    </div>
  );
};

export default PricingPage;
