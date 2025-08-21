import React, { useState } from "react";
import CalculatorInputsContainer from "../../../components/CalculatorInputsContainer/CalculatorInputsContainer";
import HeadingBreadCrumb from "../../../components/HeadingBreadCrumb/HeadingBreadCrumb";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import SavingCard from "../../../components/SavingCard/SavingCard";
import QuestionCard from "../../../components/QuestionCard/QuestionCard";
import CalculatorCard from "../../../components/CalculatorCard/CalculatorCard";
import FAQs from "../../../components/HomePage/FAQs/FAQs";
import Banner from "../../../components/Banner/Banner";
import { useNavigate } from "react-router-dom";

const NSCcalculationBreak = ({ label, amount }) => {
  return (
    <div className="w-[200px] flex-col justify-center items-start gap-2 inline-flex">
      <div className="text-slate-600 text-sm font-normal font-['Poppins'] leading-[21px]">
        {label}
      </div>
      <div className="text-neutral-900 text-base font-medium font-['Poppins'] leading-normal">
        ₹{amount}
      </div>
    </div>
  );
};

const NSCCalculationCard = ({ maturityValue, principal, interestEarned }) => {
  return (
    <div className="self-stretch flex-col lg:p-[40px] md:px-[20px] p-[8px] rounded-2xl  w-full gap-6 flex bg-[#f8f9fa] ">
      <div className="self-stretch justify-start items-center gap-6 inline-flex">
        <div className="text-center text-slate-600 text-lg font-medium font-['Poppins'] leading-[27px]">
          NSC Calculator Result
        </div>
      </div>
      <div className="flex justify-between w-full pb-[40px]">
        <NSCcalculationBreak amount={maturityValue} label={"Maturity Value"} />
        <NSCcalculationBreak
          amount={interestEarned}
          label={"Interest Earned"}
        />
        <NSCcalculationBreak amount={principal} label={"Principal"} />
      </div>
      <SavingCard />
    </div>
  );
};

const NSCcalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [tenure, setTenure] = useState("");
  const [rate, setRate] = useState("");
  const [maturityValue, setMaturityValue] = useState(null);
  const [interestEarned, setInterestEarned] = useState(null);
  const [validate,setValidate]=useState({})
  const navigate = useNavigate();

  const calculateMaturity = () => {
  

    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(tenure);

    const A = P * Math.pow(1 + r, t);
    const interest = A - P;

    setMaturityValue(A.toFixed(2));
    setInterestEarned(interest.toFixed(2));
  };
  const validateInputs=()=>{
    let error={}

    if(!principal) error.principal="This field cant be empty"
      if(!tenure) error.tenure="This field cant be empty"
        if(!rate) error.rate="This field cant be empty"

        setValidate(error)
        return Object.keys(error).length==0
  }

  const submitHandler=()=>{
    if(validateInputs()) {
      calculateMaturity()
    }
  }
  return (
    <div>
      <HeadingBreadCrumb
         isHeadingDesignArrow ={true} 
         sparkleRight={true}
        rightDesign={true}
        heading="NSC calculator"
        yellowDotLeft={true}
        description={
          "The NSC Calculator estimates the maturity value of your National Savings Certificate investments based on the current interest rate."
        }
      />
      <CalculatorInputsContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] w-full">
          <Input
            placeholder="Enter principal amount"
            fieldName="principal"
            label="Principal Amount*"
            required={true}
            type="number"
            min={0}
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            validate={(value)=>value<=0?'This field cant be empty':''}
            validateMsg={validate.principal}
          />
          <Input
            placeholder="Enter investment tenure in years"
            fieldName="tenure"
            label="Investment Tenure (Years)"
            required={true}
            type="number"
            min={0}
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            validate={(value)=>value<=0?'This field cant be empty':''}
            validateMsg={validate.tenure}
          />
          <Input
            placeholder="Enter annual interest rate"
            fieldName="rate"
            label="Annual Interest Rate (%)"
            required={true}
            type="number"
            min={0}
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            validate={(value)=>value<=0?'This field cant be empty':''}
            validateMsg={validate.rate}
          />
        </div>
        <Button onClick={submitHandler} variant="black">
          Calculate now
        </Button>
        <div className=" flex flex-col gap-[40px] w-full">
          <NSCCalculationCard
            maturityValue={maturityValue ? maturityValue : "0"}
            interestEarned={interestEarned ? interestEarned : "0"}
            principal={principal ? principal : "0"}
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
          question={"What is the NSC Calculator??"}
          Answer={
            "The NSC Calculator helps you determine the returns on your investment in the National Savings Certificate (NSC), a fixed-income investment scheme backed by the Government of India. NSC offers guaranteed returns and tax benefits under Section 80C. This tool simplifies calculating the maturity value by factoring in the invested amount, tenure, and prevailing interest rate."
          }
        />
        <QuestionCard
          question={"How Does the NSC Calculator Work??"}
          Answer={
            "To use the NSC Calculator, input the investment amount, tenure, and applicable interest rate. The calculator applies the compound interest formula to compute the total amount at maturity. It considers annual compounding, making it easy for investors to see how their investment grows over time and plan accordingly."
          }
        />
      </div>
      <FAQs />
    </div>
  );
};

export default NSCcalculator;
