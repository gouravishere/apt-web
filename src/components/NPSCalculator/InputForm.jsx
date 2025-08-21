import React, { useState } from "react";

const InputForm = ({ activeTab, setResults }) => {
  const [inputs, setInputs] = useState({
    monthlyPensionGoal: "",
    avgMonthlyInvestment: "",
    currentAge: "",
    retirementAge: "",
    expectedRateOfReturn: "",
    annuityRate: "",
    withdrawalRatio: "",
  });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      monthlyPensionGoal,
      avgMonthlyInvestment,
      currentAge,
      retirementAge,
      expectedRateOfReturn,
      annuityRate,
      withdrawalRatio,
    } = inputs;

    const n = (retirementAge - currentAge) * 12; // Number of months
    const r = expectedRateOfReturn / 12 / 100; // Monthly rate of return

    let results;
    if (activeTab === "I Know My Goal") {
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

    setResults(results);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md w-full max-w-lg"
    >
      {activeTab === "I Know My Goal" && (
        <div>
          <label className="block mb-2">Monthly Pension Goal</label>
          <input
            type="number"
            name="monthlyPensionGoal"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={inputs.monthlyPensionGoal}
            onChange={handleChange}
            required
          />
        </div>
      )}
      {activeTab === "I Want to Invest" && (
        <div>
          <label className="block mb-2">Average Monthly Investment</label>
          <input
            type="number"
            name="avgMonthlyInvestment"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={inputs.avgMonthlyInvestment}
            onChange={handleChange}
            required
          />
        </div>
      )}
      <div>
        <label className="block mb-2">Current Age</label>
        <input
          type="number"
          name="currentAge"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={inputs.currentAge}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block mb-2">Retirement Age</label>
        <input
          type="number"
          name="retirementAge"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={inputs.retirementAge}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block mb-2">Expected Rate of Return (%)</label>
        <input
          type="number"
          name="expectedRateOfReturn"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={inputs.expectedRateOfReturn}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block mb-2">Annuity Rate (%) (Optional)</label>
        <input
          type="number"
          name="annuityRate"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={inputs.annuityRate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block mb-2">Withdrawal Ratio (%) (Optional)</label>
        <input
          type="number"
          name="withdrawalRatio"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={inputs.withdrawalRatio}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Calculate
      </button>
    </form>
  );
};

export default InputForm;
