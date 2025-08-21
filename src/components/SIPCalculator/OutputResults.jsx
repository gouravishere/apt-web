import React from "react";

const OutputResults = ({ results }) => {
  return (
    <div className="bg-gray-100 p-4 rounded mt-4">
      <h2 className="text-lg font-semibold">Results Summary</h2>
      <p>Total Investment: {results.totalInvestment}</p>
      <p>Total Interest Earned: {results.totalInterest}</p>
      <p>Maturity Amount: {results.maturityAmount}</p>
    </div>
  );
};

export default OutputResults;
