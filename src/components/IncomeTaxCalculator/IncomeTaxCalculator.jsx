import React, { useState } from "react";
import AssessmentYearSelector from "./AssessmentYearSelector";
import AgeSelector from "./AgeSelector";
import IncomeFields from "./IncomeFields";
import DeductionFields from "./DeductionFields";
import HRAExemptionFields from "./HRAExemptionFields";
import EmailInput from "./EmailInput";

const IncomeTaxCalculator = () => {
  const [assessmentYear, setAssessmentYear] = useState("2023-2024");
  const [ageGroup, setAgeGroup] = useState("Below 60");
  const [grossSalaryIncome, setGrossSalaryIncome] = useState(0);
  const [incomeOtherSources, setIncomeOtherSources] = useState(0);
  const [incomeInterest, setIncomeInterest] = useState(0);
  const [rentalIncome, setRentalIncome] = useState(0);
  const [deductions, setDeductions] = useState({
    deduction80C: 0,
    deduction80CCD1B: 0,
    deduction80D: 0,
    deduction80G: 0,
    deduction80TTA_TTB: 0,
    deduction80E: 0,
    deduction80EEA: 0,
  });
  const [hraDetails, setHraDetails] = useState({
    basicSalary: 0,
    dearnessAllowance: 0,
    hraReceived: 0,
    totalRentPaid: 0,
    metroCity: false,
  });
  const [email, setEmail] = useState("");
  const [taxLiability, setTaxLiability] = useState(null);
  const [taxRegime, setTaxRegime] = useState("old"); // 'old' for old regime, 'new' for new regime

  const calculateTax = () => {
    let totalIncome =
      grossSalaryIncome + incomeOtherSources + incomeInterest + rentalIncome;
    let totalDeductions = 0;
    let hraExemption = 0;

    // Apply deductions based on the old regime
    if (taxRegime === "old") {
      totalDeductions = Object.values(deductions).reduce(
        (sum, value) => sum + value,
        0
      );
      hraExemption = Math.min(
        hraDetails.metroCity
          ? hraDetails.basicSalary * 0.5
          : hraDetails.basicSalary * 0.4,
        hraDetails.hraReceived,
        hraDetails.totalRentPaid - 0.1 * hraDetails.basicSalary
      );
    }

    // Deduct HRA exemption and total deductions for old regime
    let taxableIncome = totalIncome - totalDeductions - hraExemption;
    taxableIncome = Math.max(taxableIncome, 0);

    // Apply tax calculations for both regimes
    let tax = 0;

    // Old Regime Tax Calculation
    if (taxRegime === "old") {
      if (assessmentYear === "2023-2024") {
        if (taxableIncome <= 250000) {
          tax = 0;
        } else if (taxableIncome <= 500000) {
          tax = (taxableIncome - 250000) * 0.05;
        } else if (taxableIncome <= 1000000) {
          tax = 12500 + (taxableIncome - 500000) * 0.2;
        } else {
          tax = 112500 + (taxableIncome - 1000000) * 0.3;
        }
      }
      tax += tax * 0.04; // Add cess

      // Section 87A Rebate
      if (taxableIncome <= 500000) {
        tax = Math.max(tax - 12500, 0); // Apply rebate
      }
    }

    // New Regime Tax Calculation
    if (taxRegime === "new") {
      let deductionsForNewRegime = totalIncome - 50000; // Standard deduction of ₹50,000 for New Regime
      taxableIncome = Math.max(deductionsForNewRegime, 0);

      if (assessmentYear === "2023-2024") {
        if (taxableIncome <= 250000) {
          tax = 0;
        } else if (taxableIncome <= 500000) {
          tax = (taxableIncome - 250000) * 0.05;
        } else if (taxableIncome <= 1000000) {
          tax = 12500 + (taxableIncome - 500000) * 0.2;
        } else {
          tax = 112500 + (taxableIncome - 1000000) * 0.3;
        }
      }
      tax += tax * 0.04; // Add cess

      // Section 87A Rebate
      if (taxableIncome <= 700000) {
        tax = Math.max(tax - 25000, 0); // Apply rebate for taxable income <= ₹7 lakh
      }
    }

    setTaxLiability(tax.toFixed(2));
  };

  return (
    <div className="w-1/2 mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Income Tax Calculator</h1>
      <AssessmentYearSelector
        value={assessmentYear}
        onChange={setAssessmentYear}
      />
      <AgeSelector value={ageGroup} onChange={setAgeGroup} />
      <IncomeFields
        grossSalaryIncome={grossSalaryIncome}
        setGrossSalaryIncome={setGrossSalaryIncome}
        incomeOtherSources={incomeOtherSources}
        setIncomeOtherSources={setIncomeOtherSources}
        incomeInterest={incomeInterest}
        setIncomeInterest={setIncomeInterest}
        rentalIncome={rentalIncome}
        setRentalIncome={setRentalIncome}
      />
      <DeductionFields deductions={deductions} setDeductions={setDeductions} />
      <HRAExemptionFields
        hraDetails={hraDetails}
        setHraDetails={setHraDetails}
      />
      <EmailInput value={email} onChange={setEmail} />

      <div className="mt-4">
        <label htmlFor="taxRegime" className="block text-lg">
          Select Tax Regime:
        </label>
        <select
          id="taxRegime"
          value={taxRegime}
          onChange={(e) => setTaxRegime(e.target.value)}
          className="mt-2 p-2 border rounded w-full"
        >
          <option value="old">Old Regime</option>
          <option value="new">New Regime</option>
        </select>
      </div>

      <button
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={calculateTax}
      >
        Calculate Tax
      </button>

      {taxLiability !== null && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="text-lg font-semibold">
            Tax Liability: ₹{taxLiability}
          </h2>
        </div>
      )}
    </div>
  );
};

export default IncomeTaxCalculator;
