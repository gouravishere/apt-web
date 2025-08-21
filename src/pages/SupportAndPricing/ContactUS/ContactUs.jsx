import { useSelector } from "react-redux";
import ImpactCreated from "../../../components/HomePage/Impact/ImpactCreated";
import GetInTouch from "./GetInTouch/GetInTouch";
import GetInTouchWithTeam from "./GetInTouchWithTeam/GetInTouchWithTeam";
import SimplifyTaxes from "./SimplifyTaxes/SimplifyTaxes";
import ContactSpiral from "../../../assets/icons/ContactSpiral.svg";
import ContactLeftArrow from "../../../assets/icons/ContactLeftArrow.svg";
import ContactQuarter from "../../../assets/icons/ContactQuarter.svg";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ChatBot from "../../../components/ChatBot/ChatBot";

export default function Contact() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div>
        <ChatBot/>
      <div
        className={`grid ${true ? "lg:grid-cols-2 md:grid-cols-1" : "flex"}`}
      >
        <div className="relative">
          <SimplifyTaxes />
          <img
            alt=""
            src={ContactQuarter}
            className={`${
              true
                ? "hidden md:block absolute -top-1 -left-32"
                : "hidden md:block absolute -top-1 -left-1/3"
            }`}
          />
        </div>
        {true && (
          <div className="relative">
            <GetInTouch />
            <img
              alt=""
              src={ContactSpiral}
              className="hidden md:block absolute top-14 -right-20"
            />
          </div>
        )}
      </div>
      <div className="relative">
        <ImpactCreated />
        <img
          alt=""
          src={ContactLeftArrow}
          className="hidden md:block absolute left-0 top-0"
        />
      </div>
      <GetInTouchWithTeam />
    </div>
  );
}
