import React, { useEffect, useRef, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Heading from "../../components/Heading/Heading";
import HeadingCard from "../Dashboard/DashboardComponents/HeadingCard/HeadingCard";
import fileIcon from "../../assets/icons/tax-document-icon.png";
import CardContainer from "../Dashboard/DashboardComponents/CardContainer/CardContainer";
import DocumentUploadCard from "../Dashboard/DashboardComponents/DocumentUploadCard/DocumentUploadCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getLeadById,
  GetLeadTimeLineById,
  uploadInputData,
  uploadLeadDocumentId,
} from "../../redux/ServiceDetailsSlice/ServiceDetailsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { CONSTANTS } from "../PricingPage/PricingConstant";
import DetailedProgressCard from "../Dashboard/DashboardComponents/DetailedProgressCard/DetailedProgressCard";
import greentick from "../../assets/icons/green-tick-circle.svg";
import purpleClock from "../../assets/icons/purple-clock.svg";
import fileUpload from "../../assets/icons/yellow-document-upload.svg";
import dayjs from "dayjs";
import ChatCard from "../Dashboard/DashboardComponents/ChatCard/ChatCard";
import ChatInput from "../Dashboard/DashboardComponents/ChatInput/ChatInput";
import axiosInstance from "../../utils/axiosInstance";
import { uploadFiles } from "../../redux/GetInTouchSlice/GetInTouchSlice";
import { toast, ToastContainer } from "react-toastify";
import Button from "../../components/Button/Button";
import TextArea from "../../components/TextArea/TextArea";
import Input from "../../components/Input/Input";
import Modal from "../../components/Modal/Modal";
import { io } from "socket.io-client";
import { formatIndianCurrencyZero } from "../../utils";
import { emptyPlans } from "../../redux/priceSlice/priceSlice";
import DropDown from "../../components/DropDown/DropDown";
import axios from "axios";
import { fetchUnseenNotifications } from "../../redux/NotificationSlice/NotificationSlice";

const base_url = process.env.REACT_APP_SOCKET_URL;

const actionToLogoMap = {
  LEAD_CREATED: greentick,
  WIP_LEAD_CREATED: greentick,
  NEW_LEAD_CREATED: greentick,
  DOCUMENT_UPLOADED: fileUpload,
  DOCUMENT_VERIFIED: greentick,
  DOCUMENT_REJECTED: greentick,
  STATUS_UPDATED: purpleClock,
  ASSIGNED_TO_CHANGED: purpleClock,
  PAYMENT_COMPLETED: greentick,
  QUOTE_PROVIDED: greentick,
  PAYMENT_GENERATED: purpleClock,
  PAYMENT_ASSIGNED: greentick,
  PLAN_DURATION: purpleClock,
};

