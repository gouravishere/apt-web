import { useState } from "react";
import TaxWhoWeAre1 from "../../assets/icons/tax-whoAndWhen1.svg";
import PartnerUs2 from "../../assets/icons/PartnerUs2.svg";
import PartnerUs3 from "../../assets/icons/PartnerUs3.svg";
import PartnerUs4 from "../../assets/icons/PartnerUs4.svg";
import PartnerUs5 from "../../assets/icons/PartnerUs5.svg";
import PartnerUs6 from "../../assets/icons/PartnerUs6.svg";
import Button from "../../components/Button/Button";
import Heading from "../../components/Heading/Heading";

export default function WhoCanPartner() {
  const cardData = [
    { icon: TaxWhoWeAre1, description: "Tax Consultants and Chartered Accountants (CAs)" },
    { icon: PartnerUs2, description: "Entrepreneurs and Agencies Offering Related Services" },
    { icon: PartnerUs3, description: "Company Secretaries (CS) and Legal Advisors" },
    { icon: PartnerUs4, description: "Business Consultants and Advisors" },
    { icon: PartnerUs5, description: "GST Practitioners" },
    { icon: PartnerUs6, description: "Financial Planners" }
  ];

  const [viewMore, setViewMore] = useState(false);
  const dataShow = viewMore ? cardData : cardData.slice(0, 3);

  const handleToggle = () => {
    setViewMore((prev) => !prev);
  };

  return (
    <div>
      <div className="flex justify-center my-20 text-center">
        <Heading variant="threeXl" weight="medium">Who Can Partner with Us?</Heading>
      </div>

      {/* For larger screens, display all cards */}
      <div className="hidden md:grid md:grid-cols-3 gap-5">
        {cardData.map((card, index) => (
          <div key={index} className="p-6 flex flex-row gap-5 rounded-3xl bg-white border border-gray-200">
            {/* Icon */}
            <div className="flex items-center justify-center">
              <img src={card.icon} alt={card.description} className="w-36 h-16" />
            </div>
            {/* Description */}
            <div className="flex flex-col justify-center items-center gap-2">
              <p className="text-neutral-700 font-normal text-sm">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* For smaller screens, display dataShow and toggle view */}
      <div className="grid md:hidden grid-cols-1 gap-5">
        {dataShow.map((card, index) => (
          <div key={index} className="p-6 flex flex-row gap-5 rounded-3xl bg-white border border-gray-200">
            {/* Icon */}
            <div className="flex items-center justify-center">
              <img src={card.icon} alt={card.description} className="w-36 h-16" />
            </div>
            {/* Description */}
            <div className="flex flex-col justify-center items-center gap-2">
              <p className="text-neutral-700 font-normal text-sm">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* View more button for smaller screens */}
      <div className="flex justify-center my-10 md:hidden">
        <Button variant="outline" onClick={handleToggle}>{viewMore ? 'View less' : 'View more'}</Button>
      </div>
    </div>
  );
}
