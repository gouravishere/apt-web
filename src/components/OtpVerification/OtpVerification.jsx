import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import CloudIcon from "../../assets/icons/cloud.svg"
import GroupIcon from "../../assets/icons/Group.svg"
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setAccessRefreshToken } from "../../redux/authSlice/authSlice";
const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = location.state?.token;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      alert("Please enter the OTP.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(
        "/auth/verify-otp",
        { otp },
        {
          headers: {
            "verification-token": token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        toast.success("Successfully registered")
        dispatch(setAccessRefreshToken({
          accessToken: response.data.data.accessToken,
          refreshToken: response.data.data.refreshToken,
        }));
        navigate("/")
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError(
        error.response?.data?.message ||
          "Failed to verify OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full ">
      <div className="flex lg:visible md:visible sm:invisible mobile:invisible gap-3 items-center  mb-4">
        <span
          onClick={() => navigate(-1)}
          className="mr-2 cursor-pointer text-2xl font-semibold"
        >
          ←
        </span>{" "}
        <h2 className=" relative text-2xl font-semibold">OTP Verification
          <img alt="cloud" src={CloudIcon} className="hidden md:block absolute -top-10 -right-16"/>
        </h2>
      </div>
      <div className="relative">
        <p className="text-sm mb-6">
          Please enter the OTP sent to your registered email or mobile.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
            className="w-full border border-gray-300 rounded-lg px-[16px] py-[13px] focus:outline-none focus:ring-2 focus:ring-black mb-4"
          />
          {error && <span className="text-xs mb-5 text-red-400">{error}</span>}

          <button
            type="submit"
            className="w-full bg-neutral-900 text-white rounded-full py-[14px]"
          >
            {loading ? "Wait..." : "Verify OTP"}
          </button>
        </form>
        <p className="text-center text-sm mt-6">
          <span
            className=" hover:underline font-medium cursor-pointer"
            onClick={() => console.log("Navigate to Login")}
          >
            Send OTP Again
          </span>
        </p>
        <img alt="" src={GroupIcon} className="hidden md:block absolute -bottom-16 -right-10"/>
      </div>
    </div>
  );
};

export default OtpVerification;
