import React from "react";

const EMIResult = ({ emi, totalInterest, totalAmount }) => {
  return (
    <div className="p-5 max-w-md mx-auto bg-white rounded-xl shadow-md mt-5">
      <h3 className="text-xl font-bold text-center mb-4">
        Loan Repayment Details
      </h3>
      <div className="mb-2">
        <strong>EMI Amount (₹):</strong> {emi.toFixed(2)}
      </div>
      <div className="mb-2">
        <strong>Total Interest Payable (₹):</strong> {totalInterest.toFixed(2)}
      </div>
      <div className="mb-2">
        <strong>Total Amount Payable (₹):</strong> {totalAmount.toFixed(2)}
      </div>
    </div>
  );
};

export default EMIResult;
