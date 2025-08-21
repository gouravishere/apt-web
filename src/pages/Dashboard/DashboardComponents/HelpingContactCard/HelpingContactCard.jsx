import customerHeadPhone from "../../../../assets/icons/customerHeadPhone.svg"
import Button from "../../../../components/Button/Button";

const HelpingContactCard = ({onCall = () => null, onChat = () => null}) => {
    return (
      <div className="flex bg-primary-50 sm:flex-row gap-3 flex-col  p-8 justify-between w-full rounded-2xl">
        <div className="flex justify-between gap-[24px]">
          <img className="" src={customerHeadPhone} alt="" />
          <div>
            <div className="text-[20px] leading-[30px] text-neutral-900">
              We’re Here to Help{" "}
            </div>
            <div className="text-[14px] max-w-[538px] text-neutral-700">
              Get answers, resolve issues, and find the support you need—quickly
              and easily.
            </div>
          </div>
        </div>
        <div className="h-12 px-6 py-3 rounded-[99px] items-center gap-3 inline-flex">
          <Button onClick={onCall} variant="outline"><a href="tel:+916359599999">Call Now</a></Button>
          <Button onClick={onChat} variant="outline">Chat Now</Button>
        </div>
      </div>
    );
  };

  export default HelpingContactCard