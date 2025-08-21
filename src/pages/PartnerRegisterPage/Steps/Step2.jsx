import React, { useState } from "react";
import SepratorWithHeading from "../SepratorWithHeading/SepratorWithHeading";
import Input from "../../../components/Input/Input";
import InputPhone from "../../../components/PhoneInput/PhoneInput";
import RenderFileInput from "./comps/RenderFileInput";
import { useDispatch } from "react-redux";
import { uploadFiles } from "../../../redux/GetInTouchSlice/GetInTouchSlice";
import Snackbar from "../../../components/Snackbar/Snackbar";

const Step2 = ({ formData, handleFormData, errors }) => {
  const [error, setError] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();

  const updateAttachmentId = async (fieldName, event) => {
    try {
      const file = event.target.files[0];
      const files = [];
      if (file) files.push(file);
      setSuccessMessage("uploading");
      const uploadedFiles = await dispatch(uploadFiles({ files })).unwrap();
      if (uploadedFiles) {
        setSuccessMessage("");
        handleFormData(fieldName, uploadedFiles[0]);
        event.target.value = "";
      }
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || "Failed to upload files"
      );
      event.target.value = "";
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleFileUpload = (fieldName, event, index) => {
    const file = event.target.files[0];
    if (file) {
      if (!isFileSizeValid(file)) {
        setError((prev) => ({ ...prev, [index]: true }));
      } else {
        setError((prev) => ({ ...prev, [index]: false }));
        updateAttachmentId(fieldName, event);
      }
    }
  };

  const isFileSizeValid = (file, maxSizeMB = 5) => {
    const fileSizeInMB = file.size / 1024 / 1024;
    return fileSizeInMB <= maxSizeMB;
  };

  const handleDeleteFile = (fieldName, event) => {
    event.preventDefault();
    event.stopPropagation();
    handleFormData(fieldName, null);
  };

  return (
    <div className="h-full flex flex-col w-full p-4 md:p-0 md:w-[672px] sm:gap-16 gap-8">
      <div className="flex flex-wrap gap-6 w-full">
        <SepratorWithHeading heading={"Personal/Business Details"} />
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label={"Full Name"}
            placeholder="Enter your full name"
            value={formData.name || ""}
            onChange={(e) => handleFormData("name", e.target.value)}
            required
            errorMessage={errors?.name}
          />
          <Input
            label={"Business Name (if applicable)"}
            placeholder="Enter your business name (if applicable)"
            value={formData.businessName || ""}
            onChange={(e) => handleFormData("businessName", e.target.value)}
          />
          <Input
            label={"Email"}
            type="email"
            validate={() => validateEmail(formData.emailId)}
            errorMessage={errors?.emailId}
            placeholder="Enter your email address"
            value={formData.emailId || ""}
            onChange={(e) => handleFormData("emailId", e.target.value)}
            required
          />
          <InputPhone
            label={"Phone Number"}
            placeholder="Enter your phone number"
            value={formData.phoneNumber || ""}
            onChange={(e) =>
              handleFormData("phoneNumber", `+${e.countryCode}${e.phoneNumber}`)
            }
            required
            errorMessage={errors?.phoneNumber}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-6 w-full">
        <SepratorWithHeading heading={"Personal/Bussiness Documents"} />
        <div className="w-full grid grid-cols-1 gap-6">
          <Input
            label="GST Registration Number"
            placeholder="Enter GST number"
            value={formData.gstNumber || ""}
            onChange={(e) => handleFormData("gstNumber", e.target.value)}
          />
          <RenderFileInput
            fieldName={"gstNoFile"}
            required={false}
            label={"GST"}
            description={
              "File format should be PDF/JPG/PNG and should not exceed 5MB."
            }
            index={"gstnofile"}
            formData={formData}
            handleDeleteFile={handleDeleteFile}
            handleFileUpload={handleFileUpload}
            error={error}
          />
          <RenderFileInput
            fieldName={"panCard"}
            label={"PAN Card"}
            description={
              "File format should be PDF/JPG/PNG and should not exceed 5MB."
            }
            index={"pan"}
            formData={formData}
            handleDeleteFile={handleDeleteFile}
            handleFileUpload={handleFileUpload}
            error={error}
          />
          <RenderFileInput
            fieldName={"aadharCard"}
            label={"Aadhar Card"}
            description={
              "File format should be PDF/JPG/PNG and should not exceed 5MB."
            }
            index={"aadhar"}
            formData={formData}
            handleDeleteFile={handleDeleteFile}
            handleFileUpload={handleFileUpload}
            error={error}
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full">
        <SepratorWithHeading heading={"Office Location"} />
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label={"City"}
            placeholder="Enter your city"
            value={formData.city || ""}
            onChange={(e) => handleFormData("city", e.target.value)}
          />
          <Input
            label={"Pin Code"}
            placeholder="Enter your Pin Code"
            type="number"
            value={formData.pincode || ""}
            onChange={(e) => handleFormData("pincode", e.target.value)}
          />
          <Input
            label={"State"}
            placeholder="Enter your state"
            value={formData.state || ""}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[a-zA-Z\s]*$/.test(value)) {
                handleFormData("state", value);
              }
            }}
          />
        </div>
        <div className="w-full">
          <Input
            label={"Address"}
            placeholder="Enter your complete address"
            value={formData.address || ""}
            onChange={(e) => handleFormData("address", e.target.value)}
            required
            errorMessage={errors?.address}
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

export default Step2;
