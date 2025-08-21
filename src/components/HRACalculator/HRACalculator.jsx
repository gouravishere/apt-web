import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const HRACalculator = () => {
  const [formData, setFormData] = useState({
    basicSalary: "",
    da: "",
    hraReceived: "",
    rentPaid: "",
    city: "metro",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "number") {
      const numValue = value === "" ? "" : Math.max(0, Number(value));
      setFormData((prev) => ({ ...prev, [name]: numValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const calculateHRA = () => {
    // Monthly values from form
    const monthlyBasic = Number(formData.basicSalary) || 0;
    const monthlyDA = Number(formData.da) || 0;
    const monthlyHRAReceived = Number(formData.hraReceived) || 0;
    const monthlyRentPaid = Number(formData.rentPaid) || 0;

    // Calculate monthly values first
    const monthlyBasicPlusDa = monthlyBasic + monthlyDA;
    const cityPercent = formData.city === "metro" ? 0.5 : 0.4;

    // Calculate the three conditions for monthly HRA exemption
    const condition1 = monthlyHRAReceived; // Actual HRA received
    const condition2 = monthlyBasicPlusDa * cityPercent; // 50% or 40% of basic + DA
    const condition3 = Math.max(0, monthlyRentPaid - monthlyBasicPlusDa * 0.1); // Rent paid minus 10% of basic + DA

    // Monthly exemption is minimum of the three conditions
    const monthlyExemption = Math.min(condition1, condition2, condition3);
    const monthlyTaxable = Math.max(0, monthlyHRAReceived - monthlyExemption);

    // Calculate yearly values (monthly * 12)
    const yearlyExemption = monthlyExemption * 12;
    const yearlyTaxable = monthlyTaxable * 12;

    setResult({
      monthlyExemption,
      yearlyExemption,
      monthlyTaxable,
      yearlyTaxable,
      conditions: {
        actual: condition1,
        percent: condition2,
        rentMinus: condition3,
      },
    });
  };

  const COLORS = ["#22c55e", "#ef4444"];
  const chartData = result
    ? [
        { name: "Exempt HRA", value: result.yearlyExemption },
        { name: "Taxable HRA", value: result.yearlyTaxable },
      ]
    : [];

  return (
    <div className="w-1/2 mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            HRA Calculator
          </h2>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Basic Salary
              </label>
              <input
                type="number"
                min="0"
                name="basicSalary"
                value={formData.basicSalary}
                onChange={handleChange}
                placeholder="Enter basic salary"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly DA (Dearness Allowance)
              </label>
              <input
                type="number"
                min="0"
                name="da"
                value={formData.da}
                onChange={handleChange}
                placeholder="Enter DA"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly HRA Received
              </label>
              <input
                type="number"
                min="0"
                name="hraReceived"
                value={formData.hraReceived}
                onChange={handleChange}
                placeholder="Enter HRA received"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Rent Paid
              </label>
              <input
                type="number"
                min="0"
                name="rentPaid"
                value={formData.rentPaid}
                onChange={handleChange}
                placeholder="Enter rent paid"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City Type
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="metro">Metro City</option>
                <option value="non-metro">Non-Metro City</option>
              </select>
            </div>

            <button
              onClick={calculateHRA}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors mt-4"
            >
              Calculate HRA
            </button>
          </div>

          {result && (
            <div className="space-y-4 mt-6">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md">
                <div className="space-y-2">
                  <p className="font-medium">
                    Monthly HRA Exemption: ₹
                    {result.monthlyExemption.toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <p className="font-medium">
                    Yearly HRA Exemption: ₹
                    {result.yearlyExemption.toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <p className="font-medium">
                    Monthly Taxable HRA: ₹
                    {result.monthlyTaxable.toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <p className="font-medium">
                    Yearly Taxable HRA: ₹
                    {result.yearlyTaxable.toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>

                <div className="mt-4 text-sm text-gray-600 border-t pt-4">
                  <p className="font-semibold mb-2">Calculation Details:</p>
                  <p>
                    1. Actual HRA received: ₹
                    {result.conditions.actual.toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <p>
                    2. {formData.city === "metro" ? "50%" : "40%"} of (Basic +
                    DA): ₹
                    {result.conditions.percent.toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <p>
                    3. Rent paid - 10% of (Basic + DA): ₹
                    {result.conditions.rentMinus.toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <p className="mt-2 italic">
                    HRA Exemption is the minimum of these three amounts
                  </p>
                </div>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HRACalculator;
