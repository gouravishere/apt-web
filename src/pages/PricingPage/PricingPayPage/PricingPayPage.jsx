import React, { useEffect, useState } from "react";
import HeadingBreadCrumb from "../../../components/HeadingBreadCrumb/HeadingBreadCrumb";
import CardContainer from "../../Dashboard/DashboardComponents/CardContainer/CardContainer";
import Heading from "../../../components/Heading/Heading";
import Seprator from "../../../components/Seprator/Seprator";
import Steper from "../../../components/Steper/Steper";
import greentick from "../../../assets/icons/green-tick-circle.svg";
import circleQuater from "../../../assets/icons/yellowQuaterCircle.svg";
import Subtitle from "../../../components/Subtitle/Subtitle";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { emptyPlans } from "../../../redux/priceSlice/priceSlice";
import { CONSTANTS } from "../PricingConstant";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import axiosInstance from "../../../utils/axiosInstance";
import { clearCoupon } from "../../../redux/CouponSlice/CouponSlice";
import { toast, ToastContainer } from "react-toastify";
import QAModal from "./QaModal";
import Modal from "../../../components/Modal/Modal";
import Input from "../../../components/Input/Input";
import { formatIndianCurrencyZero } from "../../../utils";
import DropDown from "../../../components/DropDown/DropDown";
import axios from "axios";
import TextArea from "../../../components/TextArea/TextArea";
import SmallLoading from "../../../components/LoadingSpinner/SmallLoading";
import { getUserDetails } from "../../../redux/authSlice/authSlice";

