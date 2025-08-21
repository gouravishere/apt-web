import React, { useState } from "react";

const GratuityCalculator = () => {
  // State variables to hold form inputs and results
  const [basicSalary, setBasicSalary] = useState("");
  const [dearnessAllowance, setDearnessAllowance] = useState(0);
  const [yearsOfService, setYearsOfService] = useState("");
  const [monthsBeyondFullYears, setMonthsBeyondFullYears] = useState(0);
  const [organizationType, setOrganizationType] = useState("Private Sector");
  const [gratuityAmount, setGratuityAmount] = useState(null);

  // Formula to calculate gratuity
  const calculateGratuity = () => {
    if (!basicSalary || !yearsOfService) {
      alert("Please enter all mandatory fields.");
      return;
    }

    const salary = parseFloat(basicSalary);
    const da = parseFloat(dearnessAllowance) || 0;
    const totalYears =
      parseFloat(yearsOfService) + parseFloat(monthsBeyondFullYears) / 12;

    const gratuity = ((salary + da) / 26) * 15 * totalYears;
    setGratuityAmount(gratuity.toFixed(2));
  };

  // Function to download results as PDF
  const downloadAsPDF = () => {
    // Implement PDF download functionality using a library like jsPDF
    alert("Download as PDF is under construction.");
  };

  // Function to share results via email
  const shareViaEmail = () => {
    // Implement email sharing functionality
    alert("Share via email is under construction.");
  };

  return (
    <div className="w-1/2 mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Gratuity Calculator</h1>

      {/* Input Fields */}
      <div className="mb-4">
        <label className="block mb-2">
          Last Drawn Basic Salary (Mandatory):
        </label>
        <input
          type="number"
          value={basicSalary}
          onChange={(e) => setBasicSalary(e.target.value)}
          className="border rounded p-2 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          Dearness Allowance
        </label>
        <input
          type="number"
          value={dearnessAllowance}
          onChange={(e) => setDearnessAllowance(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          Total Years of Service (Mandatory):
        </label>
        <input
          type="number"
          step="0.1"
          value={yearsOfService}
          onChange={(e) => setYearsOfService(e.target.value)}
          className="border rounded p-2 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          Number of Months Worked Beyond Full Years (Optional):
        </label>
        <input
          type="number"
          value={monthsBeyondFullYears}
          onChange={(e) => setMonthsBeyondFullYears(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Organization Type:</label>
        <select
          value={organizationType}
          onChange={(e) => setOrganizationType(e.target.value)}
          className="border rounded p-2 w-full"
        >
          <option value="Government">Government</option>
          <option value="Private Sector">Private Sector</option>
        </select>
      </div>

      {/* Calculate Button */}
      <button
        onClick={calculateGratuity}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        Calculate Gratuity
      </button>

      {/* Result Display */}
      {gratuityAmount && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">
            Gratuity Amount: ₹{gratuityAmount}
          </h2>
          <p className="text-gray-700">
            Breakdown of the calculation provided as needed.
          </p>

          {/* Download and Share Options */}
          <button
            onClick={downloadAsPDF}
            className="bg-green-500 text-white p-2 rounded mt-2 mr-2"
          >
            Download as PDF
          </button>
          <button
            onClick={shareViaEmail}
            className="bg-purple-500 text-white p-2 rounded mt-2"
          >
            Share via Email
          </button>
        </div>
      )}
    </div>
  );
};

export default GratuityCalculator;
