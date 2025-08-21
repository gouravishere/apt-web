import React from "react";
import Register from "../../components/Register/Register";
import { useNavigate } from "react-router-dom";
import LogAndRegBanner from "../../components/LogAndRegBanner/LogAndRegBanner";
import SparkleReg from "../../assets/icons/sparkReg.svg"
const RegisterPage = () => {
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
          </span>
          <h2 className="text-2xl font-semibold">Register</h2>
        </div>
        <LogAndRegBanner/>
      </div>
      <div>
        <div className="w-2/3 m-auto lg:h-[100vh] md:h-[100vh] flex justify-center items-center relative">
          <Register />
          <img src={SparkleReg} className="hidden md:block absolute top-20 -right-10"/>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
