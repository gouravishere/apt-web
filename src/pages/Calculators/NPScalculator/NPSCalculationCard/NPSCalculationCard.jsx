import SavingCard from "../../../../components/SavingCard/SavingCard";
import NPScalculationBreak from "../NPScalculationBreak/NPScalculationBreak";

const NPSCalculationCard = ({
  totalCorpusRetiement,
  lumpsumWithdrawal,
  expectedMonthlyPension,
  requiredMonthly
}) => {
  return (
    <div className="self-stretch flex-col md:p-[40px] p-3 w-full gap-6 flex bg-[#f8f9fa] rounded-[24px]">
      <div className="self-stretch justify-start items-center gap-6 inline-flex">
        <div className="text-center text-slate-600 text-lg font-medium font-['Poppins'] leading-[27px]">
          NPS Calculator Result
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full pb-[40px]">
        <NPScalculationBreak
          amount={totalCorpusRetiement}
          label={"Total Corpus at Retirement"}
        />
        {!!lumpsumWithdrawal && <NPScalculationBreak
          amount={lumpsumWithdrawal}
          label={"lumpsum Withdrawal"}
        />}
       {!!expectedMonthlyPension && <NPScalculationBreak
          amount={expectedMonthlyPension}
          label={"Expected Monthly Pension:"}
        />}
        {!!requiredMonthly && <NPScalculationBreak
          amount={requiredMonthly}
          label={"Required Monthly Investment:"}
        />}
      </div>
      <SavingCard />
    </div>
  );
};

export default NPSCalculationCard;
