import { useNavigate } from "react-router-dom";
import piggyBank from "../../assets/images/piggyBank.png"

const SavingCard = () => {

  const navigate = useNavigate('/pricing')

    return (
      <div className="min-h-[82px] w-full px-6 py-4 bg-white rounded-xl border border-neutral-200 justify-between flex-col sm:flex-row gap-8 sm:gap-0 items-center inline-flex">
        <div className="justify-start items-center gap-4 flex">
          <img alt="" className="w-10 h-10 mix-blend-multiply" src={piggyBank} />
          <div className="w-[319px] flex-col justify-start items-start gap-1 inline-flex">
            <div className="self-stretch text-neutral-900 text-base font-medium font-['Poppins'] leading-normal">
              Maximize your tax-savings!
            </div>
            <div className="self-stretch text-slate-600 xl:text-nowrap text-sm font-normal font-['Poppins'] leading-[21px]">
              Save on taxes through effective planning and accurate filing with ezyfiling.
            </div>
          </div>
        </div>
        <div className="px-6 md:py-3.5 py-2 bg-white rounded-[99px] border border-neutral-900 justify-center items-center gap-2 flex">
          <div onClick={() => navigate('/pricing')} className="text-neutral-900 text-sm text-nowrap font-medium font-['Poppins'] leading-snug">
            File Now
          </div>
        </div>
      </div>
    );
  };

  export default SavingCard