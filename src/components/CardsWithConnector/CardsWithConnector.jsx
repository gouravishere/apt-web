import { useState } from "react";
import CardLeft from "../ServiceBenefits/CardLeft/CardLeft";
import CardRight from "../ServiceBenefits/CardRight/CardRight";
import Button from "../Button/Button";
import Heading from "../Heading/Heading";

export default function CardsWithConnector({
  heading,
  data,
  desktopViewData,
  mobileViewData,
}) {
  const [activeDesktop, setActiveDesktop] = useState(false);
  const [activeMobile, setActiveMobile] = useState(false);
  const desktopShowData = activeDesktop ? data : data.slice(0, desktopViewData);
  const mobileShowData = activeMobile ? data : data.slice(0, mobileViewData);
  

  const toggleDesktop = () => {
    setActiveDesktop((prev) => !prev);
  };
  const toggleMobile = () => {
    setActiveMobile((prev) => !prev);
  };

  const highlightedHeading = heading.replace(
    /ezyfiling/gi,
    (match) => `<span class="bg-[#fddc5e] px-1">${match}</span>`
  );

  return (
    <div>
      <Heading className={"flex text-center justify-center my-20"}>
        <span dangerouslySetInnerHTML={{ __html: highlightedHeading }} />
      </Heading>
      <div className="hidden md:block">
        {desktopShowData.map((item, index) =>
          index % 2 === 0 ? (
            <CardLeft
              key={index}
              heading={item.heading}
              text={item.description}
              img={item.img}
            />
          ) : (
            <CardRight
              key={index}
              heading={item.heading}
              text={item.description}
              img={item.img}
            />
          )
        )}
        {desktopViewData && (
          <div className="flex justify-center">
            <Button variant="outline" onClick={toggleDesktop}>
              {activeDesktop ? "View less" : "View more"}
            </Button>
          </div>
        )}
      </div>
      <div className="block md:hidden">
        {mobileShowData.map((item, index) =>
          index % 2 === 0 ? (
            <CardLeft
              key={index}
              heading={item.heading}
              text={item.description}
              img={item.img}
            />
          ) : (
            <CardRight
              key={index}
              heading={item.heading}
              text={item.description}
              img={item.img}
            />
          )
        )}
        {mobileViewData && (
          <div className="flex justify-center">
            <Button variant="outline" onClick={toggleMobile}>
              {activeMobile ? "View less" : "View more"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
