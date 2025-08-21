import React, { useState } from "react";
import EMIForm from "./EMIForm";
import EMIResult from "./EMIResult";
import Graph from "./Graph";
import AmortizationTable from "./AmortizationTable";

const EMICalculator = () => {
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [schedule, setSchedule] = useState([]);

  const calculateEMI = (loanAmount, interestRate, loanTenure) => {
    const P = loanAmount;
    const R = interestRate / 12 / 100; // Monthly interest rate
    const N = loanTenure * 12; // Number of months

    const emiAmount = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPayable = emiAmount * N;
    const totalInterestPayable = totalPayable - P;

    // Generate Amortization Schedule
    let amortizationSchedule = [];
    let balance = P;
    let principalPaid = 0;
    let interestPaid = 0;

    for (let month = 1; month <= N; month++) {
      interestPaid = balance * R;
      principalPaid = emiAmount - interestPaid;
      balance -= principalPaid;

      amortizationSchedule.push({
        month,
        principal: principalPaid,
        interest: interestPaid,
        emi: emiAmount,
      });
    }

    setEmi(emiAmount);
    setTotalInterest(totalInterestPayable);
    setTotalAmount(totalPayable);
    setSchedule(amortizationSchedule);
  };

  return (
    <div className="container mx-auto p-5">
      <EMIForm onCalculate={calculateEMI} />
      <EMIResult
        emi={emi}
        totalInterest={totalInterest}
        totalAmount={totalAmount}
      />
      <Graph principal={totalAmount - totalInterest} interest={totalInterest} />
      <AmortizationTable schedule={schedule} />
    </div>
  );
};
export default EMICalculator;
