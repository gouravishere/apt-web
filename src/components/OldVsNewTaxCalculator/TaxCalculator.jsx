import React, { useState } from "react";

const TaxCalculator = () => {
  const [inputs, setInputs] = useState({
    grossIncome: "",
    otherIncome: "",
    deductions: {
      section80C: "",
      section80D: "",
      homeLoanInterest: "",
      hraExemption: "",
      standardDeduction: "50000", // Fixed for salaried individuals
      otherDeductions: "",
    },
    includeDeductions: true,
  });

  const [results, setResults] = useState({
    oldRegimeTax: 0,
    newRegimeTax: 0,
    savings: 0,
    recommendation: "",
  });

  const taxSlabsOld = [
    { limit: 250000, rate: 0 },
    { limit: 500000, rate: 0.05 },
    { limit: 1000000, rate: 0.2 },
    { limit: Infinity, rate: 0.3 },
  ];

  const taxSlabsNew = [
    { limit: 300000, rate: 0 },
    { limit: 600000, rate: 0.05 },
    { limit: 900000, rate: 0.1 },
    { limit: 1200000, rate: 0.15 },
    { limit: 1500000, rate: 0.2 },
    { limit: Infinity, rate: 0.3 },
  ];

  const calculateTax = (taxableIncome, slabs) => {
    let tax = 0;
    let remainingIncome = taxableIncome;

    for (let slab of slabs) {
      if (remainingIncome > slab.limit) {
        tax += (slab.limit - (slab.prevLimit || 0)) * slab.rate;
        remainingIncome -= slab.limit - (slab.prevLimit || 0);
      } else {
        tax += remainingIncome * slab.rate;
        break;
      }
      slab.prevLimit = slab.limit;
    }

    return tax + tax * 0.04; // Adding 4% Cess
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { grossIncome, otherIncome, deductions, includeDeductions } = inputs;

    // Old Regime Calculation
    const totalDeductions =
      parseInt(deductions.section80C || 0) +
      parseInt(deductions.section80D || 0) +
      parseInt(deductions.homeLoanInterest || 0) +
      parseInt(deductions.hraExemption || 0) +
      parseInt(deductions.standardDeduction || 0) +
      parseInt(deductions.otherDeductions || 0);

    const taxableOld = Math.max(
      parseInt(grossIncome || 0) + parseInt(otherIncome || 0) - totalDeductions,
      0
    );
    const oldRegimeTax = calculateTax(taxableOld, taxSlabsOld);

    // New Regime Calculation
    const taxableNew = Math.max(
      parseInt(grossIncome || 0) + parseInt(otherIncome || 0),
      0
    );

    const newRegimeTax = includeDeductions
      ? calculateTax(taxableNew, taxSlabsNew)
      : calculateTax(taxableNew - totalDeductions, taxSlabsNew);

    // Savings and Recommendation
    const savings = oldRegimeTax - newRegimeTax;
    const recommendation =
      savings > 0 ? "Opt for the New Regime." : "Opt for the Old Regime.";

    setResults({ oldRegimeTax, newRegimeTax, savings, recommendation });
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

  const toggleIncludeDeductions = () =>
    setInputs((prev) => ({
      ...prev,
      includeDeductions: !prev.includeDeductions,
    }));

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow rounded-md">
      <h1 className="text-2xl font-bold text-center mb-4">
        Old vs. New Tax Regime Calculator
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Gross Annual Income</label>
          <input
            type="number"
            name="grossIncome"
            value={inputs.grossIncome}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter your gross income"
          />
        </div>
        <div>
          <label className="block text-gray-700">
            Income from Other Sources
          </label>
          <input
            type="number"
            name="otherIncome"
            value={inputs.otherIncome}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter other income"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Deductions (Old Regime)</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Section 80C</label>
              <input
                type="number"
                name="deductions.section80C"
                value={inputs.deductions.section80C}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="e.g., 150000"
              />
            </div>
            <div>
              <label className="block text-gray-700">Section 80D</label>
              <input
                type="number"
                name="deductions.section80D"
                value={inputs.deductions.section80D}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="e.g., 25000"
              />
            </div>
            <div>
              <label className="block text-gray-700">
                Home Loan Interest (24b)
              </label>
              <input
                type="number"
                name="deductions.homeLoanInterest"
                value={inputs.deductions.homeLoanInterest}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="e.g., 200000"
              />
            </div>
            <div>
              <label className="block text-gray-700">HRA Exemption</label>
              <input
                type="number"
                name="deductions.hraExemption"
                value={inputs.deductions.hraExemption}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Enter HRA exemption"
              />
            </div>
            <div>
              <label className="block text-gray-700">Other Deductions</label>
              <input
                type="number"
                name="deductions.otherDeductions"
                value={inputs.deductions.otherDeductions}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="e.g., NPS, donations"
              />
            </div>
          </div>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={inputs.includeDeductions}
              onChange={toggleIncludeDeductions}
              className="form-checkbox"
            />
            <span className="ml-2">Include Deductions for New Regime</span>
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Calculate
        </button>
      </form>

      <div className="mt-6">
        <h2 className="text-xl font-bold text-center">Results</h2>
        <p>Old Regime Tax Payable: ₹{results.oldRegimeTax.toFixed(2)}</p>
        <p>New Regime Tax Payable: ₹{results.newRegimeTax.toFixed(2)}</p>
        <p>Tax Savings: ₹{results.savings.toFixed(2)}</p>
        <p>Recommendation: {results.recommendation}</p>
      </div>
    </div>
  );
};

export default TaxCalculator;
