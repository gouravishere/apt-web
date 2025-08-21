import CardContainer from "../CardContainer/CardContainer";

const ChatCard = ({ isSent = true, chatData, formatDates }) => {
  const handleFilePreview = (url) => {
    window.open(url, "_blank");
  };
  return (
    <div
      className={`grid ${
        chatData?.senderType === "User"
          ? "justify-items-end"
          : "justify-items-start"
      } w-full `}
    >
      <CardContainer
        padding="p-4"
        variant="yellow-border"
        className={`lg:max-w-[60%] sm:max-w-[80%] max-w-[90%] flex flex-col gap-6 rounded-lg ${
          isSent ? " text-black rounded-tr-none" : " text-black rounded-tl-none"
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="text-slate-500 text-xs font-normal font-['Poppins'] leading-[18px]">
            {chatData?.senderId?.fullName || chatData?.senderId?.name}{" "}
          </div>
          <div className="border-l border-neutral-300 h-3"></div>
          <div className="text-slate-500 text-xs font-normal font-['Poppins'] leading-[18px]">
            {chatData?.updatedAt && formatDates(chatData?.updatedAt)}{" "}
          </div>
        </div>
        <div className="text-sm md:text-lg">{chatData?.message}</div>
        {chatData?.attachments?.length > 0 && (
          <div>
            <p className="text-sm text-[#64748B] mb-2">Attachments:</p>
            <div className="max-w-xs grid grid-cols-3 gap-4">
              {chatData?.attachments?.map((fileItem, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center border py-2 rounded-lg"
                  onClick={() => {
                    handleFilePreview(fileItem?.fileUrl);
                  }}
                >
                  {(() => {
                    switch (fileItem?.mimeType) {
                      case "image/png":
                      case "image/jpeg":
                      case "image/jpg":
                        return (
                          <img
                            src={fileItem?.fileUrl}
                            alt="Preview"
                            className="w-16 h-16 object-cover rounded-lg border cursor-pointer"
                          />
                        );
                      case "application/pdf":
                        return (
                          <div className="w-16 h-16 flex justify-center items-center border rounded-lg bg-gray-200 text-sm font-semibold text-gray-600 cursor-pointer">
                            PDF
                          </div>
                        );
                      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": // Excel
                        return (
                          <div className="w-16 h-16 flex justify-center items-center border rounded-lg bg-green-100 text-sm font-semibold text-green-800 cursor-pointer">
                            XLSX
                          </div>
                        );
                      case "application/msword": // .doc
                        return (
                          <div className="w-16 h-16 flex justify-center items-center border rounded-lg bg-blue-100 text-sm font-semibold text-blue-800 cursor-pointer">
                            DOC
                          </div>
                        );
                      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document": // .docx
                        return (
                          <div className="w-16 h-16 flex justify-center items-center border rounded-lg bg-blue-100 text-sm font-semibold text-blue-800 cursor-pointer">
                            DOCX
                          </div>
                        );
                      default:
                        return (
                          <div className="w-16 h-16 flex justify-center items-center border rounded-lg bg-gray-100 text-sm font-semibold text-gray-800 cursor-pointer">
                            FILE
                          </div>
                        );
                    }
                  })()}
                  <div className="text-sm text-center mt-2">
                    <p className="font-semibold truncate w-16">
                      {fileItem?.fileName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContainer>
    </div>
  );
};

export default ChatCard;
