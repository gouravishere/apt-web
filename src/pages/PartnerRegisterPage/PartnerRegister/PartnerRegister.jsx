import { useState, useEffect } from "react";
import InputField from "../../../components/InputField/InputField";
import img from "../../../assets/icons/registerImage.svg";
import Heading from "../../../components/Heading/Heading";
import Subtitle from "../../../components/Subtitle/Subtitle";
import Steps from "../Steps/Steps";
import InputPhone from "../../../components/PhoneInput/PhoneInput";
import axiosInstance from "../../../utils/axiosInstance";
import Footer from "../../../components/Footer/Footer";
import Navbar from "../../../components/Navbar/Navbar";
import { useLocation } from "react-router-dom";

const PartnerRegister = () => {
  const [formData, setFormData] = useState({
    confirmPassword: "",
    password: "",
    selectedCountries: "",
    selectedServices: [],
    name: "",
    businessName: "",
    phoneNumber: "",
    emailId: "",
    pincode: "",
    state: "",
    address: "",
    clientPortfolio: "",
    portfolioFile: null,
    experiences: {},
    bankName: "",
    accountNameHolder: "",
    accountNumber: "",
    ifscCode: "",
    accountType: "",
    upiId: "",
  });

  const [error, setError] = useState("");
  const [visibleRegister, setVisibleRegister] = useState(false);
  const [countries, setCountries] = useState([]);
  const [services, setServices] = useState([]);
  const [previousSelectedServices, setPreviousSelectedServices] = useState([]);
  const [previousSelectedCountries, setPreviousSelectedCountries] =
    useState("");
  const [serviceRequirementData, setServiceRequirementData] = useState({});
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  },[location])

  const getServicesData = async () => {
    if (formData?.selectedCountries) {
      try {
        const response = await axiosInstance.get(
          `services/by-country?countryIdentifiers=${formData?.selectedCountries}`
        );
        if (response.data?.success) {
          setServices(response?.data?.data);
        }
      } catch (error) {
        console.error(
          error?.response?.data?.message || "Something went wrong!"
        );
      }
    }
  };

  const getCoutries = async () => {
    try {
      const response = await axiosInstance.get("/services/countries");
      if (response?.data?.success) {
        setCountries(response?.data?.data);
      }
    } catch (err) {
      console.error(err.response?.data?.message || "Something went wrong!");
    } finally {
    }
  };

  useEffect(() => {
    getServicesData();
  }, [formData?.selectedCountries]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.emailId) {
      setError("All fields are required.");
      return;
    }

    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        formData?.emailId
      )
    ) {
      setError("Invalid email address.");
      return;
    }

    setError("");
    setVisibleRegister(true);
    if (countries.length === 0) getCoutries();
  };

  if (visibleRegister) {
    return (
      <Steps
        formData={formData}
        setFormData={setFormData}
        setVisibleRegister={setVisibleRegister}
        countries={countries}
        services={services}
        previousSelectedServices={previousSelectedServices}
        setPreviousSelectedServices={setPreviousSelectedServices}
        previousSelectedCountries={previousSelectedCountries}
        setPreviousSelectedCountries={setPreviousSelectedCountries}
        serviceRequirementData={serviceRequirementData}
        setServiceRequirementData={setServiceRequirementData}
      />
    );
  }

  return (
    <>
      <Navbar />
      <div className="md:grid flex flex-col-reverse grid-cols-1 md:grid-cols-2 ">
        <div className="w-full flex flex-col justify-center xl:p-32 lg:p-24 md:p-12 sm:p-12 p-4 pt-8">
          <div className=" mb-14 flex flex-col w-full justify-center items-center">
            <Heading variant="xxl" weight="semibold">
              Register
            </Heading>
            <Subtitle variant="sm">
              Select the Service You Wish to Partner In
            </Subtitle>
          </div>
          <div className="">
            {/* Register Form */}
            <form onSubmit={handleSubmit}>
              {/* Full Name Input */}
              <InputField
                label="Full Name"
                type="text"
                name="name"
                placeholder="Enter your Full Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />

              {/* phone number Input */}
              <div className="mb-4">
                <InputPhone
                  label={"Phone Number"}
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phoneNumber: `+${e.countryCode}${e.phoneNumber}`,
                    })
                  }
                  required={true}
                />
              </div>

              {/* Email Input */}
              <InputField
                label="Email Address"
                type="email"
                name="emailId"
                placeholder="Enter your email address"
                value={formData.emailId}
                onChange={handleInputChange}
                required
              />
              {error && (
                <span className="text-sm mb-5 text-red-400">{error}</span>
              )}


                {/* <div>
                  <div className="w-full justify-center mt-8 mb-3 flex gap-2 items-center">
                    <input
                      type="checkbox"
                      id="terms"
                      name="terms"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="terms">
                      <Subtitle>I Agree with our terms and conditions</Subtitle>
                    </label>
                  </div>
                  {confirmTOCheckbox && (
                    <div className="text-sm text-red-400 text-left lg:text-center mb-2">
                      Please accept terms and conditions!
                    </div>
                  )}
                </div> */}

              <button
                className="px-4 py-2 text-base bg-primary-500 text-black rounded-lg w-full"
                type="submit"
              >
                Register
              </button>
            </form>

            {/* Login as Partner Link */}
            <p className="mt-6 text-center text-sm">
              Are you our partner?{" "}
              <a
                href={`${process.env.REACT_APP_ADMIN_URL}/login`}
                className="font-medium hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Login
              </a>
            </p>
          </div>
        </div>
        <div className="w-full flex md:h-screen justify-center items-center flex-col bg-[#FCDE58]">
          <img src={img} alt="" />
        </div>
      </div>
      <Footer />
    </>
  );
};
export default PartnerRegister;
// For uploaded portfolio file