const sendGstDetails = async ({ timelineId, gstFormData }) => {
  let payload;
  if (
    gstFormData.gstNumber &&
    gstFormData.companyName &&
    gstFormData.companyAddress
  ) {
    payload = {
      timelineEntryId: timelineId,
      taxDetails: {
        taxNumber: gstFormData.gstNumber,
        companyName: gstFormData.companyName,
        companyAddress: gstFormData.companyAddress,
      },
    };
  } else {
    payload = {
      timelineEntryId: timelineId,
    };
  }

  try {
    const response = await axiosInstance.post(
      "/payments/update-tax-details",
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error sending GST details:", error);
    throw error;
  }
};

const mapActionsToStepsData = (apiResponse) => {
  const PaymentGeneratedCard = ({ data }) => {
    const [isLoading, setIsLoading] = useState(false);
    const razorpayKey = process.env.REACT_APP_RAZORPAY_KEY;
    const dispatch = useDispatch();

    const [showAddressModal, setShowAddressModal] = useState(false);
    const userData = useSelector((state) => state.auth.userDetails);
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
      data?.metadata?.orderId && fetchCountries();
    }, []);

    const handleAddressSubmit = async () => {
      if (validateAddressForm()) {
        await handleAddressSubmitApi().then(() => {
          handlePayment();
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

    const isAddressFormValid =
      addressFormData.country &&
      addressFormData.address.trim() &&
      (addressFormData.country?.toLowerCase() !== "india" ||
        addressFormData.state);

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

    const isFormValid =
      !errors.gstNumber &&
      !errors.companyName &&
      !errors.companyAddress &&
      gstFormData.gstNumber &&
      gstFormData.companyName &&
      gstFormData.companyAddress;

    const handlePayment = async () => {
      try {
        await sendGstDetails({ timelineId: data._id, gstFormData });
        const options = {
          key: razorpayKey,
          amount: data?.metadata?.amount,
          currency: "INR",
          name: "APT Global",
          description: "Test Transaction",
          order_id: data?.metadata?.orderId,
          handler: async function (response) {
            setIsLoading(true);
            try {
              await axiosInstance.patch("/payments/update/status", {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });

              dispatch(GetLeadTimeLineById(data?.metadata?.leadData?._id));
              setIsLoading(false);
            } catch (error) {
              console.error(error);
              setIsLoading(false);
            }
          },
          theme: {
            color: "#fedc60",
          },
        };

        const rzp = new window.Razorpay(options);
        if (data?.metadata?.orderId) {
          rzp.open();
          rzp.on("payment.failed", async function (response) {
            try {
              await axiosInstance.post("/payments/failed", {
                razorpay_order_id: response.error.metadata.order_id,
              });
              toast.success("Payment Successful");
            } catch (error) {
              console.error(error);
            }
          });
        }
      } catch (error) {
        console.error("Payment Error: ", error);
        setIsLoading(false);
      }
    };

    return (
      <>
        <div className="p-6 bg-white rounded-2xl border border-[#dee5ec] flex flex-col md:flex-row justify-between items-center gap-4 overflow-hidden">
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div>
              <div className="text-[#051227] text-2xl font-semibold">
                ₹
                {formatIndianCurrencyZero(data?.metadata?.finalPrice) ||
                  formatIndianCurrencyZero(data?.metadata?.amount) ||
                  0}
              </div>
              <div className="text-slate-500 text-sm">Payment Amount</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-[#dee5ec]"></div>
            <div className="flex flex-wrap gap-6">
              <div>
                <div className="text-slate-500 text-xs">Service</div>
                <div className="text-[#051227] text-sm font-medium">
                  {CONSTANTS[data?.metadata?.serviceName] ||
                    data?.metadata?.serviceName ||
                    "N/A"}
                </div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Order ID</div>
                <div className="text-[#051227] text-sm font-medium">
                  {data?.metadata?.orderId || "N/A"}
                </div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Date Generated</div>
                <div className="text-[#051227] text-sm font-medium">
                  {data.startDate
                    ? dayjs(data?.startDate).format("DD MMM, YYYY")
                    : dayjs(data?.createdAt).format("DD MMM, YYYY") || "NA"}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:ml-auto w-full md:w-auto">
            {data?.metadata?.paymentStatus === "COMPLETED" ? (
              <span className="font-medium">Paid</span>
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
                }}
                disabled={isLoading}
                variant="black"
                className="w-full md:w-auto"
              >
                {isLoading ? "Processing..." : "Pay Now"}
              </Button>
            )}
          </div>
        </div>
        {data?.metadata?.paymentStatus !== "COMPLETED" && (
          <div className="flex items-center gap-2 mb-4 mt-4">
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
              I have a GST number
            </label>
          </div>
        )}

        {showGSTModal && (
          <Modal
            heading="Enter GST Details"
            onClose={() => setShowGSTModal(false)}
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

  return apiResponse?.map((item) => {
    const { action, createdAt, metadata, _id } = item;
    let child = "";
    let label = "";
    switch (action) {
      case "LEAD_CREATED":
        label = "Lead Created";
        break;
      case "WIP_LEAD_CREATED":
        label = "Service Initiated";
        break;
      case "DOCUMENT_UPLOADED":
        label = `Document uploaded (${metadata.names?.[0]})`;
        break;
      case "NEW_LEAD_CREATED":
        label = "Service Initiated";
        break;
      case "DOCUMENT_VERIFIED":
        label = `Document Verified (${metadata.name})`;
        break;
      case "DOCUMENT_REJECTED":
        label = `Document Rejected (${metadata.name})`;
        break;
      case "STATUS_UPDATED":
        label = "Status Updated";
        break;
      case "ASSIGNED_TO_CHANGED":
        label = "Assignee Changed";
        break;
      case "PAYMENT_COMPLETED":
        label = `Payment Completed (Rs ${
          formatIndianCurrencyZero(metadata?.finalPrice) ||
          formatIndianCurrencyZero(metadata.amount) ||
          0
        })`;
        break;
      case "QUOTE_PROVIDED":
        label = "Quote Provided";
        break;
      case "PAYMENT_ASSIGNED":
        label = `Payment Assigned to ${metadata?.assignee?.name}`;
        break;
      case "PAYMENT_GENERATED":
        child = (
          <PaymentGeneratedCard data={{ action, createdAt, metadata, _id }} />
        );
        label = "Payment Generated";
        break;
      case "PLAN_DURATION":
        label = "Plan Duration";
        child = (
          <div className="text-gray-500">
            Gst Filling for{" "}
            {dayjs(metadata.startDate).subtract(1, "month").format("MMM, YYYY")}
          </div>
        );
        break;
      default:
        label = action;
    }

    return {
      label: label,
      children: child,
      date: dayjs(createdAt).format("DD MMM, YYYY, ddd hh:mm   A "),
      img: actionToLogoMap[action] || "defaultLogo",
    };
  });
};

const DetailedCardDetails2 = [
  { label: "Gross Income", content: "₹ 20,00,000" },
  { label: "Taxable Income", content: "₹ 15,00,000" },
  { label: "Tax Liability", content: "₹ 15,00,000" },
  { label: "Taxes Paid", content: "₹ 15,00,000" },
  { label: "Refund", content: "₹ 15,00,000" },
];

const PreviewImage = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed top-0 z-[99999999999] left-0 flex justify-center items-center">
      <div
        onClick={onClose}
        className="fixed bg-black/30 top-0 left-0 h-screen w-screen inset-0"
        aria-label="Close modal"
      ></div>
      <img
        src={imageUrl}
        alt="Preview"
        className="fixed max-w-[90vw] max-h-screen translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]  object-contain"
      />
    </div>
  );
};

const ServiceDetailedCard = ({ heading, idNumber, details, percentage }) => {
  return (
    <CardContainer
      className={
        "p-3 md:p-8 w-full bg-white rounded-2xl gap-4 flex-col  inline-flex"
      }
    >
      <div className="w-full justify-between lg:flex-row gap-4 flex-col lg:items-center flex">
        <div className="flex gap-2 w-full justify-center items-center">
          <img src={fileIcon} alt="" />
          <div className="w-full flex-col justify-start items-start inline-flex">
            <div className="self-stretch  text-neutral-900 text-lg font-medium font-['Poppins'] leading-[27px]">
              {heading}
            </div>
            <div className="self-stretch text-slate-600 text-sm font-normal font-['Poppins'] leading-[21px]">
              {idNumber}
            </div>
          </div>
        </div>
        <div className="w-full xl:flex xl:justify-end grid items-center grid-cols-2 md:grid-cols-2 gap-3">
          <div className="flex-col justify-center items-start gap-1 inline-flex md:pl-16">
            <div className="text-slate-600 pb-2 md:pb-0 text-sm font-medium font-['Poppins'] leading-[21px]">
              {percentage}% complete
            </div>
            <div
              className={`grow w-[158px] shrink h-2.5 relative bg-neutral-200 rounded-[99px]`}
            >
              <div
                style={{ width: percentage + "%" }}
                className={`h-full  bg-semantic-success-200 rounded-[99px]`}
              ></div>
            </div>
          </div>

          {details?.map((data, index) => (
            <HeadingCard
              key={index}
              index={index}
              heading={data.label}
              content={data.content}
            />
          ))}
        </div>
      </div>
    </CardContainer>
  );
};

const renderStatusButton = (status) => {
  switch (status.toLowerCase()) {
    case "pending":
      return (
        <div className="text-center text-[#f56f10] text-sm font-medium font-['Poppins'] leading-[21px] px-4 py-2 bg-[#fef2eb] rounded-[32px] justify-center items-center gap-2 inline-flex">
          In Review
        </div>
      );
    case "verified":
      return (
        <div className="text-center text-green-500 text-sm font-medium font-['Poppins'] leading-[21px] px-4 py-2 bg-green-50 rounded-[32px] justify-center items-center gap-2 inline-flex">
          Approved
        </div>
      );

    case "rejected":
      return (
        <div className="text-center text-rose-600 text-sm font-medium font-['Poppins'] leading-[21px] px-4 py-2 bg-rose-50 rounded-[32px] justify-center items-center gap-2 inline-flex">
          Rejected
        </div>
      );
    default:
      return <span></span>;
  }
};

const ServiceDetailsPage = () => {
  const [isImage, setIsImage] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const dispatch = useDispatch();
  const LeadData = useSelector((state) => state?.Leads?.leadByIdData?.data);
  const { leadId } = useParams();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const TimeLineSelector = useSelector((state) => state?.Leads?.timeline?.data);
  const [chatInput, setChatInput] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [chatLogs, setChatLogs] = useState([]);
  const [error, setError] = useState("");
  const [isSendChatButtonDisabled, setSendChatButtonDisabled] = useState(false);
  const userId = useSelector((state) => state?.auth?.userDetails?.user?._id);

  const allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  let maxSize = 2 * 1024 * 1024;

  const [formData, setFormData] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!leadId) return;

    // Initialize socket if it doesn't exist
    if (!socketRef.current) {
      socketRef.current = io(base_url, {
        withCredentials: true,
        transports: ["websocket"],
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 10000,
        query: {
          leadId: leadId,
        },
      });

      // Handle successful connection
      socketRef.current.on("connect", () => {
        socketRef.current.emit(leadId);
      });

      // Handle connection error
      socketRef.current.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
        setError(
          "Failed to establish real-time connection. Please refresh the page."
        );
      });
    } else {
      socketRef.current.emit("joinTicketRoom", { ticketId: leadId });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.emit("leaveTicketRoom", {
          ticketId: leadId,
        });
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [leadId]);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("getLeadMessage", handleNewMessage);

      return () => {
        if (socketRef.current) {
          socketRef.current.off("getLeadMessage", handleNewMessage);
        }
      };
    }
  }, [socketRef.current]);

  useEffect(() => {
    dispatch(fetchUnseenNotifications());
  }, []);

  const handleFormInputChange = (fieldName, value) => {
    setFormData((prevData) => {
      const updatedData = [...prevData];
      const fieldIndex = updatedData.findIndex(
        (item) => item.name === fieldName
      );

      if (fieldIndex !== -1) {
        updatedData[fieldIndex].textValue = value?.trim();
      } else {
        updatedData.push({
          name: fieldName,
          inputType: "TEXT",
          textValue: value?.trim(),
        });
      }

      return updatedData;
    });
  };

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatLogs, selectedFiles]);

  useEffect(() => {
    if (leadId) {
      getLeadChatLogs(leadId);
    }
  }, [leadId]);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    });
  };

  const handleNewMessage = (newMessage) => {
    setChatLogs((prev) => [...prev, newMessage.res.data?.[0]]);
    scrollToBottom();
  };

  useEffect(() => {
    dispatch(getLeadById(leadId));
    dispatch(GetLeadTimeLineById(leadId));
    if (!leadId) {
      navigate("/dashboard/services");
    }
  }, [dispatch, leadId, navigate]);

  const handleInputChange = (event) => {
    setChatInput(event.target.value);
  };

  const uploadFile = async (event) => {
    try {
      const files = Array.from(event.target.files);
      const filesWithMetadata = files?.map((file) => ({
        file,
      }));
      const uploadedFileResponse = await dispatch(
        uploadFiles({ files })
      ).unwrap();
      if (uploadedFileResponse) {
        const newFiles = uploadedFileResponse?.map((uploadedFile, index) => ({
          ...filesWithMetadata[index],
          uploadedData: uploadedFile,
        }));
        const updatedFiles = [...selectedFiles, ...newFiles];
        setSelectedFiles(updatedFiles);
      }
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to upload files"
      );
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter((file) => {
      if (!allowedTypes.includes(file.type)) {
        alert(`${file?.name} is not a valid file type.`);
        return false;
      }
      if (file?.size > maxSize) {
        alert(
          `${file?.name} exceeds the size limit of ${(
            maxSize /
            (1024 * 1024)
          ).toFixed(1)}MB.`
        );
        return false;
      }
      return true;
    });
    if (validFiles) {
      uploadFile(event);
    }
    event.target.value = "";
  };

  const handleRemoveFile = (fileItem) => {
    const updatedFiles = selectedFiles.filter(
      (file) => file?.uploadedData?.id !== fileItem?.uploadedData?.id
    );
    setSelectedFiles(updatedFiles);
  };

  const handleFilePReview = (url) => {
    window.open(url, "_blank");
  };

  const formatDates = (dateValue) => {
    const date = new Date(dateValue);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  const sendChatData = async () => {
    if ((chatInput || selectedFiles?.length > 0) && !isSendChatButtonDisabled) {
      try {
        setSendChatButtonDisabled(true);
        const fileIds = selectedFiles?.map(
          (fileItem) => fileItem?.uploadedData?.id
        );

        socketRef.current.emit("sendLeadMessage", {
          message: chatInput,
          senderType: "User",
          attachmentIds: fileIds,
          senderId: userId,
          leadId: leadId,
        });

        setChatInput("");
        setSelectedFiles([]);
        setSendChatButtonDisabled(false);
      } catch (error) {
        setError(error?.response?.data?.message || "Message failed to send!");
        setSendChatButtonDisabled(false);
      }
    }
  };

  const getLeadChatLogs = async (leadId) => {
    try {
      const response = await axiosInstance.get(`leads/${leadId}/chats`);
      if (response?.data?.success) {
        setChatLogs(response?.data?.data);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch chat logs!");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "upload":
        return (
          <CardContainer className={"flex flex-col w-full gap-8"}>
            {LeadData?.plan?.requiredDocuments?.filter(
              (data) => data.inputType !== "TEXT"
            )?.length > 0 && (
              <div className="flex w-full items-center justify-between">
                <Heading weight="medium" variant="xl">
                  {LeadData?.status !== "CLOSED"
                    ? "Document Required"
                    : "Uploaded Documents"}
                </Heading>
              </div>
            )}
            <div
              className={`${
                LeadData?.plan?.requiredDocuments?.filter(
                  (data) => data.inputType !== "TEXT"
                )?.length > 0
                  ? "grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1"
                  : ""
              }  gap-6`}
            >
              {LeadData?.plan?.requiredDocuments?.filter(
                (data) => data.inputType !== "TEXT"
              )?.length ? (
                <>
                  {LeadData?.plan?.requiredDocuments
                    ?.filter((data) => data.inputType !== "TEXT")
                    ?.map((data, index) => {
                      const documentExists = LeadData.documents.some(
                        (doc) => doc.name === data.name
                      );
                      const document = LeadData.documents.find(
                        (doc) =>
                          doc.name.toLowerCase() === data.name.toLowerCase()
                      );

                      return (
                        <DocumentUploadCard
                          onEyeClick={(e) => {
                            setSelectedFile(e);
                            setIsImage(true);
                          }}
                          documentType={document?.attachments?.mimeType}
                          onDownload={(url) => {
                            const link = window.document.createElement("a");
                            link.href = url;
                            link.setAttribute(
                              "download",
                              `attachment-${new Date().getTime()}`
                            );
                            link.target = "_blank";
                            window.document.body.appendChild(link);
                            link.click();
                            window.document.body.removeChild(link);
                          }}
                          fileUrl={document?.attachments}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            const allowedTypes = [
                              "image/png",
                              "image/jpeg",
                              "image/jpg",
                              "application/pdf",
                              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                              "application/msword",
                              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                            ];

                            if (!allowedTypes.includes(file.type)) {
                              toast.error("Invalid Document");
                              return;
                            }

                            if (data.name) {
                              dispatch(
                                uploadLeadDocumentId({
                                  inputType: data.inputType,
                                  leadId: leadId,
                                  file: file,
                                  attachmentName: data.name,
                                  prevAttachments: document?.attachments?.map(
                                    (attachment) => attachment._id
                                  ),
                                })
                              );
                            }
                          }}
                          onDelete={(e, name) => {
                            dispatch(
                              uploadLeadDocumentId({
                                isDelete: true,
                                inputType: data.inputType,
                                documentId: document._id,
                                leadId: leadId,
                                attachmentName: name,
                                prevAttachments: document?.attachments
                                  ?.filter((data) => data._id !== e._id)
                                  ?.map((attachment) => attachment._id),
                              })
                            );
                          }}
                          status={document?.status || null}
                          fullDocument={document}
                          key={index}
                          type={
                            documentExists
                              ? document?.status === "REJECTED"
                                ? "error"
                                : "img"
                              : "FILE"
                          }
                          data={data}
                          leadData={LeadData}
                          label={data.name}
                          img={document?.attachmentId?.fileUrl}
                        />
                      );
                    })}
                </>
              ) : (
                <div className="text-center w-full mt-4 text-xl font-medium">
                  Expert will communicate with you to submit required documents
                </div>
              )}
            </div>

            {LeadData?.plan?.requiredDocuments?.filter(
              (data) => data.inputType === "TEXT"
            )?.length > 0 && (
              <div>
                <div className="flex flex-col gap-4">
                  <Heading weight="medium" variant="xl">
                    Details Required
                  </Heading>
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {LeadData?.plan?.requiredDocuments
                      ?.filter((data) => data.inputType === "TEXT")
                      ?.map((field, index) => {
                        const document = LeadData?.documents?.find(
                          (doc) =>
                            doc.name.toLowerCase() === field.name.toLowerCase()
                        );

                        const initialValue =
                          document?.textValue ||
                          formData.find((item) => item.name === field.name)
                            ?.textValue ||
                          "";

                        return (
                          <div className="relative">
                            <TextArea
                              style={{ resize: "none" }}
                              disabled={
                                LeadData?.status === "CLOSED" ||
                                document?.status === "VERIFIED"
                              }
                              key={index}
                              value={
                                document?.status !== "REJECTED"
                                  ? initialValue
                                  : ""
                              }
                              fieldName={field.name}
                              label={field.name}
                              required={field.required}
                              placeholder={`Enter ${field.name.toLowerCase()}`}
                              size="medium"
                              onChange={(e) => {
                                const newValue = e.target.value;
                                handleFormInputChange(field.name, newValue);
                              }}
                            />
                            {document?.status?.toLowerCase() === "rejected" && (
                              <span className="mt-2 text-sm text-red-600">
                                <span className="text-black">Remark: </span>{" "}
                                {document?.remarks}
                              </span>
                            )}
                            <span
                              className={`absolute text-sm right-0 top-[-2px] ${
                                document?.status === "REJECTED"
                                  ? "text-rose-600"
                                  : document?.status === "PENDING"
                                  ? "text-[#f56f10]"
                                  : document?.status === "VERIFIED"
                                  ? "text-green-500"
                                  : ""
                              }`}
                            >
                              {document?.status === "REJECTED"
                                ? "Rejected"
                                : document?.status === "PENDING"
                                ? "In Review"
                                : document?.status === "VERIFIED"
                                ? "Approved"
                                : ""}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                  {LeadData?.plan?.requiredDocuments?.filter(
                    (data) => data.inputType === "TEXT"
                  )?.length !==
                    LeadData?.documents?.filter(
                      (data) =>
                        data.inputType === "TEXT" && data?.status === "VERIFIED"
                    )?.length &&
                    LeadData?.status !== "CLOSED" && (
                      <Button
                        variant="black"
                        className="mt-4 self-end"
                        onClick={async () => {
                          const res = await dispatch(
                            uploadInputData({
                              fields: formData,
                              leadId: leadId,
                            })
                          );

                          if (res.payload.success === true) {
                            toast.success("Document Updated");
                          } else {
                            toast.error("Something went wrong");
                          }
                        }}
                      >
                        Submit
                      </Button>
                    )}
                </div>
              </div>
            )}
          </CardContainer>
        );
      case "details":
        return (
          <div className="flex relative flex-col w-full gap-4 pt-8">
            <DetailedProgressCard
              planName={CONSTANTS[LeadData?.plan?.name] || LeadData?.plan?.name}
              details={DetailedCardDetails2}
              stepsData={mapActionsToStepsData(TimeLineSelector)}
              onUploadClick={() => setActiveTab("upload")}
            />
            {(chatLogs.length > 0 || LeadData?.status !== "CLOSED") && (
              <div className="flex flex-col gap-4  bg-gray-100 rounded-3xl lg:p-9 p-2">
                <div
                  ref={chatContainerRef}
                  className="md:max-h-[600px] min-h-60 max-h-[500px] overflow-y-auto w-full   bg-gray-100 rounded-3xl flex-col justify-start items-start lg:gap-10 gap-6 flex"
                >
                  {chatLogs?.map((chat, index) => (
                    <ChatCard
                      key={index}
                      chatData={chat}
                      formatDates={formatDates}
                    />
                  ))}
                  {selectedFiles.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-[#64748B] mb-2">
                        Selected Files:
                      </p>
                      <div className="grid grid-cols-3 gap-4">
                        {selectedFiles?.map((fileItem, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-center border p-2 rounded-lg"
                          >
                            {(() => {
                              switch (fileItem?.file?.type) {
                                case "image/png":
                                case "image/jpeg":
                                case "image/jpg":
                                  return (
                                    <img
                                      src={fileItem?.uploadedData?.fileUrl}
                                      alt="Preview"
                                      className="w-16 h-16 object-cover rounded-lg border cursor-pointer"
                                      onClick={() =>
                                        handleFilePReview(
                                          fileItem?.uploadedData?.fileUrl
                                        )
                                      }
                                    />
                                  );
                                case "application/pdf":
                                  return (
                                    <div
                                      className="w-16 h-16 flex justify-center items-center border rounded-lg bg-gray-200 text-sm font-semibold text-gray-600 cursor-pointer"
                                      onClick={() =>
                                        handleFilePReview(
                                          fileItem?.uploadedData?.fileUrl
                                        )
                                      }
                                    >
                                      PDF
                                    </div>
                                  );
                                case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                                  return (
                                    <div
                                      className="w-16 h-16 flex justify-center items-center border rounded-lg bg-green-100 text-sm font-semibold text-green-800 cursor-pointer"
                                      onClick={() =>
                                        handleFilePReview(
                                          fileItem?.uploadedData?.fileUrl
                                        )
                                      }
                                    >
                                      XLSX
                                    </div>
                                  );
                                case "application/msword":
                                  return (
                                    <div
                                      className="w-16 h-16 flex justify-center items-center border rounded-lg bg-blue-100 text-sm font-semibold text-blue-800 cursor-pointer"
                                      onClick={() =>
                                        handleFilePReview(
                                          fileItem?.uploadedData?.fileUrl
                                        )
                                      }
                                    >
                                      DOC
                                    </div>
                                  );
                                case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                                  return (
                                    <div
                                      className="w-16 h-16 flex justify-center items-center border rounded-lg bg-blue-100 text-sm font-semibold text-blue-800 cursor-pointer"
                                      onClick={() =>
                                        handleFilePReview(
                                          fileItem?.uploadedData?.fileUrl
                                        )
                                      }
                                    >
                                      DOCX
                                    </div>
                                  );
                                default:
                                  return (
                                    <div
                                      className="w-16 h-16 flex justify-center items-center border rounded-lg bg-gray-100 text-sm font-semibold text-gray-800 cursor-pointer"
                                      onClick={() =>
                                        handleFilePReview(
                                          fileItem?.uploadedData?.fileUrl
                                        )
                                      }
                                    >
                                      {fileItem?.file?.type
                                        .split("/")
                                        .pop()
                                        .toUpperCase()}
                                    </div>
                                  );
                              }
                            })()}

                            <div className="text-sm text-center mt-2">
                              <p className="font-semibold truncate w-16">
                                {fileItem?.fileName}
                              </p>
                            </div>

                            <button
                              onClick={() => handleRemoveFile(fileItem)}
                              className="text-red-500 text-xs font-bold mt-2"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {LeadData?.status !== "CLOSED" && (
                  <ChatInput
                    className="w-full"
                    onChange={handleInputChange}
                    handleFileInputChange={handleFileChange}
                    allowedTypes={allowedTypes}
                    onSend={sendChatData}
                    inputValue={chatInput}
                    isActionDisabled={isSendChatButtonDisabled}
                  />
                )}
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <>
      {isImage && (
        <PreviewImage
          imageUrl={selectedFile}
          onClose={() => {
            setIsImage(false);
          }}
        />
      )}
      <div className="flex flex-col gap-8 pt-8">
        <div className="flex flex-col w-full gap-2">
          <Breadcrumb
            isId={false}
            excludePaths={["dashboard", "service-details"]}
          />
          <Heading variant="xxl">Service Detail</Heading>
        </div>
        <ServiceDetailedCard
          details={[
            {
              label: "Started On",
              content:
                dayjs(LeadData?.startDate).format("DD MMM YYYY") ||
                dayjs(LeadData?.createdAt).format("DD MMM YYYY"),
            },
            {
              label: "Country",
              content: LeadData?.plan?.service?.countries?.[0]?.name,
            },
            {
              label: "Last Updated On",
              content: dayjs(LeadData?.updatedAt).format("DD MMM YYYY"),
            },
          ]}
          variant="border"
          FirstButtonText={"Upload Documents"}
          progressStatus={
            "Finish your pending steps now to stay on track and avoid delays."
          }
          percentage={LeadData?.documentProgress?.percentage}
          heading={CONSTANTS[LeadData?.plan.name]}
          idNumber={LeadData?.leadNo}
        />
        <div className="flex border-b border-gray-200">
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === "details"
                ? "border-b-2 border-primary-500 text-primary-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === "upload"
                ? "border-b-2 border-primary-500 text-primary-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("upload")}
          >
            Documents
          </button>
        </div>
        {renderContent()}
      </div>
      {/* <ToastContainer /> */}
    </>
  );
};

export default ServiceDetailsPage;
