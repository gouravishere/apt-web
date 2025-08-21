const SIPCalculationBreak = ({ label, amount }) => {
    return (
      <div className="w-[200px] flex-col justify-center items-start gap-2 inline-flex">
        <div className="text-slate-600 text-sm font-normal font-['Poppins'] leading-[21px]">
          {label}
        </div>
        <div className="text-neutral-900 text-base font-medium font-['Poppins'] leading-normal">
        ₹{amount.toFixed(2)}
        </div>
      </div>
    );
  };
  export default SIPCalculationBreak