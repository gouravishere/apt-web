import { useState } from "react";
import Button from "../../../components/Button/Button";
import CalculatorInputsContainer from "../../../components/CalculatorInputsContainer/CalculatorInputsContainer";
import HeadingBreadCrumb from "../../../components/HeadingBreadCrumb/HeadingBreadCrumb";
import Input from "../../../components/Input/Input";
import OldAndNewTaxRegimeCard from "./OldAndNewTaxRegime/OldAndNewTaxRegime";
import QuestionCard from "../../../components/QuestionCard/QuestionCard";
import CalculatorCard from "../../../components/CalculatorCard/CalculatorCard";
import FAQs from "../../../components/HomePage/FAQs/FAQs";
import Banner from "../../../components/Banner/Banner";
import { useNavigate } from "react-router-dom";
import link from "../../../assets/icons/export.svg";
import DropDown from "../../../components/DropDown/DropDown";

const yearOptions = [
  { label: "2023-24", name: "2023-24" },
  { label: "2024-25", name: "2024-25" },
  { label: "2025-26", name: "2025-26" },
];

export default function OldAndNewTaxRegime() {
  const [assessmentYear, setAssessmentYear] = useState("2025-26");
  const [showCard, setShowCard] = useState(false);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    grossSalaryIncome: "",
    incomeFromOtherSources: "",
    interestIncome: "",
    rentalIncome: "",
    basicSalary: "",
    hraReceived: "",
    totalRentPaid: "",
    location: "Metro",
    deductions: {
      section80C: "",
      section80CCD1B: "",
      section80D: "",
      section80G: "",
      section80TTA: "",
      section80E: "",
      section80EEA: "",
    },
    age: "below60",
  });

  const [results, setResults] = useState({
    oldRegimeTax: 0,
    newRegimeTax: 0,
    savings: 0,
    recommendation: "",
  });

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
    location
  ) => {
    const rentPaidExcess = totalRentPaid - 0.1 * basicSalary;
    const hraMetroLimit =
      location === "Metro" ? 0.5 * basicSalary : 0.4 * basicSalary;
    return Math.min(hraReceived, rentPaidExcess, hraMetroLimit);
  };

  const handleSubmit = () => {
    const {
      grossSalaryIncome,
      incomeFromOtherSources,
      interestIncome,
      rentalIncome,
      basicSalary,
      hraReceived,
      totalRentPaid,
      location,
      deductions,
      age,
    } = inputs;

    const grossIncome = parseInt(grossSalaryIncome || 0);
    const otherIncome =
      parseInt(incomeFromOtherSources || 0) + parseInt(interestIncome || 0);
    const rentalIncomeVal = parseInt(rentalIncome || 0);
    const rentalDeduction = rentalIncomeVal * 0.3;

    // Deduction limits (Old Regime only)
    const deduction80C = Math.min(parseInt(deductions.section80C || 0), 150000);
    const deduction80CCD1B = Math.min(
      parseInt(deductions.section80CCD1B || 0),
      50000
    );
    const deduction80D = Math.min(
      parseInt(deductions.section80D || 0),
      age === "below60" ? 25000 : 50000
    );
    const deduction80G = parseInt(deductions.section80G || 0);
    const deduction80TTA = Math.min(
      parseInt(deductions.section80TTA || 0),
      age === "below60" ? 10000 : 50000
    );
    const deduction80E = parseInt(deductions.section80E || 0);
    const deduction80EEA = parseInt(deductions.section80EEA || 0);

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
      parseInt(basicSalary || 0),
      parseInt(hraReceived || 0),
      parseInt(totalRentPaid || 0),
      location
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

    // Net Taxable Income - New Regime (No deductions except rental and standard)
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
      taxSlabs[assessmentYear].old[age]
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
    const oldRegimeTax = Math.ceil(
      oldRegimeTaxAfterRebate + oldRegimeSurcharge + oldRegimeCess
    );
    const newRegimeTax = Math.ceil(
      newRegimeTaxAfterRebate + newRegimeSurcharge + newRegimeCess
    );

    // Savings and Recommendation
    const savings = oldRegimeTax - newRegimeTax;
    const recommendation =
      savings > 0 ? "Opt for the New Regime." : "Opt for the Old Regime.";

    setResults({ oldRegimeTax, newRegimeTax, savings, recommendation });
    setShowCard(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [parent, child] = name.split(".");

    if (child) {
      setInputs((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setInputs((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateInputs = () => {
    let error = {};
    if (!inputs.grossSalaryIncome)
      error.grossSalaryIncome = "This field can't be empty";
    if (!inputs.basicSalary) error.basicSalary = "This field can't be empty";
    setValidate(error);
    return Object.keys(error).length === 0;
  };

  const submitHandler = () => {
    if (validateInputs()) {
      handleSubmit();
    }
  };

  return (
    <div>
      <HeadingBreadCrumb
        oldAndNew={true}
        isHeadingDesignArrow={true}
        rightDesign={true}
        sparkleRight={true}
        heading="Old & New Tax Regime"
        description="Compare tax liabilities under Old and New Tax Regimes based on income, deductions, and exemptions."
      />
      <CalculatorInputsContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <DropDown
            label="Assessment Year"
            options={yearOptions}
            selectedValue={assessmentYear} // Default to the first option if no value is selected
            onOptionSelect={(e) => setAssessmentYear(e.name)}
          />

          <DropDown
            label="Age Group"
            options={[
              { name: "below60", label: "Age below 60" },
              { name: "60to80", label: "Age 60-80" },
              { name: "above80", label: "Age above 80" },
            ]}
            selectedValue={inputs.age} // Default to the first option if no value is selected
            onOptionSelect={(e) => 
              setInputs((prev) => ({ ...prev, age: e.name }))
            }
          />

          <Input
            placeholder="Enter Amount"
            fieldName="grossSalaryIncome"
            label="Gross Salary Income"
            required={true}
            type="number"
            min={0}
            value={inputs.grossSalaryIncome}
            onChange={handleChange}
            validateMsg={validate.grossSalaryIncome}
          />
          <Input
            placeholder="Enter Amount"
            fieldName="incomeFromOtherSources"
            label="Income from Other Sources"
            type="number"
            min={0}
            value={inputs.incomeFromOtherSources}
            onChange={handleChange}
          />
          <Input
            placeholder="Enter Amount"
            fieldName="interestIncome"
            label="Interest Income"
            type="number"
            min={0}
            value={inputs.interestIncome}
            onChange={handleChange}
          />
          <Input
            placeholder="Enter Amount"
            fieldName="rentalIncome"
            label="Rental Income"
            type="number"
            min={0}
            value={inputs.rentalIncome}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-6">
          <Input
            placeholder="Enter Amount"
            fieldName="basicSalary"
            label="Basic Salary"
            required={true}
            type="number"
            min={0}
            value={inputs.basicSalary}
            onChange={handleChange}
            validateMsg={validate.basicSalary}
          />
          <Input
            placeholder="Enter Amount"
            fieldName="hraReceived"
            label="HRA Received"
            type="number"
            min={0}
            value={inputs.hraReceived}
            onChange={handleChange}
          />
          <Input
            placeholder="Enter Amount"
            fieldName="totalRentPaid"
            label="Total Rent Paid"
            type="number"
            min={0}
            value={inputs.totalRentPaid}
            onChange={handleChange}
          />

          <DropDown
            label="Location"
            options={[
              { name: "Metro", label: "Metro" },
              { name: "Non-Metro", label: "Non-Metro" },
            ]}
            selectedValue={inputs.location} // Default to the first option if no value is selected
            onOptionSelect={(e) =>
              setInputs((prev) => ({ ...prev, location: e.name }))
            }
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-6">
          <Input
            placeholder="Enter Amount"
            fieldName="deductions.section80C"
            label="Section 80C"
            type="number"
            min={0}
            value={inputs.deductions.section80C}
            onChange={handleChange}
          />
          <Input
            placeholder="Enter Amount"
            fieldName="deductions.section80CCD1B"
            label="Section 80CCD(1B)"
            type="number"
            min={0}
            value={inputs.deductions.section80CCD1B}
            onChange={handleChange}
          />
          <Input
            placeholder="Enter Amount"
            fieldName="deductions.section80D"
            label="Section 80D"
            type="number"
            min={0}
            value={inputs.deductions.section80D}
            onChange={handleChange}
          />
          <Input
            placeholder="Enter Amount"
            fieldName="deductions.section80G"
            label="Section 80G"
            type="number"
            min={0}
            value={inputs.deductions.section80G}
            onChange={handleChange}
          />
          <Input
            placeholder="Enter Amount"
            fieldName="deductions.section80TTA"
            label="Section 80TTA/80TTB"
            type="number"
            min={0}
            value={inputs.deductions.section80TTA}
            onChange={handleChange}
          />
          <Input
            placeholder="Enter Amount"
            fieldName="deductions.section80E"
            label="Section 80E"
            type="number"
            min={0}
            value={inputs.deductions.section80E}
            onChange={handleChange}
          />
          <Input
            placeholder="Enter Amount"
            fieldName="deductions.section80EEA"
            label="Section 80EEA"
            type="number"
            min={0}
            value={inputs.deductions.section80EEA}
            onChange={handleChange}
          />
        </div>
        <Button onClick={submitHandler} variant="black" className="mt-6">
          Calculate now
        </Button>
        {showCard && (
          <OldAndNewTaxRegimeCard
            oldRegime={results.oldRegimeTax}
            newRegime={results.newRegimeTax}
            savings={results.savings}
          />
        )}
      </CalculatorInputsContainer>
      <Banner />
      <div className="flex flex-col md:py-[120px] py-[40px] md:gap-[80px] gap-[30px]">
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
          <img className="ml-2" src={link} alt="" />
        </Button>
      </div>
      <div className="flex flex-col gap-[80px]">
        <QuestionCard
          question={"What is the Old vs New Tax Regime Calculator?"}
          Answer={
            "The Old vs New Tax Regime Calculator helps taxpayers compare their tax liabilities under the traditional Old Tax Regime and the simplified New Tax Regime introduced in India. It factors in income, deductions, exemptions, and applicable tax slabs to provide a clear comparison."
          }
        />
        <QuestionCard
          question={"How does the calculator determine the better regime?"}
          Answer={
            "The calculator computes the tax payable under both regimes based on your inputs like salary, other income, deductions, and exemptions. It then compares the total tax liability, including surcharge and cess, and recommends the regime with lower tax liability."
          }
        />
      </div>
      <FAQs />
    </div>
  );
}
