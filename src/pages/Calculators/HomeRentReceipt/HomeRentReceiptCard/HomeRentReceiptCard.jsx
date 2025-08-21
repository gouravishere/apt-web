import React from "react";
import HomeRentReceiptBreak from "../HomeRentReceiptBreak/HomeRentReceiptBreak";
import RentReceipt from "../../../../components/RentReceiptCalculator/RentReceipt";
import dayjs from "dayjs";

export default function HomeRentReceiptCard({ receipt,  }) {

  const HeadingWithExport = ({ heading, onClick, landlord, receiptData }) => {
    return (
      <div className="flex items-center justify-between w-full py-[24px]">
        <div className="text-nowrap text-center text-[#051227] md:text-xl text-md font-medium font-['Poppins'] leading-[30px]">
          {heading}
        </div>
        <RentReceipt
          receiptData={receiptData}
          landlord={landlord}
        />
      </div>
    );
  };

  const frequencyCal = (frequency) => {
    switch (frequency) {
      case "quarterly":
        return 4;
      case "half-yearly":
        return 6;
      case "yearly":
        return 12;
      default:
        return 1;
    }
  };

  const calculateRentData = (data) => {
    const {
      startDate,
      endDate,
      grossRent,
      frequency,
      landlordName,
      landlordPAN,
      receiptNumber,
      rentedHouseAddress,
      tenantName,
      tenantPAN,
    } = data;

    const freq = frequencyCal(frequency);

    if (!startDate || !endDate || !grossRent || !freq) {
      console.log(
        "Missing required data (startDate, endDate, grossRent, or frequency)."
      );
    }

    const start = dayjs(startDate, "DD MMM YYYY");
    const end = dayjs(endDate, "DD MMM YYYY");
    let totalMonths = end.diff(start, "month");
    totalMonths = totalMonths + 1; // Add 1 to include the start date

    let rentPerMonth = grossRent / totalMonths; // Calculate rent for one month
    let rentPerPeriod = rentPerMonth * freq; // Calculate rent for each frequency period

    if (freq === 4 && totalMonths < 4) {
      rentPerPeriod = grossRent;
    }
    if (freq === 6 && totalMonths < 6) {
      rentPerPeriod = grossRent;
    }
    if (freq === 12 && totalMonths < 12) {
      rentPerPeriod = grossRent;
    }

    const rentData = [];
    let currentStartDate = start;

    while (
      currentStartDate.isBefore(end) ||
      currentStartDate.isSame(end, "day")
    ) {
      // Calculate the next period end date
      let currentEndDate = currentStartDate
        .add(freq, "month")
        .subtract(1, "day");

      // Adjust the end date if it exceeds the overall end date
      if (currentEndDate.isAfter(end)) {
        currentEndDate = end;
      }

      // Add the rent data for the current period
      rentData.push({
        receiptDate: currentStartDate.format("YYYY-MM-DD"), // Convert to ISO format
        periodEnd: currentEndDate.format("YYYY-MM-DD"),
        tenant: {
          rentAmount: rentPerPeriod.toFixed(2), // Round to 2 decimal places
          landlordName,
          landlordPAN,
          receiptNumber,
          fromPeriod: currentStartDate.format("YYYY-MM-DD"),
          toPeriod: currentEndDate.format("YYYY-MM-DD"),
          property: rentedHouseAddress,
          name: tenantName,
          pan: tenantPAN,
        },
      });

      // Move to the next period
      currentStartDate = currentEndDate.add(1, "day"); // Start the next period one day after the current end date
    }

    return rentData;
  };


  const receiptData = [
    { label: "Receipt Number", amount: receipt?.receiptNumber || "" },
    { label: "Tenant Name", amount: receipt?.tenantName || "" },
    { label: "Landlord Name", amount: receipt?.landlordName || "" },
    { label: "Gross Rent", amount: receipt?.grossRent || 0 },
    { label: "Rent Frequency", amount: receipt?.frequency || "Monthly" },
    { label: "Start Date", amount: receipt?.startDate || "" },
    { label: "End Date", amount: receipt?.endDate || "" },
    { label: "Tenant PAN", amount: receipt?.tenantPAN || "" },
    { label: "Landlord PAN", amount: receipt?.landlordPAN || "" },
    {
      label: "Rented House Address",
      amount: receipt?.rentedHouseAddress || "",
    },
  ];

  return (
    <div className="self-stretch flex-col p-[40px] gap-6 flex bg-[#f8f9fa]">
      <div className="self-stretch justify-start items-center gap-6 inline-flex">
        <HeadingWithExport
          heading={"Home Rent Receipt Result"}
          receiptData={calculateRentData(receipt)}
          landlord={{
            name: receipt?.landlordName || "",
            pan: receipt?.landlordPAN || "",
          }}
        />
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full pb-[40px]">
        {/* Dynamically render HomeRentReceiptBreak components */}
        {receiptData.map((data, index) => (
          <HomeRentReceiptBreak key={index} {...data} />
        ))}
      </div>

    </div>
  );
}
