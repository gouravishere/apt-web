import React, { useState } from "react";
import Input from "../../../components/Input/Input";
import CalculatorInputsContainer from "../../../components/CalculatorInputsContainer/CalculatorInputsContainer";
import Button from "../../../components/Button/Button";
import HeadingBreadCrumb from "../../../components/HeadingBreadCrumb/HeadingBreadCrumb";
import FAQs from "../../../components/HomePage/FAQs/FAQs";
import CalculatorCard from "../../../components/CalculatorCard/CalculatorCard";
import SavingCard from "../../../components/SavingCard/SavingCard";
import QuestionCard from "../../../components/QuestionCard/QuestionCard";
import MultilayerDonutChart from "../../../components/CircularGraph/CircularGraph";
import Banner from "../../../components/Banner/Banner";
import TabSwitcher from "../../../components/TabSwitcher/TabSwitcher";
import { useNavigate } from "react-router-dom";

const tabsData = [
  {
    title: "metro",
    description: "Chennai, Mumbai, Delhi, Kolkata",
    activeClass: "bg-[#fdce00]/10 text-nowrap border-primary-500",
    inactiveClass: "bg-white text-nowrap border-neutral-300",
  },
  {
    title: "Other",
    description: "Other than metro cities",
    activeClass: "bg-[#fdce00]/10 text-nowrap border-primary-500",
    inactiveClass: "bg-white text-nowrap border-neutral-300",
  },
];

const CalculationHeading = ({ heading, totalAmount }) => {
  return (
    <div className="h-[25px] w-full justify-between items-center inline-flex">
      <div className="text-neutral-900 text-xl font-medium font-['Poppins'] leading-[25px]">
        {heading}
      </div>
      <div className="text-neutral-900 text-xl font-semibold font-['Poppins'] leading-[25px]">
        {totalAmount}
      </div>
    </div>
  );
};

const CalculationBreak = ({ label, amount }) => {
  return (
    <div className="h-6 justify-between items-center inline-flex w-full">
      <div className="w-[400px] text-slate-600 text-base font-normal font-['Poppins'] leading-normal">
        {label}
      </div>
      <div className="text-slate-600 text-base font-normal font-['Poppins'] leading-normal">
        {amount}
      </div>
    </div>
  );
};

const CalculationCard = ({ result, cityType }) => {
  const exemptedPercentage = (result?.monthlyExemption / result?.salary) * 100;
  const taxablePercentage = (result?.monthlyTaxable / result?.salary) * 100;

  return (
    <div className="flex bg-[#f8f9fa] border rounded-3xl overflow-hidden justify-between items-center w-full gap flex-col xl:flex-row">
      {/* chartstart */}
      <div className=" sm:p-[25px] xl:bg-white md:px-[40px] p-[10px] flex flex-col gap-[40px] justify-center items-center">
        <MultilayerDonutChart
          isTotal={true}
          orangeValue={taxablePercentage}
          blueValue={exemptedPercentage}
        />
        <div className="h-6  gap-6 inline-flex w-full justify-between">
          <div className="items-center gap-1 flex ">
            <div className="w-[13px] h-[13px] bg-[#1086f5] rounded"></div>
            <div className="text-slate-600 text-base font-normal font-['Poppins'] leading-normal">
              Exempted HRA
            </div>
          </div>
          <div className="text-slate-600 text-base font-medium font-['Poppins'] leading-normal">
            {result ? Number(result?.monthlyExemption).toFixed(2) : 0}
          </div>
        </div>

        <div className="h-6 justify-between items-center gap-6 inline-flex w-full">
          <div className="h-6 items-center justify-between gap-1 flex">
            <div className="w-[13px] h-[13px] bg-[#ff8b17] rounded"></div>
            <div className="text-slate-600 text-base font-normal font-['Poppins'] leading-normal">
              Taxable HRA
            </div>
          </div>
          <div className="text-slate-600 text-base font-medium font-['Poppins'] leading-normal">
            {result ? Number(result?.monthlyTaxable).toFixed(2) : 0}
          </div>
        </div>
      </div>
      {/* chart end */}
      <div className="sm:p-[25px] md:p-[40px] p-[10px] flex flex-col gap-[36px]  w-full">
        <div className="p-[24px] flex flex-col gap-[40px]">
          <CalculationHeading
            heading={"HRA Chargeable (₹)"}
            totalAmount={
              result ? Number(result?.monthlyTaxable).toFixed(2) : "0"
            }
          />
          <div className="flex flex-col gap-4">
            <CalculationBreak
              label={"Actual HRA received"}
              amount={
                result ? Number(result?.conditions.actual).toFixed(2) : "0"
              }
            />
            <CalculationBreak
              label={`${cityType === 0 ? "50%" : "40%"} of (Basic + DA)`}
              amount={
                result ? Number(result?.conditions.percent).toFixed(2) : "0"
              }
            />
            <CalculationBreak
              label={"Rent paid - 10% of (Basic + DA)"}
              amount={
                result ? Number(result?.conditions.rentMinus).toFixed(2) : "0"
              }
            />
          </div>
        </div>
        <SavingCard />
      </div>
    </div>
  );
};

