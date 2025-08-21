import React from "react";

const IncomeFields = ({
  grossSalaryIncome,
  setGrossSalaryIncome,
  incomeOtherSources,
  setIncomeOtherSources,
  incomeInterest,
  setIncomeInterest,
  rentalIncome,
  setRentalIncome,
}) => {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-medium mb-2">Income Details</h2>
      <label className="block text-sm font-medium text-gray-700">
        Gross Salary Income
      </label>
      <input
        type="number"
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        value={grossSalaryIncome}
        onChange={(e) => setGrossSalaryIncome(Number(e.target.value))}
      />
      <label className="block text-sm font-medium text-gray-700 mt-2">
        Income from Other Sources
      </label>
      <input
        type="number"
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        value={incomeOtherSources}
        onChange={(e) => setIncomeOtherSources(Number(e.target.value))}
      />
      <label className="block text-sm font-medium text-gray-700 mt-2">
        Interest Income
      </label>
      <input
        type="number"
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        value={incomeInterest}
        onChange={(e) => setIncomeInterest(Number(e.target.value))}
      />
      <label className="block text-sm font-medium text-gray-700 mt-2">
        Rental Income
      </label>
      <input
        type="number"
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        value={rentalIncome}
        onChange={(e) => setRentalIncome(Number(e.target.value))}
      />
    </div>
  );
};

export default IncomeFields;
