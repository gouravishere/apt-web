import React, { useState, useEffect } from "react";
// import SearchIcon from "../../assets/icons/search-normal.svg";
import ArrowDownIcon from "../../assets/icons/arrow-down.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "../Button/Button";
import CardContainer from "../../pages/Dashboard/DashboardComponents/CardContainer/CardContainer";
import TabsVertical from "../TabsVertical/TabsVertical";
import ResourceDropdownBlogs from "../../assets/icons/resourceDropdownBlogs.svg";
import ResourceDropdownCalculators from "../../assets/icons/resourceDropdownCal.svg";
import ResourceDropdownGuides from "../../assets/icons/resourceDropdownGuides.svg";
import Ylogo from "../../assets/images/EZYFILING A.jpg";
import MenuIcon from "../../assets/icons/menu.svg";
import CloseIcon from "../../assets/icons/close-circle.svg";
import ReactGA from "react-ga4";
import Heading from "../Heading/Heading";
import { CountryServices } from "../../ServiceData";
import { logout } from "../../redux/authSlice/authSlice";
import NotificationModal from "../Notification/Notification";
import { fetchUnseenNotifications } from "../../redux/NotificationSlice/NotificationSlice";

const tabVerticalLabel = Object.entries(CountryServices).map(
  ([country, data]) => {
    const label =
      country === "uae"
        ? "UAE"
        : country === "saudi"
        ? "Saudi Arabia"
        : country.charAt(0).toUpperCase() + country.slice(1);

    return {
      label,
      icon: data.countryIcon,
    };
  }
);

const resourcesData = [
  { heading: "Blog", icon: ResourceDropdownBlogs, path: "/blog" },
  {
    heading: "Calculators",
    icon: ResourceDropdownCalculators,
    path: "/calculators",
  },
  { heading: "Guide", icon: ResourceDropdownGuides, path: "/guide" },
];

