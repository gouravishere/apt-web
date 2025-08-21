import React, { useState } from "react";
import HeadingBreadCrumb from "../../../components/HeadingBreadCrumb/HeadingBreadCrumb";
import CalculatorInputsContainer from "../../../components/CalculatorInputsContainer/CalculatorInputsContainer";
import Input from "../../../components/Input/Input";
import MultilayerDonutChart from "../../../components/CircularGraph/CircularGraph";
import Table from "../../../components/Table/Table";
import Button from "../../../components/Button/Button";
import QuestionCard from "../../../components/QuestionCard/QuestionCard";
import CalculatorCard from "../../../components/CalculatorCard/CalculatorCard";
import FAQs from "../../../components/HomePage/FAQs/FAQs";
import SliderInput from "../../../components/SliderInput/SliderInput";
import DownloadFileIcon from "../../../assets/icons/DownloadFileLogo.svg";
import * as XLSX from "xlsx";
import Banner from "../../../components/Banner/Banner";
import { useNavigate } from "react-router-dom";

const CalculationBreak = ({ label, amount }) => {
  // Format amount with Indian numbering system
  const formattedAmount =
    typeof amount === "number"
      ? new Intl.NumberFormat("en-IN").format(amount)
      : amount;

  return (
    <div className="h-6 justify-between items-center inline-flex w-full">
      <div className="w-[400px] text-slate-600 text-base font-normal font-['Poppins'] leading-normal">
        {label}
      </div>
      <div className="text-neutral-900 text-base font-medium font-['Poppins'] leading-normal">
        {formattedAmount}
      </div>
    </div>
  );
};

const CalculationHeading = ({ heading, totalAmount }) => {
  return (
    <div className="h-[25px] w-full justify-between items-center inline-flex">
      <div className="text-neutral-900 text-xl font-medium font-['Poppins'] leading-[25px]">
        {heading}
      </div>
      <div className="text-neutral-900 text-xl font-semibold font-['Poppins'] leading-[25px]">
        {totalAmount}
      </div>
    </div>
  );
};

