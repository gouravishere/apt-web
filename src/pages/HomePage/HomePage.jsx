import React from "react";
import TopBanner from "../../components/TopBanner/TopBanner";
import ServicesAcrossGlobe from "../../components/HomePage/Services/ServicesAcrossGlobe";
import ImpactCreated from "../../components/HomePage/Impact/ImpactCreated";
import WhyChooseUs from "../../components/HomePage/WhyChooseUs/WhyChooseUs";
import FAQs from "../../components/HomePage/FAQs/FAQs";
import Blogs from "../../components/HomePage/Blogs/Blogs";
// import Testimonial from "../../components/HomePage/Testimonial/Testimonial";
// import HowItsWork from "../../components/HowItsWork/HowItsWork";
import BannerImage from "../../assets/icons/homePageImg.svg";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import oppo from "../../assets/clientsLogo/oppo.png";
import dlf from "../../assets/clientsLogo/dlf.svg";
import jio from "../../assets/clientsLogo/jio.png";
import max from "../../assets/clientsLogo/max.png";
import reliance from "../../assets/clientsLogo/reliance.png";
import marriot from "../../assets/clientsLogo/marriot.png";
import simplefication from "../../assets/clientsLogo/Simplification.png";
import jaguar from "../../assets/clientsLogo/jaguar.png";
import bose from "../../assets/clientsLogo/bose.png";
import panasonic from "../../assets/clientsLogo/panasonic.png";
import { Helmet } from "react-helmet-async";

import ReactGA from "react-ga4";

const HomePage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/pricing");
    ReactGA.event({
      category: "User",
      action: "Clicked on Book Consultation",
      label: "book_consultation",
    });
  };

  const clients = [
    { id: 1, logo: oppo },
    { id: 2, logo: dlf },
    { id: 3, logo: jio },
    { id: 4, logo: max },
    { id: 5, logo: reliance },
    { id: 6, logo: marriot },
    { id: 7, logo: simplefication },
    { id: 8, logo: jaguar },
    { id: 9, logo: bose },
    { id: 10, logo: panasonic },
  ];

  return (
    <div>
      <Helmet>
        <title>ezyfiling: Ease of Compliance, Anytime Anywhere.</title>
        <meta
          name="description"
          content="Ezyfiling offers expert tax filing, GST registration, business consultancy, FEMA & ROC compliance services online."
        />
        <meta
          name="keywords"
          content="tax filing, GST registration, business consultancy, ROC compliance, FEMA services, ezyfiling"
        />
      </Helmet>
      <Navbar />
      <div className="px-4">
        <TopBanner
          imageSrc={BannerImage}
          headingText="Think Globally Act Locally: Breaking the Borders, Your Partner in Building Global Businesses "
          subheadingText="Ease of Compliance, Anytime Anywhere "
          buttonText="Book Consultation"
          onButtonClick={handleButtonClick}
        />
        <div className="lg:px-36 px-1 sm:px-20">
          <ServicesAcrossGlobe />
        </div>

        <div className="lg:px-20 px-1 sm:px-12">
          <ImpactCreated />
        </div>
        {/* <Testimonial /> */}
        {/* <HowItsWork /> */}


        <div className="flex flex-col gap-20 py-24 bg-[#F5F5F5] xl:px-32 sm:px-16 px-0">
          <div className="text-[32px] font-medium text-center">
          Group Exposure
          </div>
          <div className="sm:flex sm:justify-center sm:flex-wrap sm:gap-20 grid grid-cols-2 gap-12">
            {clients.map((client) => (
              <div key={client.id} className="flex  min-w-[200px] justify-center">
                <img
                  src={client.logo}
                  alt={`Client ${client.id}`}
                  className="w-24  h-20 sm:w-40 sm:h-28 object-contain"
                />
              </div>
            ))}
          </div>
          <p className="text-[9px] text-center">Note: Logos given above are owned by their respective owners.</p>
        </div>

        <WhyChooseUs />
        <Blogs />
        <FAQs />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
