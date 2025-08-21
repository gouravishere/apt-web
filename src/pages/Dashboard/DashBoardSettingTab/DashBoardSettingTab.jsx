import React, { useEffect, useState } from "react";
import Heading from "../../../components/Heading/Heading";
import DashBoardHeading from "../DashboardComponents/DashBoardHeading/DashboardHeading";
import CardContainer from "../DashboardComponents/CardContainer/CardContainer";
import Seprator from "../../../components/Seprator/Seprator";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, logout } from "../../../redux/authSlice/authSlice";
import dayjs from "dayjs";
import axiosInstance from "../../../utils/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import InputPhone from "../../../components/PhoneInput/PhoneInput";
import DropDown from "../../../components/DropDown/DropDown";
import TextArea from "../../../components/TextArea/TextArea";
import axios from "axios";
import SmallLoading from "../../../components/LoadingSpinner/SmallLoading";
import { add } from "date-fns/add";

const LogoWithLetter = ({ name }) => {
  return (
    <div className="md:w-24 md:h-24 h-16 w-16 mt-3 md:mt-0  bg-[#fff9eb] rounded-full justify-center items-center flex">
      <div className="text-center text-[#fedc60] text-[32px] font-bold leading-[44.80px] tracking-[2.56px]">
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

const LocationCard = ({ deviceName, location, date }) => {
  return (
    <div className="h-11 flex-col justify-start items-start gap-1 inline-flex">
      <div className="self-stretch justify-start items-center inline-flex">
        <div className="w-[153px] text-[#051227] text-sm font-normal font-['Poppins'] leading-snug">
          {deviceName?.toUpperCase()}
        </div>
        <div className="w-[18px]"></div>
        <div className="w-[79px] text-slate-600 text-xs font-normal font-['Poppins'] leading-[18px]">
          {location}
        </div>
      </div>
      <div className="text-slate-600 text-xs font-normal font-['Poppins'] leading-[18px]">
        {dayjs(date).format("DD MMM YYYY, hh:MM A")}
      </div>
    </div>
  );
};

const DashBoardSettingTab = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth.userDetails);
  const [phone, setPhone] = useState(data?.user?.phone);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [resetDropdown, setResetDropdown] = useState(false);
  useEffect(() => {
    setPhone(data?.user?.phone);
    setSelectedCountry(data?.user?.country);
    setSelectedState(data?.user?.state);
    setAddress(data?.user?.address);
  }, [data]);

  useEffect(() => {
    if(selectedCountry?.toLowerCase() !== "india") {
      setSelectedState("");
    }
  },[data?.user?.country, selectedCountry])

  const handleLogout = () => {
    dispatch(logout());
  };

  const [maxDate, setMaxDate] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    setMaxDate(today);
  }, []);

  const handleDateChange = async (
    newDob,
    newAnniversary,
    phone = data?.user?.phone
  ) => {
    try {
      const response = await axiosInstance.patch("/users/update-dob", {
        dob: newDob,
        anniversary: newAnniversary,
        phone: phone,
      });

      if (!response.data.success) {
        console.error("Failed to update dates");
      }

      dispatch(getUserDetails());
      toast.success("Profile Updated successfully");
    } catch (error) {
      console.error("Error updating dates:", error);
    }
  };

  const handleAddressSubmit = async () => {
    setLoading(true)
    try {
      const payload = {
        country: selectedCountry,
        state: selectedState,
        address: address,
      };

      await axiosInstance.patch("/users/update-address", payload);

      const res = await dispatch(getUserDetails());
      setSelectedCountry(res?.payload?.user?.country);
      setSelectedState(res?.payload?.user?.state);
      setAddress(res?.payload?.user?.address);
 
    } catch (error) {
      setLoading(false)
      console.error("Error updating address:", error);
      // Optional: Show error toast/snackbar
    }
    setLoading(false)
  };

  useEffect(() => {
    const fetchStates = async () => {
      if (!selectedCountry || selectedCountry?.toLowerCase() !== "india")
        return; // Don't fetch states if no country is selected

      setLoading(true);

      try {
        // Fetch states for the selected country using Geonames 'childrenJSON' endpoint
        const res = await axios.post(
          "https://countriesnow.space/api/v0.1/countries/states",
          {
            country: selectedCountry,
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
  }, [selectedCountry]);


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

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  const originalCountry = data?.user?.country || "";
  const originalState = data?.user?.state || "";
  const originalAddress = data?.user?.address || "";

  // Check if anything changed
  const hasChanged =
    selectedCountry !== originalCountry ||
    selectedState !== originalState ||
    address.trim() !== originalAddress.trim();

  // Proper validation
  const isValid =
    selectedCountry?.trim() &&
    address?.trim() &&
    (selectedCountry.toLowerCase() !== "india"
      ? true
      : !!selectedState?.trim()); // State required only for India


  return (
    <div className="flex flex-col w-full gap-10 ">
      {loading && (
        <div className="fixed h-screen flex items-center justify-center left-0 top-0 z-[999] w-screen bg-black/20">
          <SmallLoading />
        </div>
      )}
      <DashBoardHeading heading={"Settings"} />
      <CardContainer className={"flex flex-col w-full gap-9"}>
        <div className="xl:grid flex-col gap-4 xl:grid-cols-[auto_1fr] xl:gap-40">
          <div className="xl:max-w-[238px] flex flex-col">
            <Heading variant="bs">Profile</Heading>
            <div className="text-slate-600 text-xs font-normal font-['Poppins'] leading-[18px]">
              Manage your personal details and preferences.
            </div>
          </div>
          <div className="flex flex-col mt-5 xl:mt-0 gap-6 w-full">
            <LogoWithLetter name={data?.user?.fullName} />
            <div className="flex flex-col md:flex-row gap-1 md:gap-12 md:items-center">
              <div className="md:w-[150px]">
                <Heading variant="sm">Name</Heading>
              </div>
              <Input disabled={true} value={data?.user?.fullName} />
            </div>
            <div className="flex flex-col md:flex-row gap-1 md:gap-12 md:items-center">
              <div className="md:w-[150px]">
                <Heading variant="sm">Email</Heading>
              </div>
              <Input disabled={true} value={data?.user?.email} />
            </div>

            <div className="flex flex-col md:flex-row gap-1 md:gap-12 md:items-center">
              <div className="md:w-[150px]">
                <Heading variant="sm">Contact No.</Heading>
              </div>
              <div className="flex w-full gap-3 items-center">
                <InputPhone
                  isLabel={false}
                  placeholder="Enter your phone number"
                  value={data?.user?.phone}
                  onChange={(e) => {
                    if (e) {
                      setPhone(`+${e.countryCode}${e.phoneNumber}`);
                    }
                  }}
                />

                {/* <Input
                  value={data?.user?.phone}
                  onChange={(e) => {
                    if (e.target.value) {
                      setPhone(e.target.value);
                    }
                  }}
                  type="phone"
                /> */}
                {phone !== data?.user?.phone && (
                  <button
                    onClick={() => {
                      handleDateChange(
                        data?.user?.dob,
                        data?.user?.anniversary,
                        phone
                      );
                    }}
                    className="border bg-primary-300 h-11 px-2  rounded"
                  >
                    Update
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-1 md:gap-12 md:items-center">
              <div className="md:w-[150px]">
                <Heading variant="sm">Date of Birth</Heading>
              </div>
              <Input
                max={maxDate}
                value={dayjs(data?.user?.dob).format("YYYY-MM-DD")}
                onChange={(e) => {
                  if (e.target.value) {
                    handleDateChange(
                      dayjs(e.target.value).toISOString(),
                      data?.user?.anniversary
                    );
                  }
                }}
                type="date"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-1 md:gap-12 md:items-center">
              <div className="md:w-[150px]">
                <Heading variant="sm">Anniversary Date</Heading>
              </div>
              <Input
                max={maxDate}
                value={
                  dayjs(data?.user?.anniversary).format("YYYY-MM-DD") ||
                  "2000-01-01"
                }
                onChange={(e) => {
                  if (e.target.value) {
                    handleDateChange(
                      data?.user?.dob,
                      dayjs(e.target.value).toISOString()
                    );
                  }
                }}
                type="date"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-1 md:gap-12 md:items-center">
              <div className="md:w-[150px]">
                <Heading variant="sm">Country</Heading>
              </div>
              <DropDown
                searchAble={true}
                options={countries}
                selectedValue={selectedCountry}
                onOptionSelect={(e) => {
                  setResetDropdown(false);
                  setSelectedCountry(e.label);
                }} // Update country on selection
              />
            </div>

            {selectedCountry?.toLowerCase() === "india" && (
              <div className="flex flex-col md:flex-row gap-1 md:gap-12 md:items-center">
                {/* State Dropdown */}
                <div className="md:w-[150px]">
                  <Heading variant="sm">State</Heading>
                </div>
                <DropDown
                  searchAble={true}
                  options={states}
                  setResetDropdown={setResetDropdown}
                  resetDropdown={resetDropdown}
                  selectedValue={selectedState}
                  onOptionSelect={(e) => {
                    setResetDropdown(false);
                    setSelectedState(e.label);
                  }}
                  disabled={!selectedCountry} // Disable until a country is selected
                />
              </div>
            )}
            {/* Address Field */}

            <div className="flex flex-col md:flex-row gap-1 md:gap-12 md:items-center">
              <div className="md:w-[150px]">
                <Heading variant="sm">Address</Heading>
              </div>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)} // Update address on input
                placeholder="Enter your address"
              />
            </div>

            {hasChanged && (
              <button
                onClick={isValid ? handleAddressSubmit : undefined}
                disabled={!isValid}
                className={`border self-end h-11 px-2 rounded ${
                  isValid ? "bg-primary-300" : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Update Address
              </button>
            )}

            <Seprator />
            <Heading variant="sm">Recent Login</Heading>
            {/* device info */}
            <div className="flex flex-col md:flex-row items-start gap-4 md:gap-16">
              {data?.lastLoginLogs?.[1] && (
                <LocationCard
                  deviceName={data?.lastLoginLogs?.[0]?.deviceType}
                  date={data?.lastLoginLogs?.[0]?.createdAt}
                />
              )}
              {data?.lastLoginLogs?.[1] && (
                <div className="h-full border-l border-black"></div>
              )}
              <LocationCard
                deviceName={data?.lastLoginLogs?.[1]?.deviceType}
                date={data?.lastLoginLogs?.[1]?.createdAt}
              />
            </div>
          </div>
        </div>
        {/* <Seprator /> */}

        {/* <div className="xl:grid xl:grid-cols-[auto_1fr] flex flex-col gap-6 xl:gap-40">
          <div className="flex flex-col xl:max-w-[236px] gap-1">
            <Heading variant="bs">Notifications</Heading>
            <div className="text-slate-600 text-xs font-normal font-['Poppins'] leading-[18px]">
              Tailor your notification preferences to suit your needs.
            </div>
          </div>

          <div className="flex flex-col gap-6 md:mt-0 mt-6">
            <div className="grid md:grid-cols-2 w-full gap-1 md:gap-40 ">
              <Heading className={"text-nowrap"} variant="sm">
                Allow notifications for Updates & Reminders
              </Heading>
              <div className="flex items-center gap-10">
                <SelectBox label={"Email"} />
                <SelectBox label={"SMS"} />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-1 md:gap-40  ">
              <Heading className={"text-nowrap"} variant="sm">
                Allow notifications for Promotional Messages
              </Heading>
              <div className="flex items-center gap-10">
                <SelectBox label={"Email"} />
                <SelectBox label={"SMS"} />
              </div>
            </div>
          </div>
        </div> */}

        {/* <Seprator />

        <div className="grid md:grid-cols-[auto_1fr] md:gap-40">
          <div className="flex flex-col max-w-[236px] gap-1">
            <Heading variant="bs">Language & Timezone</Heading>
            <div className="text-slate-600 text-xs font-normal font-['Poppins'] leading-[18px]">
              Adjust language and timezone settings to match your needs.
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 mt-4 md:mt-0">
            <div className="flex flex-col md:flex-row md:gap-12 gap-2 items-start md:items-center ">
              <Heading className={"text-nowrap"} variant="sm">
                Select Language
              </Heading>
              <div className="w-full md:max-w-[200px]">
                <DropDown />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:gap-12 gap-2 items-start md:items-center ">
              <Heading className={"text-nowrap"} variant="sm">
                Select Timezone&nbsp;
              </Heading>
              <div className="w-full md:max-w-[200px]">
                <DropDown />
              </div>
            </div>
          </div>
        </div> */}
        <Seprator />
        <div className="flex justify-end">
          <Button onClick={handleLogout} variant="danger">
            Logout
          </Button>
        </div>
      </CardContainer>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default DashBoardSettingTab;
