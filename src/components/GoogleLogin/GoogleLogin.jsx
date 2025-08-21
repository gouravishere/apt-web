import React from "react";
import { useGoogleLogin } from "@react-oauth/google";

import googleLogo from "../../assets/icons/logoGoogle.svg";
import axiosInstance from "../../utils/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import { authUpdater } from "../../redux/authSlice/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";


const GoogleLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const result = await axiosInstance.post(
          "/auth/google",
          {
            token: authResult.code,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Cross-Origin-Opener-Policy": "*",
            },
          }
        );
        if (result.data.success) {
          const accessToken = result.data.data.accessToken;
          const refreshToken = result.data.data.refreshToken;

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          if (location.state) {
            if (location.state?.path === "/pricing") {
              toast.success("Successfully Logged In")
              navigate("/pricing", { state: location.state });
            }
            if (location?.state?.path.includes("/service")) {
              toast.success("Successfully Logged In")
              navigate(location?.state?.path, { state: location.state });
            }
            if (location?.state?.path.includes("/contact")) {
              toast.success("Successfully Logged In")
              navigate(location?.state?.path, { state: location.state });
            }
          } else {
            navigate('/')
            toast.success("Successfully Logged In")
            window.location.reload();
          }
          dispatch(authUpdater(result.data.data));
        }
      }
    } catch (e) {
      console.log("Error while Google Login...", e);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });
  
  return (
    <button
      className="flex items-center justify-center gap-3 w-full border border-gray-300 rounded-full text-sm font-medium py-3 mb-4 hover:bg-gray-100"
      onClick={googleLogin}
    >
      <img src={googleLogo} alt="Google" className="w-5 h-5 " />
      Continue with Google
    </button>
  );
};

export default GoogleLogin;
