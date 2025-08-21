import taxBenefitCard from "../../../assets/icons/Fema-benefit-1.svg";
import connectorCard from "../../../assets/icons/services-connector-card.svg";

export default function CardRight({ heading, text,img }) {
  const imgSrc=img || taxBenefitCard
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Image Section */}
        <div className="flex items-center relative md:order-2">
          <img
            src={imgSrc}
            alt="Tax Benefit"
            className="w-full h-auto object-contain"
          />
          <img
            src={connectorCard}
            alt="Connector"
            className="hidden md:block absolute top-10 -left-20 z-20"
          />
              <img
            src={connectorCard}
            alt="Connector"
             className="block md:hidden absolute bottom-3 rotate-90 z-20"
          />
        </div>

        {/* Right Content Section */}
        <div className="relative flex flex-col justify-between md:order-1">
          <div className="px-4 -mt-10 md:px-8 lg:px-24 border rounded-3xl md:mt-8 mb-10 md:mb-14 h-full">
            <div className="pt-10 md:pt-16 lg:pt-20">
              <span className="text-lg md:text-xl font-semibold">
                {heading}
              </span>
            </div>
            <div className="pt-4 pb-4 md:pt-5 text-gray-500 text-sm md:text-base">
              {text}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
