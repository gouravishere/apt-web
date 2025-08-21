import React from "react";

const HRAExemptionFields = ({ hraDetails, setHraDetails }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setHraDetails({
      ...hraDetails,
      [name]: type === "checkbox" ? checked : Number(value),
    });
  };

  return (
    <div className="mb-4">
      <h2 className="text-lg font-medium mb-2">HRA Exemption Details</h2>
      <label className="block text-sm font-medium text-gray-700">
        Basic Salary
      </label>
      <input
        type="number"
        name="basicSalary"
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        value={hraDetails.basicSalary}
        onChange={handleChange}
      />
      <label className="block text-sm font-medium text-gray-700 mt-2">
        Dearness Allowance
      </label>
      <input
        type="number"
        name="dearnessAllowance"
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        value={hraDetails.dearnessAllowance}
        onChange={handleChange}
      />
      <label className="block text-sm font-medium text-gray-700 mt-2">
        HRA Received
      </label>
      <input
        type="number"
        name="hraReceived"
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        value={hraDetails.hraReceived}
        onChange={handleChange}
      />
      <label className="block text-sm font-medium text-gray-700 mt-2">
        Total Rent Paid
      </label>
      <input
        type="number"
        name="totalRentPaid"
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        value={hraDetails.totalRentPaid}
        onChange={handleChange}
      />
      <label className="block text-sm font-medium text-gray-700 mt-2">
        Living in Metro City
      </label>
      <input
        type="checkbox"
        name="metroCity"
        className="mt-1 ml-2"
        checked={hraDetails.metroCity}
        onChange={handleChange}
      />
    </div>
  );
};

export default HRAExemptionFields;
