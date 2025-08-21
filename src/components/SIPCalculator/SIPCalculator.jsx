import React, { useState } from "react";
import InputFields from "./InputFields";
import OutputResults from "./OutputResults";
import Charts from "./Charts";

const SIPCalculator = () => {
  const [inputs, setInputs] = useState({
    amount: 5000,
    durationYears: 5,
    durationMonths: 0,
    annualRate: 12,
    frequency: "Monthly", // Default frequency
    stepUpRate: 0,
    includeTax: false,
  });

  const [results, setResults] = useState({
    totalInvestment: 0,
    totalInterest: 0,
    maturityAmount: 0,
  });

  const calculateSIP = () => {
    const P = inputs.amount;
    const r = inputs.annualRate / 100;
    let n; // Number of periods based on frequency

    // Adjust the number of periods based on the frequency
    if (inputs.frequency === "Monthly") {
      n = inputs.durationYears * 12 + inputs.durationMonths; // Monthly frequency
    } else if (inputs.frequency === "Quarterly") {
      n = inputs.durationYears * 4 + Math.floor(inputs.durationMonths / 3); // Quarterly frequency
    } else if (inputs.frequency === "Yearly") {
      n = inputs.durationYears + Math.floor(inputs.durationMonths / 12); // Yearly frequency
    }

    // Adjust interest rate based on frequency
    let adjustedRate;
    if (inputs.frequency === "Monthly") {
      adjustedRate = r / 12; // Monthly rate
    } else if (inputs.frequency === "Quarterly") {
      adjustedRate = r / 4; // Quarterly rate
    } else {
      adjustedRate = r; // Yearly rate
    }

    const M =
      P *
      ((Math.pow(1 + adjustedRate, n) - 1) / adjustedRate) *
      (1 + adjustedRate);

    const totalInvestment = P * n;
    const totalInterest = M - totalInvestment;

    setResults({
      totalInvestment: totalInvestment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      maturityAmount: M.toFixed(2),
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">SIP Calculator</h1>
      <InputFields
        inputs={inputs}
        setInputs={setInputs}
        calculateSIP={calculateSIP}
      />
      
      <OutputResults results={results} />
      <Charts results={results} inputs={inputs} />
    </div>
  );
};

export default SIPCalculator;
