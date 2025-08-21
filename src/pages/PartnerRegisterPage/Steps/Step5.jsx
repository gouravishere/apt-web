import React, { useState } from "react";
import SepratorWithHeading from "../SepratorWithHeading/SepratorWithHeading";
import { useDispatch } from "react-redux";
import { uploadFiles } from "../../../redux/GetInTouchSlice/GetInTouchSlice";
import Snackbar from "../../../components/Snackbar/Snackbar";
import RenderFileInput from "./comps/RenderFileInput";
import TermsAndConditions from "../../T&C/TermsAndConditions";
import PartnerTerms from "../../PartnerTerms/PartnerTerms";

const Step5 = ({ formData, handleFormData, errors }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const isFileSizeValid = (file, maxSizeMB = 5) => {
    const fileSizeInMB = file.size / 1024 / 1024;
    return fileSizeInMB <= maxSizeMB;
  };

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

  const handleDeleteFile = (fieldName, event) => {
    event.preventDefault();
    event.stopPropagation();
    handleFormData(fieldName, null);
  };

  return (
    <div className="h-full flex flex-col w-full p-4 md:p-0 md:w-[672px] sm:gap-16 gap-8">
      <div className="flex flex-wrap gap-6 w-full">
        <SepratorWithHeading heading={"Legal Documents"} />
        <div className="w-full grid grid-cols-1 gap-6">
          <RenderFileInput
            fieldName={"profile"}
            label={"Company/Personal Profile"}
            description={
              "File format should be PDF/JPG/PNG and should not exceed 5MB."
            }
            index={"profile"}
            formData={formData}
            handleDeleteFile={handleDeleteFile}
            handleFileUpload={handleFileUpload}
            error={error}
          />
        </div>
        <div className="flex items-center gap-2 ">
          <input
            checked={formData?.underTakingserviceTerm}
            onChange={(e) => {
              handleFormData(
                "underTakingserviceTerm",
                !formData?.underTakingserviceTerm
              );
            }}
            className="h-4 w-4 cursor-pointer bg-black"
            type="checkbox"
            id="underTakingserviceTerm"
          />
          <label className="cursor-pointer" htmlFor="underTakingserviceTerm">
            I have read and agree to the{" "}
            <span
              onClick={() => {
                setIsTermsOpen(true);
              }}
              className="text-blue-600 underline"
            >
              Terms & Conditions
            </span>
          </label>
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
      {isTermsOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setIsTermsOpen(false)}
          ></div>

          {/* Modal container */}
          <div className="flex items-center justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full ">
              {/* Close button */}
              <button
                onClick={() => setIsTermsOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Terms content */}
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 h-full overflow-y-auto">
                <PartnerTerms onClose={() => setIsTermsOpen(false)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step5;
