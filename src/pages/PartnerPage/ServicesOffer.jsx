import PartnerServices1 from "../../assets/icons/PartnerServices1.svg"
import PartnerServices2 from "../../assets/icons/PartnerServices2.svg"
import PartnerServices3 from "../../assets/icons/PartnerServices3.svg"
import PartnerServices4 from "../../assets/icons/PartnerServices4.svg"
import PartnerServices5 from "../../assets/icons/PartnerServices5.svg"
import PartnerServices6 from "../../assets/icons/PartnerServices6.svg"
import Heading from "../../components/Heading/Heading";

export default function ServicesOffer() {
    const cardData = [
        { icon: PartnerServices1, description: "Tax Filing Solutions" },
        { icon: PartnerServices2, description: "GST Compliance Services" },
        { icon: PartnerServices3, description: "FEMA Regulations Support" },
        { icon: PartnerServices4, description: "ROC Filing Compliance and Filings" },
        { icon: PartnerServices5, description: "Business Consultancy Services" },
        { icon: PartnerServices6, description: "Business Setup Assistance" },
    ];

    return (
      <div>
        <div className="flex justify-center my-20 text-center ">
        <Heading variant="threeXl" weight="medium">What Services Can You Offer as a Partner?</Heading>
        </div>
          <div className="grid  lg:grid-cols-3 grid-cols-2 gap-5">
            {cardData.map((card, index) => (
                <div key={index} className="p-6 flex flex-col gap-5 rounded-3xl bg-white ">
                    {/* Icon */}
                    <div className="flex items-center justify-center">
                        <img src={card.icon} alt="" className="w-36 h-16" />
                    </div>
                    {/* Description */}
                    <div className="flex flex-col gap-2 text-center">
                        <p className="text-neutral-700 font-normal text-md">{card.description}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    );
}