import LoginImage from "../../assets/icons/BannerReg.svg";
import Ylogo from "../../assets/images/EZYFILING A.jpg";
import RainIcon from "../../assets/icons/snow, rain, drops, weather, sparkle, pattern.svg";
import { useNavigate } from "react-router-dom";

export default function LogAndRegBanner() {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <img
        className="lg:h-[100vh] md:h-[100vh] sm:h-[350px] mobile:h-[350px] w-full object-cover"
        src={LoginImage}
        alt="img"
      />
      <div className="hidden md:block absolute top-8 left-12">
        <img
          onClick={() => navigate("/")}
          className="cursor-pointer w-36 h-20"
          src={Ylogo}
          alt=""
        />
      </div>
      <img
        src={RainIcon}
        alt="rain-icon"
        className="absolute hidden md:block -right-14 bottom-0"
      />
    </div>
  );
}
