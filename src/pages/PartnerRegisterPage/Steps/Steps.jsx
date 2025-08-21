import React, { Fragment, useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";
import Heading from "../../../components/Heading/Heading";
import Subtitle from "../../../components/Subtitle/Subtitle";
import Seprator from "../../../components/Seprator/Seprator";
import check from "../../../assets/icons/white-check.svg";
import logo from "../../../assets/images/EZYFILING A.jpg";
import axiosInstance from "../../../utils/axiosInstance";
import Snackbar from "../../../components/Snackbar/Snackbar";

const serviceName = [
  "Service",
  "General Details",
  "Experience",
  "Certifications",
  "Legal Documents",
  "Payment Info",
];
const Steps = ({
  setVisibleRegister,
  formData,
  setFormData,
  countries,
  services,
  serviceRequirementData,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const resetFormData = () => {
    setFormData({
      // Step 1
      selectedCountries: "",
      selectedServices: [],

      // Step 2 - Personal/Business Details
      name: "",
      businessName: "",
      emailId: "",
      phoneNumber: "",
      city: "",
      state: "",
      address: "",
      gstNumber: "",
      gstDocument: null,
      panCard: null,
      aadharCard: null,

      // Step 3 - Experience and Expertise
      qualification: "",
      yearsOfExperience: "",
      previousProjects: "",

      // Step 4 - Certifications & Registrations
      icaiNumber: "", // for CA
      icsiNumber: "", // for CS
      legalCertNumber: "", // for Lawyer

      // Step 5 - Legal Documents

      underTakingserviceTerm: false,
      profile: null,

      // Step 6 - Payment Information
      accountNameHolder: "",
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      cancelledCheque: null,
      accountType: "",
    });
  };

  const handleFormData = (field, value) => {
    // If it's not certificates, just update the direct field
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const nextStep = () => {
    if (validateStep()) {
      window.scrollTo(0, 0);
      if (currentStep === 1) {
        setCurrentStep((prev) => Math.min(prev + 1, 7));
      } else if (currentStep === 6) {
        handleSubmit();
      } else {
        setCurrentStep((prev) => Math.min(prev + 1, 7));
      }
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const validateStep = (stepNumber) => {
    const newErrors = {};

    switch (stepNumber) {
      case 1:
        if (!formData.selectedCountries) {
          newErrors.selectedCountries = "Please select one country.";
        }
        if (!formData.selectedServices.length) {
          newErrors.selectedServices = "Please select at least one service.";
        }
        break;

      case 2:
        if (!formData.name) {
          newErrors.name = "Full name is required.";
        }
        if (!formData.emailId || !/\S+@\S+\.\S+/.test(formData.emailId)) {
          newErrors.emailId = "A valid email is required.";
        }
        if (!formData.phoneNumber) {
          newErrors.phoneNumber = "Phone number is required.";
        }
        if (!formData.address) {
          newErrors.address = "Address is required.";
        }

        if (!formData.aadharCard) {
          newErrors.city = "Aadhar card is required.";
        }

        if (!formData.panCard) {
          newErrors.address = "PAN card is required.";
        }

        break;

      case 3:
        if (!formData.qualification) {
          newErrors.qualification = "Qualification is required.";
        } else {
          // Validate if the qualification is one of the accepted values
          const validQualifications = [
            "CA",
            "CS",
            "ICWA",
            "LAWYER",
            "TAX CONSULTANT",
          ];
          if (
            !validQualifications.includes(
              formData.qualification.toUpperCase()
            ) &&
            formData.qualification.length < 3
          ) {
            newErrors.qualification =
              "Please enter a valid qualification (minimum 3 characters).";
          }
        }
        if (!formData.yearsOfExperience) {
          newErrors.yearsOfExperience = "Years of experience is required.";
        } else if (formData.yearsOfExperience < 0) {
          newErrors.yearsOfExperience =
            "Years of experience cannot be negative.";
        }
        break;

      case 4:
        if (formData?.qualificationType?.toLowerCase() === "other") {
          break;
        } else {
          if (
            !formData?.icaiNumber &&
            !formData?.icsiNumber &&
            !formData?.legalCertNumber
          ) {
            newErrors.icaiNumber = "ICAI number is required.";
            newErrors.icsiNumber = "ICSI number is required.";
            newErrors.legalCertNumber = "Legal Cert number is required.";
          }
        }
        break;

      case 5:
        if (!formData.underTakingserviceTerm) {
          newErrors.undertaking = "Please accept the terms and conditions.";
        }
        if (!formData.profile) {
          newErrors.profile = "Company/Personal Profile is required.";
        }
        break;

      case 6:
        if (!formData.accountNameHolder) {
          newErrors.accountNameHolder = "Account holder name is required.";
        }
        if (!formData.bankName) {
          newErrors.bankName = "Bank name is required.";
        }
        if (!formData.accountNumber) {
          newErrors.accountNumber = "Account number is required.";
        }
        if (!formData.ifscCode) {
          newErrors.ifscCode = "IFSC code is required.";
        }
        if (!formData.cancelChequeAttachmentId) {
          newErrors.cancelChequeAttachmentId =
            "Cancelled cheque copy is required.";
        }
        break;

      default:
        break;
    }

    if (Object.keys(newErrors).length) {
      return { errors: newErrors, isValid: false };
    } else {
      return { errors: newErrors, isValid: true };
    }
  };

  const { isValid, errors } = validateStep(currentStep);

  const getCountryIds = () => {
    const contryId = countries
      .filter(
        (countryItem) => countryItem?.identifier === formData?.selectedCountries
      )
      .map((item) => item?._id);
    return contryId;
  };

  const getServiceIds = () => {
    const filteredServiceIds = services
      .filter((serviceItem) =>
        formData?.selectedServices.includes(serviceItem?.name)
      )
      .map((item) => item?.id);
    return filteredServiceIds;
  };

  const handleSubmit = async () => {
    setLoading(true);

    const countryId = getCountryIds();
    const serviceIds = getServiceIds();

    const data = {
      password: formData?.password,
      fullName: formData?.name,
      businessName: formData?.businessName,
      address: formData?.address,
      email: formData?.emailId,
      phoneNumber: formData?.phoneNumber,
      services: formData?.selectedServices,
      country: formData?.selectedCountries,
      pincode: String(formData.pincode) + "" ||  "", 
      state: formData?.state || "",
      countryIds: countryId || [],
      serviceIds: serviceIds || [],
      hourlyRate: formData?.hourlyRate || 0,
      percentageShare: formData?.percentageShare || 0,

      qualificationDetails: {
        qualification: formData?.qualification || "",
      },

      gstDetails: {
        gstNo: formData?.gstNumber || "",
        gstAttachmentId: formData?.gstNoFile?.id || null,
      },

      aadharCardAttachmentId: formData?.aadharCard?.id || "",
      panCardAttachmentId: formData?.panCard?.id || "",

      experience: {
        yearOfExperience: formData?.yearsOfExperience+"" || "0",
        previousProjectsOrClients: formData?.previousProjects || "",
        qualification: formData?.qualification || "",
      },

      certificate: {
        ICAIMembershipNumber: formData?.icaiNumber || "", // For CA
        ICSIMembershipNumber: formData?.icsiNumber || "", // For CS
        legalPracticeCertificationNumber: formData?.legalCertNumber || "", // For Lawyer
      },

      legal: {
        undertakingAttachmentId: formData?.underTakingserviceTerm || "",
        companyOrPersonalProfileAttachmentId: formData?.profile?.id || "",
      },

      paymentDetails: {
        accountNumber: formData?.accountNumber || "",
        bankName: formData?.bankName || "",
        ifscCode: formData?.ifscCode || "",
        accountHolderName: formData?.accountNameHolder || "",
        accountType: formData?.accountType || "",
        upiId: formData?.upiId || "",
        cancelChequeAttachmentId: formData?.cancelChequeAttachmentId?.id || "",
      },
    };


    try {
      setSuccessMessage("Submitting...");
      const response = await axiosInstance.post("/partner-onboarding", data);
      if (response?.data?.success) {
        setCurrentStep((prev) => Math.min(prev + 1, 7));
      }
    } catch (err) {
      console.log(error);
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setSuccessMessage("");
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            formData={formData}
            handleFormData={handleFormData}
            errors={errors}
            countries={countries}
            services={services}
          />
        );
      case 2:
        return (
          <Step2
            formData={formData}
            handleFormData={handleFormData}
            errors={errors}
          />
        );
      case 3:
        return (
          <Step3
            formData={formData}
            handleFormData={handleFormData}
            errors={errors}
          />
        );
      case 4:
        return (
          <Step4
            formData={formData}
            handleFormData={handleFormData}
            errors={errors}
          />
        );
      case 5:
        return (
          <Step5
            formData={formData}
            handleFormData={handleFormData}
            errors={errors}
            documentData={serviceRequirementData?.legal}
          />
        );
      case 6:
        return (
          <Step6
            formData={formData}
            handleFormData={handleFormData}
            errors={errors}
          />
        );
      case 7:
        return (
          <Step7
            setVisibleRegister={setVisibleRegister}
            resetActionForm={resetFormData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen w-full bg-white">
      <div className="w-full h-[100px] flex items-center gap-3 px-10 py-10">
        <img
          src={logo}
          className="h-[80px] cursor-pointer"
          alt=""
          onClick={() => {
            setVisibleRegister(false);
          }}
        />
      </div>
      {currentStep !== 7 && (
        <>
          <div className="w-full flex flex-col gap-10 items-center justify-between mt-10 mb-20">
            <div className="flex justify-center items-center flex-col">
              <Heading variant="xxl" weight="semibold">
                Complete Registration
              </Heading>
              <Subtitle variant="sm">
                Almost There! Complete These Steps to Get Started
              </Subtitle>
            </div>
            <div className="flex items-center px-4 sm:px-0 overflow-x-auto lg:overflow-x-visible md:min-w-[672px] max-w-[672px] justify-between w-full">
              {[1, 2, 3, 4, 5, 6].map((step) => (
                <Fragment key={step}>
                  <div className="flex flex-col items-start">
                    <div className="flex items-center">
                      <div
                        className={`${
                          step === currentStep
                            ? "border border-primary-500 text-black"
                            : "bg-primary-500 text-black"
                        } ${step !== 1 && "ml-2"} ${
                          step !== 6 && "mr-2"
                        } rounded-full step min-w-10 h-10 items-center justify-center flex gap-4 ${
                          currentStep >= step ? "active" : ""
                        }`}
                      >
                        {step < currentStep && (
                          <img src={check} alt="checked" />
                        )}
                        {step >= currentStep && step}
                      </div>

                      <Seprator
                        variant={
                          step > currentStep - 1
                            ? ""
                            : step === currentStep - 1
                            ? "yellow-dotted"
                            : "yellow"
                        }
                        className={`ml-2 min-w-20 ${
                          step === 6 ? "invisible" : ""
                        }`}
                      />
                    </div>
                    <div className="text-center text-[12px] text-black  mt-2">
                      {serviceName[step - 1]}
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </>
      )}

      {renderStep()}

      <div className="mt-14">
        <Seprator />
      </div>
      <div className="w-full flex justify-center px-4 sm:px-0 sm:justify-end self-end gap-4 sm:pr-6 pb-6">
        {currentStep > 1 && currentStep < 7 && (
          <button
            className="px-4 py-3 w-full max-w-[200px] rounded-lg border border-primary-500 text-primary-500"
            onClick={prevStep}
          >
            Previous
          </button>
        )}
        {currentStep === 1 && (
          <button
            className="px-4 py-3 w-full max-w-[200px] rounded-lg border border-primary-500 text-primary-500"
            onClick={() => {
              setVisibleRegister(false);
            }}
          >
            Previous
          </button>
        )}
        {isValid ? (
          <>
            {currentStep < 7 && (
              <button
                className="bg-primary-500 px-4 py-3 w-full max-w-[200px] rounded-lg text-black"
                onClick={nextStep}
              >
                Next
              </button>
            )}
          </>
        ) : (
          <>
            {currentStep < 7 && (
              <button className="bg-gray-500 text-white px-4 py-3 w-full max-w-[200px] rounded-lg">
                Next
              </button>
            )}
          </>
        )}
      </div>
      {error && (
        <Snackbar message={error} type="error" onClose={() => setError("")} />
      )}
      {successMessage && (
        <Snackbar
          message={successMessage}
          type="success"
          onClose={() => setSuccessMessage("")}
        />
      )}
    </div>
  );
};

export default Steps;
