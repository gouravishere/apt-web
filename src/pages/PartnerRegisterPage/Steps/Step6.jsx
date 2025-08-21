import React, { useState } from "react";
import SepratorWithHeading from "../SepratorWithHeading/SepratorWithHeading";
import Input from "../../../components/Input/Input";
import DropDown from "../../../components/DropDown/DropDown";
import { uploadFiles } from "../../../redux/GetInTouchSlice/GetInTouchSlice";
import { useDispatch } from "react-redux";
import RenderFileInput from "./comps/RenderFileInput";
import Snackbar from "../../../components/Snackbar/Snackbar";

const accountTypes = [
  { label: "Current", name: "current" },
  { label: "Savings", name: "savings" },
];
const Step6 = ({ formData, handleFormData }) => {
  const handleAccountTypeSelect = (selectedOption) => {
    handleFormData("accountType", selectedOption);
  };

  const [error, setError] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();

  const isFileSizeValid = (file, maxSizeMB = 5) => {
    const fileSizeInMB = file.size / 1024 / 1024; // Convert size from bytes to MB
    return fileSizeInMB <= maxSizeMB;
  };

  const updateAttachmentDId = async (fieldName, event) => {
    try {
      const file = event.target.files[0];
      const files = [];
      if (file) files.push(file);
      setSuccessMessage("uploading");
      const uploadedFiles = await dispatch(uploadFiles({ files })).unwrap();
      if (uploadedFiles) {
        setSuccessMessage("");
        handleFormData("cancelChequeAttachmentId", uploadedFiles[0]);
        event.target.value = "";
      }
    } catch (error) {
      setErrorMessage(
        error?.response?.data || error?.message || "Failed to upload files"
      );
      event.target.value = "";
    }
  };

  const handleFileUpload = (fieldName, event, index) => {
    const file = event.target.files[0];
    if (file) {
      if (!isFileSizeValid(event.target.files[0], 5)) {
        // Max size 1MB
        setError((prev) => ({
          ...prev,
          [index]: true, // Toggle the state of the clicked document
        }));
      } else {
        setError((prev) => ({
          ...prev,
          [index]: false, // Toggle the state of the clicked document
        }));
        if (file) {
          updateAttachmentDId(fieldName, event);
        }
      }
    }
  };

  const handleDeleteFile = (fieldName, event) => {
    event.preventDefault();
    event.stopPropagation();
    handleFormData(fieldName, null);
  };

  return (
    <div className="h-full flex flex-col w-full p-4 md:p-0 md:w-[672px] sm:gap-16 gap-8">
      <div className="w-full grid grid-cols-1 gap-10 overflow-auto">
        {/* Bank Details Section */}
        <div className="w-full grid grid-cols-1 gap-6">
          <SepratorWithHeading heading={"Bank Detail"} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              required
              placeholder={"Enter bank name"}
              label={"Bank Name"}
              value={formData.bankName}
              onChange={(e) => handleFormData("bankName", e.target.value)}
            />
            <Input
              required
              label={"Account Holder Name"}
              placeholder={"Enter account holder name"}
              value={formData.accountNameHolder}
              onChange={(e) =>
                handleFormData("accountNameHolder", e.target.value)
              }
            />
            <Input
              required
              placeholder={"Enter account number"}
              label={"Account Number"}
              value={formData.accountNumber}
              onChange={(e) => handleFormData("accountNumber", e.target.value)}
            />
            <Input
              required
              placeholder={"Enter IFSC code"}
              label={"IFSC Code"}
              value={formData.ifscCode}
              onChange={(e) => handleFormData("ifscCode", e.target.value)}
            />
          </div>
          {/* <Input
            label={"Account Type"}
            value={formData.accountType}
            onChange={(e) => handleFormData("accountType", e.target.value)}
          /> */}
          <DropDown
            required={true}
            label="Account Type"
            options={accountTypes}
            selectedValue={formData?.accountType} // Default to the first option
            onOptionSelect={(e) => handleAccountTypeSelect(e.name)}
          />
          <RenderFileInput
            fieldName={"cancelChequeAttachmentId"}
            label={"Cancelled Cheque"}
            description={
              "File format should be PDF/JPG/PNG and should not exceed 5MB."
            }
            index={"cancelChequeAttachmentId"}
            formData={formData}
            handleDeleteFile={handleDeleteFile}
            handleFileUpload={handleFileUpload}
            error={error}
          />
        </div>

        {/* UPI Details Section */}
        <div className="w-full grid grid-cols-1 gap-6">
          <SepratorWithHeading heading={"UPI Details"} />
          <Input
            label={"UPI ID"}
            value={formData.upiId}
            onChange={(e) => handleFormData("upiId", e.target.value)}
          />
        </div>
      </div>
      {errorMessage && (
        <Snackbar
          message={errorMessage}
          type="error"
          onClose={() => setErrorMessage("")}
        />
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

export default Step6;
