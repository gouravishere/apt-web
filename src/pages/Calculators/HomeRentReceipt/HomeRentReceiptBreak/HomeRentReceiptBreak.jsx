export default function HomeRentReceiptBreak({ label, amount }) {
  const formattedAmount = typeof amount === 'number' ? `₹${amount}` : amount;

  return (
    <div className="w-[200px] flex-col justify-center items-start gap-2 inline-flex">
      <div className="text-slate-600 text-sm font-normal font-['Poppins'] leading-[21px]">
        {label}
      </div>
      <div className="text-[#051227] text-base font-medium font-['Poppins'] leading-normal">
        {formattedAmount}
      </div>
    </div>
  );
}
