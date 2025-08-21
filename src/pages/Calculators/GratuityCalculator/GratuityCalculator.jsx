import React, { useState } from "react";
import CalculatorInputsContainer from "../../../components/CalculatorInputsContainer/CalculatorInputsContainer";
import HeadingBreadCrumb from "../../../components/HeadingBreadCrumb/HeadingBreadCrumb";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import CalculatorCard from "../../../components/CalculatorCard/CalculatorCard";
import QuestionCard from "../../../components/QuestionCard/QuestionCard";
import FAQs from "../../../components/HomePage/FAQs/FAQs";
import DropDown from "../../../components/DropDown/DropDown";
import Banner from "../../../components/Banner/Banner";
import { useNavigate } from "react-router-dom";

const options = [
  { label: "Government", name: "Government" },
  { label: "Private Sector", name: "Private Sector" },
];

const GratuityCalculationCard = ({ gratuity }) => {
  return (
    <div className="md:p-[40px] p-[10px] w-full rounded-xl md:px-8 md:py-10 py-4 px-3 bg-[#f8f9fa] rounded-tr-3xl rounded-br-3xl flex-col justify-end items-start md:gap-9 gap-3   inline-flex">
      <div className="self-stretch justify-start items-center inline-flex">
        <div className="text-center text-slate-600 md:text-lg text-md font-medium font-['Poppins'] leading-[27px]">
          Gratuity Calculator Result
        </div>
      </div>
      <div className="self-stretch justify-between md:text-xl text-md items-center inline-flex">
        <div className="text-slate-600 font-normal font-['Poppins'] leading-[30px]">
          Gratuity Amount
        </div>
        <div className="text-neutral-900  font-semibold font-['Poppins'] leading-[25px]">
          ₹ {gratuity}
        </div>
      </div>
    </div>
  );
};

const GratuityCalculator = () => {
  const [basicSalary, setBasicSalary] = useState("");
  const [dearnessAllowance, setDearnessAllowance] = useState(0);
  const [yearsOfService, setYearsOfService] = useState("");
  const [monthsBeyondFullYears, setMonthsBeyondFullYears] = useState(0);
  const [organizationType, setOrganizationType] = useState("Private Sector");
  const [gratuityAmount, setGratuityAmount] = useState(null);
  const [validate,setValidate]=useState({})
  const navigate = useNavigate();

  // Formula to calculate gratuity
  const calculateGratuity = () => {
   

    const salary = parseFloat(basicSalary);
    const da = parseFloat(dearnessAllowance) || 0;
    const totalYears =
      parseFloat(yearsOfService) + parseFloat(monthsBeyondFullYears) / 12;

    const gratuity = ((salary + da) / 26) * 15 * totalYears;
    setGratuityAmount(gratuity.toFixed(2));
  };

  const validateInputs=()=>{
    let error={}
      if(!basicSalary) error.basicSalary="This field cant be empty"
    if(!yearsOfService) error.yearsOfService="This field cant be empty"
    setValidate(error)
    return Object.keys(error).length==0
  }

  const submitHandler=()=>{
    if(validateInputs()) {
      calculateGratuity()
    }
  }
  return (
    <div>
      <HeadingBreadCrumb
         isHeadingDesignArrow ={true} 
         sparkleRight={true}
         gratuity={true}
        rightDesign={true}
        heading="Gratuity calculator"
        description={
          "The Gratuity Calculator helps employees calculate the amount of gratuity they are eligible for upon leaving a company after completing a minimum of five years of service."
        }
      />
      <CalculatorInputsContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] w-full">
          <Input
            placeholder="Enter principal amount"
            fieldName="principal"
            label="Last Drawn Basic Salary"
            required={true}
            type="number"
            min={0}
            value={basicSalary}
            onChange={(e) => setBasicSalary(e.target.value)}
            validate={(value)=>value<=0?'This field cant be empty':''}
            validateMsg={validate.basicSalary}
          />
          <Input
            placeholder="Enter investment tenure in years"
            fieldName="tenure"
            label="Dearness Allowance"
            type="number"
            min={0}
            value={dearnessAllowance}
            onChange={(e) => setDearnessAllowance(e.target.value)}
          />
          <Input
            placeholder="Enter years"
            fieldName="rate"
            label="Total years of service"
            required={true}
            type="number"
            min={0}
            step={0.1}
            value={yearsOfService}
            onChange={(e) => setYearsOfService(e.target.value)}
            validate={(value)=>value<=0?'This field cant be empty':''}
            validateMsg={validate.yearsOfService}
          />
          <Input
            placeholder="Enter annual interest rate"
            fieldName="rate"
            label="Number of Months Worked Beyond Full Years"
            type="number"
            max={11}
            min={0}
            value={monthsBeyondFullYears}
            onChange={(e) => {
              let value = Number(e.target.value);
              if (value > 11) {
                value = 11;
              } else if (value < 0) {
                value = 0;
              }
              setMonthsBeyondFullYears(value);
            }}
            onBlur={() => {
              if (monthsBeyondFullYears > 11) {
                setMonthsBeyondFullYears(11);
              }
            }}
          />

          <DropDown
            label={"Organization Type:"}
            options={options}
            onOptionSelect={(e) => setOrganizationType(e.name)}
          />
        </div>
        <Button onClick={submitHandler} variant="black">
          Calculate now
        </Button>
        <GratuityCalculationCard gratuity={gratuityAmount || 0} />
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
      <div className="flex flex-col h-auto w-full gap-[30px] md:gap-[80px]">
        <QuestionCard
          question={"What is the Gratuity Calculator?"}
          Answer={
            "The Gratuity Calculator is a tool designed to estimate the lump sum amount an employee receives as a gratuity under the Payment of Gratuity Act, 1972. Gratuity is calculated based on the employee’s last drawn salary, years of service, and applicable laws. This calculator is useful for understanding the benefits you’re entitled to upon retirement or resignation."
          }
        />
        <QuestionCard
          question={"How Does the Gratuity Calculator Work?"}
          Answer={
            "The calculator requires inputs like your last drawn salary and years of service. It applies the applicable rules to compute the gratuity amount, giving you a clear idea of the benefits you will receive. This tool is especially helpful for financial planning as you transition from employment."
          }
        />
      </div>
      <FAQs />
    </div>
  );
};

export default GratuityCalculator;
