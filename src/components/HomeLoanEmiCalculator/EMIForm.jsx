import React, { useState } from "react";

const EMIForm = ({ onCalculate }) => {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);

  const handleInputChange = () => {
    onCalculate(loanAmount, interestRate, loanTenure);
  };

  return (
    <div className="p-5 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-center mb-4">
        Home Loan EMI Calculator
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700">Loan Amount (₹)</label>
        <input
          type="range"
          min="100000"
          max="100000000"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          onInput={handleInputChange}
          className="w-full"
        />
        <input
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          onInput={handleInputChange}
          className="w-full p-2 mt-2 border border-gray-300"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Interest Rate (%)</label>
        <input
          type="range"
          min="5"
          max="20"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          onInput={handleInputChange}
          className="w-full"
        />
        <input
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          onInput={handleInputChange}
          className="w-full p-2 mt-2 border border-gray-300"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Loan Tenure (Years)</label>
        <input
          type="range"
          min="1"
          max="30"
          value={loanTenure}
          onChange={(e) => setLoanTenure(e.target.value)}
          onInput={handleInputChange}
          className="w-full"
        />
        <input
          type="number"
          value={loanTenure}
          onChange={(e) => setLoanTenure(e.target.value)}
          onInput={handleInputChange}
          className="w-full p-2 mt-2 border border-gray-300"
        />
      </div>
    </div>
  );
};

export default EMIForm;
