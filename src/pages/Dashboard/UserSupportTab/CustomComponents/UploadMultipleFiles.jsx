import { useState, useRef, useEffect } from "react";
import uploadIcon from "../../../../../src/assets/icons/upload.svg";
import { uploadFiles } from "../../../../redux/GetInTouchSlice/GetInTouchSlice";
import { useDispatch } from "react-redux";

export default function UploadFile({
  allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel
    "application/msword", // .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  maxSize = 2 * 1024 * 1024, // 2MB
  onFilesSelected = () => {},
  label = "Upload Files",
  description = "File format should be PNG, JPEG, or PDF. File size should not exceed 2MB.",
  containerStyle = "",
  isRequired = false,
}) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const uploadFile = async (event) => {
    try {
      // Get the files from the event
      const files = Array.from(event.target.files);
      // Initialize an array to store files with metadata
      const filesWithMetadata = files.map((file) => ({
        file,
      }));

      // Upload the files via dispatch
      const uploadedFiles = await dispatch(uploadFiles({ files })).unwrap();

      if (uploadedFiles) {
        // Combine the uploaded files with metadata
        const newFiles = uploadedFiles.map((uploadedFile, index) => ({
          ...filesWithMetadata[index], // Metadata from the file itself
          uploadedData: uploadedFile, // API response data for the file
        }));

        // Update the state with both file metadata and uploaded data
        const updatedFiles = [...selectedFiles, ...newFiles];
        setSelectedFiles(updatedFiles);
        onFilesSelected(updatedFiles);
      }
    } catch (error) {
      console.error(error?.response?.data?.message || "Failed to upload files");
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter((file) => {
      if (!allowedTypes.includes(file.type)) {
        alert(`${file.name} is not a valid file type.`);
        return false;
      }
      if (file.size > maxSize) {
        alert(
          `${file.name} exceeds the size limit of ${(
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
      (file, i) => file?.id !== fileItem?.id
    );
    setSelectedFiles(updatedFiles);
    onFilesSelected(updatedFiles);
  };

  const handleFilePReview = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className={containerStyle}>
      <div className="block text-sm text-[#64748B] mb-2">{label}</div>
      <div className="block text-sm text-[#64748B] mb-2">{description}</div>
      <div
        onClick={handleClick}
        className="w-full border-2 border-dotted border-slate-300 p-8 cursor-pointer rounded-lg flex justify-center items-center h-16"
      >
        <div className="block text-md text-[#64748B] mb-2 font-semibold">
          <div className="flex items-center">
            <img
              src={uploadIcon}
              alt="Upload icon"
              className="mr-2 w-5 h-5 text-sm"
            />
            Click to upload
          </div>
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept={allowedTypes.join(",")}
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
      {selectedFiles.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-[#64748B] mb-2">Selected Files:</p>
          <div className="grid grid-cols-3 gap-4">
            {selectedFiles.map((fileItem, index) => (
              <div
                key={index}
                className="flex flex-col items-center border p-2 rounded-lg"
              >
                {fileItem?.file?.type === "application/pdf" ? (
                  <div
                    className="w-16 h-16 flex justify-center items-center border rounded-lg bg-gray-200 text-sm font-semibold text-gray-600 cursor-pointer"
                    onClick={() => {
                      handleFilePReview(fileItem?.uploadedData?.fileUrl);
                    }}
                  >
                    PDF
                  </div>
                ) : (
                  <img
                    src={fileItem?.uploadedData?.fileUrl}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-lg border cursor-pointer"
                    onClick={() => {
                      handleFilePReview(fileItem?.uploadedData?.fileUrl);
                    }}
                  />
                )}
                <div className="text-sm text-center mt-2">
                  <p className="font-semibold truncate w-16">
                    {fileItem?.fileName}
                  </p>
                  {/* <p className="text-xs">{(file.size / 1024).toFixed(2)} KB</p> */}
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
      {isRequired && selectedFiles.length === 0 && (
        <div className="text-red-500 text-sm mt-2">
          At least one file is required to proceed.
        </div>
      )}
    </div>
  );
}
