import ITRIcon from "../../assets/icons/ITRicon.svg"
import ecaAssistedIcon from "../../assets/icons/ecaassistedicon.svg"
import ecaStandardIcon from "../../assets/icons/ecastandardicon.svg"
import PricingCard from "../PricingCard/PricingCard";
export default function PricingComp() {
    const pricingData = [
        {
          icon: ITRIcon,
          heading: "ITR Filing with Agricultural Income",
          description:
            "Body information about the title in two or three lines,currently some random",
          features: [
            { feature1: "Feature 1" },
            { feature2: "Feature 2" },
            { feature3: "Feature 3" },
            { feature4: "Feature 4" },
          ],
          prices: 1199,
          buttonText: "File Now",
        },
        {
          icon: ecaStandardIcon,
          heading: "eCA Assisted - Standard method",
          description:
            "Body information about the title in two or three lines,currently some random",
          features: [
            { feature1: "Feature 1" },
            { feature2: "Feature 2" },
            { feature3: "Feature 3" },
            { feature4: "Feature 4" },
          ],
          prices: 999,
          buttonText: "File Now",
        },
        {
          icon: ecaAssistedIcon,
          heading: "eCA Assisted - Capital Gain",
          description:
            "Body information about the title in two or three lines,currently some random",
          features: [
            { feature1: "Feature 1" },
            { feature2: "Feature 2" },
            { feature3: "Feature 3" },
            { feature4: "Feature 4" },
          ],
          prices: 1999,
          buttonText: "File Now",
        },
      ];
    return <div> 
      <div className="flex justify-center text-2xl font-semibold">
        Pricing
      </div>
      <div className="grid lg:grid-cols-3 mt-12 md:grid-cols-2 sm:grid-cols-1 gap-10">
    {pricingData.map((item, index) => (
      <PricingCard
        key={index}
        icon={item.icon}
        heading={item.heading}
        description={item.description}
        features={item.features}
        prices={item.prices}
        buttonText={item.buttonText}
      />
    ))}
  </div></div>
}