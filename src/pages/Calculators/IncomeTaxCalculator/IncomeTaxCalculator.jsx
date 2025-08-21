import React, { useState } from "react";
import CalculatorInputsContainer from "../../../components/CalculatorInputsContainer/CalculatorInputsContainer";
import HeadingBreadCrumb from "../../../components/HeadingBreadCrumb/HeadingBreadCrumb";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import CalculatorCard from "../../../components/CalculatorCard/CalculatorCard";
import QuestionCard from "../../../components/QuestionCard/QuestionCard";
import FAQs from "../../../components/HomePage/FAQs/FAQs";
import DropDown from "../../../components/DropDown/DropDown";
import SavingCard from "../../../components/SavingCard/SavingCard";
import TabSwitcher from "../../../components/TabSwitcher/TabSwitcher";
import { useNavigate } from "react-router-dom";
import Banner from "../../../components/Banner/Banner";

const IncometaxCalculationCard = ({
  regime,
  oldTaxLiability,
  newTaxLiability,
}) => {
  return (
    <div className="md:p-[40px] p-[10px] bg-[#f8f9fa] rounded-3xl w-full flex-col justify-end items-start gap-9 inline-flex">
      <div className="self-stretch justify-start items-center inline-flex">
        <div className="text-center text-slate-600 text-lg font-medium font-['Poppins'] leading-[27px]">
          Income tax calculator
        </div>
      </div>
      <div className="self-stretch justify-between items-center inline-flex">
        <div className="text-slate-600 text-xl font-normal font-['Poppins'] leading-[30px]">
          Tax Liability
        </div>
        <div className="text-neutral-900 text-xl font-semibold font-['Poppins'] leading-[25px]">
          ₹{regime === "Old Regime" ? oldTaxLiability : newTaxLiability}
        </div>
      </div>
      <SavingCard />
    </div>
  );
};

const yearOptions = [
  { label: "2023-24", name: "2023-24" },
  { label: "2024-25", name: "2024-25" },
  { label: "2025-26", name: "2025-26" },
];

const ageGroupOptions = [
  { label: "Below 60", name: "below60" },
  { label: "60-80", name: "60to80" },
  { label: "Above 80", name: "above80" },
];

const regimeOptions = [
  { label: "Old Regime", name: "Old Regime" },
  { label: "New Regime", name: "New Regime" },
];

const cityOptions = [
  { label: "Metro", name: "Metro" },
  { label: "Non-Metro", name: "Non-Metro" },
];

const tabsData = [
  {
    title: "Income Details",
    activeClass: "bg-[#fdce00]/10 border-primary-500",
    inactiveClass: "bg-white border-b-2 border border-neutral-300",
  },
  {
    title: "Deductions",
    activeClass: "bg-[#fdce00]/10 border-primary-500",
    inactiveClass: "bg-white border-b-2 border border-neutral-300",
  },
  {
    title: "HRA Exemption",
    activeClass: "bg-[#fdce00]/10 border-primary-500",
    inactiveClass: "bg-white border-b-2 border border-neutral-300",
  },
];

const deductionLabels = {
  deduction80C: "Deduction 80C",
  deduction80CCD1B: "Deduction 80CCD(1B)",
  deduction80D: "Deduction 80D",
  deduction80G: "Deduction 80G",
  deduction80TTA_TTB: "Deduction 80TTA/80TTB",
  deduction80E: "Deduction 80E",
  deduction80EEA: "Deduction 80EEA",
};

