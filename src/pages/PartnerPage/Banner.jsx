import React from "react";
import bannerImg from "../../assets/icons/Banner.svg";
import Heading from "../../components/Heading/Heading";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
const Banner = ({path = "/pricing"}) => {

  const navigate = useNavigate()
  return (
    <div className="relative min-h-[352px] mt-10 md:mt-40">
      <div className="w-screen h-full absolute translate-middle">
        <img className=" w-screen h-full object-cover object-center" src={bannerImg} alt="" />
      <Heading variant="xxl" className={"absolute top-16 left-[7%] max-w-[425px]"}>Let’s Grow Together!</Heading>
      <div className="text-[#051227] text-sm absolute top-28 max-w-[584px] left-[7%] font-medium font-['Poppins'] leading-snug">Become a part of the EzyFiling Partner Network and unlock new opportunities to expand your business, empower clients, and create impact. Join us today to revolutionize compliance and business services together.</div>
      <Button onClick={() => navigate(path)} variant="outline" className="absolute left-[7%] top-60 sm:top-52">Register with us</Button>
      </div>
    </div>
  );
};

export default Banner;
