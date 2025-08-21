import { useDispatch, useSelector } from "react-redux";
import PricingCard from "../../pages/PricingPage/PricingCard/PricingCard";
import { useEffect, useState } from "react";
import Heading from "../Heading/Heading";
import PriceLogo from "../../assets/icons/priceLogo.svg";
import {
  emptyPlans,
  emptyPlansByService,
  fetchPlans,
  getPlanGroups,
  getPlansByService,
} from "../../redux/priceSlice/priceSlice";
import TabSwitcher from "../TabSwitcher/TabSwitcher";
import QuestionPage from "../../pages/PricingPage/QuestionPage/QuestionPage";
import { CONSTANTS } from "../../pages/PricingPage/PricingConstant";
import { useLocation, useNavigate } from "react-router-dom";

export default function PricingCompPlans({
  selectedGroupId,
  serviceName,
  country,
}) {
  const [activeTab, setActiveTab] = useState(0);

  const [userAnswers, setUserAnswers] = useState({});
  const [isQuestionPage, setIsQuestionPage] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [subgroupId, setSubgroupId] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isSubGroupsLoading = useSelector((state) => state?.pricing.loading);
  const pricingData = useSelector(
    (state) => state?.pricing?.plansByService.data
  );
  const planData = useSelector((state) => state?.pricing.planGroups);
  const plans = useSelector((state) => state?.pricing?.plans.data);

  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    if (location?.state?.path.includes("/service")) {
      setActiveTab(location.state.activeTab);
      if (location.state?.x && location.state?.y) {
        setTimeout(() => {
          window.scrollTo({
            top: location.state?.y - 500, // Adjust for current scroll position
            left: location.state?.x,
            behavior: "smooth",
          });
        }, 100);
      }
      navigate(location?.state?.path);
    } else {
      if (!location.hash) {
        window.scrollTo(0, 0);
      }
    }
  }, [location]);

  useEffect(() => {
    dispatch(emptyPlans());
    setCurrentQuestionIndex(0);
  }, [activeTab, dispatch, selectedGroupId, country]);

  useEffect(() => {
    if (country?.toLowerCase() !== "india") {
      dispatch(emptyPlansByService());
    }
    dispatch(getPlansByService(serviceName));
  }, [dispatch, activeTab, serviceName, country]);

  useEffect(() => {
    if (plans?.length === 1) {
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
      // If only one plan, redirect to the payment page
      const singlePlan = planData?.data?.plans?.[0];
      if (isAuthenticated) {
        navigate("/pay-card", { state: { pricingData: singlePlan } });
      } else {
        navigate("/login", { state: { pricingData: singlePlan } });
      }
    }
  }, [planData, navigate, isAuthenticated]);

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

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 200);
      }
    }
  }, [location, location.pathname]);

  if (isQuestionPage) {
    return (
      <div>
        <QuestionPage
          onBack={() => {
            if (currentQuestionIndex > 0) {
              setCurrentQuestionIndex((prev) => prev - 1);
            } else {
              dispatch(emptyPlans());
              dispatch(getPlansByService(serviceName));
              setIsQuestionPage(false);
            }
          }}
          questionIndex={currentQuestionIndex}
          isFooter={false}
          question={planData?.data?.questions[currentQuestionIndex]?.text}
          answers={planData?.data?.questions[currentQuestionIndex].options}
          title={planData?.data?.description}
          onSelectOption={handleOptionSelect}
          nestedQues={planData?.data?.questions[currentQuestionIndex].questions}
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
    <div id="pricing" className="relative">
      <div className="flex justify-center my-12 ">
        <Heading variant="xxl" weight="medium">
          Pricing
        </Heading>
      </div>

      <TabSwitcher
        isFixedWidth={false}
        activeTab={activeTab}
        setActiveTab={(e) => setActiveTab(e)}
        tabs={
          pricingData?.planGroups?.map((data) => ({
            title: data.name,
          })) || []
        }
      />

      <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 mt-8">
        {!planData?.data?.plans.length && !plans && !isSubGroupsLoading && (
          <>
            {pricingData?.planGroups[activeTab]?.subGroups?.map(
              (data, index) => (
                <PricingCard
                  key={index}
                  allData={data}
                  metaData={{
                    activeTab,
                    path: location.pathname,
                  }}
                  lumpsum={
                    data?.lumpsum || data?.priceType === "lumpsum"
                      ? true
                      : false
                  }
                  onClick={() => {
                    setSubgroupId(data.id);
                    dispatch(getPlanGroups(data.id));
                    if (
                      pricingData?.planGroups &&
                      pricingData?.planGroups[activeTab]?.subGroups[index]
                        ?.questions.length > 0
                    ) {
                      setIsQuestionPage(true);
                    }
                  }}
                  perHour={data?.per_hour}
                  label={CONSTANTS[data.name] || data.name}
                  price={data.price}
                  features={data.features}
                  notes={data.notes}
                />
              )
            )}
          </>
        )}

        {pricingData?.plans?.map((data, index) => (
          <PricingCard
            allData={data}
            lumpsum={
              data?.lumpsum || data?.priceType === "lumpsum" ? true : false
            }
            key={index}
            metaData={{
              activeTab,
              path: location.pathname,
            }}
            perHour={data?.per_hour}
            notes={data.notes}
            label={CONSTANTS[data.name]}
            price={data.price}
            features={data.features}
            data={(e) => {
              navigate("/pay-card", { state: { pricingData: data } });
            }}
          />
        ))}

        {!plans &&
          planData?.data?.plans?.map((data, index) => (
            <PricingCard
              key={index}
              notes={data.notes}
              allData={data}
              metaData={{
                activeTab,
                path: location.pathname,
              }}
              perHour={data?.per_hour}
              label={CONSTANTS[data.name]}
              price={data.price}
              features={data.features}
              data={(e) => {
                navigate("/pay-card", { state: { pricingData: data } });
              }}
            />
          ))}

        {plans?.map((data, index) => (
          <PricingCard
            allData={data}
            notes={data.notes}
            perHour={data?.per_hour}
            metaData={{
              activeTab,
              path: location.pathname,
            }}
            lumpsum={
              data?.lumpsum || data?.priceType === "lumpsum" ? true : false
            }
            key={index}
            label={CONSTANTS[data.name]}
            price={data.price}
            features={data.features}
            data={(e) => {
              navigate("/pay-card", { state: { pricingData: data } });
            }}
          />
        ))}
      </div>

      {!pricingData?.plans && !plans && (
        <div className="mx-auto font-semibold text-2xl md:text-3xl w-full text-center">
          Currently no Plan Available!
        </div>
      )}

      <img
        src={PriceLogo}
        className="absolute -right-16 -top-24 hidden lg:block"
        alt=""
      />
    </div>
  );
}
