import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Heading from "../../components/Heading/Heading";
import CardContainer from "../Dashboard/DashboardComponents/CardContainer/CardContainer";
import Steper from "../../components/Steper/Steper";
import greentick from "../../assets/icons/green-tick-circle.svg";
import ChatInput from "../Dashboard/DashboardComponents/ChatInput/ChatInput";
import ChatCard from "../Dashboard/DashboardComponents/ChatCard/ChatCard";
import { useDispatch, useSelector } from "react-redux";
import { uploadFiles } from "./../../redux/GetInTouchSlice/GetInTouchSlice";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Snackbar from "../../components/Snackbar/Snackbar";
import { fetchUnseenNotifications } from "../../redux/NotificationSlice/NotificationSlice";

const base_url = process.env.REACT_APP_SOCKET_URL;

const TicketCardHeading = ({ heading, content }) => {
  return (
    <div className="flex flex-col">
      <div className=" text-slate-500 text-xs font-normal  leading-[18px]">
        {heading}
      </div>
      <div className=" text-neutral-900 text-base font-medium leading-[21px]">
        {content}
      </div>
    </div>
  );
};

const TicketDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [chatInput, setChatInput] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [ticketDetails, setTicketDetails] = useState();
  const [ticketLogs, setTicketLogs] = useState([]);
  const [chatLogs, setChatLogs] = useState([]);
  const [error, setError] = useState("");
  const [isSendChatButtonDisabled, setSendChatButtonDisabled] = useState("");
  const socketRef = useRef(null);
  const chatContainerRef = useRef(null);
  const id = useSelector((state) => state.auth?.userDetails?.user?._id);
  const [isLoading, setIsLoading] = useState(false);

  const allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  let maxSize = 2 * 1024 * 1024; // 2MB

  useEffect(() => {
    dispatch(fetchUnseenNotifications());
  },[])

  // Initialize socket connection
  useEffect(() => {
    if (!ticketDetails?._id) return;

    // Initialize socket if it doesn't exist
    if (!socketRef.current) {
      socketRef.current = io(base_url, {
        withCredentials: true,
        transports: ["websocket"],
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 10000,
        query: {
          ticketId: ticketDetails._id,
        },
      });


      // Handle successful connection
      socketRef.current.on("connect", () => {
        socketRef.current.emit(`ticket-${ticketDetails._id}`);
      });

      // Handle connection error
      socketRef.current.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
        setError(
          "Failed to establish real-time connection. Please refresh the page."
        );
      });
    } else {
      socketRef.current.emit("joinTicketRoom", { ticketId: ticketDetails._id });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.emit("leaveTicketRoom", {
          ticketId: ticketDetails._id,
        });
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [ticketDetails?._id]);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("newMessage", handleNewMessage);

      // Cleanup to prevent memory leaks
      return () => {
        if (socketRef.current) {
          socketRef.current.off("newMessage", handleNewMessage);
        }
      };
    }
  }, [socketRef.current]);

  const handleNewMessage = (newMessage) => {
    setChatLogs((prev) => [...prev, newMessage.res.data?.[0]]);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    });
  };

  //method to show ticket log details
  const formatLabel = (ticketLog) => {
    const action = ticketLog?.action;
    switch (action) {
      case "ASSIGNEE_CHANGED":
        return `Ticket assigned`;
      case "TICKET_CREATED":
        return `Ticket created by ${ticketLog?.performedBy?.fullName}`;
      case "STATUS_UPDATED":
        return `Ticket status updated.`;
      case "MESSAGE_ADDED":
        return `Message Added`;
      default:
        return "";
    }
  };

  //method to show status of ticket
  const getStatusRender = (status) => {
    switch (status) {
      case "OPEN":
        return <span className="text-yellow-500 font-medium">Pending</span>;
      case "ON_GOING":
        return <span className="text-yellow-500 font-medium">In Progress</span>;
      case "CLOSED":
        return <span className="text-red-600 font-medium">Closed</span>;
      case "RESOLVED":
        return <span className="text-green-600 font-medium">Resolved</span>;
      default:
        return <span className="text-green-600 font-medium">N/A</span>;
    }
  };

  //method to fetch ticket chat logs
  const getTicketChatLogs = async (ticketId) => {
    try {
      const response = await axiosInstance.get(`tickets/${ticketId}/chats`);
      if (response?.data?.success) {
        setChatLogs(response?.data?.data);
        setTimeout(scrollToBottom, 100); // Scroll after state update
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to fetch ticket chat logs!"
      );
    }
  };

  const getTicketLogs = async (ticketId) => {
    try {
      const response = await axiosInstance.get(`tickets/${ticketId}/logs`);
      if (response?.data?.success) {
        const logs = response?.data?.data?.map((item) => ({
          label: formatLabel(item),
          date: formatDates(item?.updatedAt),
          img: greentick,
        }));
        setTicketLogs(logs);
      }
    } catch (error) {
      console.error(
        error.response?.data?.message || "Failed to fetch ticket logs!"
      );
    }
  };

  useEffect(() => {
    const ticketId = location.pathname.split("/").pop();
    if (ticketId) {
      const getTicketDetails = async () => {
        try {
          const response = await axiosInstance.get(`tickets/${ticketId}`);
          if (response?.data?.success) {
            setTicketDetails(response?.data?.data);
          }
        } catch (error) {
          setError(
            error.response?.data?.message || "Failed to fetch ticket details!"
          );
        }
      };
      getTicketDetails();
      getTicketLogs(ticketId);
      getTicketChatLogs(ticketId);
    }
  }, [location.pathname]);

  const handleInputChange = (event) => {
    setChatInput(event.target.value);
  };

  //method to upload files
  const uploadFile = async (event) => {
    setIsLoading(true)
    try {
      const files = Array.from(event.target.files);
      const filesWithMetadata = files?.map((file) => ({
        file,
      }));
      const uploadedFileResponse = await dispatch(
        uploadFiles({ files })
      ).unwrap();
      if (uploadedFileResponse) {
        const newFiles = uploadedFileResponse?.map((uploadedFile, index) => ({
          ...filesWithMetadata[index],
          uploadedData: uploadedFile,
        }));
        const updatedFiles = [...selectedFiles, ...newFiles];
        setSelectedFiles(updatedFiles);
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to upload files"
      );
    }
    setIsLoading(false)
  };

  //method to handle file input
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter((file) => {
      if (!allowedTypes.includes(file.type)) {
        alert(`${file?.name} is not a valid file type.`);
        return false;
      }
      if (file?.size > maxSize) {
        alert(
          `${file?.name} exceeds the size limit of ${(
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
    scrollToBottom();
  };

  //method to remove files
  const handleRemoveFile = (fileItem) => {
    const updatedFiles = selectedFiles.filter(
      (file, i) => file?.uploadedData?.id !== fileItem?.uploadedData?.id
    );
    setSelectedFiles(updatedFiles);
  };

  //method to preview the file
  const handleFilePReview = (url) => {
    window.open(url, "_blank");
  };

  const formatDates = (dateValue) => {
    const date = new Date(dateValue);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return date.toLocaleString("en-US", options);
  };

  const formatString = (str) => {
    return str.replace(/_/g, " ").toUpperCase();
  };

  //method to send chat data
  const sendChatData = async () => {
    if ((chatInput || selectedFiles?.length > 0) && !isSendChatButtonDisabled) {
      try {
        setSendChatButtonDisabled(true);
        const fileIds = selectedFiles?.map(
          (fileItem) => fileItem?.uploadedData?.id
        );

        socketRef.current.emit("sendMessage", {
          ticketId: ticketDetails?._id,
          message: chatInput || (fileIds && "uploaded"),
          senderType: "User",
          attachmentIds: fileIds,
          senderId: id,
        });

        setChatInput("");
        setSelectedFiles([]);
        setSendChatButtonDisabled(false);
      } catch (error) {
        setError(error?.response?.data?.message || "Message failed to send!");
        setSendChatButtonDisabled(false);
      }
    }

    scrollToBottom();
  };

  return (
    <div className="">
      <div className="flex flex-col gap-2 py-8">
        <Breadcrumb excludePaths={["dashboard", "home"]} />
        <Heading variant="xxl">{ticketDetails?.ticketNo || "N/A"}</Heading>
      </div>
      <CardContainer className={"flex flex-col gap-16 w-full"}>
        <div className="grid lg:grid-cols-2">
          <CardContainer
            className={"flex flex-col w-full gap-6"}
            variant="border"
          >
            <Heading variant="lg" weight="medium">
              {ticketDetails?.title || "N/A"}
            </Heading>
            <div className="text-slate-600 text-sm font-normal leading-[21px]">
              {ticketDetails?.ticketNo || "N/A"}
            </div>

            <div className="sm:flex sm:items-center sm:justify-between grid grid-cols-2 gap-4">
              <TicketCardHeading
                heading={"Status"}
                content={getStatusRender(ticketDetails?.status) || "N/A"}
              />
              <TicketCardHeading
                heading={"Service"}
                content={
                  (ticketDetails?.service?.name &&
                    formatString(ticketDetails?.service?.name)) ||
                  "N/A"
                }
              />
              <TicketCardHeading
                heading={"Point Of Contact"}
                content={ticketDetails?.assignedTo?.name || "N/A"}
              />
              <TicketCardHeading
                heading={"Date & Time"}
                content={formatDates(ticketDetails?.createdAt) || "N/A"}
              />
            </div>
          </CardContainer>

          <div className={"flex flex-col w-full gap-6 p-3 md:p-8"}>
            <div className="text-neutral-900 text-base font-medium leading-normal">
              Ticket Progress
            </div>
            <Steper data={ticketLogs} />
          </div>
        </div>

        <div className=" text-neutral-900 text-lg font-medium leading-[27px]">
          Chat Support
        </div>

        <div
          ref={chatContainerRef}
          className={`md:h-[600px] h-[500px] overflow-y-auto w-full lg:p-9 p-2 bg-[#f8f9fa] rounded-3xl flex-col justify-start items-start lg:gap-10 gap-6 inline-flex`}
        >
          {chatLogs?.map((chat, index) => (
            <ChatCard key={index} chatData={chat} formatDates={formatDates} />
          ))}

          {ticketDetails?.status?.toLowerCase() === "open" && (
            <ChatInput
              className={`mt-auto`}
              onChange={handleInputChange}
              handleFileInputChange={handleFileChange}
              allowedTypes={allowedTypes}
              onSend={sendChatData}
              inputValue={chatInput}
              isActionDisabled={isSendChatButtonDisabled}
            />
          )}
          {selectedFiles.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-[#64748B] mb-2">Selected Files:</p>
              <div className="grid grid-cols-3 gap-4">
                {selectedFiles?.map((fileItem, index) => (
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
        </div>
      </CardContainer>
      {error && (
        <Snackbar message={error} type="error" onClose={() => setError("")} />
      )}
    </div>
  );
};

export default TicketDetails;
