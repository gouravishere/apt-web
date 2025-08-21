import React from "react";
import Subtitle from "../../../../components/Subtitle/Subtitle";
import uploadIcon from "../../../../assets/icons/upload.svg";
import deleteButton from "../../../../assets/icons/delete-button.svg";


const RenderFileInput = ({
  fieldName,
  label,
  description,
  index,
  required = true,
  handleDeleteFile,
  handleFileUpload,
  error,
  formData
}) => {
  const renderFileInput = (
    fieldName,
    label,
    description,
    index,
    required
  ) => (
    <div className="w-full">
      <label className="text-slate-500 text-sm font-medium font-['Poppins'] leading-snug">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <Subtitle variant="xs" color={error?.[index] ? "red" : ""}>
        {description}
      </Subtitle>
      <input
        className="hidden"
        id={fieldName}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(e) => handleFileUpload(fieldName, e, index)}
      />
      <label
        htmlFor={formData[fieldName] ? "" : fieldName}
        className={`h-[88px] py-8 bg-[#f8f9fa] rounded-lg border-2 mt-1 
            } border-dashed justify-center items-center w-full gap-2 inline-flex cursor-pointer`}
      >
        {!formData[fieldName] ? (
          <div className="flex justify-center items-center w-full">
            <span className="text-slate-600 text-base font-normal font-['Poppins']">
              Click to upload
            </span>
          </div>
        ) : (
          <div className="flex justify-between items-center w-full">
            <div className="w-2/3 flex items-center gap-2 max-w-[calc(100%-100px)] pl-2 md:pl-4 lg:pl-4">
              <img src={uploadIcon} alt="File Icon" className="w-5 h-5" />
              <span className="text-slate-600 text-base font-normal font-['Poppins'] overflow-hidden whitespace-nowrap text-ellipsis">
                {formData[fieldName]?.fileName}
              </span>
            </div>
            <div className="w-1/3 flex items-center gap-2">
              <span className="text-green-500 text-sm font-semibold">
                Completed
              </span>
              <button
                onClick={(e) => handleDeleteFile(fieldName, e)}
                className="text-red-500"
              >
                <img src={deleteButton} alt="delete" />
              </button>
            </div>
          </div>
        )}
      </label>
    </div>
  );

  return (
    <>
      {renderFileInput(fieldName, label, description, index, required)}
    </>
  );
};

export default RenderFileInput;
