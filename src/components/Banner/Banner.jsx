import React from "react";
import bannerImg from "../../assets/icons/Banner.svg";
import Heading from "../Heading/Heading";
import Button from "../Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
const Banner = () => {

  const navigate = useNavigate()
  const location = useLocation();
  const handleClick = () => {
    if (location.pathname === "/pricing") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/pricing");
    }
  };
  return (
    <div className="relative min-h-[352px] mt-10 md:mt-40">
      <div className="w-screen h-full absolute translate-middle">
        <img className=" w-screen h-full object-cover object-center" src={bannerImg} alt="" />
      <Heading variant="xxl" className={"absolute top-16 left-[9%] max-w-[425px]"}>Simplify Taxes <span className="text-primary-500">Across Globe</span> with Expert Assistance</Heading>
      <div className="text-[#051227] text-sm absolute top-36 max-w-[584px] left-[9%] font-medium font-['Poppins'] leading-snug">From income tax to corporate filings, we handle it all across India, UAE, Saudi Arabia, Qatar, Singapore, Oman and Kuwait with accuracy and care."</div>
      <Button onClick={handleClick} variant="outline" className="absolute left-[9%] top-60 sm:top-52">File Now</Button>
      </div>
    </div>
  );
};

export default Banner;