const IncomeTaxCalculator = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  const [taxLiability, setTaxLiability] = useState({ old: 0, new: 0 });
  const [grossSalaryIncome, setGrossSalaryIncome] = useState("");
  const [incomeOtherSources, setIncomeOtherSources] = useState("");
  const [incomeInterest, setIncomeInterest] = useState("");
  const [rentalIncome, setRentalIncome] = useState("");
  const [deductions, setDeductions] = useState({
    deduction80C: "",
    deduction80CCD1B: "",
    deduction80D: "",
    deduction80G: "",
    deduction80TTA_TTB: "",
    deduction80E: "",
    deduction80EEA: "",
  });
  const [hraDetails, setHraDetails] = useState({
    basicSalary: "",
    dearnessAllowance: "",
    hraReceived: "",
    totalRentPaid: "",
  });
  const [assessmentYear, setAssessmentYear] = useState("2025-26");
  const [ageGroup, setAgeGroup] = useState("below60");
  const [taxRegime, setTaxRegime] = useState("Old Regime");
  const [city, setCity] = useState("Metro");
  const [validate, setValidate] = useState({});

  const taxSlabs = {
    "2023-24": {
      old: {
        below60: [
          { limit: 250000, rate: 0 },
          { limit: 500000, rate: 0.05 },
          { limit: 1000000, rate: 0.2 },
          { limit: Infinity, rate: 0.3 },
        ],
        "60to80": [
          { limit: 300000, rate: 0 },
          { limit: 500000, rate: 0.05 },
          { limit: 1000000, rate: 0.2 },
          { limit: Infinity, rate: 0.3 },
        ],
        above80: [
          { limit: 500000, rate: 0 },
          { limit: 1000000, rate: 0.2 },
          { limit: Infinity, rate: 0.3 },
        ],
      },
      new: [
        { limit: 250000, rate: 0 },
        { limit: 500000, rate: 0.05 },
        { limit: 750000, rate: 0.1 },
        { limit: 1000000, rate: 0.15 },
        { limit: 1250000, rate: 0.2 },
        { limit: 1500000, rate: 0.25 },
        { limit: Infinity, rate: 0.3 },
      ],
      rebateLimitOld: 500000,
      rebateLimitNew: 500000,
      standardDeductionOld: 50000,
      standardDeductionNew: 0,
    },
    "2024-25": {
      old: {
        below60: [
          { limit: 250000, rate: 0 },
          { limit: 500000, rate: 0.05 },
          { limit: 1000000, rate: 0.2 },
          { limit: Infinity, rate: 0.3 },
        ],
        "60to80": [
          { limit: 300000, rate: 0 },
          { limit: 500000, rate: 0.05 },
          { limit: 1000000, rate: 0.2 },
          { limit: Infinity, rate: 0.3 },
        ],
        above80: [
          { limit: 500000, rate: 0 },
          { limit: 1000000, rate: 0.2 },
          { limit: Infinity, rate: 0.3 },
        ],
      },
      new: [
        { limit: 300000, rate: 0 },
        { limit: 600000, rate: 0.05 },
        { limit: 900000, rate: 0.1 },
        { limit: 1200000, rate: 0.15 },
        { limit: 1500000, rate: 0.2 },
        { limit: Infinity, rate: 0.3 },
      ],
      rebateLimitOld: 500000,
      rebateLimitNew: 700000,
      standardDeductionOld: 50000,
      standardDeductionNew: 50000,
    },
    "2025-26": {
      old: {
        below60: [
          { limit: 250000, rate: 0 },
          { limit: 500000, rate: 0.05 },
          { limit: 1000000, rate: 0.2 },
          { limit: Infinity, rate: 0.3 },
        ],
        "60to80": [
          { limit: 300000, rate: 0 },
          { limit: 500000, rate: 0.05 },
          { limit: 1000000, rate: 0.2 },
          { limit: Infinity, rate: 0.3 },
        ],
        above80: [
          { limit: 500000, rate: 0 },
          { limit: 1000000, rate: 0.2 },
          { limit: Infinity, rate: 0.3 },
        ],
      },
      new: [
        { limit: 300000, rate: 0 },
        { limit: 700000, rate: 0.05 },
        { limit: 1000000, rate: 0.1 },
        { limit: 1200000, rate: 0.15 },
        { limit: 1500000, rate: 0.2 },
        { limit: Infinity, rate: 0.3 },
      ],
      rebateLimitOld: 500000,
      rebateLimitNew: 700000,
      standardDeductionOld: 50000,
      standardDeductionNew: 75000,
    },
  };

  const surchargeRates = [
    { limit: 5000000, rate: 0 },
    { limit: 10000000, rate: 0.1 },
    { limit: 20000000, rate: 0.15 },
    { limit: 50000000, rate: 0.25 },
    { limit: Infinity, rate: 0.37 },
  ];

  const calculateTax = (taxableIncome, slabs) => {
    let tax = 0;
    let remainingIncome = taxableIncome;
    let prevLimit = 0;

    for (let slab of slabs) {
      const limit = slab.limit === Infinity ? Infinity : slab.limit - prevLimit;
      if (remainingIncome > limit) {
        tax += limit * slab.rate;
        remainingIncome -= limit;
      } else {
        tax += remainingIncome * slab.rate;
        break;
      }
      prevLimit = slab.limit;
    }
    return tax;
  };

  const calculateSurcharge = (basicTax, totalIncome) => {
    for (let slab of surchargeRates) {
      if (totalIncome <= slab.limit) {
        return basicTax * slab.rate;
      }
    }
    return basicTax * 0.37;
  };

  const calculateHRAExemption = (
    basicSalary,
    hraReceived,
    totalRentPaid,
    city
  ) => {
    const rentPaidExcess = totalRentPaid - 0.1 * basicSalary;
    const hraMetroLimit =
      city === "Metro" ? 0.5 * basicSalary : 0.4 * basicSalary;
    return Math.min(hraReceived, rentPaidExcess, hraMetroLimit);
  };

  const handleIncomeChange = (e, setter) => {
    setter(e.target.value ? e.target.value : "");
  };

  const handleDeductionChange = (e) => {
    setDeductions({
      ...deductions,
      [e.target.name]: e.target.value ? e.target.value : "",
    });
  };

  const handleHraChange = (e) => {
    const { name, value } = e.target;
    setHraDetails({
      ...hraDetails,
      [name]: value ? value : "",
    });
  };

  const calculateTaxLiability = () => {
    const grossIncome = Number(grossSalaryIncome || 0);
    const otherIncome =
      Number(incomeOtherSources || 0) + Number(incomeInterest || 0);
    const rentalIncomeVal = Number(rentalIncome || 0);
    const rentalDeduction = rentalIncomeVal * 0.3;

    // Deduction limits (Old Regime only)
    const deduction80C = Math.min(Number(deductions.deduction80C || 0), 150000);
    const deduction80CCD1B = Math.min(
      Number(deductions.deduction80CCD1B || 0),
      50000
    );
    const deduction80D = Math.min(
      Number(deductions.deduction80D || 0),
      ageGroup === "below60" ? 25000 : 50000
    );
    const deduction80G = Number(deductions.deduction80G || 0);
    const deduction80TTA = Math.min(
      Number(deductions.deduction80TTA_TTB || 0),
      ageGroup === "below60" ? 10000 : 50000
    );
    const deduction80E = Number(deductions.deduction80E || 0);
    const deduction80EEA = Number(deductions.deduction80EEA || 0);

    const totalDeductionsOld =
      deduction80C +
      deduction80CCD1B +
      deduction80D +
      deduction80G +
      deduction80TTA +
      deduction80E +
      deduction80EEA;

    // HRA Exemption (Old Regime only)
    const hraExemption = calculateHRAExemption(
      Number(hraDetails.basicSalary || 0),
      Number(hraDetails.hraReceived || 0),
      Number(hraDetails.totalRentPaid || 0),
      city
    );

    // Net Taxable Income - Old Regime
    const taxableOld = Math.max(
      grossIncome +
        otherIncome +
        rentalIncomeVal -
        rentalDeduction -
        taxSlabs[assessmentYear].standardDeductionOld -
        totalDeductionsOld -
        hraExemption,
      0
    );

    // Net Taxable Income - New Regime
    const taxableNew = Math.max(
      grossIncome +
        otherIncome +
        rentalIncomeVal -
        rentalDeduction -
        taxSlabs[assessmentYear].standardDeductionNew,
      0
    );

    // Calculate Basic Tax
    const oldRegimeBasicTax = calculateTax(
      taxableOld,
      taxSlabs[assessmentYear].old[ageGroup]
    );
    const newRegimeBasicTax = calculateTax(
      taxableNew,
      taxSlabs[assessmentYear].new
    );

    // Apply Rebate
    const totalIncomeOld = taxableOld;
    const totalIncomeNew = taxableNew;
    const oldRegimeTaxAfterRebate =
      totalIncomeOld <= taxSlabs[assessmentYear].rebateLimitOld
        ? 0
        : oldRegimeBasicTax;
    const newRegimeTaxAfterRebate =
      totalIncomeNew <= taxSlabs[assessmentYear].rebateLimitNew
        ? 0
        : newRegimeBasicTax;

    // Calculate Surcharge
    const oldRegimeSurcharge = calculateSurcharge(
      oldRegimeTaxAfterRebate,
      totalIncomeOld
    );
    const newRegimeSurcharge = calculateSurcharge(
      newRegimeTaxAfterRebate,
      totalIncomeNew
    );

    // Health & Education Cess (4%)
    const oldRegimeCess = (oldRegimeTaxAfterRebate + oldRegimeSurcharge) * 0.04;
    const newRegimeCess = (newRegimeTaxAfterRebate + newRegimeSurcharge) * 0.04;

    // Total Tax Liability
    const oldTaxLiability = Math.ceil(
      oldRegimeTaxAfterRebate + oldRegimeSurcharge + oldRegimeCess
    );
    const newTaxLiability = Math.ceil(
      newRegimeTaxAfterRebate + newRegimeSurcharge + newRegimeCess
    );

    setTaxLiability({ old: oldTaxLiability, new: newTaxLiability });
  };

  const validateInputs = () => {
    let error = {};

    const fieldValidation = (value) => value === "" || value < 0;

    if (selectedTab === 0) {
      if (fieldValidation(grossSalaryIncome))
        error.grossSalaryIncome = "This field can't be empty or negative";
      if (fieldValidation(incomeOtherSources))
        error.incomeOtherSources = "This field can't be empty or negative";
      if (fieldValidation(incomeInterest))
        error.incomeInterest = "This field can't be empty or negative";
      if (fieldValidation(rentalIncome))
        error.rentalIncome = "This field can't be empty or negative";
    }

    if (selectedTab === 1) {
      if (fieldValidation(deductions.deduction80C))
        error.deduction80C = "This field can't be empty or negative";
      if (fieldValidation(deductions.deduction80CCD1B))
        error.deduction80CCD1B = "This field can't be empty or negative";
      if (fieldValidation(deductions.deduction80D))
        error.deduction80D = "This field can't be empty or negative";
      if (fieldValidation(deductions.deduction80G))
        error.deduction80G = "This field can't be empty or negative";
      if (fieldValidation(deductions.deduction80TTA_TTB))
        error.deduction80TTA_TTB = "This field can't be empty or negative";
      if (fieldValidation(deductions.deduction80E))
        error.deduction80E = "This field can't be empty or negative";
      if (fieldValidation(deductions.deduction80EEA))
        error.deduction80EEA = "This field can't be empty or negative";
    }

    if (selectedTab === 2) {
      if (fieldValidation(hraDetails.basicSalary))
        error.basicSalary = "This field can't be empty or negative";
      if (taxRegime === "Old Regime" && fieldValidation(hraDetails.hraReceived))
        error.hraReceived = "This field can't be empty or negative";
      if (fieldValidation(hraDetails.dearnessAllowance))
        error.dearnessAllowance = "This field can't be empty or negative";
      if (fieldValidation(hraDetails.totalRentPaid))
        error.totalRentPaid = "This field can't be empty or negative";
    }

    setValidate(error);
    return Object.keys(error).length === 0;
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      if (selectedTab !== 2) {
        setSelectedTab(selectedTab + 1);
      } else {
        calculateTaxLiability();
      }
    }
  };

  return (
    <div>
      <HeadingBreadCrumb
        rightDesign={true}
        isHeadingDesignArrow={true}
        sparkleRight={true}
        yellowDotLeft={true}
        heading="Income Tax Calculator"
        description="Calculate your tax liability under Old and New Regimes, considering income, deductions, and exemptions."
      />
      <CalculatorInputsContainer>
        <div className="flex gap-6 w-full">
          <TabSwitcher
            tabs={tabsData}
            activeTab={selectedTab}
            setActiveTab={(e) => setSelectedTab(e)}
          />
        </div>

        {selectedTab === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] w-full">
            <DropDown
              label="Assessment Year"
              options={yearOptions}
              selectedValue={assessmentYear}
              onOptionSelect={(e) => setAssessmentYear(e.name)}
            />
            <DropDown
              label="Age Group"
              options={ageGroupOptions}
              selectedValue={ageGroup}
              onOptionSelect={(e) => setAgeGroup(e.name)}
            />
            <Input
              placeholder="Enter amount"
              fieldName="grossSalaryIncome"
              label="Gross Salary Income"
              type="number"
              value={grossSalaryIncome}
              onChange={(e) => handleIncomeChange(e, setGrossSalaryIncome)}
              validateMsg={validate.grossSalaryIncome}
              required={true}
            />
            <Input
              placeholder="Enter amount"
              fieldName="incomeOtherSources"
              label="Income from Other Sources"
              type="number"
              value={incomeOtherSources}
              onChange={(e) => handleIncomeChange(e, setIncomeOtherSources)}
              validateMsg={validate.incomeOtherSources}
              required={true}
            />
            <Input
              placeholder="Enter amount"
              fieldName="incomeInterest"
              label="Interest Income"
              type="number"
              value={incomeInterest}
              onChange={(e) => handleIncomeChange(e, setIncomeInterest)}
              validateMsg={validate.incomeInterest}
              required={true}
            />
            <Input
              placeholder="Enter amount"
              fieldName="rentalIncome"
              label="Rental Income"
              type="number"
              value={rentalIncome}
              onChange={(e) => handleIncomeChange(e, setRentalIncome)}
              validateMsg={validate.rentalIncome}
              required={true}
            />
          </div>
        )}

        {selectedTab === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] w-full">
            {Object.keys(deductions).map((key) => (
              <Input
                key={key}
                placeholder="Enter amount"
                fieldName={key}
                label={deductionLabels[key]}
                type="number"
                value={deductions[key]}
                onChange={handleDeductionChange}
                validateMsg={validate[key]}
                required={true}
              />
            ))}
          </div>
        )}

        {selectedTab === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] w-full">
            <DropDown
              label="Location"
              options={cityOptions}
              selectedValue={city}
              onOptionSelect={(e) => setCity(e.name)}
            />
            <DropDown
              label="Tax Regime"
              options={regimeOptions}
              selectedValue={taxRegime}
              onOptionSelect={(e) => setTaxRegime(e.name)}
            />
            <Input
              placeholder="Enter amount"
              fieldName="basicSalary"
              label="Basic Salary"
              type="number"
              value={hraDetails.basicSalary}
              onChange={handleHraChange}
              validateMsg={validate.basicSalary}
              required={true}
            />
            <Input
              placeholder="Enter amount"
              fieldName="dearnessAllowance"
              label="Dearness Allowance"
              type="number"
              value={hraDetails.dearnessAllowance}
              onChange={handleHraChange}
              validateMsg={validate.dearnessAllowance}
              required={true}
            />
            <Input
              placeholder="Enter amount"
              fieldName="hraReceived"
              label="HRA Received"
              type="number"
              value={hraDetails.hraReceived}
              onChange={handleHraChange}
              validateMsg={validate.hraReceived}
              required={taxRegime === "Old Regime"}
            />
            <Input
              placeholder="Enter amount"
              fieldName="totalRentPaid"
              label="Total Rent Paid"
              type="number"
              value={hraDetails.totalRentPaid}
              onChange={handleHraChange}
              validateMsg={validate.totalRentPaid}
              required={true}
            />
          </div>
        )}

        <Button onClick={handleSubmit} variant="black">
          {selectedTab === 2 ? "Calculate Now" : "Continue"}
        </Button>

        <IncometaxCalculationCard
          regime={taxRegime}
          oldTaxLiability={taxLiability.old}
          newTaxLiability={taxLiability.new}
        />
      </CalculatorInputsContainer>
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
          question={"What is the Income Tax Calculator?"}
          Answer={
            "The Income Tax Calculator is a comprehensive tool to determine your tax liability under both Old and New Tax Regimes based on your annual income, deductions, and exemptions. It uses the latest tax slabs to provide accurate estimates for financial planning."
          }
        />
        <QuestionCard
          question={"How Does the Income Tax Calculator Work?"}
          Answer={
            "The calculator takes inputs like income, deductions, and HRA details, then applies the appropriate tax slabs, rebates, surcharges, and cess based on the selected assessment year and age group. It computes and compares tax liabilities under both regimes."
          }
        />
      </div>

      <FAQs />
    </div>
  );
};

export default IncomeTaxCalculator;
