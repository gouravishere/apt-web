import React, { useState } from "react";
import HeadingBreadCrumb from "../../../components/HeadingBreadCrumb/HeadingBreadCrumb";
import CalculatorInputsContainer from "../../../components/CalculatorInputsContainer/CalculatorInputsContainer";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import CalculatorCard from "../../../components/CalculatorCard/CalculatorCard";
import QuestionCard from "../../../components/QuestionCard/QuestionCard";
import FAQs from "../../../components/HomePage/FAQs/FAQs";
import NPSCalculationCard from "./NPSCalculationCard/NPSCalculationCard";
import Banner from "../../../components/Banner/Banner";
import TabSwitcher from "../../../components/TabSwitcher/TabSwitcher";
import { useNavigate } from "react-router-dom";

const tabsData = [
  {
    title: "I want to invest",
    activeClass: "bg-[#fdce00]/10 border-primary-500",
    inactiveClass: "bg-white border-b-2 border border-neutral-300",
  },
  {
    title: "I know my goal",
    activeClass: "bg-[#fdce00]/10 border-primary-500",
    inactiveClass: "bg-white border-b-2 border border-neutral-300",
  },
];

const NPScalculator = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  const [validate,setValidate]=useState({})
  const [formData, setFormData] = useState({
    monthlyPensionGoal: "",
    avgMonthlyInvestment: "",
    currentAge: "",
    retirementAge: "",
    expectedRateOfReturn: "",
    annuityRate: "",
    withdrawalRatio: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e?.target.name]: e?.target.value });
  };

  const handleSubmit = (e) => {
    const {
      monthlyPensionGoal,
      avgMonthlyInvestment,
      currentAge,
      retirementAge,
      expectedRateOfReturn,
      annuityRate,
      withdrawalRatio,
    } = formData;

    const n = (retirementAge - currentAge) * 12; // Number of months
    const r = expectedRateOfReturn / 12 / 100; // Monthly rate of return

    let results;
    if (selectedTab === 1) {
      const corpusNeeded = (monthlyPensionGoal * 12) / (annuityRate / 100);
      const requiredMonthlyInvestment =
        (corpusNeeded * r) / (Math.pow(1 + r, n) - 1);
      results = {
        requiredMonthlyInvestment: requiredMonthlyInvestment.toFixed(2),
        corpusAtRetirement: corpusNeeded.toFixed(2),
      };
    } else {
      const corpusAtRetirement =
        (avgMonthlyInvestment * (Math.pow(1 + r, n) - 1)) / r;
      const lumpsumAmount = corpusAtRetirement * (withdrawalRatio / 100);
      const adjustedCorpus = corpusAtRetirement - lumpsumAmount;
      const monthlyPension = (adjustedCorpus * (annuityRate / 100)) / 12;

      results = {
        totalCorpusAtRetirement: corpusAtRetirement.toFixed(2),
        lumpsumWithdrawal: lumpsumAmount.toFixed(2),
        expectedMonthlyPension: monthlyPension.toFixed(2),
      };
    }

    setResult(results);
  };

  const validateInputs=()=>{
    let error={}
    if(selectedTab==0) {
      if(!formData.avgMonthlyInvestment) error.avgMonthlyInvestment="This field cant be empty"
      if(!formData.currentAge) error.currentAge="This field cant be empty"
      if(!formData.expectedRateOfReturn) error.expectedRateOfReturn="This field cant be empty"
      if(!formData.retirementAge) error.retirementAge="This field cant be empty"

    }
    if(selectedTab==1) {
      if(!formData.monthlyPensionGoal) error.monthlyPensionGoal="This field cant be empty"
      if(!formData.currentAge) error.currentAge="This field cant be empty"
      if(!formData.expectedRateOfReturn) error.expectedRateOfReturn="This field cant be empty"
      if(!formData.retirementAge) error.retirementAge="This field cant be empty"

    }
    setValidate(error)
    return Object.keys(error).length==0
  }

  const submitHandler=()=>{
    if(validateInputs()) {
      handleSubmit()
    }
  }
  return (
    <div>
      <HeadingBreadCrumb
        isHeadingDesignArrow ={true} 
        sparkleRight={true}
        yellowDotLeft={true}
        rightDesign={true}
        heading="NPS calculator"
        description={
          "The NPS Calculator helps you estimate the maturity value and pension amount you can expect from your National Pension Scheme (NPS) investments."
        }
      />
      <CalculatorInputsContainer>
        <div className="self-start max-w-[550px]">
          <TabSwitcher
            activeTab={selectedTab}
            tabs={tabsData}
            setActiveTab={(e) => {
              setSelectedTab(e);
              setFormData((prev) => ({ ...prev, city: e }));
            }}
          />
        </div>
        <div className="grid grid-cols-1 gap-[24px] md:grid-cols-2 lg:grid-cols-3 w-full">
          {selectedTab === 0 ? (
            <Input
              placeholder={"Enter Amount"}
              fieldName={"avgMonthlyInvestment"}
              label={"Average Monthly Investment"}
              required={true}
              type={"number"}
              min={0}
              name={""}
              value={formData.avgMonthlyInvestment}
              onChange={handleChange}
              validate={(value)=>value<=0?'This field cant be empty':''}
              validateMsg={validate.avgMonthlyInvestment}
            />
          ) : (
            <Input
              placeholder={"Enter Amount"}
              fieldName={"monthlyPensionGoal"}
              label={"Monthly Pension Goal"}
              value={formData.monthlyPensionGoal}
              type={"number"}
              min={0}
              onChange={handleChange}
              required={true}
              validate={(value)=>value<=0?'This field cant be empty':''}
              validateMsg={validate.monthlyPensionGoal}
            />
          )}

          <Input
            placeholder={"Enter Age"}
            fieldName={"currentAge"}
            label={"Current Age"}
            required={true}
            type={"number"}
            min={0}
            value={formData.currentAge}
            onChange={handleChange}
            validate={(value)=>value<=0?'This field cant be empty':''}
            validateMsg={validate.currentAge}
          />
          <Input
            placeholder={"Enter Age"}
            fieldName={"retirementAge"}
            label={"Retirement Age"}
            value={formData.retirementAge}
            type={"number"}
            min={0}
            onChange={handleChange}
            required={true}
            validate={(value)=>value<=0?'This field cant be empty':''}
            validateMsg={validate.retirementAge}
          />
          <Input
            placeholder={"Enter rate"}
            fieldName={"expectedRateOfReturn"}
            label={"Expected Rate of Return (%)"}
            value={formData.rentPaid}
            type={"number"}
            min={0}
            onChange={handleChange}
            required={true}
            validate={(value)=>value<=0?'This field cant be empty':''}
            validateMsg={validate.expectedRateOfReturn}
          />

          <Input
            placeholder={"Enter rate"}
            label={"Annuity Rate (%)"}
            fieldName={"annuityRate"}
            value={formData.annuityRate}
            type={"number"}
            min={0}
            onChange={handleChange}
          />
          <Input
            placeholder={"Enter ratio"}
            label={"Withdrawal Ratio (%) "}
            fieldName={"withdrawalRatio"}
            value={formData.withdrawalRatio}
            type={"number"}
            min={0}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <Button onClick={submitHandler} variant="black">
          Calculate Now
        </Button>
        <div className="p-[24px] flex flex-col gap-[40px] w-full">
          <NPSCalculationCard
            totalCorpusRetiement={
              result?.totalCorpusAtRetirement || result?.corpusAtRetirement
            }
            expectedMonthlyPension={result?.expectedMonthlyPension}
            lumpsumWithdrawal={result?.lumpsumWithdrawal}
            requiredMonthly={result?.requiredMonthlyInvestment}
          />
        </div>
      </CalculatorInputsContainer>{" "}
      <Banner />
      <div className="flex flex-col md:py-[120px] py-[40px]  md:gap-[80px] gap-[30px]">
        <div className="text-center text-neutral-900 text-[32px] font-medium font-['Poppins'] leading-10">
          Our Calculators
        </div>
        <div className="grid gap-[40px] xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full place-items-center">
          <CalculatorCard
            name={"Income Tax Calculator"}
            descripiton={
              "Get an accurate estimate of your income tax liability."
            }
            route={"/calculators/Income-tax"}
          />
          <CalculatorCard
            name={"Old & New Tax Regime"}
            descripiton={
              "Determine your income tax return filing requirements with ease."
            }
            route={"/calculators/old-and-new-tax-regime"}
          />
          <CalculatorCard
            name={"SIP Calculator"}
            descripiton={
              "Estimate your returns on Systematic Investment Plans (SIPs)."
            }
            route={"/calculators/sip"}
          />
        </div>
        <Button
          className="self-center"
          onClick={() => navigate("/calculators")}
          variant="outline"
        >
          View all calculators
        </Button>
      </div>
      <div className="flex flex-col gap-[80px]">
        <QuestionCard
          question={"What is the NPS Calculator?"}
          Answer={
            "The NPS Calculator is a financial tool that estimates the retirement corpus and monthly pension under the National Pension Scheme. It allows users to input their current age, retirement age, monthly contributions, and expected return rate to determine the final amount accumulated at maturity. The calculator also provides insights into how your investments can grow over time, making it an essential tool for retirement planning."
          }
        />
        <QuestionCard
          question={"How Does the NPS Calculator Work?"}
          Answer={
            "The calculator requires inputs like your current age, retirement age, monthly investment, and expected annual return rate. Using these, it calculates the accumulated corpus at retirement. It also estimates the pension amount based on the portion of the corpus allocated to purchasing an annuity. The NPS calculator simplifies the process of planning your retirement, giving you a clear picture of your financial future."
          }
        />
      </div>
      <FAQs />
    </div>
  );
};

export default NPScalculator;
