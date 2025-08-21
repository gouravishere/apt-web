import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";

const Layout = () => {

  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div className="">
      
      <Navbar />
      <div className="bg-neutral-100 xl:px-[120px] lg:px-[90px] md:px-[50px] sm:px-[30px] p-1">
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;
