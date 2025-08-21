import Button from "../../../../components/Button/Button";
import AttachSquare from "../../../../assets/icons/attach-square.svg";
import { useRef } from "react";
const ChatInput = ({
  placeholder = "Write your concern",
  onSend,
  onChange,
  className,
  allowedTypes,
  handleFileInputChange,
  inputValue,
  isActionDisabled = false,
}) => {
  const fileInputRef = useRef(null);
  return (
    <div
      className={`${className} md:px-6 md:py-4 py-2 px-4 bg-white rounded-[43px] border border-neutral-300 justify-between items-center w-full inline-flex`}
    >
      <div className="flex items-center w-[90%] gap-3">
        <img
          src={AttachSquare}
          alt="attach"
          onClick={() => fileInputRef.current.click()} // Trigger the file input on image click
        />

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept={allowedTypes.join(",")}
          multiple
          className="hidden" // Hide the file input
          onChange={handleFileInputChange} // Handle file input change
        />

        <input
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isActionDisabled) {
              onSend();
            }
          }}
          placeholder={placeholder}
          className="placeholder:text-slate-500 placeholder:text-base font-normal font-['Poppins'] leading-normal outline-none  border-black w-full "
          type="text"
          onChange={onChange} // Event handler for input change
          value={inputValue}
        />
      </div>
      <Button
        size="sm"
        variant="black"
        onClick={(e) => {
          if (!isActionDisabled) {
            onSend(e);
          }
        }}
      >
        {isActionDisabled ? "Sending" : "Send"}{" "}
        {/* Fixed label for the button */}
      </Button>
    </div>
  );
};

export default ChatInput;
