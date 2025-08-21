import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "tailwindcss/tailwind.css";

const RentReceiptCalculator = () => {
  const [formData, setFormData] = useState({
    tenantName: "",
    landlordName: "",
    monthlyRent: "",
    rentedHouseAddress: "",
    tenantPAN: "",
    landlordPAN: "",
    startDate: "",
    endDate: "",
    frequency: "monthly", // Default frequency
  });

  const [receipt, setReceipt] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to calculate the number of months based on the start date and end date
  const calculateMonths = () => {
    const { startDate, endDate } = formData;
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      end.getMonth() -
      start.getMonth();
    return months;
  };

  const calculateReceipt = () => {
    const {
      tenantName,
      landlordName,
      monthlyRent,
      rentedHouseAddress,
      tenantPAN,
      landlordPAN,
      startDate,
      endDate,
      frequency,
    } = formData;

    const monthsPaid = calculateMonths();
    const grossRent = monthlyRent * monthsPaid;

    if (!tenantName || !landlordName || !rentedHouseAddress || !tenantPAN) {
      alert("Please enter all required fields.");
      return;
    }

    let netRent = grossRent;

    // Adjust net rent based on frequency
    switch (frequency) {
      case "quarterly":
        netRent = grossRent * 3; // Quarterly rent
        break;
      case "halfyearly":
        netRent = grossRent * 6; // Half-yearly rent
        break;
      case "yearly":
        netRent = grossRent * 12; // Yearly rent
        break;
      default:
        break;
    }

    const panRequirement =
      grossRent > 100000
        ? "PAN card of tenant and landlord is required."
        : "PAN card not required for this transaction.";

    setReceipt({
      receiptNumber: `R-${Date.now()}`,
      tenantName,
      landlordName,
      monthlyRent,
      monthsPaid,
      rentedHouseAddress,
      tenantPAN,
      landlordPAN,
      netRent,
      panRequirement,
      frequency,
      startDate,
      endDate,
    });
  };

  const downloadPDF = () => {
    if (!receipt) return;

    const doc = new jsPDF();

    // Add Background Color for the Header
    doc.setFillColor(0, 102, 204); // Blue
    doc.rect(0, 0, 210, 30, "F");

    // Add Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(255, 255, 255); // White text for header
    doc.text("Rent Receipt", 105, 15, { align: "center" });

    // Add Subtitle under Header
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.text("Generated for official use", 105, 22, { align: "center" });

    // Add Line Break
    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 102, 204); // Blue for line
    doc.line(10, 35, 200, 35);

    // Add Receipt Details Section
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black text

    const details = [
      { label: "Receipt Number:", value: receipt.receiptNumber },
      { label: "Tenant Name:", value: receipt.tenantName },
      { label: "Landlord Name:", value: receipt.landlordName },
      { label: "Monthly Rent:", value: `₹${receipt.monthlyRent}` },
      { label: "Months Paid:", value: receipt.monthsPaid },
      { label: "Rent Frequency:", value: receipt.frequency },
      { label: "Gross Rent:", value: `₹${receipt.netRent}` },
      { label: "Rented House Address:", value: receipt.rentedHouseAddress },
      { label: "Tenant PAN:", value: receipt.tenantPAN },
    ];

    let y = 45;
    details.forEach(({ label, value }) => {
      doc.setFont("helvetica", "normal");
      doc.text(String(label), 20, y); // Convert label to string
      doc.setFont("helvetica", "bold");
      doc.text(String(value), 70, y); // Convert value to string
      y += 10;
    });

    // Highlight "Net Rent" with a Box
    doc.setDrawColor(0, 102, 204); // Blue box
    doc.setLineWidth(0.5);
    doc.rect(15, y - 20, 180, 10); // Add box around "Net Rent"

    // Add Landlord PAN Details (If Applicable)
    if (receipt.landlordPAN) {
      doc.setFont("helvetica", "normal");
      doc.text("Landlord PAN:", 20, y + 10);
      doc.setFont("helvetica", "bold");
      doc.text(receipt.landlordPAN, 70, y + 10);
      y += 20;
    }

    // Add Signature Section
    doc.setLineWidth(0.5);
    doc.line(20, y + 20, 80, y + 20); // Line for tenant signature
    doc.text("Tenant Signature", 20, y + 25);

    doc.line(120, y + 20, 180, y + 20); // Line for landlord signature
    doc.text("Landlord Signature", 120, y + 25);

    // Footer with Branding
    doc.setFillColor(240, 240, 240); // Light gray background
    doc.rect(0, 280, 210, 10, "F");
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100); // Gray text
    doc.text("Generated by APT Global © 2024", 105, 285, { align: "center" });

    // Save the PDF
    doc.save("Stylish_Rent_Receipt.pdf");
  };

  const { monthlyRent } = formData;
  const monthsPaid = calculateMonths();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        <h1 className="text-xl font-bold mb-4">Rent Receipt Calculator</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Tenant Name
            </label>
            <input
              type="text"
              name="tenantName"
              value={formData.tenantName}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              placeholder="Enter tenant name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Landlord Name
            </label>
            <input
              type="text"
              name="landlordName"
              value={formData.landlordName}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              placeholder="Enter landlord name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Monthly Rent
            </label>
            <input
              type="number"
              name="monthlyRent"
              value={formData.monthlyRent}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              placeholder="Enter monthly rent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              How would you like your receipts?
            </label>
            <select
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="halfyearly">Half-Yearly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Rented House Address
            </label>
            <input
              type="text"
              name="rentedHouseAddress"
              value={formData.rentedHouseAddress}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              placeholder="Enter rented house address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Tenant PAN Card
            </label>
            <input
              type="text"
              name="tenantPAN"
              value={formData.tenantPAN}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              placeholder="Enter tenant PAN card number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Landlord PAN Card (Optional)
            </label>
            <input
              type="text"
              name="landlordPAN"
              value={formData.landlordPAN}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              placeholder="Enter landlord PAN card number"
            />
          </div>
          <button
            type="button"
            onClick={calculateReceipt}
            className="w-full bg-blue-500 text-white py-2 rounded-md"
          >
            Generate Receipt
          </button>
        </form>

        {receipt && (
          <div className="mt-6">
            <h2 className="text-lg font-bold">Receipt Details</h2>
            <ul className="list-disc pl-6">
              <li>Receipt Number: {receipt.receiptNumber}</li>
              <li>Tenant Name: {receipt.tenantName}</li>
              <li>Landlord Name: {receipt.landlordName}</li>
              <li>Gross Rent: ₹{receipt.netRent}</li>
              <li>Rent Frequency: {receipt.frequency}</li>
              <li>Start Date: {receipt.startDate}</li>
              <li>End Date: {receipt.endDate}</li>
              <li>Rented House Address: {receipt.rentedHouseAddress}</li>
              <li>Tenant PAN: {receipt.tenantPAN}</li>
              <li>Landlord PAN: {receipt.landlordPAN}</li>
            </ul>
            <button
              onClick={downloadPDF}
              className="mt-4 w-full bg-green-500 text-white py-2 rounded-md"
            >
              Download PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RentReceiptCalculator;
