// src/pages/LoginPage.js
import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Login from "../../components/Login/Login";
import LogAndRegBanner from "../../components/LogAndRegBanner/LogAndRegBanner";
import SparkleReg from "../../assets/icons/sparkReg.svg";
import { useDispatch, useSelector } from "react-redux";
import { emptyError } from "../../redux/authSlice/authSlice";
const LoginPage = () => {
  const { isAuthenticated} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      dispatch(emptyError())
    }
  }, [dispatch]);

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
          <h2 className="text-2xl font-semibold">Login</h2>
        </div>
        <LogAndRegBanner />
      </div>
      <div>
        <div className="w-2/3 m-auto lg:h-[100vh] md:h-[100vh] flex justify-center items-center">
          <Login />
          <img
            src={SparkleReg}
            alt=""
            className="hidden md:block absolute top-20 right-14"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
