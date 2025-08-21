import ArrowDown from "../../../../assets/icons/arrow-down-circle.svg";
import eye from "../../../../assets/icons/eye.svg";
import Heading from "../../../../components/Heading/Heading";
import pdf from "../../../../assets/icons/pdf.svg";
import CrossIcon from "../../../../assets/icons/close-circle.svg";
import excelIcon from "../../../../assets/images/excel.png";
import wordIcon from "../../../../assets/images/wordImage.png";

const DocumentUploadCard = ({
  type = "img",
  label,
  date,
  status,
  onDownload,
  onClick,
  onChange,
  leadData,
  onEyeClick,
  onDelete,
  fileUrl,
  data,
  fullDocument,
}) => {
  const onDownloadForm = (fileUrl) => {
    const link = window.document.createElement("a");
    link.href = fileUrl?.docLink;
    link.download = fileUrl?.name;
    link.click();
  };

  const getFileIcon = (data) => {
    switch (data.mimeType) {
      case "application/pdf":
        return pdf;
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        return excelIcon;
      case "application/msword":
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return wordIcon;
      default:
        return data.fileUrl;
    }
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

  return (
    <>
      <div
        onClick={onClick}
        className="h-[361px] w-full px-5 py-7 bg-white rounded-2xl border border-[#dee5ec] flex-col gap-6 flex"
      >
        <div className="justify-between items-center flex w-full">
          <div className="flex items-center justify-between gap-2 w-full">
            <Heading variant="lg" weight="medium">
              {label}
            </Heading>
            {data?.inputType === "RELEVANT" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDownloadForm?.(data);
                }}
                className="text-blue-600 mr-2 text-sm font-medium hover:underline"
              >
                Download
              </button>
            )}
          </div>
          <div className="text-nowrap">
            {status && renderStatusButton(status)}
          </div>
        </div>

        {type === "FILE" && (
          <>
            <input
              type="file"
              className="hidden"
              id={`service_details_file_upload${label}`}
              onChange={onChange}
            />
            {leadData?.status?.toLowerCase() !== "closed" && (
              <label
                htmlFor={`service_details_file_upload${label}`}
                className="self-stretch grow shrink basis-0 px-[81px] py-[42px] bg-[#f8f9fa] rounded-2xl border border-[#dee5ec] flex-col justify-center items-center gap-2 flex"
              >
                <div className="h-[73px] flex-col justify-start items-center gap-2.5 flex">
                  <div className="self-stretch h-[39px] flex-col justify-start items-center flex">
                    <div className="self-stretch text-center text-slate-500 text-sm font-normal font-['Poppins'] leading-[21px]">
                      Upload Document
                    </div>
                    <div className="self-stretch text-center text-[#9fafc5] text-xs font-normal font-['Poppins'] leading-[18px]">
                      pdf, png, docx or xlsx
                    </div>
                  </div>
                </div>
              </label>
            )}

            {leadData?.status?.toLowerCase() === "closed" && (
              <Heading
                className={
                  "my-auto mx-auto h-full w-full bg-gray-100 flex justify-center items-center rounded-2xl"
                }
                weight="medium"
                size={"xl"}
              >
                No Document Uploaded
              </Heading>
            )}
          </>
        )}

        {type === "img" && (
          <div className="flex-col h-full gap-6 flex overflow-hidden">
            <div className="grid grid-cols-2 gap-4 overflow-y-auto">
              {fileUrl?.map((document) => (
                <div
                  key={document.id}
                  className="relative w-full  min-h-36 rounded-2xl overflow-hidden"
                >
                  <img
                    className="object-cover w-full min-h-[50%]"
                    src={getFileIcon(document)}
                    alt="Document"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="flex gap-2 absolute bottom-2 right-2">
                    {document.mimeType.includes("image") && (
                      <button
                        onClick={() => onEyeClick(document.fileUrl)}
                        className="h-8 w-8 bg-white rounded-full flex items-center justify-center"
                      >
                        <img src={eye} alt="View" />
                      </button>
                    )}
                    <button
                      onClick={() => onDownload(document.fileUrl)}
                      className="h-8 w-8 bg-white rounded-full flex items-center justify-center"
                    >
                      <img src={ArrowDown} alt="Download" />
                    </button>
                    {status === "PENDING" && (
                      <button
                        onClick={() => onDelete(document, label)}
                        className="h-8 w-8 bg-white rounded-full flex items-center justify-center"
                      >
                        <img src={CrossIcon} alt="Delete" />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {data.inputType === "RELEVANT" && fileUrl?.length === 0 && (
                <>
                  {leadData?.status?.toLowerCase() !== "closed" && (
                    <label
                      htmlFor={`service_details_file_upload${label}`}
                      className="min-h-36 w-full border-2 border-dashed border-[#dee5ec] rounded-2xl flex items-center justify-center cursor-pointer"
                    >
                      <span className="text-3xl text-[#9fafc5]">+</span>
                      <input
                        type="file"
                        className="hidden"
                        id={`service_details_file_upload${label}`}
                        onChange={onChange}
                      />
                    </label>
                  )}
                </>
              )}

              {data.inputType !== "RELEVANT" && status !== "VERIFIED" && (
                <>
                  {leadData?.status?.toLowerCase() !== "closed" && (
                    <label
                      htmlFor={`service_details_file_upload${label}`}
                      className="min-h-36 w-full border-2 border-dashed border-[#dee5ec] rounded-2xl flex items-center justify-center cursor-pointer"
                    >
                      <span className="text-3xl text-[#9fafc5]">+</span>
                      <input
                        type="file"
                        className="hidden"
                        id={`service_details_file_upload${label}`}
                        onChange={onChange}
                      />
                    </label>
                  )}
                </>
              )}
            </div>
            {date && (
              <div className="text-slate-500 text-sm font-normal font-['Poppins'] leading-snug">
                {/* 29 November 2024, 11:00 AM */}
                {date}
              </div>
            )}
          </div>
        )}

        {type === "error" && (
          <>
            <div className="h-full px-10 py-6 bg-rose-50 rounded-2xl border border-[#dee5ec] flex-col justify-center items-center gap-6 inline-flex">
              <div className="self-stretch text-rose-600 text-center   text-sm font-normal font-['Poppins'] leading-[21px]">
                {fullDocument?.remarks}
              </div>
              <input
                type="file"
                className="hidden"
                id={`service_details_file_upload${label}`}
                onChange={onChange}
              />
              {leadData?.status?.toLowerCase() !== "closed" && (
                <label
                  className="rounded-3xl border-2 border-black px-3 py-2"
                  htmlFor={`service_details_file_upload${label}`}
                >
                  Upload Documents
                </label>
              )}
            </div>
            {date && (
              <div className="text-slate-500 text-sm font-normal font-['Poppins'] leading-snug">
                {date}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default DocumentUploadCard;
