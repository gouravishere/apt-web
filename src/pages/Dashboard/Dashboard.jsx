import React, { useEffect } from "react";
import DashBoardTabSwitcher from "./DashBoardTabsSwitcher/DashBoardTabSwitcher";
import { Outlet } from "react-router-dom";
import { getUserDetails } from "../../redux/authSlice/authSlice";
import { useDispatch } from "react-redux";


const Dashboard = () => {

const dispatch = useDispatch()

useEffect(() => {
  dispatch(getUserDetails())
},[dispatch])

  return (
      <div className="w-full relative pb-10">
        <div className="w-full relative h-[57px] mt-[3px]">
          <div className="absolute top-[50%] w-screen left-[50%] bg-white text-black h-full translate-x-[-50%] translate-y-[-50%]"></div>
          <DashBoardTabSwitcher
            className={
              "absolute top-[50%] hidden-scrollbar overflow-auto xl:px-[120px] lg:px-[90px] md:px-[50px] sm:px-[30px] px-[10px] w-screen h-full left-[50%] z-10 translate-x-[-50%] translate-y-[-50%] "
            }
            />

        </div>
          <Outlet/>
      </div>
  );
};

export default Dashboard;
