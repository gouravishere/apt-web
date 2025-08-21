import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const UrlList = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  // List of all URLs (static and dynamic)
  const urlMapping = {
    "/dashboard": "Dashboard",
    "/dashboard/services": "Services",
    "/dashboard/documents": "Documents",
    "/dashboard/payments": "Payments",
    "/dashboard/user-support": "User Support",
    "/dashboard/settings": "Settings",
    "/calculators": "Calculators",
    "/calculators/hra": "HRA Calculator",
    "/calculators/nsc": "NSC Calculator",
    "/calculators/nps": "NPS Calculator",
    "/calculators/sip": "SIP Calculator",
    "/calculators/old-and-new-tax-regime": "Old & New Tax Regime",
    "/calculators/home-loan-emi": "Home Loan EMI Calculator",
    "/calculators/home-rent-receipt": "Home Rent Receipt",
    "/calculators/gratuity": "Gratuity Calculator",
    "/calculators/Income-tax": "Income Tax Calculator",
    "/pricing": "Pricing",
    "/supportandpricing/pricing": "Support & Pricing",
    "/service/india/tax-filing": "India - Tax Filing",
    "/service/india/gst-services": "India - GST Services",
    "/service/india/fema-compliance": "India - FEMA Compliance",
    "/service/india/roc-services": "India - ROC Filing Services",
    "/service/india/business-consultancy": "India - Business Consultancy",
    "/service/india/business-setup": "India - Business Setup",
    "/service/uae/company-setup": "UAE - Company Setup",
    "/service/uae/tax-filing": "UAE - Tax Filing",
    "/service/uae/accounting-management": "UAE - Accounting Management",
    "/service/saudi/company-setup": "Saudi Arabia - Company Setup",
    "/service/saudi/tax-filing": "Saudi Arabia - Tax Filing",
    "/service/saudi/accounting-management": "Saudi Arabia - Accounting Management",
    "/service/oman/company-setup": "Oman - Company Setup",
    "/service/oman/tax-filing": "Oman - Tax Filing",
    "/service/oman/accounting-management": "Oman - Accounting Management",
    "/service/qatar/company-setup": "Qatar - Company Setup",
    "/service/qatar/tax-filing": "Qatar - Tax Filing",
    "/service/qatar/accounting-management": "Qatar - Accounting Management",
    "/service/kuwait/company-setup": "Kuwait - Company Setup",
    "/service/kuwait/tax-filing": "Kuwait - Tax Filing",
    "/service/kuwait/accounting-management": "Kuwait - Accounting Management",
    "/service/singapore/company-setup": "Singapore - Company Setup",
    "/service/singapore/tax-filing": "Singapore - Tax Filing",
    "/service/singapore/accounting-management":
      "Singapore - Accounting Management",
    "/guide": "Guides",
    "/partner": "Partner",
    "/blog": "Blog",
    "/partnerpage": "Partner Page",
    "/": "Home",
    "/login": "Login",
    "/register": "Register",
    "/forgot-password": "Forgot Password",
    "/otp-verification": "OTP Verification",
    "/unauthorized": "Unauthorized",
    "/FAQs": "FAQs",
    "/contact-us": "Contact Us",
    "/404": "404 - Not Found",
    "/error": "Error",
  };

  // Convert the mapping into an array of { url, name } objects
  const allUrls = Object.entries(urlMapping).map(([url, name]) => ({
    url,
    name,
  }));

  // Handle navigation to a specific URL
  const handleNavigate = (url) => {
    navigate(url);
  };

  // Handle going back to the last page
  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="p-4 flex flex-col gap-6">
      {/* Back Button */}
      <div className="flex flex-col">
        <button
          onClick={handleGoBack}
          className="w-fit px-4 py-2 bg-primary-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 transition-all duration-200"
        >
          Back
        </button>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Site Map
        </h1>
      </div>

      {/* URL List */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {allUrls.map(({ url, name }, index) => (
          <li key={index}>
            <button
              onClick={() => handleNavigate(url)}
              className="w-full px-6 py-3 bg-white text-gray-800 font-semibold shadow-md hover:bg-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:ring-offset-2 transition-all duration-200 rounded-b-lg"
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UrlList;
