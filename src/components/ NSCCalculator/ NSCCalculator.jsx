import React, { useState } from "react";

const NSCCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [tenure, setTenure] = useState("");
  const [rate, setRate] = useState("");
  const [maturityValue, setMaturityValue] = useState(null);
  const [interestEarned, setInterestEarned] = useState(null);

  const calculateMaturity = () => {
    if (!principal || !tenure || !rate) return;

    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(tenure);

    const A = P * Math.pow(1 + r, t);
    const interest = A - P;

    setMaturityValue(A.toFixed(2));
    setInterestEarned(interest.toFixed(2));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
          NSC Calculator
        </h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Principal Amount (₹)
          </label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter principal amount"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Investment Tenure (Years)
          </label>
          <input
            type="number"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter tenure in years"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Annual Interest Rate (%)
          </label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter interest rate"
          />
        </div>
        <button
          onClick={calculateMaturity}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Calculate
        </button>

        {maturityValue && (
          <div className="mt-6 text-center">
            <h2 className="text-lg font-semibold text-gray-800">Results:</h2>
            <p className="text-gray-700">Maturity Value: ₹{maturityValue}</p>
            <p className="text-gray-700">Interest Earned: ₹{interestEarned}</p>
            <p className="text-gray-700">Principal: ₹{principal}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NSCCalculator;
