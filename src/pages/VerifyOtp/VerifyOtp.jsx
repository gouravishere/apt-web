import OtpVerification from "../../components/OtpVerification/OtpVerification";
import { useNavigate } from "react-router-dom";
import LogAndRegBanner from "../../components/LogAndRegBanner/LogAndRegBanner"
const VerifyOtp = () => {
  const navigate = useNavigate();

  return (
    <div className="lg:grid lg:grid-cols-2 md:grid md:grid-cols-2 sm:flex sm:flex-col sm:gap-5 mobile:flex mobile:flex-col mobile:gap-5">
      <div>
        <div className="flex lg:hidden md:hidden sm:visible mobile:visible gap-3 items-center mb-10 sm:my-10 sm:ml-4 mobile:ml-4 mobile:my-10">
          <span
            onClick={() => navigate(-1)}
            className="mr-2 cursor-pointer text-2xl font-semibold"
          >
            ←
          </span>{" "}
          <h2 className="text-2xl font-semibold"> OTP Verification</h2>
        </div>
      <LogAndRegBanner/>
      </div>
      <div>
        <div className="w-2/3 m-auto lg:h-[100vh] md:h-[100vh] flex justify-center items-center">
          <OtpVerification />
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
