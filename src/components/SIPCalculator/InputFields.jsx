import React from "react";

const InputFields = ({ inputs, setInputs, calculateSIP }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* SIP Amount */}
        <div>
          <label className="block text-sm font-medium">
            Monthly Investment Amount
          </label>
          <input
            type="number"
            name="amount"
            value={inputs.amount}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Investment Duration */}
        <div>
          <label className="block text-sm font-medium">
            Investment Duration (Years)
          </label>
          <input
            type="number"
            name="durationYears"
            value={inputs.durationYears}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Investment Duration (Months)
          </label>
          <input
            type="number"
            name="durationMonths"
            value={inputs.durationMonths}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Expected Annual Return */}
        <div>
          <label className="block text-sm font-medium">
            Expected Annual Return (%)
          </label>
          <input
            type="number"
            name="annualRate"
            value={inputs.annualRate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Frequency of SIP Contribution */}
        <div>
          <label className="block text-sm font-medium">
            Frequency of SIP Contribution
          </label>
          <select
            name="frequency"
            value={inputs.frequency}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>

        {/* Step-Up Rate */}
        {/* <div>
          <label className="block text-sm font-medium">
            Step-Up SIP Rate (%)
          </label>
          <input
            type="number"
            name="stepUpRate"
            value={inputs.stepUpRate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div> */}

        {/* Include Tax */}
        {/* <div className="col-span-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="includeTax"
              checked={inputs.includeTax}
              onChange={() =>
                setInputs({ ...inputs, includeTax: !inputs.includeTax })
              }
              className="form-checkbox"
            />
            <span className="ml-2 text-sm">Include Tax Calculations</span>
          </label>
        </div> */}
      </div>

      {/* Calculate Button */}
      <div className="mt-4">
        <button
          onClick={calculateSIP}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Calculate
        </button>
      </div>
    </div>
  );
};

export default InputFields;
