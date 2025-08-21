import React from "react";

const DeductionFields = ({ deductions, setDeductions }) => {
  const handleChange = (e) => {
    setDeductions({
      ...deductions,
      [e.target.name]: Number(e.target.value),
    });
  };

  return (
    <div className="mb-4">
      <h2 className="text-lg font-medium mb-2">Deductions</h2>
      <label className="block text-sm font-medium text-gray-700">
        Deduction 80C
      </label>
      <input
        type="number"
        name="deduction80C"
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        value={deductions.deduction80C}
        onChange={handleChange}
      />
      <label className="block text-sm font-medium text-gray-700 mt-2">
        Deduction 80CCD(1B)
      </label>
      <input
        type="number"
        name="deduction80CCD1B"
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        value={deductions.deduction80CCD1B}
        onChange={handleChange}
      />
      <label className="block text-sm font-medium text-gray-700 mt-2">
        Deduction 80D
      </label>
      <input
        type="number"
        name="deduction80D"
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        value={deductions.deduction80D}
        onChange={handleChange}
      />
      <label className="block text-sm font-medium text-gray-700 mt-2">
        Deduction 80G
      </label>
      <input
        type="number"
        name="deduction80G"
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        value={deductions.deduction80G}
        onChange={handleChange}
      />
      <label className="block text-sm font-medium text-gray-700 mt-2">
        Deduction 80TTA/80TTB
      </label>
      <input
        type="number"
        name="deduction80TTA_TTB"
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        value={deductions.deduction80TTA_TTB}
        onChange={handleChange}
      />
      <label className="block text-sm font-medium text-gray-700 mt-2">
        Deduction 80E
      </label>
      <input
        type="number"
        name="deduction80E"
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        value={deductions.deduction80E}
        onChange={handleChange}
      />
      <label className="block text-sm font-medium text-gray-700 mt-2">
        Deduction 80EEA
      </label>
      <input
        type="number"
        name="deduction80EEA"
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        value={deductions.deduction80EEA}
        onChange={handleChange}
      />
    </div>
  );
};

export default DeductionFields;