const fetchPaymentDetails = async (data, setLoading) => {
  setLoading(true);
  try {
    const response = await axiosInstance.post("/leads/price-breakdown", {
      planId: data.planId,
      couponCode: data.couponCode,
      questionAnswers: data.questions,
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

const stepsData = [
  {
    label: "Consultant Assigned",
    img: greentick, // Replace with the actual image URL
    children: (
      <Subtitle variant="sm">
        Your dedicated consultant will be assigned to handle your request.
      </Subtitle>
    ),
  },
  {
    label: "Document Verification",
    img: greentick, // Replace with the actual image URL
    children: (
      <Subtitle variant="sm">
        The consultant will verify the necessary documents and request
        additional details if required.
      </Subtitle>
    ),
  },
  {
    label: "Processing & Draft Preparation",
    img: greentick, // Replace with the actual image URL
    children: (
      <Subtitle variant="sm">
        Our experts will process your request and prepare the necessary
        drafts/documents.
      </Subtitle>
    ),
  },
  {
    label: "Confirmation & Review",
    img: greentick, // Replace with the actual image URL
    children: (
      <Subtitle variant="sm">
        You will receive a draft for review, and any required modifications will
        be implemented.
      </Subtitle>
    ),
  },
  {
    label: "Final Submission/Approval",
    img: greentick, // Replace with the actual image URL
    children: (
      <Subtitle variant="sm">
        Once reviewed and approved, the final submission or execution of the
        service will be completed.
      </Subtitle>
    ),
  },
  {
    label: "Completion & Delivery",
    img: greentick, // Replace with the actual image URL
    children: (
      <Subtitle variant="sm">
        Your requested service will be successfully completed, and necessary
        documents will be shared with you.
      </Subtitle>
    ),
  },
];

const PricingPayPage = ({ isFooter = true }) => {
  const [couponCode, setCouponCode] = useState("");
  const [showGSTModal, setShowGSTModal] = useState(false);
  const [gstFormData, setGstFormData] = useState({
    gstNumber: "",
    companyName: "",
    companyAddress: "",
  });
  const [errors, setErrors] = useState({
    gstNumber: "",
    companyName: "",
    companyAddress: "",
  });
  const [isGSTVerified, setIsGSTVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const location = useLocation();
  const data = location?.state?.pricingData;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isQuestions, setIsQuestions] = useState(false);
  const [questionAnswers, setQuestionAnswers] = useState([]);
  const [taxData, setTaxData] = useState({});
  const isauth = useSelector((state) => state.auth.isAuthenticated);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const userData = useSelector((state) => state.auth.userDetails);
  const [resetDropdown, setResetDropdown] = useState(false);
  const [addressFormData, setAddressFormData] = useState({
    country: "",
    state: "",
    address: "",
  });

  const [addressErrors, setAddressErrors] = useState({
    country: "",
    state: "",
    address: "",
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const handleAddressInputChange = (fieldName, value) => {
    if (fieldName === "country") {
      console.log("object");
    }

    setAddressFormData((prev) => ({
      ...prev,
      [fieldName]: value,
      ...(fieldName === "country" && { state: "" }), // Reset state if country changes
    }));

    // Clear error instantly when user types/selects
    setAddressErrors((prev) => ({
      ...prev,
      [fieldName]: "",
    }));
  };

  const validateAddressForm = () => {
    const newErrors = {};

    if (!addressFormData.country) {
      newErrors.country = "Country is required";
    }

    // State is only required if country === 'India'
    if (
      addressFormData.country?.toLowerCase() === "india" &&
      !addressFormData.state
    ) {
      newErrors.state = "State is required for India";
    }

    if (!addressFormData.address.trim()) {
      newErrors.address = "Address is required";
    }

    setAddressErrors(newErrors);

    return Object.keys(newErrors).length === 0; // valid if no errors
  };

  const handleAddressSubmit = async () => {
    if (validateAddressForm()) {
      await handleAddressSubmitApi();

      dispatch(emptyPlans());
      setShowAddressModal(false);
    }
  };

  const fetchTaxData = async () => {
    const res = await fetchPaymentDetails(
      {
        planId: data._id || data.id,
        questions: questionAnswers,
      },
      setLoading
    );

    setTaxData(res);
  };


  useEffect(() => {
    data?.priceType !== "NON_FIXED" && fetchTaxData();
  }, [questionAnswers, data]);

  useEffect(() => {
    if (!isauth) {
      navigate("/");
    }
  }, [isauth, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(emptyPlans());
  }, [dispatch]);

  useEffect(() => {
    if (data?.questions?.length > 0) {
      setIsQuestions(true);
    }
  }, [data]);

  useEffect(() => {
    const fetchStates = async () => {
      if (
        !addressFormData.country ||
        addressFormData?.country.toLowerCase() !== "india"
      )
        return; // Don't fetch states if no country is selected

      setLoading(true);

      try {
        // Fetch states for the selected country using Geonames 'childrenJSON' endpoint
        const res = await axios.post(
          "https://countriesnow.space/api/v0.1/countries/states",
          {
            country: addressFormData.country,
          }
        );

        const structuredData = res.data.data.states.map((data) => {
          return { name: data.name, label: data.name };
        });

        setStates(structuredData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching states:", error);
        setLoading(false);
      }
    };

    fetchStates();
  }, [addressFormData.country]);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://countriesnow.space/api/v0.1/countries"
        );
        const formattedCountries = response.data.data.map((countryObj) => ({
          name: countryObj.country,
          label: countryObj.country,
        }));
        setCountries(formattedCountries);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handlePayment = async () => {
    const razorpayKey = process.env.REACT_APP_RAZORPAY_KEY;

    let payload = {};

    if (gstFormData.gstNumber) {
      payload = {
        planId: data?._id || data?.id,
        couponCode: couponCode || "",
        questionAnswers: [...questionAnswers],
        taxDetails: {
          taxNumber: gstFormData.gstNumber,
          companyName: gstFormData.companyName,
          companyAddress: gstFormData.companyAddress,
        },
      };
    } else {
      payload = {
        planId: data?._id || data?.id,
        couponCode: couponCode || "",
        questionAnswers: [...questionAnswers],
      };
    }

    setIsLoading(true);
    const orderData = await axiosInstance.post("/leads", payload);

    if (!orderData?.data?.data?.orderId && orderData?.status === 201) {
      navigate("/dashboard?non-fix");
    }

    setIsLoading(false);

    // Razorpay options
    const options = {
      key: razorpayKey, // Your Razorpay API Key
      amount: orderData.data.data.amount, // Amount in paise
      currency: orderData.data.data.currency,
      name: "APT Global",
      description: "Test Transaction",
      order_id: orderData.data.data.orderId, // Order ID generated on the backend
      handler: async function (response) {
        setIsLoading(true);
        try {
          await axiosInstance.post("/payments/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          console.error(error);
        }

        if (orderData?.data) {
          navigate(`/dashboard?status=COMPLETED`);
        }
      },
      theme: {
        color: "#fedc60",
      },
      modal: {
        ondismiss: function () {
          navigate(`/dashboard?status=FAILED`);
        },
      },
    };

    // Initialize Razorpay
    const rzp = new window.Razorpay(options);
    if (orderData?.data?.data?.orderId) {
      rzp.open();

      rzp.on("payment.failed", async function (response) {
        try {
          await axiosInstance.post("/payments/failed", {
            razorpay_order_id: response.error.metadata.order_id,
          });
        } catch (error) {
          console.error(error);
        }
      });
    }
  };

  // Validation functions
  const validateGSTNumber = (value) => {
    const gstPattern =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    if (!value) return "GST number is required";
    if (!gstPattern.test(value)) return "Invalid GST number format";
    return "";
  };

  const validateCompanyName = (value) => {
    if (!value) return "Company name is required";
    if (value.length < 3) return "Company name must be at least 3 characters";
    return "";
  };

  const validateCompanyAddress = (value) => {
    if (!value) return "Company address is required";
    if (value.length < 10)
      return "Company address must be at least 10 characters";
    return "";
  };

  // Input change handler with validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGstFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate on change
    if (name === "gstNumber") {
      setErrors((prev) => ({
        ...prev,
        gstNumber: validateGSTNumber(value),
      }));
    } else if (name === "companyName") {
      setErrors((prev) => ({
        ...prev,
        companyName: validateCompanyName(value),
      }));
    } else if (name === "companyAddress") {
      setErrors((prev) => ({
        ...prev,
        companyAddress: validateCompanyAddress(value),
      }));
    }
  };

  // Form submission handler
  const handleGSTSubmit = () => {
    // Validate all fields
    const gstError = validateGSTNumber(gstFormData.gstNumber);
    const companyError = validateCompanyName(gstFormData.companyName);
    const addressError = validateCompanyAddress(gstFormData.companyAddress);

    setErrors({
      gstNumber: gstError,
      companyName: companyError,
      companyAddress: addressError,
    });

    // If no errors, proceed with submission
    if (!gstError && !companyError && !addressError) {
      setIsGSTVerified(true);
      setShowGSTModal(false);
    }
  };

  const handleAddressSubmitApi = async () => {
    if (!validateAddressForm()) {
      return; // stop if validation fails
    }

    try {
      setIsLoading(true);
      const payload = {
        country: addressFormData.country,
        state: addressFormData.state,
        address: addressFormData.address,
      };

      await axiosInstance.patch("/users/update-address", payload);
      await fetchTaxData()
      await dispatch(getUserDetails())

      // You can show a success toast/snackbar here
      setShowAddressModal(false);

      // Optional: Reset form after success
      setAddressFormData({
        country: "",
        state: "",
        address: "",
      });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error updating address:", error);
    }
    setIsLoading(false);
  };

  // Check if form is valid
  const isFormValid =
    !errors.gstNumber &&
    !errors.companyName &&
    !errors.companyAddress &&
    gstFormData.gstNumber &&
    gstFormData.companyName &&
    gstFormData.companyAddress;

  if (isLoading) {
    return (
      <div className="fixed h-screen w-screen top-0 left-0 z-50 flex items-center jusustify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isQuestions) {
    return (
      <QAModal
        onComplete={(data) => {
          setQuestionAnswers(data);
          setIsQuestions(false);
        }}
        questions={data?.questions}
      />
    );
  }
  const isAddressFormValid =
    addressFormData.country &&
    addressFormData.address.trim() &&
    (addressFormData.country?.toLowerCase() !== "india" ||
      addressFormData.state);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {loading && (
        <div className="fixed h-screen flex items-center justify-center left-0 top-0 z-[999] w-screen bg-black/20">
          <SmallLoading />
        </div>
      )}

      <div className="md:px-20 px-8 relative w-full rounded-3xl bg-white py-6 md:my-20 pb-16">
        <img
          className="hidden md:block absolute top-0 left-0"
          src={circleQuater}
          alt=""
        />
        <HeadingBreadCrumb
          isBreadCrumb={false}
          isHeadingDesign={true}
          heading={"Plan Detail"}
          description={
            "Based on your responses, we've recommended a plan perfectly aligned with your needs!"
          }
        />

        <div className="grid lg:grid-cols-2 gap-16 mx-auto">
          <div>
            <CardContainer className={""} variant="border">
              <div className="flex w-full flex-col gap-2">
                <div className=" text-neutral-900 text-sm font-medium px-2 py-1 bg-[#fff2d6] rounded-lg justify-center items-centers self-start flex">
                  {CONSTANTS[data?.serviceName] ||
                    CONSTANTS[data?.service?.name] ||
                    data?.serviceName ||
                    ""}
                </div>
                <Heading variant="xxl">
                  {data?.label || CONSTANTS[data?.name]}
                </Heading>
              </div>
              <Seprator className={"my-4"} />
              <Subtitle weight="medium" variant="sm">
                Key Features
              </Subtitle>
              <ul className="list-disc pl-3 ">
                {data.features?.map((data, index) => (
                  <li
                    className="text-[#051227] text-xs font-normal leading-[18px]"
                    key={index}
                  >
                    {data}
                  </li>
                ))}
              </ul>
              <Seprator className={"my-8"} />

              {data?.priceType?.toLowerCase() === "fixed" && (
                <div className="relative">
                  <input
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                      dispatch(clearCoupon());
                    }}
                    placeholder="Promo Code"
                    type="text"
                    className="py-4 px-3 border rounded-2xl bg-white w-full outline-none"
                  />
                  {/* <button
                    onClick={async () => {
                      if (taxData?.discountAmount) {
                        setCouponCode("");
                        fetchTaxData();
                      } else {
                        const res = await fetchPaymentDetails({
                          planId: data._id || data.id,
                          questions: questionAnswers,
                          couponCode: couponCode,
                        });

                        if (res) {
                          setTaxData(res);
                        }

                        if (res?.discountAmount) {
                          toast.success("Coupon applied successfully");
                        } else {
                          toast.error("Coupon code is invalid");
                        }
                      }
                    }}
                    className="absolute self-end translate-y-[-50%] right-[4%] top-1/2"
                  >
                    {taxData?.discountAmount ? "Remove" : "Apply"}
                  </button> */}
                  <button
                    onClick={async () => {
                      try {
                        if (taxData?.discountAmount > 0) {
                          setCouponCode("");
                          fetchTaxData();
                        } else {
                          const res = await fetchPaymentDetails(
                            {
                              planId: data._id || data.id,
                              questions: questionAnswers,
                              couponCode: couponCode,
                            },
                            setLoading
                          );

                          if (res) {
                            setTaxData(res);
                          }

                          if (res?.discountAmount) {
                            toast.success("Coupon applied successfully");
                          } else {
                            toast.error("Coupon code is invalid");
                          }
                        }
                      } catch (error) {
                        console.error("Error applying coupon:", error);
                        toast.error("Something went wrong. Please try again.");
                      }
                    }}
                    className="absolute self-end translate-y-[-50%] right-[4%] top-1/2"
                  >
                    {taxData?.discountAmount > 0 ? "Remove" : "Apply"}
                  </button>
                </div>
              )}

              <div className="flex items-center gap-2 mb-4 mt-4">
                <input
                  type="checkbox"
                  id="gstCheckbox"
                  checked={isGSTVerified}
                  onChange={() => {
                    if (!isGSTVerified) {
                      setShowGSTModal(true);
                    } else {
                      // Reset GST data
                      setIsGSTVerified(false);
                      setGstFormData({
                        gstNumber: "",
                        companyName: "",
                        companyAddress: "",
                      });
                    }
                  }}
                  className=" accent-black w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 bg-transparent"
                />
                <label
                  htmlFor="gstCheckbox"
                  className="text-sm font-medium text-gray-700"
                >
                  I have a GST number
                </label>
              </div>

              <div className="flex flex-col gap-2">
                {data?.priceType?.toLowerCase() === "fixed" && (
                  <div className="flex justify-between items-center mt-6">
                    <Subtitle variant="sm">Plan Price</Subtitle>
                    <Subtitle weight="medium" variant="sm">
                      ₹{formatIndianCurrencyZero(taxData?.amount)}
                    </Subtitle>
                  </div>
                )}

                {data?.priceType?.toLowerCase() === "fixed" && (
                  <div className="flex justify-between items-center">
                    <Subtitle color="green" variant="sm">
                      Discount
                    </Subtitle>
                    <Subtitle weight="medium" color="green" variant="sm">
                      -₹
                      {formatIndianCurrencyZero(taxData?.discountAmount) || 0}
                    </Subtitle>
                  </div>
                )}

                {data?.priceType?.toLowerCase() === "fixed" && (
                  <div className="flex justify-between items-center">
                    <div className=" text-base font-['Poppins'] leading-normal">
                      Final Price
                    </div>
                    <div className=" text-base font-['Poppins']">
                      {/* + ₹{(discountPrice * (taxShare / 100)).toFixed(2) || 0} */}
                      ₹
                      {formatIndianCurrencyZero(taxData?.priceAfterDiscount) ||
                        0}
                    </div>
                  </div>
                )}

                {data?.priceType?.toLowerCase() === "fixed" && (
                  <div className="flex text-red-600 justify-between items-center">
                    <div className=" text-base font-['Poppins'] leading-normal">
                      Tax
                    </div>
                    <div className=" text-base font-['Poppins']">
                      {/* + ₹{(discountPrice * (taxShare / 100)).toFixed(2) || 0} */}
                      +₹{formatIndianCurrencyZero(taxData?.totalTaxAmount) || 0}
                    </div>
                  </div>
                )}

                {data?.priceType?.toLowerCase() === "fixed" && (
                  <div className="flex justify-between items-center">
                    <div className="text-[#051227] text-lg font-medium font-['Poppins'] leading-normal">
                      {data?.priceType?.toLowerCase() === "fixed"
                        ? "Grand Price"
                        : "Start From"}
                    </div>
                    <div className="text-[#051227] text-2xl font-semibold font-['Poppins'] leading-[30px]">
                      {/* ₹{(discountPrice + discountPrice * (taxShare / 100)).toFixed(2) || discountPrice} */}
                      ₹{formatIndianCurrencyZero(taxData?.finalPrice) || 0}
                    </div>
                  </div>
                )}

                <div className="pt-4 w-full grid">
                  {loading ? (
                    <Button variant="disabled">
                      {data?.priceType?.toLowerCase() === "fixed"
                        ? "Pay Now"
                        : "Avail Now"}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        if (
                          !gstFormData.gstNumber &&
                          !userData?.user?.country &&
                          !userData?.user?.address
                        ) {
                          setShowAddressModal(true);
                          return;
                        }

                        handlePayment();
                        dispatch(emptyPlans());
                      }}
                      variant="black"
                    >
                      {data?.priceType?.toLowerCase() === "fixed"
                        ? "Pay Now"
                        : "Avail Now"}
                    </Button>
                  )}
                </div>
                {data?.priceType?.toLowerCase() !== "fixed" && (
                  <div className="text-slate-600 text-[10px] font-normal">
                    Final price may vary as per the requirement
                  </div>
                )}
              </div>
            </CardContainer>
          </div>
          <div>
            <Subtitle
              color="black"
              weight="medium"
              variant="sm"
              className="pb-10"
            >
              What does it look like after the payment?
            </Subtitle>
            <Steper data={stepsData} />
          </div>
        </div>
      </div>
      {isFooter && (
        <div className="w-full relative py-10 md:py-0">
          <div className="absolute bottom-0 w-screen  translate-middle bg-primary-100 flex justify-center items-center py-10 gap-20 sm:gap-10">
            <div className="flex sm:items-center flex-col sm:flex-row justify-center gap-2">
              <Subtitle color="black">Call now at</Subtitle>
              <Subtitle color="black">
                <a href="tel:+916359599999">+91 63595 99999</a>
              </Subtitle>
            </div>
            <div className="flex sm:items-center flex-col sm:flex-row justify-center gap-2">
              <Subtitle color="black">Email us at</Subtitle>
              <Subtitle color="black">
                <a href="mailto:support@ezyfiling.com">support@ezyfiling.com</a>
              </Subtitle>
            </div>
          </div>
        </div>
      )}
      {/* <ToastContainer /> */}

      {showGSTModal && (
        <Modal
          heading="Enter GST Details"
          onClose={() => {
            setGstFormData({
              country: "",
              state: "",
              address: "",
            });
            setErrors({
              country: "",
              state: "",
              address: "",
            });
            setShowGSTModal(false);
          }}
        >
          <div className="flex flex-col gap-4">
            <Input
              label="GST Number"
              placeholder="Enter your GST number"
              value={gstFormData.gstNumber}
              fieldName="gstNumber"
              onChange={handleInputChange}
              required
              validate={() => errors.gstNumber}
              errorMessage={errors.gstNumber}
            />
            <Input
              label="Company Name"
              placeholder="Enter your company name"
              value={gstFormData.companyName}
              fieldName="companyName"
              onChange={handleInputChange}
              required
              validate={() => errors.companyName}
              errorMessage={errors.companyName}
            />
            <Input
              label="Company Address"
              placeholder="Enter your company address"
              value={gstFormData.companyAddress}
              fieldName="companyAddress"
              onChange={handleInputChange}
              required
              validate={() => errors.companyAddress}
              errorMessage={errors.companyAddress}
            />
            <Button
              onClick={handleGSTSubmit}
              disabled={!isFormValid}
              variant={isFormValid ? "primary" : "disabled"}
              className="w-full"
            >
              Submit
            </Button>
          </div>
        </Modal>
      )}

      {showAddressModal && (
        <Modal
          heading="Enter Address Details"
          onClose={() => setShowAddressModal(false)}
        >
          <div className="flex flex-col gap-6">
            {/* Country */}
            <div className="flex flex-col gap-1">
              <div className="md:w-[150px]">
                <Heading variant="sm">Country</Heading>
              </div>
              <DropDown
                searchAble={true}
                options={countries}
                selectedValue={addressFormData.country}
                onOptionSelect={(e) => {
                  setResetDropdown(true);
                  handleAddressInputChange("country", e.name);
                }}
                placeholder="Select your country"
              />
            </div>

            {/* State */}
            {addressFormData?.country.toLowerCase() === "india" && (
              <div className="flex flex-col gap-1">
                <div className="md:w-[150px]">
                  <Heading variant="sm">State</Heading>
                </div>
                <DropDown
                  searchAble={true}
                  resetDropdown={resetDropdown}
                  setResetDropdown={setResetDropdown}
                  options={states || []}
                  selectedValue={addressFormData.state}
                  onOptionSelect={(e) => {
                    setResetDropdown(false);
                    handleAddressInputChange("state", e.name);
                  }}
                  placeholder="Select your state"
                />
              </div>
            )}

            {/* Address */}
            <div className="flex flex-col gap-1">
              <div className="md:w-[150px]">
                <Heading variant="sm">Address</Heading>
              </div>
              <TextArea
                placeholder="Enter your address"
                value={addressFormData.address}
                fieldName="address"
                onChange={(e) =>
                  handleAddressInputChange("address", e.target.value)
                }
                validate={() => addressErrors.address}
                errorMessage={addressErrors.address}
              />
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleAddressSubmit}
              disabled={!isAddressFormValid}
              variant={isAddressFormValid ? "primary" : "disabled"}
              className="w-full"
            >
              Submit
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default PricingPayPage;
