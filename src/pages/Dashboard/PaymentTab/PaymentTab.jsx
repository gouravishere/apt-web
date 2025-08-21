import React, { useEffect, useState } from "react";
import DashBoardHeading from "../DashboardComponents/DashBoardHeading/DashboardHeading";
import Heading from "../../../components/Heading/Heading";
import CardContainer from "../DashboardComponents/CardContainer/CardContainer";
import Button from "../../../components/Button/Button";
import filterIcon from "../../../assets/icons/filter-icon.svg";
import Seprator from "../../../components/Seprator/Seprator";
import {
  fetchPastTransactions,
  getMyServices,
} from "../../../redux/ServiceDetailsSlice/ServiceDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { CONSTANTS } from "../../PricingPage/PricingConstant";
import dayjs from "dayjs";
import PaymentFilters from "./PaymentFilters";
import { useNavigate } from "react-router-dom";
import SmallLoading from "../../../components/LoadingSpinner/SmallLoading";
import axiosInstance from "../../../utils/axiosInstance";
import { formatIndianCurrencyZero } from "../../../utils";
import Input from "../../../components/Input/Input";
import Modal from "../../../components/Modal/Modal";
import DropDown from "../../../components/DropDown/DropDown";
import TextArea from "../../../components/TextArea/TextArea";
import { emptyPlans } from "../../../redux/priceSlice/priceSlice";
import axios from "axios";

function capitalize(str) {
  if (!str) return "";
  return str?.charAt(0)?.toUpperCase() + str?.slice(1);
}

const PaymentTabCardHeading = ({ heading, content, className, onDownload }) => {
  return (
    <div className={`${className} flex flex-col`}>
      <div className=" text-nowrap text-slate-500 text-xs font-normal font-['Poppins'] leading-[18px]">
        {heading}
      </div>
      <div
        onClick={() => {
          if (content === "Download Invoice") {
            onDownload();
          }
        }}
        className={`${content === "FAILED" && "text-red-500"} ${
          content === "Download Invoice" &&
          "hover:text-black/80 underline cursor-pointer"
        } ${content?.toLowerCase() === "completed" && "text-green-500"} ${
          content?.toLowerCase() === "pending" && "text-orange-500"
        }  w-full text-xs sm:text-sm font-medium font-['Poppins'] leading-[21px] max-w-[220px] text-wrap `}
      >
        {content || "N/A"}
      </div>
    </div>
  );
};

