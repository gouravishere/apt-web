import React, { useState } from "react";
import InputField from "../InputField/InputField";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from "../GoogleLogin/GoogleLogin";
import axiosInstance from "../../utils/axiosInstance";
import InputPhone from "../PhoneInput/PhoneInput";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    termsAccepted: false, // Default country code
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (formData.termsAccepted) {
      try {
        const payload = {
          email: formData.email,
          fullName: formData.fullName,
          password: formData.password,
          phone: formData.mobile,
        };
        const response = await axiosInstance.post("/auth/send-otp", payload);

        if (response.data.success) {
          const token = response.data.data.token;
          navigate("/otp-verification", { state: { token } });
        }
      } catch (error) {
        console.error("Error sending OTP:", error);
        setError(
          error?.response?.data?.message ||
            "Failed to send OTP. Please try again."
        );
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please accept the terms and conditions.");
    }
  };

  return (
    <div className="w-full">
      <div className="flex lg:visible md:visible sm:invisible mobile:invisible gap-3 items-center mb-10">
        <span
          onClick={() => navigate(-1)}
          className="mr-2 cursor-pointer text-2xl font-semibold"
        >
          ←
        </span>
        <h2 className="text-2xl font-semibold">Register</h2>
      </div>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENTID}>
        <GoogleLogin></GoogleLogin>
      </GoogleOAuthProvider>
      <div>
        <div className="flex items-center justify-between my-4">
          <hr className="w-full border-gray-300" />
          <span className="px-2 text-sm font-medium">or</span>
          <hr className="w-full border-gray-300" />
        </div>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Enter your Full Name"
            required
          />

          <InputField
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            required
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            errorMessage={
              formData.email &&
              !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                formData.email
              )
                ? "Invalid email address"
                : ""
            }
          />

          <div className="mb-4">
            <InputPhone
              label={"Phone Number"}
              placeholder="Enter your phone number"
              value={formData.mobile || ""}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  mobile: `${e.countryCode}${e.phoneNumber}`,
                });
              }}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-2">Password</label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={formData.password}
                onBlur={() => {
                  if (
                    !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(
                      formData.password
                    )
                  ) {
                    setPasswordError(
                      "Password must be at least 8 characters 1 uppercase letter, 1 lowercase letter, and 1 number"
                    );
                  } else {
                    setPasswordError(null);
                  }
                }}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                placeholder="Enter your password"
                required
                className="w-full border border-gray-300 rounded-lg px-[16px] py-[13px] focus:outline-none focus:ring-2 focus:ring-black"
              />
              {passwordError && (
                <span className="text-xs mb-5 text-red-400">
                  {passwordError}
                </span>
              )}
              <button
                type="button"
                className="absolute right-3 top-4 text-gray-500"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? (
                  <Icon icon="ep:hide" width="20" height="20" />
                ) : (
                  <Icon icon="clarity:eye-show-line" width="20" height="20" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="termsAccepted"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleInputChange}
              className="w-4 h-4 accent-black text-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="termsAccepted"
              className="ml-2 text-sm text-gray-600 cursor-pointer"
            >
              I Agree with your{" "}
              <a
                target="_blank"
                className="cursor-pointer underline text-blue-600"
                href="/terms-and-conditions"
              >
                Terms & Conditions
              </a>
            </label>
          </div>

          {error && <span className="text-xs mb-5 text-red-400">{error}</span>}

          <button
            type="submit"
            className="w-full bg-neutral-900 text-white rounded-full py-[14px] disabled:bg-gray-400"
            disabled={
              !formData.termsAccepted ||
              !formData.fullName ||
              !formData.email ||
              !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(
                formData.password
              ) ||
              !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                formData.email
              )
            }
          >
            {loading ? "Wait..." : "Continue"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm ">
          Already have an account?{" "}
          <Link to="/login" className="font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
