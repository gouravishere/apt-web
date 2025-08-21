import React from "react";
import FAQs from "../../components/HomePage/FAQs/FAQs";
import CalculatorCard from "../../components/CalculatorCard/CalculatorCard";
import HeadingBreadCrumb from "../../components/HeadingBreadCrumb/HeadingBreadCrumb";
import sparkleCal from "../../assets/icons/sparkCalculator.svg"
import shapeCal from "../../assets/icons/shapeCalculator.svg"
import Banner from "../../components/Banner/Banner"
import IncomeTaxIcon from "../../assets/icons/IncomeTaxCalIcon.svg";
import HRAIcon from "../../assets/icons/HRACalIcon.svg";
import NPSIcon from "../../assets/icons/NpsCalIcon.svg";
import HomeLoanIcon from "../../assets/icons/HomeLoanCal.svg";
import NSCIcon from "../../assets/icons/NscCalIcon.svg";
import SIPIcon from "../../assets/icons/SIPCALICOn.svg";
import OldNewIcon from "../../assets/icons/OldAndNewCalIcon.svg";
import GratuityIcon from "../../assets/icons/gratuityCalIcon.svg";
import RentReceiptIcon from "../../assets/icons/HomeCalIcon.svg";
// import ITRIcon from "../../assets/icons/ITRCalIcon.svg";

const calculatorData = [
  {
    name: "Income Tax Calculator",
    description: "Get an accurate estimate of your income tax liability.",
    route: "/calculators/Income-tax",
    image: IncomeTaxIcon,
  },
  {
    name: "HRA Calculator",
    description:
      "Find out your eligible House Rent Allowance exemption with ease.",
    route: "/calculators/hra",
    image: HRAIcon,
  },
  {
    name: "NPS Calculator",
    description:
      "Estimate your retirement corpus and monthly pension under the National Pension Scheme.",
    route: "/calculators/nps",
    image: NPSIcon,
  },
  {
    name: "Home Loan EMI Calculator",
    description: "Quickly calculate your monthly installments for a home loan.",
    route: "/calculators/home-loan-emi",
    image: HomeLoanIcon,
  },
  {
    name: "NSC Calculator",
    description:
      "Calculate returns from your National Savings Certificate investments.",
    route: "/calculators/nsc",
    image: NSCIcon,
  },
  {
    name: "SIP Calculator",
    description: "Estimate your returns on Systematic Investment Plans (SIPs).",
    route: "/calculators/sip",
    image: SIPIcon,
  },
  {
    name: "Old & New Tax Regime",
    description:
      "Evaluate the Old and New Tax Regime to find the best fit for you.",
    route: "/calculators/old-and-new-tax-regime",
    image: OldNewIcon,
  },
  {
    name: "Gratuity Calculator",
    description:
      "Estimate the gratuity amount you're entitled to based on your tenure and salary.",
    route: "/calculators/gratuity",
    image: GratuityIcon,
  },
  {
    name: "Home Rent Receipt Generator",
    description:
      "Easily create rent receipts for tax exemption claims or record-keeping.",
    route: "/calculators/home-rent-receipt",
    image: RentReceiptIcon,
  },
  // {
  //   name: "ITR Eligibility Calculator",
  //   description:
  //     "Determine your income tax return filing requirements with ease.",
  //   route: "/calculators/itr-eligibility",
  //   image: ITRIcon,
  // },
];

const Calculators = () => {
  return (
    <div className="max-w-[1440px]  mx-auto">
       <HeadingBreadCrumb isHeadingDesign={true} isHeadingDesignArrow ={true} 
       rightDesign={true}
      heading="Calculators"
      description={"Make informed decisions with ease using our range of tax and financial calculators, designed to simplify your planning and compliance."}
      />
      <div className="flex flex-col items-center justify-center ">
      <div className="relative grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 md:gap-[40px] gap-5 justify-items-center">
  {calculatorData?.map((data, index) => (
    <CalculatorCard
      key={index}
      name={data.name}
      isImage={data.image}
      descripiton={data.description}
      route={data.route}
    />
  ))}
  <img
  alt=""
    src={sparkleCal}
    className="hidden md:block absolute -top-28 -left-20"
  />
  <img
  alt=""
    src={shapeCal}
    className="hidden md:block absolute bottom-28 -right-28"
  />
</div>
<Banner/>
        <div className="w-full">
          <FAQs />
        </div>
      </div>
    </div>
  );
};

export default Calculators;
