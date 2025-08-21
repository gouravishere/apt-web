import React from "react";

const AmortizationTable = ({ schedule }) => {
  return (
    <div className="overflow-x-auto mt-5">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Month</th>
            <th className="px-4 py-2">Principal</th>
            <th className="px-4 py-2">Interest</th>
            <th className="px-4 py-2">Total EMI</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((entry, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{entry.month}</td>
              <td className="border px-4 py-2">{entry.principal.toFixed(2)}</td>
              <td className="border px-4 py-2">{entry.interest.toFixed(2)}</td>
              <td className="border px-4 py-2">{entry.emi.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AmortizationTable;
