import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";

import InputField from "../InputField/InputField";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from "../GoogleLogin/GoogleLogin";
import { login } from "../../redux/authSlice/authSlice";
import ReactGA from "react-ga4";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(
        login({ email: formData.email, password: formData.password })
      );

      if (res.payload?.accessToken && location.state?.path === "/pricing") {
        toast.success("Successfully Logged In")
        navigate("/pricing", { state: location.state });
      } else if (location?.state?.path.includes("/service")) {
        toast.success("Successfully Logged In")
        navigate(location?.state?.path, { state: location.state });
      } else if (location?.state?.path.includes("/contact")) {
        toast.success("Successfully Logged In")
        navigate(location?.state?.path, { state: location.state });
      } else {
        if (res.payload?.accessToken) {
          toast.success("Successfully Logged In")
          navigate("/");
        }
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex lg:visible md:visible sm:invisible mobile:invisible gap-3 items-center  mb-10">
        <span
          onClick={() => navigate(-1)}
          className="mr-2 cursor-pointer text-2xl font-semibold"
        >
          ←
        </span>{" "}
        <h2 className="text-2xl font-semibold">Login</h2>
      </div>
      <div className="">
        {/* Google Sign-In Button */}
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENTID}>
          <GoogleLogin></GoogleLogin>
        </GoogleOAuthProvider>

        {/* Divider */}
        <div className="flex items-center justify-between my-4">
          <hr className="w-full border-gray-300" />
          <span className="px-2 text-sm font-medium">or</span>
          <hr className="w-full border-gray-300" />
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
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

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-2">Password</label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
                className="w-full border border-gray-300 rounded-lg px-[16px] py-[13px] focus:outline-none focus:ring-2 focus:ring-black"
              />
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

          {/* Forgot Password */}
          <div
            className={`flex ${
              error ? "justify-between" : "justify-end"
            } items-center mb-4`}
          >
            {error && (
              <span className="text-xs mb-5 text-red-400">{error}</span>
            )}

            <Link to="/forgot-password" className="text-sm  hover:underline ">
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-neutral-900 text-white rounded-full py-[14px]"
          >
            Login Now
          </button>
        </form>

        {/* Register Link */}
        <button
          onClick={() => {
            ReactGA.event({
              category: "Partner",
              action: "Register With Us",
            });
            navigate("/register");
          }}
          className="w-full bg-primary-200 text-neutral-900 rounded-full text-sm py-[14px] mt-4"
        >
          Register With Us
        </button>

        {/* Divider */}
        <div className="flex items-center justify-between my-20">
          <hr className="w-full border-gray-300" />
        </div>

        {/* Register Link */}
        <p className="mt-20 text-center text-sm ">
          Are you our partner?{" "}
          <Link
            to={`${process.env.REACT_APP_ADMIN_URL}/login`}
            className="font-medium hover:underline"
          >
            Login as Partner
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
