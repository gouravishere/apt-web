import SavingCard from "../../../../components/SavingCard/SavingCard";
import OldAndNewTaxRegimeBreak from "../OldAndNewTaxRegimeBreak/OldAndNewTaxRegimeBreak";

const OldAndNewTaxRegimeCard = ({ oldRegime, newRegime, savings }) => {
  const regimeData = [
    { label: "Old Regime Tax Payable", amount: oldRegime },
    { label: "New Regime Tax Payable", amount: newRegime },
    { label: "Tax Savings", amount: savings },
  ];

  return (
    <div className="self-stretch flex-col p-[40px] gap-6 flex bg-[#f8f9fa]">
      <div className="self-stretch justify-start items-center gap-6 inline-flex">
        <div className="text-center text-slate-600 text-lg font-medium font-['Poppins'] leading-[27px]">
          Old & New Tax Regime
        </div>
      </div>
      <div className="flex justify-between w-full pb-[40px]">
        {regimeData.map((data, index) => (
          <OldAndNewTaxRegimeBreak key={index} {...data} />
        ))}
      </div>
      <SavingCard />
    </div>
  );
};

export default OldAndNewTaxRegimeCard;