const PaymentCard = ({
  details,
  onDownload,
  Amount,
  date,
  inoviceLink,
  data,
  handlePayNow,
}) => {
  const [showGSTModal, setShowGSTModal] = useState(false);
  const [isGSTVerified, setIsGSTVerified] = useState(false);
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

  const [showAddressModal, setShowAddressModal] = useState(false);
  const userData = useSelector((state) => state.auth.userDetails);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
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

  const handleGSTSubmit = () => {
    const gstError = validateGSTNumber(gstFormData.gstNumber);
    const companyError = validateCompanyName(gstFormData.companyName);
    const addressError = validateCompanyAddress(gstFormData.companyAddress);

    setErrors({
      gstNumber: gstError,
      companyName: companyError,
      companyAddress: addressError,
    });

    if (!gstError && !companyError && !addressError) {
      setIsGSTVerified(true);
      setShowGSTModal(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGstFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

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

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleAddressSubmit = async () => {
    if (validateAddressForm()) {
      await handleAddressSubmitApi().then(() => {
        handlePayNow(gstFormData);
      });

      dispatch(emptyPlans());
      setShowAddressModal(false);
    }
  };

  const handleAddressSubmitApi = async () => {
    if (!validateAddressForm()) {
      return; // stop if validation fails
    }

    try {
      const payload = {
        country: addressFormData.country,
        state: addressFormData.state,
        address: addressFormData.address,
      };

      await axiosInstance.patch("/users/update-address", payload);

      // You can show a success toast/snackbar here
      setShowAddressModal(false);

      // Optional: Reset form after success
      setAddressFormData({
        country: "",
        state: "",
        address: "",
      });
    } catch (error) {
      console.error("Error updating address:", error);
      // Optional: Show error toast/snackbar
    }
  };

  const isFormValid =
    !errors.gstNumber &&
    !errors.companyName &&
    !errors.companyAddress &&
    gstFormData.gstNumber &&
    gstFormData.companyName &&
    gstFormData.companyAddress;

  const isAddressFormValid =
    addressFormData.country &&
    addressFormData.address.trim() &&
    (addressFormData.country?.toLowerCase() !== "india" ||
      addressFormData.state);

  return (
    <>
      <CardContainer
        className={
          "flex flex-col 2xl:flex-row gap-8 justify-between md:items-center"
        }
        variant="border"
      >
        <div className="flex w-full justify-between gap-4 md:gap-0c">
          <div className="flex flex-col ">
            <div className="text-neutral-900 text-lg font-medium font-['Poppins'] leading-[27px]">
              ₹{formatIndianCurrencyZero(Amount)}
            </div>
            <div className="text-slate-600 text-sm font-normal font-['Poppins'] leading-[21px]">
              {date}
            </div>
          </div>
        </div>
        <Seprator className="md:hidden" />
        <div className="grid grid-cols-2 xl:grid-cols-5 2xl:grid-cols-[100px_240px_220px_100px_150px] gap-4 w-full">
          {details?.map((data) => (
            <PaymentTabCardHeading
              key={data.heading}
              onDownload={onDownload}
              heading={data.heading}
              content={data.content}
            />
          ))}

          {inoviceLink ? (
            <div className={`flex flex-col`}>
              <div className=" text-nowrap text-slate-500 text-xs font-normal font-['Poppins'] leading-[18px]">
                Action
              </div>
              <a
                target="blank"
                className=" text-nowrap text-sm font-medium font-['Poppins'] leading-[21px] hover:text-black/80 underline cursor-pointer"
                href={inoviceLink}
              >
                Download Invoice
              </a>
            </div>
          ) : (
            <>
              {
                <div className={`flex flex-col justify-end`}>
                  {data?.status?.toUpperCase() !== "FAILED" &&
                    data?.status?.toUpperCase() !== "PENDING" && (
                      <div className=" text-nowrap text-slate-500 text-xs font-normal font-['Poppins'] leading-[18px]">
                        Action
                      </div>
                    )}
                  {(data?.status?.toUpperCase() === "FAILED" ||
                    data?.status?.toUpperCase() === "PENDING") && (
                    <>
                      <button
                        className="h-10 py-2 px-2 rounded-3xl bg-primary-500 text-black w-full"
                        onClick={() => {
                          if (
                            !gstFormData.gstNumber &&
                            !userData?.user?.country &&
                            !userData?.user?.address
                          ) {
                            setShowAddressModal(true);
                            return;
                          }
                          handlePayNow(gstFormData);
                        }} // Replace with your actual pay handler
                      >
                        Pay Now
                      </button>
                      <div className="flex items-center justify-center cursor-pointer gap-2 mb-4 mt-4">
                        <input
                          type="checkbox"
                          id="gstCheckbox"
                          checked={isGSTVerified}
                          onChange={() => {
                            if (!isGSTVerified) {
                              setShowGSTModal(true);
                            } else {
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
                          Have GST?
                        </label>
                      </div>
                    </>
                  )}
                </div>
              }
            </>
          )}
        </div>
      </CardContainer>

      {showGSTModal && (
        <div className="">
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
        </div>
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

const PaymentTab = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state?.Leads?.transactions);
  const isLoading = useSelector((state) => state?.Leads?.loading);
  const navigate = useNavigate();
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  useEffect(() => {
    dispatch(getMyServices());
    dispatch(fetchPastTransactions({ sortBy: "latest" }));
  }, [dispatch]);

  const handlePayment = async (orderData, gstFormData) => {
    if(gstFormData?.gstNumber && gstFormData?.companyName && gstFormData?.companyAddress) {
      await axiosInstance.patch("/payments/update-tax-detail", {
        orderId: orderData.orderId,
        taxDetails: {
          taxNumber: gstFormData?.gstNumber,
          companyName: gstFormData?.companyName,
          companyAddress: gstFormData?.companyAddress,  
        },
      });
    }
    const razorpayKey = process.env.REACT_APP_RAZORPAY_KEY;
    // Razorpay options
    const options = {
      key: razorpayKey, // Your Razorpay API Key
      amount: orderData.amount, // Amount in paise
      currency: orderData.currency,
      name: "APT Global",
      description: "Test Transaction",
      order_id: orderData.orderId, // Order ID generated on the backend
      handler: async function (response) {
        setIsPaymentLoading(true);
        try {
 
          
          await axiosInstance.post("/payments/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          setIsPaymentLoading(false);
          navigate(`/dashboard?status=COMPLETED`);
        } catch (error) {
          setIsPaymentLoading(false);
          console.error(error);
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
    if (orderData?.orderId) {
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

  return (
    <>
      <PaymentFilters
        onApplyFilters={(e) => {
          dispatch(
            fetchPastTransactions({
              serviceId: e.selectedServices.id,
              status: e.status.label,
              sortBy: e.sortBy,
            })
          );
          if (e.status.label || e.selectedServices.id || e.sortBy) {
            setIsFilterApplied(true);
          } else {
            setIsFilterApplied(false);
          }
        }}
        clearFilters={() => {
          setIsFilterApplied(false);
        }}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div className="flex flex-col w-full gap-8">
        <DashBoardHeading heading={"Payments"} />
        <CardContainer className={"flex flex-col w-full gap-8"}>
          {isLoading && (
            <div className="py-20 w-full justify-center flex">
              <SmallLoading />
            </div>
          )}
          <div className="flex items-center justify-between w-full">
            <Heading variant="xl">All Payment Transactions</Heading>
            <Button
              className="relative"
              onClick={() => setIsOpen(true)}
              size="sm"
              variant="outline"
            >
              {isFilterApplied && (
                <div className="absolute top-2 left-[33%] bg-red-500 rounded-full w-2 h-2"></div>
              )}
              <img className="mr-2" src={filterIcon} alt="" />
              filter
            </Button>
          </div>
          {transactions?.map((res) => (
            <PaymentCard
              key={res._id}
              data={res}
              onDownload={() => navigate(`/${res?.invoiceUrl}`)}
              details={[
                { heading: "Status", content: res.status },
                {
                  heading: "Plan Name",
                  content: CONSTANTS[res?.planId?.name] || res?.planId?.name,
                },
                { heading: "Order ID", content: res.orderId },
                {
                  heading: "Payment Type",
                  content:
                    capitalize(res.paymentMethod) ||
                    capitalize(res.metadata?.method),
                },
              ]}
              Amount={res.finalPrice || res.amountShare || res.amount}
              inoviceLink={res.invoiceUrl}
              date={dayjs(res.createdAt).format("DD MMM YYYY, hh:mm a")}
              handlePayNow={(e) => {
                handlePayment(res, e);
              }}
            />
          ))}

          {transactions?.length === 0 && (
            <Heading className={"mx-auto"} weight="medium" size={"xl"}>
              No Past Transactions
            </Heading>
          )}
        </CardContainer>
      </div>
    </>
  );
};

export default PaymentTab;
