import React, { useState } from "react";
import InputField from "../InputField/InputField";
import { Link, useNavigate } from "react-router-dom";
import CloudIcon from "../../assets/icons/cloud.svg";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const ForgetPassword = ({ setRecordSteps }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Reset Password
  const [loading, setLoading] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (step === 1) {
      try {
        const response = await axiosInstance.post(`/auth/forgot-password`, {
          email: formData.email,
        });
        if (response?.data?.success) {
          toast.success("OTP sent successfully")
          setStep(2);
          setRecordSteps(2);
        }
      } catch (err) {
        toast.error("Something went wrong")
        setError(err.response?.data?.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    } else if (step === 2) {
      try {
        const response = await axiosInstance.post("/auth/verify-reset-otp", {
          email: formData.email,
          otp: formData.otp,
        });
        if (response?.data?.success) {
          setResetToken(response.data.data.resetToken);
          setStep(3);
          setRecordSteps(3);
        }
      } catch (error) {
        console.error(
          "Error in verify-reset-otp API:",
          error.response || error
        );
        setError(error.response?.data?.message || "Something went wrong!");
      }
    } else if (step === 3) {
      try {
        const response = await axiosInstance.post(
          "/auth/reset-password",
          { newPassword: formData.confirmPassword },
          {
            headers: {
              "reset-token": resetToken,
            },
          }
        );
        if (response?.data?.success) {
          toast.success("OPT sent successfully")
          navigate("/login");
        }
      } catch (err) {
        toast.error("Something went wrong")
        setError(err.response?.data?.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="">
        {/* Step Header */}
        <div>
          <button
            className="relative flex lg:visible md:visible sm:invisible mobile:invisible items-center text-2xl font-semibold mb-10"
            onClick={() => {
              if (step > 1) {
                setStep(step - 1);
                setError("");
              } else {
                navigate("/login");
              }
            }}
          >
            <span className=" mr-2 text-2xl font-semibold">←</span>{" "}
            {step === 1
              ? "Forget Password"
              : step === 2
              ? "Enter OTP"
              : "Reset Password"}
            <img
              alt=""
              src={CloudIcon}
              className="hidden md:block absolute -right-14 -top-5"
            />
          </button>
        </div>

        {/* Step Form */}
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <p className="text-sm mb-6">
                Please enter your email address to check with your account with
                us
              </p>
              <InputField
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                required
              />
              {error && <span className="text-xs text-red-400">{error}</span>}
              <button
                type="submit"
                className="w-full bg-black text-white rounded-full py-3 text-sm hover:bg-gray-900 mt-4"
              >
                Send OTP
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-sm mb-6">
                We sent an email with the OTP numbers on your email address{" "}
                <span className="font-bold">{formData.email}</span>.
              </p>
              <InputField
                label="OTP"
                name="otp"
                type="text"
                value={formData.otp}
                onChange={handleInputChange}
                placeholder="Enter your 6 digit OTP"
                required
              />
              {error && <span className="text-xs text-red-400">{error}</span>}

              <button
                type="submit"
                className="w-full bg-black text-white rounded-full py-3 text-sm hover:bg-gray-900 mt-4"
              >
                Verify OTP
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <p className="text-gray-600 text-sm mb-4">
                Reset your password by entering the details below.
              </p>

              <InputField
                label="New Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your new password"
                required
              />

              {error && <span className="text-xs text-red-400">{error}</span>}

              <button
                type="submit"
                className="w-full bg-black text-white rounded-full py-3 text-sm hover:bg-gray-900 mt-4"
              >
                Reset Password
              </button>
            </>
          )}
        </form>

        {/* Login Link */}
        {step === 1 && (
          <p className="text-center text-sm text-gray-500 mt-6">
            <Link
              to="/login"
              className=" hover:underline font-medium"
              onClick={() => navigate("/login")}
            >
              Login
            </Link>
          </p>
        )}
        {step === 2 && (
          <p className="text-center text-sm mt-6">
            <span
              className=" hover:underline font-medium cursor-pointer"
              onClick={async () => {
                try {
                  const response = await axiosInstance.post(
                    `/auth/forgot-password`,
                    {
                      email: formData.email,
                    }
                  );
                  if (response?.data?.success) {
                    toast.success("OTP sent successfully")
                    setStep(2);
                    setRecordSteps(2);
                  }
                } catch (err) {
                  toast.error("Something went wrong")
                  setError(
                    err.response?.data?.message || "Something went wrong!"
                  );
                } finally {
                  setLoading(false);
                }
              }}
            >
              Send OTP Again
            </span>
          </p>
        )}
      </div>
      {/* <ToastContainer/> */}
    </div>
  );
};

export default ForgetPassword;