const supportData = [
  { heading: "Contact Us", icon: ResourceDropdownBlogs, path: "/contact-us" },
  {
    heading: "FAQs",
    icon: ResourceDropdownCalculators,
    path: "/FAQs",
  },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(true);
  const [isServices, setIsServices] = useState(false);
  const [isResource, setIsResource] = useState(false);
  const [isSupport, setIsSupport] = useState(false);
  const [country, setCountry] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { accessToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileServices, setIsMobileServices] = useState(false);
  const [isMobileResource, setIsMobileResource] = useState(false);
  const [isMobileSupport, setIsMobileSupport] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const userName = useSelector(
    (state) => state.auth?.userDetails?.user?.fullName
  );
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  const LogoWithLetter = ({ name }) => {
    return (
      <div className="border border-black h-12 w-12 md:mt-0  bg-primary-500 rounded-full justify-center items-center flex">
        <div className="text-center text-[20px] font-semibold leading-[44.80px] tracking-[2.56px]">
          {name
            ? name?.split(" ").length > 1
              ? name
                  ?.split(" ")
                  ?.map((word) => word[0])
                  ?.join("")
                  ?.toUpperCase()
                  ?.slice(0, 2)
              : name?.slice(0, 2)?.toUpperCase()
            : "N/A"}
        </div>
      </div>
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleResourceNavigation = (path) => {
    if (path) {
      // Extract country and service dynamically from the path
      const pathSegments = path.split("/"); // ["service", "oman", "accounting-management"]

      const country = pathSegments[1] || "unknown";
      const service = pathSegments[2] || "unknown";

      // Send event to GA4
      ReactGA.event({
        category: "service_tab",
        action: "Navigated to Service",
        label: `${country} - ${service}`, // Example: "oman - accounting-management"
      });
      navigate("/" + path);
    }
  };

  const getCountryServices = (country) => {
    ReactGA.event({
      category: "Country Navigation",
      action: "Selected a Country",
      label: country,
    });
    switch (country) {
      case "india":
        return CountryServices.india;
      case "uae":
        return CountryServices.uae;
      case "saudi arabia":
        return CountryServices.saudi;
      case "oman":
        return CountryServices.oman;
      case "qatar":
        return CountryServices.qatar;
      case "kuwait":
        return CountryServices.kuwait;
      case "singapore":
        return CountryServices.singapore;
      default:
        return CountryServices.india;
    }
  };

  const ServiceCard = ({ heading, img, onClick }) => {
    return (
      <div
        onClick={onClick}
        className="hover:bg-gray-100 flex items-center p-6 gap-5 border rounded-2xl"
      >
        <img src={img} alt="" />
        <Heading variant="sm">{heading}</Heading>
      </div>
    );
  };

  const closeAllMobileMenus = () => {
    setIsMobileServices(false);
    setIsMobileResource(false);
    setIsMobileSupport(false);
  };

  
  return (
    <nav
      className={`sticky top-0 z-50 ${
        scrolled ? "bg-gray-100 shadow-lg" : "bg-white"
      } transition duration-300`}
    >
      {isServices && (
        <div
          onClick={() => {
            setIsServices(false);
            setCountry("india");
          }}
          className="fixed inset-0 z-50"
        ></div>
      )}
      {isResource && (
        <div
          onClick={() => setIsResource(false)}
          className="fixed inset-0 z-50"
        ></div>
      )}
      {isSupport && (
        <div
          onClick={() => setIsSupport(false)}
          className="fixed inset-0 z-50"
        ></div>
      )}
      {showModal && (
        <div
          onClick={() => {
            toggleModal();
            dispatch(fetchUnseenNotifications());
          }}
          className="fixed inset-0 z-50"
        ></div>
      )}

      {/* Mobile Menu Button */}

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          <div
            onClick={() => setIsMenuOpen(false)}
            className="fixed top-0 inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          ></div>
          <div className="absolute z-[99999] right-0 h-[100vh] pt-16 w-80 bg-white shadow-lg p-4 overflow-y-auto">
            <img
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-2 mb-4"
              src={CloseIcon}
              alt=""
            />
            <div className="flex flex-col space-y-4">
              {/* Mobile Services Dropdown */}
              <div>
                <button
                  onClick={() => setIsMobileServices(!isMobileServices)}
                  className="flex items-center justify-between w-full"
                >
                  Services
                  <img
                    src={ArrowDownIcon}
                    className={`transform ${
                      isMobileServices ? "rotate-180" : ""
                    }`}
                    alt="arrow"
                  />
                </button>
                {isMobileServices && (
                  <div className="pl-4 mt-2 space-y-2">
                    {tabVerticalLabel.map((tab) => (
                      <div key={tab.label}>
                        <div
                          onClick={() =>
                            setSelectedCountry(
                              selectedCountry === tab.label ? null : tab.label
                            )
                          }
                          className="flex items-center justify-between gap-2 p-2 border rounded-md cursor-pointer hover:bg-gray-100"
                        >
                          <div className="flex items-center gap-2">
                            <img src={tab.icon} alt="" className="w-4 h-4" />
                            <span>{tab.label}</span>
                          </div>
                          <img
                            src={ArrowDownIcon}
                            className={`w-4 h-4 transform ${
                              selectedCountry === tab.label ? "rotate-180" : ""
                            }`}
                            alt="arrow"
                          />
                        </div>

                        {selectedCountry === tab.label && (
                          <div className="ml-4 mt-2 space-y-2">
                            {getCountryServices(
                              tab.label.toLowerCase()
                            )?.services.map((service) => (
                              <div
                                key={service.serviceName}
                                onClick={() => {
                                  navigate(service.path);
                                  setIsMobileServices(false);
                                  setIsMenuOpen(false);
                                }}
                                className="flex items-center gap-2 p-2 pl-6 text-sm border rounded-md cursor-pointer hover:bg-gray-50"
                              >
                                <img
                                  src={service.icon}
                                  alt=""
                                  className="w-4 h-4"
                                />
                                <span>{service.serviceName}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Resources Dropdown */}
              <div>
                <button
                  onClick={() => setIsMobileResource(!isMobileResource)}
                  className="flex items-center justify-between w-full"
                >
                  Resources
                  <img
                    src={ArrowDownIcon}
                    className={`transform ${
                      isMobileResource ? "rotate-180" : ""
                    }`}
                    alt="arrow"
                  />
                </button>
                {isMobileResource && (
                  <div className="pl-4 mt-2 space-y-2">
                    {resourcesData.map((item) => (
                      <div
                        key={item.heading}
                        onClick={() => {
                          navigate(item.path);
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center gap-2 cursor-pointer p-2 border rounded-md"
                      >
                        <img src={item.icon} alt="" className="w-4 h-4" />
                        <span>{item.heading}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Support Dropdown */}
              <div>
                <button
                  onClick={() => setIsMobileSupport(!isMobileSupport)}
                  className="flex items-center justify-between w-full"
                >
                  Support
                  <img
                    src={ArrowDownIcon}
                    className={`transform ${
                      isMobileSupport ? "rotate-180" : ""
                    }`}
                    alt="arrow"
                  />
                </button>
                {isMobileSupport && (
                  <div className="pl-4 mt-2 space-y-2">
                    {supportData.map((item) => (
                      <div
                        key={item.heading}
                        onClick={() => {
                          navigate(item.path);
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center gap-2 cursor-pointer p-2 border rounded-md"
                      >
                        <img src={item.icon} alt="" className="w-4 h-4" />
                        <span>{item.heading}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Other Links */}
              <Link
                to="/pricing"
                onClick={() => setIsMenuOpen(false)}
                className="block"
              >
                Pricing
              </Link>
              <Link
                to="/partnerpage"
                onClick={() => setIsMenuOpen(false)}
                className="block"
              >
                Partner
              </Link>
            </div>
          </div>
        </>
      )}

      <div className="bg-[#fedc60] shadow-lg">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 h-full relative">
            <img
              onClick={() => navigate("/")}
              className="h-full cursor-pointer"
              src={Ylogo}
              alt=""
            />
          </div>

          {/* Links */}
          <div className="hidden justify-center lg:flex space-x-8">
            {/* Services Dropdown */}
            <div>
              <span
                onClick={() => {
                  setIsServices(true);
                  setCountry("india");
                }}
                className="text-gray-800  flex items-center gap-1 font-medium transition duration-300 cursor-pointer"
              >
                Services
                <img src={ArrowDownIcon} alt="dropdown-arrow" />
              </span>

              {/* Custom Services Dropdown */}
              {isServices && (
                <CardContainer className="fixed top-16 z-50 flex gap-6 max-w-[500px] max-h-[400px] lg:max-w-[800px] left-[50%] translate-x-[-50%] shadow-xl">
                  <div className="min-w-[180px] pr-5 max-h-full overflow-y-auto">
                    <TabsVertical
                      className={"max-h-16"}
                      onClick={(e) => setCountry(e.label.toLowerCase())}
                      tabs={tabVerticalLabel}
                    />
                  </div>
                  <div className="grid h-full overflow-y-auto lg:grid-cols-2 cursor-pointer gap-6 ">
                    {getCountryServices(country)?.services.map((data) => (
                      <ServiceCard
                        key={data.serviceName}
                        heading={data.serviceName}
                        img={data.icon}
                        onClick={() => {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                          handleResourceNavigation(data.path);
                          setIsServices(false);
                        }}
                      />
                    ))}
                  </div>
                </CardContainer>
              )}
            </div>

            {/* Resources Dropdown */}
            <div>
              <span
                onClick={() => setIsResource(true)}
                className="text-gray-800 hover:text-blue-600 flex items-center gap-1 font-medium transition duration-300 cursor-pointer"
              >
                Resources
                <img src={ArrowDownIcon} alt="dropdown-arrow" />
              </span>

              {/* Custom Resources Dropdown */}
              {isResource && (
                <CardContainer className="fixed top-16 z-50 flex gap-6 max-w-[548px] w-full left-[50%] translate-x-[-50%] shadow-xl">
                  <div className="grid lg:grid-cols-2 cursor-pointer gap-6  w-full">
                    {resourcesData?.map((data) => (
                      <ServiceCard
                        key={data.heading}
                        heading={data.heading}
                        img={data.icon}
                        onClick={() => {
                          ReactGA.event({
                            category: "User Interaction",
                            action: "Resource Click",
                            label: data.heading || "Unknown Resource",
                            value: data.path || "No Path",
                          });
                          navigate(data.path);
                          setIsResource(false);
                        }}
                      />
                    ))}
                  </div>
                </CardContainer>
              )}
            </div>

            <div>
              <span
                onClick={() => setIsSupport(true)}
                className="text-gray-800 hover:text-blue-600 flex items-center gap-1 font-medium transition duration-300 cursor-pointer"
              >
                Support
                <img src={ArrowDownIcon} alt="dropdown-arrow" />
              </span>

              {/* Custom Resources Dropdown */}
              {isSupport && (
                <CardContainer className="fixed top-16 z-50 flex gap-6 max-w-[548px] w-full left-[50%] translate-x-[-50%] shadow-xl">
                  <div className="grid lg:grid-cols-2 cursor-pointer gap-6  w-full">
                    {supportData?.map((data) => (
                      <ServiceCard
                        key={data.heading}
                        heading={data.heading}
                        // img={data.icon}
                        onClick={() => {
                          ReactGA.event({
                            category: "User Interaction",
                            action: "Resource Click",
                            label: data.heading || "Unknown Resource",
                            value: data.path || "No Path",
                          });
                          navigate(data.path);
                          setIsSupport(false);
                        }}
                      />
                    ))}
                  </div>
                </CardContainer>
              )}
            </div>
            <Link
              to="/pricing"
              className="text-gray-800 hover:text-blue-600 font-medium transition duration-300"
            >
              Pricing
            </Link>
            <Link
              to="/partnerpage"
              className="text-gray-800 hover:text-blue-600 font-medium transition duration-300"
            >
              Partner with Us
            </Link>
          </div>

          {/* Actions */}
          <div className="flex justify-end items-center space-x-4">
            {accessToken ? (
              <div className="flex justify-between items-center ">
                <div className="relative">
                  {/* Profile section */}

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setMenuOpen(!menuOpen)}
                      className="flex items-center space-x-2 focus:outline-none"
                    >
                      <LogoWithLetter name={userName} />
                    </button>
                  </div>

                  <NotificationModal
                    isOpen={showModal}
                    onClose={() => {
                      dispatch(fetchUnseenNotifications());
                      setShowModal(false);
                    }}
                  />

                  {/* Dropdown menu */}
                  {menuOpen && (
                    <>
                      <div
                        onClick={() => setMenuOpen(false)}
                        className="fixed inset-0 z-20"
                      ></div>
                      <div className="absolute z-50 right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg">
                        <ul className="py-2">
                          <li>
                            <button
                              onClick={() => {
                                navigate("/dashboard");
                                setMenuOpen(false);
                              }}
                              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                              Dashboard
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                navigate("/dashboard/settings");
                                setMenuOpen(false);
                                setIsMenuOpen(false);
                              }}
                              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                              User Profile
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                dispatch(logout());
                                setMenuOpen(false);
                                setIsMenuOpen(false);
                              }}
                              className="block w-full text-left px-4 py-2 text-red-500  hover:bg-gray-100"
                            >
                              Logout
                            </button>
                          </li>
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={() => {
                  navigate("/login");
                  setIsMenuOpen(false);
                }}
                className="text-gray-800  text-sm font-medium hover:text-blue-600 transition duration-300"
              >
                Login
              </Button>
            )}
            <button
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                closeAllMobileMenus();
              }}
              className="lg:hidden p-2 "
            >
              <img
                src={isMenuOpen ? CloseIcon : MenuIcon}
                alt="menu"
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