const CalculationCard = ({ result, bluePer, orangePer }) => {
  return (
    <div className="flex bg-[#f8f9fa] xl:w-[481px] w-full xl:h-[443px] xl:p-[40px] lg:p-[30px] p-[20px] pt-0 border rounded-3xl overflow-hidden justify-between items-center flex-col">
      {/* chartstart */}
      <div className=" flex items-center gap-2 flex-col sm:flex-row mb-7 sm:mb-0 w-full justify-between xl:justify-center">
        <div className="w-[250px] h-[250px]">
          <MultilayerDonutChart
            isTotal={true}
            orangeValue={orangePer}
            blueValue={bluePer}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="h-6  gap-6 inline-flex w-full justify-between">
            <div className="items-center gap-1 flex ">
              <div className="w-[13px] h-[13px] bg-[#1086f5] rounded"></div>
              <div className="text-slate-600 text-base font-normal font-['Poppins'] leading-normal">
                Principal
              </div>
            </div>
            <div className="text-slate-600 text-base font-medium font-['Poppins'] leading-normal">
              {result ? result?.monthlyExemption : 0}
            </div>
          </div>

          <div className="h-6 justify-between items-center gap-6 inline-flex w-full">
            <div className="h-6 items-center justify-between gap-1 flex">
              <div className="w-[13px] h-[13px] bg-[#ff8b17] rounded"></div>
              <div className="text-slate-600 text-base font-normal font-['Poppins'] leading-normal">
                Interest
              </div>
            </div>
            <div className="text-slate-600 text-base font-medium font-['Poppins'] leading-normal">
              {result ? result?.monthlyTaxable : 0}
            </div>
          </div>
        </div>
      </div>
      {/* chart end */}
      <div className="flex flex-col gap-[36px]  w-full">
        <div className="pt-0 flex flex-col gap-4">
          <CalculationHeading heading={"Breakdown"} />
          <div className="flex flex-col gap-4">
            <CalculationBreak
              label={"EMI Amount (₹)"}
              amount={result ? result?.conditions.actual : "0" || 0}
            />
            <CalculationBreak
              label={"Total Interest Payable (₹)"}
              amount={result ? result?.conditions.percent : "0" || 0}
            />
            <CalculationBreak
              label={"Total Amount Payable (₹)"}
              amount={result ? result?.conditions.rentMinus : "0" || 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const HeadingWithExport = ({ heading, onClick }) => {
  return (
    <div className="flex items-center justify-between w-full py-[24px]">
      <div className="text-center text-neutral-900 md:text-xl text-md font-medium font-['Poppins'] leading-[30px]">
        {heading}
      </div>
      <Button className="flex gap-2" variant="outline" onClick={onClick}>
        <span onClick={onclick}>Export Result</span>
        <img src={DownloadFileIcon} alt="" />
      </Button>
    </div>
  );
};

const HomeloanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [schedule, setSchedule] = useState([]);
  const navigate = useNavigate();

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

  const headers = [
    { label: "Months", key: "months" },
    { label: "Principal", key: "principal" },
    { label: "Interest", key: "interest" },
    { label: "Total EMI", key: "totalEmi" },
  ];

  const data = schedule.map((row) => ({
    months: row.month,
    principal: row.principal.toFixed(2),
    interest: row.interest.toFixed(2),
    totalEmi: row.emi.toFixed(2),
  }));

  const handleDownloadData = () => {
    const exportHeaders = headers.map((header) => header.label);
    const exportData = [
      exportHeaders, // Add header row
      ...schedule.map((row) => [
        row.month, // Year (or month in your case)
        row.principal.toFixed(2), // Principal
        row.interest.toFixed(2), // Interest
        row.emi.toFixed(2), // Total EMI
      ]),
    ];

    // Create a new workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(exportData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Loan Repayment Details");

    // Write the workbook to a file
    XLSX.writeFile(wb, "LoanRepaymentDetails.xlsx");
  };

  return (
    <div>
      <HeadingBreadCrumb
        isHeadingDesign={true}
        isHeadingDesignArrow={true}
        rightDesign={true}
        yellowDotRight={true}
        heading="Home loan EMI calculator"
        description={
          "The Home Loan EMI Calculator computes the monthly installments required to repay your home loan based on the loan amount, interest rate, and tenure."
        }
      />
      <CalculatorInputsContainer>
        <div className="grid grid-cols-1 xl:grid-cols-2 w-full xl:gap-[50px] place-items-center gap-7 lg:gap-[40px]">
          <div className="w-full grid gap-5 xl:gap-[40px] place-items-between">
            <div className="flex w-full flex-col gap-[24px]">
              {/* Loan Amount Input */}
              <Input
                placeholder={"Enter Amount"}
                fieldName={"avgMonthlyInvestment"}
                label={"Loan Amount"}
                required={true}
                type={"number"}
                min={100000}
                max={100000000}
                value={loanAmount}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  setLoanAmount(value);
                  if (value >= 100000) {
                    calculateEMI(value, interestRate, loanTenure); // Trigger calculation only if valid
                  } else {
                    setEmi(0);
                    setTotalInterest(0);
                    setTotalAmount(0);
                    setSchedule([]);
                  }
                }}
              />
              <SliderInput
                min={100000}
                max={100000000}
                value={loanAmount}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  setLoanAmount(value);
                  if (value >= 100000) {
                    calculateEMI(value, interestRate, loanTenure); // Trigger calculation only if valid
                  } else {
                    setEmi(0);
                    setTotalInterest(0);
                    setTotalAmount(0);
                    setSchedule([]);
                  }
                }}
              />
            </div>

            <div className="flex w-full flex-col gap-[24px]">
              {/* Interest Rate Input */}
              <Input
                placeholder={"Enter Rate"}
                fieldName={"interestRate"}
                label={"Interest Rate (%)"}
                required={true}
                type={"number"}
                min={0}
                max={99}
                value={interestRate > 99 ? 99 : interestRate}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  setInterestRate(value);
                  calculateEMI(loanAmount, value, loanTenure); // Trigger calculation
                }}
              />
              <SliderInput
                min={0}
                max={99}
                value={interestRate}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  setInterestRate(value);
                  calculateEMI(loanAmount, value, loanTenure); // Trigger calculation
                }}
              />
            </div>

            <div className="flex w-full flex-col gap-[24px]">
              {/* Loan Tenure Input */}
              <Input
                placeholder={"Enter Tenure"}
                fieldName={"retirementAge"}
                label={"Loan Tenure (Years)"}
                type={"number"}
                min={1}
                max={30}
                value={loanTenure > 30 ? 30 : loanTenure}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  setLoanTenure(value);
                  calculateEMI(loanAmount, interestRate, value); // Trigger calculation
                }}
              />
              <SliderInput
                min={1}
                max={30}
                value={loanTenure}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  setLoanTenure(value);
                  calculateEMI(loanAmount, interestRate, value); // Trigger calculation
                }}
              />
            </div>
          </div>
          <CalculationCard
            bluePer={
              totalInterest < loanAmount
                ? 100
                : (loanAmount / totalInterest) * 100
            }
            orangePer={
              totalInterest < loanAmount
                ? (totalInterest / loanAmount) * 100
                : 100
            }
            result={{
              monthlyExemption: Math.floor(totalInterest ? loanAmount : 0),
              monthlyTaxable: Math.floor(totalInterest),
              conditions: {
                actual: Math.floor(emi),
                percent: Math.floor(totalInterest),
                rentMinus: Math.floor(totalAmount),
              },
            }}
          />
        </div>

        {/* Loan Repayment Details Table */}
        {schedule.length > 0 && (
          <div className="w-full mt-5">
            <HeadingWithExport
              onClick={handleDownloadData}
              heading={"Loan Repayment Details"}
            />
            <Table headers={headers} data={data} />
          </div>
        )}
      </CalculatorInputsContainer>{" "}
      <Banner />
      {/* Other Calculators Section */}
      <div className="flex flex-col md:py-[120px] py-[40px]  md:gap-[80px] gap-[30px]">
        <div className="text-center text-neutral-900 text-[32px] font-medium font-['Poppins'] leading-10">
          Our Calculators
        </div>
        <div className="grid gap-[40px] xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full place-items-center">
          <CalculatorCard
            name={"Income Tax Calculator"}
            descripiton={
              "Get an accurate estimate of your income tax liability."
            }
            route={"/calculators/Income-tax"}
          />
          <CalculatorCard
            name={"Old & New Tax Regime"}
            descripiton={
              "Determine your income tax return filing requirements with ease."
            }
            route={"/calculators/old-and-new-tax-regime"}
          />
          <CalculatorCard
            name={"SIP Calculator"}
            descripiton={
              "Estimate your returns on Systematic Investment Plans (SIPs)."
            }
            route={"/calculators/sip"}
          />
        </div>
        <Button
          className="self-center"
          onClick={() => navigate("/calculators")}
          variant="outline"
        >
          View all calculators
        </Button>
      </div>
      {/* FAQs Section */}
      <div className="flex flex-col gap-[80px]">
        <QuestionCard
          question={"What is the NPS Calculator?"}
          Answer={
            "The NPS Calculator is a financial tool that estimates the retirement corpus and monthly pension under the National Pension Scheme. It allows users to input their current age, retirement age, monthly contributions, and expected return rate to determine the final amount accumulated at maturity."
          }
        />
        <QuestionCard
          question={"How Does the NPS Calculator Work?"}
          Answer={
            "The calculator requires inputs like your current age, retirement age, monthly investment, and expected annual return rate. Using these, it calculates the accumulated corpus at retirement."
          }
        />
      </div>
      {/* FAQs */}
      <FAQs />
    </div>
  );
};

export default HomeloanCalculator;
