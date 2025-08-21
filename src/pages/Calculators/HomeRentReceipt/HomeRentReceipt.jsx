import React, { useState } from "react";
import Button from "../../../components/Button/Button";
import CalculatorInputsContainer from "../../../components/CalculatorInputsContainer/CalculatorInputsContainer";
import Datepicker from "../../../components/DatePicker/DatePicker";
import DropDown from "../../../components/DropDown/DropDown";
import HeadingBreadCrumb from "../../../components/HeadingBreadCrumb/HeadingBreadCrumb";
import Input from "../../../components/Input/Input";
import HomeRentReceiptCard from "./HomeRentReceiptCard/HomeRentReceiptCard";
import Banner from "../../../components/Banner/Banner";
import FAQs from "../../../components/HomePage/FAQs/FAQs";
import CalculatorCard from "../../../components/CalculatorCard/CalculatorCard";
import QuestionCard from "../../../components/QuestionCard/QuestionCard";
import { useNavigate } from "react-router-dom";
import link from "../../../assets/icons/export.svg";

export default function HomeRentReceipt() {
  const [formData, setFormData] = useState({
    tenantName: "",
    landlordName: "",
    monthlyRent: "",
    rentedHouseAddress: "",
    tenantPAN: "",
    landlordPAN: "",
    startDate: "",
    endDate: "",
    frequency: "",
  });
  const navigate = useNavigate();
  const [receipt, setReceipt] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [validate, setValidate] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "tenantPAN" || name === "landlordPAN") {
      const formattedValue = formatPAN(value);
      setFormData({ ...formData, [name]: formattedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const formatPAN = (value) => {
    let formattedValue = value.toUpperCase();
    const firstFive = formattedValue.slice(0, 5).replace(/[^A-Z]/g, "");
    const nextFour = formattedValue.slice(5, 9).replace(/[^0-9]/g, "");
    const lastOne = formattedValue.slice(9, 10).replace(/[^A-Z]/g, "");

    formattedValue = firstFive + nextFour + lastOne;

    return formattedValue.slice(0, 10);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const calculateMonths = () => {
    const { startDate, endDate } = formData;
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    let months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());

    if (end.getDate() > start.getDate()) {
      months += 1;
    }

    return months;
  };

  const calculateReceipt = () => {
    const {
      tenantName,
      landlordName,
      monthlyRent,
      rentedHouseAddress,
      tenantPAN,
      landlordPAN,
      startDate,
      endDate,
      frequency,
    } = formData;
    const monthsPaid = calculateMonths();

    const monthlyRentNumber = parseFloat(monthlyRent);

    if (isNaN(monthlyRentNumber)) {
      alert("Please enter a valid monthly rent.");
      return;
    }

    const grossRent = monthlyRentNumber * monthsPaid;

    let netRent = grossRent;

    switch (frequency) {
      case "quarterly":
        netRent = grossRent * 3;
        break;
      case "halfyearly":
        netRent = grossRent * 6;
        break;
      case "yearly":
        netRent = grossRent * 12;
        break;
      default:
        break;
    }

    const panRequirement =
      grossRent > 100000
        ? "PAN card of tenant and landlord is required."
        : "PAN card not required for this transaction.";

    const receiptData = {
      receiptNumber: `R-${Date.now()}`,
      tenantName,
      landlordName,
      grossRent,
      monthsPaid,
      rentedHouseAddress,
      tenantPAN,
      landlordPAN,
      netRent,
      panRequirement,
      frequency,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    };

    setReceipt(receiptData);
    setShowCard(true);
  };

  const validateInputs = () => {
    let error = {};
    if (!formData.tenantName) error.tenantName = "This field can't be empty";
    if (!formData.landlordName)
      error.landlordName = "This field can't be empty";
    if (!formData.monthlyRent) error.monthlyRent = "This field can't be empty";
    if (!formData.rentedHouseAddress)
      error.rentedHouseAddress = "This field can't be empty";
    if (!formData.tenantPAN) error.tenantPAN = "This field can't be empty";
    if (formData.monthlyRent > 50000 && !formData.landlordPAN) {
      error.landlordPAN = "Please enter a PAN.";
    }

    // Validate PAN length
    if (formData.tenantPAN.length < 10) {
      error.tenantPAN = "PAN must be exactly 10 characters.";
    }
    if (formData.landlordPAN && formData.landlordPAN.length < 10) {
      error.landlordPAN = "PAN must be exactly 10 characters.";
    }

    setValidate(error);

    return Object.keys(error).length === 0;
  };

  const submitHandler = () => {
    if (validateInputs()) {
      calculateReceipt();
    }
  };

  return (
    <div>
      <HeadingBreadCrumb
        isHeadingDesign={true}
        isHeadingDesignArrow={true}
        yellowDotRight={true}
        heading="Home Rent Receipt"
        description="The Home Rent Receipt Calculator helps maintain a record of regular rent payments and is especially useful for individuals claiming rent-related deductions, such as HRA exemption."
      />
      <CalculatorInputsContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <Input
            placeholder="Enter Name"
            fieldName="tenantName"
            label="Tenant Name"
            required={false}
            type="text"
            value={formData.tenantName}
            onChange={handleChange}
            validate={(value) =>
              value <= 0 ? "This field can't be empty" : ""
            }
            validateMsg={validate.tenantName}
          />
          <Input
            placeholder="Enter Name"
            fieldName="landlordName"
            label="Landlord Name"
            required={false}
            type="text"
            value={formData.landlordName}
            onChange={handleChange}
            validate={(value) =>
              value <= 0 ? "This field can't be empty" : ""
            }
            validateMsg={validate.landlordName}
          />
          <Input
            placeholder="Enter Amount"
            fieldName="monthlyRent"
            label="Monthly Rent"
            required={false}
            type="number"
            min={0}
            value={formData.monthlyRent}
            onChange={handleChange}
            validate={(value) =>
              value <= 0 ? "This field can't be empty" : ""
            }
            validateMsg={validate.monthlyRent}
          />
          <Datepicker
            label="Start Date"
            selected={formData.startDate}
            onChange={(date) => setFormData({ ...formData, startDate: date })}
          />
          <Datepicker
            label="End Date"
            selected={formData.endDate}
            onChange={(date) => setFormData({ ...formData, endDate: date })}
          />
          <DropDown
            label="How Would You Like The Receipts"
            value={formData.frequency}
            defaultValue="Monthly"
            onOptionSelect={(option) =>
              setFormData({ ...formData, frequency: option.name.toLowerCase() })
            }
            options={[
              { label: "Monthly", name: "Monthly" },
              { label: "Quarterly", name: "Quarterly" },
              { label: "Half-Yearly", name: "Half-Yearly" },
              { label: "Yearly", name: "Yearly" },
            ]}
          />
          <Input
            placeholder="Enter Address"
            fieldName="rentedHouseAddress"
            label="Rented House Address"
            required={false}
            type="text"
            value={formData.rentedHouseAddress}
            onChange={handleChange}
            validate={(value) =>
              value <= 0 ? "This field can't be empty" : ""
            }
            validateMsg={validate.rentedHouseAddress}
          />
          <Input
            placeholder="Enter PAN Number"
            fieldName="tenantPAN"
            label="Tenant PAN Card"
            required={false}
            type="text"
            value={formData.tenantPAN}
            onChange={handleChange}
            validate={(value) =>
              value <= 0 ? "This field can't be empty" : ""
            }
            validateMsg={validate.tenantPAN}
          />
          <Input
            placeholder="Enter PAN Number"
            fieldName="landlordPAN"
            label="Landlord PAN Card (Optional)"
            required={formData.monthlyRent > 50000 ? true : false}
            type="text"
            value={formData.landlordPAN}
            onChange={handleChange}
            validateMsg={validate.landlordPAN}
          />
        </div>
        <Button onClick={submitHandler} variant="black" className="mt-6">
          Calculate Now
        </Button>
        {showCard && (
          <HomeRentReceiptCard
            receipt={receipt}
            frequency={formData.frequency}
          />
        )}
      </CalculatorInputsContainer>
      <Banner />
      <div className="flex flex-col md:py-[120px] py-[40px]  md:gap-[80px] gap-[30px]">
        <div className="text-center text-neutral-900 text-[32px] font-medium font-['Poppins'] leading-10">
          Our Calculators
        </div>
        <div className="grid gap-[40px] xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full place-items-center">
          <CalculatorCard
            name={"Income Tax Calculator"}
            descripiton={
              "Get an accurate estimate of your income tax liability."
            }
            route={"/calculators/Income-tax"}
          />
          <CalculatorCard
            name={"Old & New Tax Regime"}
            descripiton={
              "Determine your income tax return filing requirements with ease."
            }
            route={"/calculators/old-and-new-tax-regime"}
          />
          <CalculatorCard
            name={"SIP Calculator"}
            descripiton={
              "Estimate your returns on Systematic Investment Plans (SIPs)."
            }
            route={"/calculators/sip"}
          />
        </div>
        <Button
          className="self-center"
          onClick={() => navigate("/calculators")}
          variant="outline"
        >
          View all calculators
          <img className="ml-2" src={link} alt="" />
        </Button>
      </div>
      <div className="flex flex-col gap-[80px]">
        <QuestionCard
          question={"What is the Home rent receipt generator?"}
          Answer={
            "The Rent Receipt Generator is a user-friendly tool for tenants to generate receipts for rent payments. These receipts are essential for salaried employees claiming HRA exemptions and for landlords maintaining payment records. It simplifies the otherwise tedious process of creating detailed rent receipts."
          }
        />
        <QuestionCard
          question={"How Does the Home rent receipt generator work?"}
          Answer={
            "The generator requires inputs like the tenant’s name, landlord’s name, rent amount, rental address, and payment duration. It uses this information to create a professional, printable receipt in seconds. This tool is especially helpful during tax filing or as proof of payment in disputes."
          }
        />
      </div>
      <FAQs />
    </div>
  );
}