const HraCalculator = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    basicSalary: "",
    da: "",
    hraReceived: "",
    rentPaid: "",
    city: 0,
  });

  const [selectedTab, setSelectedTab] = useState(0);
  const [result, setResult] = useState(null);
  const [validate, setValidate] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateHRA = () => {
    // Monthly values from form
    const monthlyBasic = Number(formData.basicSalary) || 0;
    const monthlyDA = Number(formData.da) || 0;
    const monthlyHRAReceived = Number(formData.hraReceived) || 0;
    const monthlyRentPaid = Number(formData.rentPaid) || 0;

    // Calculate monthly values first
    const monthlyBasicPlusDa = monthlyBasic + monthlyDA;
    const cityPercent = formData.city === 0 ? 0.5 : 0.4;

    // Calculate the three conditions for monthly HRA exemption
    const condition1 = monthlyHRAReceived; // Actual HRA received
    const condition2 = monthlyBasicPlusDa * cityPercent; // 50% or 40% of basic + DA
    const condition3 = Math.max(0, monthlyRentPaid - monthlyBasicPlusDa * 0.1); // Rent paid minus 10% of basic + DA

    // Monthly exemption is minimum of the three conditions
    const monthlyExemption = Math.min(condition1, condition2, condition3);
    const monthlyTaxable = Math.max(0, monthlyHRAReceived - monthlyExemption);

    // Calculate yearly values (monthly * 12)
    const yearlyExemption = monthlyExemption * 12;
    const yearlyTaxable = monthlyTaxable * 12;

    setResult({
      monthlyExemption,
      yearlyExemption,
      monthlyTaxable,
      yearlyTaxable,
      salary: formData.basicSalary,
      conditions: {
        actual: condition1,
        percent: condition2,
        rentMinus: condition3,
      },
    });
  };

  const validateInputs = () => {
    let error = {};
    if (selectedTab === 0 || selectedTab === 1) {
      if (
        formData.basicSalary === "" ||
        formData.basicSalary === null ||
        formData.basicSalary === undefined ||
        formData.basicSalary == 0
      ) {
        error.basicSalary = "This field can't be empty";
      }

      if (
        formData.da === "" ||
        formData.da === null ||
        formData.da === undefined
      ) {
        error.da = "This field can't be empty";
      }

      if (
        formData.rentPaid === "" ||
        formData.rentPaid === null ||
        formData.rentPaid === undefined ||
        formData.basicSalary == 0
      ) {
        error.rentPaid = "This field can't be empty";
      }

      if (
        formData.hraReceived === "" ||
        formData.hraReceived === null ||
        formData.hraReceived === undefined ||
        formData.basicSalary == 0
      ) {
        error.hraReceived = "This field can't be empty";
      }
    }

    setValidate(error);
    return Object.keys(error).length === 0;
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      calculateHRA();
    }
  };
  return (
    <div>
      <HeadingBreadCrumb
        isHeadingDesign={true}
        isHeadingDesignArrow={true}
        rightDesign={true}
        heading="HRA Calculator"
        sparkleRight={true}
        yellowDotLeft={true}
        description={
          "The HRA Calculator helps salaried individuals determine the tax exemption they can claim under House Rent Allowance (HRA) based on their salary"
        }
      />
      <CalculatorInputsContainer>
        <div className="w-full">
          <div className="text-slate-500 mb-2 text-sm font-medium leading-[21px]">
            Location
          </div>
          <div className="max-w-[375px]">
            <TabSwitcher
              activeTab={selectedTab}
              tabs={tabsData}
              setActiveTab={(e) => {
                setSelectedTab(e);
                setFormData((prev) => ({ ...prev, city: e }));
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-[24px] md:grid-cols-2 lg:grid-cols-3 w-full">
          <Input
            placeholder={"Enter Amount"}
            fieldName={"basicSalary"}
            label={"Monthly Basic Salary"}
            required={true}
            type={"number"}
            min={0}
            name={""}
            value={formData.basicSalary}
            onChange={handleChange}
            validateMsg={validate.basicSalary}
          />

          <Input
            placeholder={"Enter Amnount"}
            fieldName={"da"}
            label={"Monthly DA (Dearness Allowance)"}
            required={true}
            type={"number"}
            min={0}
            value={formData.da}
            onChange={handleChange}
            validateMsg={validate.da}
          />
          <Input
            placeholder={"Enter Amount"}
            fieldName={"hraReceived"}
            label={"Monthly HRA Received"}
            value={formData.hraReceived}
            type={"number"}
            min={0}
            onChange={handleChange}
            required={true}
            validateMsg={validate.hraReceived}
          />
          <Input
            placeholder={"Enter Amount"}
            fieldName={"rentPaid"}
            label={"Monthly Rent Paid"}
            value={formData.rentPaid}
            type={"number"}
            min={0}
            onChange={handleChange}
            required={true}
            validateMsg={validate.rentPaid}
          />
        </div>
        <Button onClick={handleSubmit} variant="black">
          Calculate Now
        </Button>

        {/* calculation card start*/}
        <CalculationCard
          cityType={formData?.city}
          result={result}
          hra
          selectedTab={selectedTab}
        />
        {/* calculation card end*/}
      </CalculatorInputsContainer>{" "}
      <Banner />
      {/* <img src={bannerImg} alt="" /> */}
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
          question={"What is the HRA Calculator?"}
          Answer={
            "The HRA Calculator is a tool designed for salaried employees to compute the amount of House Rent Allowance they can claim as a tax exemption under Section 10(13A) of the Income Tax Act. HRA is a part of the salary structure, and the exemption is calculated based on factors like basic salary, actual rent paid, and the city of residence (metro or non-metro). This calculator simplifies complex calculations and helps taxpayers maximize their deductions."
          }
        />
        <QuestionCard
          question={"How Does the HRA Calculator Work?"}
          Answer={
            "The calculator works by taking inputs such as your basic salary, HRA received, actual rent paid, and city of residence. It uses these inputs to calculate the least of the following three values: 50% or 40% of the basic salary (metro or non-metro cities), actual HRA received, and actual rent paid minus 10% of the salary. The lowest value is your eligible HRA exemption, saving you from manually performing intricate calculations."
          }
        />
      </div>
      <FAQs />
    </div>
  );
};

export default HraCalculator;
