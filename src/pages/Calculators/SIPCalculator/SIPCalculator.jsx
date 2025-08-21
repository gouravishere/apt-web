import { useState } from "react";
import Button from "../../../components/Button/Button";
import CalculatorInputsContainer from "../../../components/CalculatorInputsContainer/CalculatorInputsContainer";
import HeadingBreadCrumb from "../../../components/HeadingBreadCrumb/HeadingBreadCrumb";
import Input from "../../../components/Input/Input";
import SIPCalculatorLineChart from "../../../components/SIPCalculator/SIPCalculatorLineChart";
import SIPCalculationCard from "./SIPCalculationCard/SIPCalculationCard";
import MultilayerDonutChart from "../../../components/CircularGraph/CircularGraph";
import CalculatorCard from "../../../components/CalculatorCard/CalculatorCard";
import QuestionCard from "../../../components/QuestionCard/QuestionCard";
import FAQs from "../../../components/HomePage/FAQs/FAQs";
import Banner from "../../../components/Banner/Banner";
import { useNavigate } from "react-router-dom";
import link from "../../../assets/icons/export.svg";

export default function SIPCalculatorPage() {
  const [inputs, setInputs] = useState({
    principal: "",
    tenureYears: "",
    tenureMonths: "",
    rate: "",
    frequency: "Monthly",
  });

  const [results, setResults] = useState({
    maturityValue: 0,
    principal: 0,
    interestEarned: 0,
  });

  const [chartData, setChartData] = useState([]);
  const [showCard, setShowCard] = useState(false);
  const [validate, setValidate] = useState({});
  const [lineChartYears, setLineChartYears] = useState(1);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const calculateSIP = () => {
    let P = parseFloat(inputs.principal); // SIP Amount
    const r = parseFloat(inputs.rate) / 100; // Annual Rate as a decimal
    let n; // Number of periods based on frequency

    // Calculate number of periods based on frequency
    if (inputs.frequency === "Monthly") {
      n = (parseInt(inputs.tenureYears) * 12) + (parseInt(inputs.tenureMonths) || 0); // Monthly frequency
    } else if (inputs.frequency === "Quarterly") {
      n = inputs.tenureYears * 4 + Math.floor(inputs.tenureMonths / 3); // Quarterly frequency
    } else if (inputs.frequency === "Yearly") {
      n =
        Number(inputs.tenureYears) +
        Number(Math.floor(inputs.tenureMonths / 12)); // Yearly frequency (adjust for months > 0)
    }

    // Adjust interest rate based on frequency
    let adjustedRate;
    if (inputs.frequency === "Monthly") {
      adjustedRate = r / 12; // Monthly rate
    } else if (inputs.frequency === "Quarterly") {
      adjustedRate = r / 4; // Quarterly rate
    } else {
      adjustedRate = r; // Yearly rate stays the same
    }

    // Formula to calculate maturity amount for all frequencies
    const M =
      P *
      ((Math.pow(1 + adjustedRate, n) - 1) / adjustedRate) *
      (1 + adjustedRate); // SIP formula

    const totalInvestment = P * n; // Total investment made
    const totalInterest = M - totalInvestment; // Interest earned
    setResults({
      maturityValue: M,
      principal: totalInvestment,
      interestEarned: totalInterest,
    });

    // Calculate growth over time for each year
    const yearlyGrowth = [];
    for (let i = 1; i <= inputs.tenureYears; i++) {
      const growth =
        P *
        ((Math.pow(1 + adjustedRate, i * 12) - 1) / adjustedRate) *
        (1 + adjustedRate); // Growth for each year
      yearlyGrowth.push(growth);
    }
    setChartData(yearlyGrowth);
    setLineChartYears(inputs.tenureYears);
    setShowCard(true);
  };

  const validateInputs = () => {
    let error = {};

    if (!inputs.principal) error.principal = "This field cant be empty";
    if (inputs.tenureYears == "" || inputs.tenureYears == null)
      error.tenureYears = "This field cant be empty";
    // if (inputs.tenureMonths == null)
    //   error.tenureMonths = "This field cant be empty";
    if (!inputs.rate) error.rate = "This field cant be empty";

    setValidate(error);
    return Object.keys(error).length == 0;
  };

  const submitHandler = () => {
    if (validateInputs()) {
      calculateSIP();
    }
  };
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Heading and Description */}
      <HeadingBreadCrumb
        isHeadingDesignArrow={true}
        yellowDotLeft={true}
        sparkleRight={true}
        rightDesign={true}
        heading="SIP Calculator"
        description={
          "The SIP Calculator helps investors forecast the growth of their investments in mutual funds through SIPs based on monthly contributions and expected returns."
        }
      />
      <CalculatorInputsContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] w-full">
          <Input
            placeholder="Investment Amount"
            fieldName="principal"
            label="Investment Amount"
            required={true}
            type="number"
            min={0}
            value={inputs.principal}
            onChange={handleInputChange}
            validate={(value) => (value <= 0 ? "This field cant be empty" : "")}
            validateMsg={validate.principal}
          />

          <div className="flex flex-col w-full">
            <label className="text-slate-500 text-sm font-medium font-['Poppins'] leading-snug">
              Investment Tenure <span className="text-red-600">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2 ">
              <Input
                placeholder="Years"
                fieldName="tenureYears"
                type="number"
                min={0}
                value={inputs.tenureYears}
                onChange={handleInputChange}
                validate={(value) =>
                  value === "" || value === null ? "Required" : ""
                }
                validateMsg={validate.tenureYears}
                size="medium"
              />
              <Input
                placeholder="Months"
                fieldName="tenureMonths"
                type="number"
                min={0}
                max={11}
                value={inputs.tenureMonths > 11 ? 11 : inputs.tenureMonths}
                onChange={(e) => {
                  let newValue = Number(e.target.value);
                  if (newValue > 11) newValue = 11;
                  handleInputChange({
                    target: { name: "tenureMonths", value: newValue },
                  });
                }}
                validateMsg={validate.tenureMonths}
                size="medium"
              />
            </div>
          </div>

          <Input
            placeholder="Expected Annual Return(%)"
            fieldName="rate"
            label="Expected Annual Return(%)"
            required={true}
            type="number"
            min={0}
            value={inputs.rate}
            onChange={handleInputChange}
            validate={(value) => (value <= 0 ? "This field cant be empty" : "")}
            validateMsg={validate.rate}
          />
          <div className="w-full">
            <label className="block text-sm font-medium mb-1 text-slate-500">
              Frequency of SIP Contribution
            </label>
            <select
              name="frequency"
              value={inputs.frequency}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg "
            >
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>
        </div>
        <Button onClick={submitHandler} variant="black">
          Calculate now
        </Button>

        {showCard && (
          <SIPCalculationCard
            maturityValue={results.maturityValue}
            principal={results.principal}
            interestEarned={results.interestEarned}
          />
        )}

        {/* Using Grid Layout for the charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full">
          {/* SIP Line Chart (spanning 2 columns on larger screens) */}

          <SIPCalculatorLineChart
            chartData={chartData}
            year={parseInt(lineChartYears)}
          />

          {/* Multilayer Donut Chart (spanning 1 column) */}

          <div className="rounded-3xl border md:flex flex-col justify-center items-center  px-5 md:p-0 shadow-xl">
            <div className="lg:w-80 lg:h-80 mx-auto flex flex-col justify-center items-center">
              <MultilayerDonutChart
                isTotal={false}
                blueValue={(results.principal / results.maturityValue) * 100}
                orangeValue={
                  (results.interestEarned / results.maturityValue) * 100
                }
                principal={results.principal.toFixed(2)}
                interestEarned={results.interestEarned.toFixed(2)}
              />
            </div>
            <div className="flex flex-col w-full gap-4">
              <div className="h-6  gap-6 inline-flex w-full justify-between md:px-16">
                <div className="items-center gap-1 flex ">
                  <div className="w-[13px] h-[13px] bg-[#1086f5] rounded"></div>
                  <div className="text-slate-600 text-base font-normal font-['Poppins'] leading-normal">
                    Total Investment
                  </div>
                </div>
                <div className="text-slate-600 text-base font-medium font-['Poppins'] leading-normal">
                  {results.principal}
                </div>
              </div>

              <div className="h-6 justify-between items-center gap-6 inline-flex w-full md:px-16">
                <div className="h-6 items-center justify-between gap-1 flex">
                  <div className="w-[13px] h-[13px] bg-[#ff8b17] rounded"></div>
                  <div className="text-slate-600 text-base font-normal font-['Poppins'] leading-normal">
                    Interest Earned
                  </div>
                </div>
                <div className="text-slate-600 text-base font-medium font-['Poppins'] leading-normal">
                  {Math.floor(results?.interestEarned)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CalculatorInputsContainer>
      <Banner />
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
            route={"/old-and-new-tax-regime"}
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
          <img className="ml-2" src={link} alt="" />
        </Button>
      </div>
      {/* FAQs Section */}
      <div className="flex flex-col gap-[80px]">
        <QuestionCard
          question={"What is the SIP calculator?"}
          Answer={
            "The SIP Calculator is a tool for mutual fund investors to estimate the future value of their investments made through Systematic Investment Plans (SIPs). By inputting monthly contributions, investment tenure, and expected return rates, the calculator provides an accurate projection of the accumulated wealth. It’s ideal for those looking to plan long-term financial goals."
          }
        />
        <QuestionCard
          question={"How Does the SIP Calculator Work?"}
          Answer={
            "The SIP Calculator works by taking inputs such as your monthly investment amount, the expected annual return rate, and the investment tenure. It calculates the total value of your investments at the end of the tenure by factoring in the compounding effect, which ensures that both your principal amount and the returns earned are reinvested over time. The calculator provides a detailed estimate of how your investments grow, giving you a clear projection of the wealth you can accumulate. This helps you plan and set realistic financial goals effortlessly."
          }
        />
      </div>
      {/* FAQs */}
      <FAQs />
    </div>
  );
}
