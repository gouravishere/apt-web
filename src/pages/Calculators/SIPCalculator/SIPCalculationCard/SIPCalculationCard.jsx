import SavingCard from "../../../../components/SavingCard/SavingCard";
import SIPCalculationBreak from "../SIPCalculationBreak/SIPCalculationBreak";

const SIPCalculationCard = ({ maturityValue, principal, interestEarned }) => {
  const calculationData = [
    { label: "Principal", amount: principal },
    { label: "Interest Earned", amount: interestEarned },
    { label: "Maturity Value", amount: maturityValue },
  ];

  return (
    <div className="self-stretch flex-col p-[40px] gap-6 flex bg-[#f8f9fa]">
      <div className="self-stretch justify-start items-center gap-6 inline-flex">
        <div className="text-center text-slate-600 text-lg font-medium font-['Poppins'] leading-[27px]">
          SIP Calculator Result
        </div>
      </div>
      <div className="flex justify-between w-full pb-[40px]">
        {calculationData.map((data, index) => (
          <SIPCalculationBreak key={index} {...data} />
        ))}
      </div>
      <SavingCard />
    </div>
  );
};
export default SIPCalculationCard;
