import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import dayjs from "dayjs";
import { CONSTANTS } from "../../pages/PricingPage/PricingConstant";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";

import "react-toastify/dist/ReactToastify.css";

const NotificationModal = ({
  isOpen,
  onClose,
  notifications,
  setNotifications,
  setError,
  loading,
  fetchUnseenNotifications,
}) => {
  const base_url = process.env.REACT_APP_SOCKET_URL;
  const userId = useSelector((state) => state?.auth?.userDetails?.user?._id);

  const navigate = useNavigate();

  useEffect(() => {
    isOpen && fetchUnseenNotifications();
  }, [isOpen]);

  const showCustomToast = (note, navigate) => {
    const toastId = `lead-${note?.leadId}`;

    toast(
      ({ closeToast }) => (
        <div
          onClick={() => {
            closeToast(); // Close the toast first
          if (note.type === "ticket") {
              navigate(`/dashboard/user-support/${note?.ticketId}`);
            } else {
              navigate(`/dashboard/services/service-details/${note?.leadId}`);
            }
            fetchUnseenNotifications();
          }}
          className="w-full rounded-md text-sm cursor-pointer"
        >
          <span className="font-semibold text-black">New Message Received</span>
          <div className="text-gray-700">Message: {note?.message}</div>
          <div className="text-xs text-gray-500 mt-1">
            {CONSTANTS[note?.planName] || note?.planName || ""}
          </div>
        </div>
      ),
      {
        toastId,
        autoClose: 3000,
        className: "custom-toast",
        pauseOnHover: false,
      }
    );
  };


  // Function to fetch unseen notifications

  const socketRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    if (!socketRef.current) {
      socketRef.current = io(base_url, {
        withCredentials: true,
        transports: ["websocket"],
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 10000,
        query: {
          userId: userId,
        },
      });

      socketRef.current.on("connect", () => {
        socketRef.current.emit(userId);
      });

      socketRef.current.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
        setError(
          "Failed to establish real-time connection. Please refresh the page."
        );
      });
    } else {
      socketRef.current.emit("userNotification", { userId: userId });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.emit("userNotification", {
          userId: userId,
        });
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [userId, base_url]);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("userNotification", (e) => {
        setNotifications((prev) => ({
          ...prev,
          messages: [...prev?.messages, e],
        }));
        showCustomToast(e, navigate);
      });

      return () => {
        if (socketRef.current) {
          socketRef.current.off("userNotification");
        }
      };
    }
  }, [socketRef.current]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-40"
        onClick={onClose}
      />
      <div className="fixed bottom-0 right-0 w-full max-h-[98h] z-50 flex items-start justify-end p-4 sm:p-2 pointer-events-none">
        <div className="bg-white md:w-[400px] w-full rounded-lg shadow-lg overflow-auto max-h-[98vh] pointer-events-auto">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>
          </div>
          <div className="p-4">
            {loading ? (
              <p>Loading...</p>
            ) : notifications?.messages?.length > 0 ? (
              <ul className="space-y-3 cursor-pointer">
                {notifications?.messages?.map((note, idx) => (
                  <li
                    onClick={() => {
                      if (note.type === "ticket") {
                        navigate(`/dashboard/user-support/${note?.ticketId}`);
                      } else {
                        navigate(
                          `/dashboard/services/service-details/${note.leadId}`
                        );
                      }
                      fetchUnseenNotifications();
                      onClose();
                    }}
                    key={idx}
                    className="bg-gray-100 p-3 rounded-md text-sm hover:bg-gray-200"
                  >
                    <div className="font-medium">From: {note.senderName}</div>
                    <div className="text-gray-700">Message: {note.message}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {CONSTANTS[note.planName] || note.planName} |{" "}
                      {dayjs(note.createdAt).format("MMM D, YYYY h:mm A")}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No notifications.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const Notification = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleModal = () => {
    if (isModalOpen) {
      setTimeout(() => {
        setIsModalOpen(!isModalOpen);
      }, 200);
    } else {
      setIsModalOpen(!isModalOpen);
    }
  };

  const fetchUnseenNotifications = async () => {
    try {
      const response = await axiosInstance.get(
        "/notifications/unseen-messages"
      );
      setNotifications(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data || "Fetch failed");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnseenNotifications();
  }, [isModalOpen]);

  return (
    <div className="fixed bottom-5 right-5">
      <div
        onClick={toggleModal}
        className=" z-50 bg-black text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-gray-900"
      >
        <div
          style={{
            animation:
              notifications?.messages?.length > 0
                ? "jiggle 0.5s ease-in-out infinite"
                : "none",
            display: "inline-block", // required for transform
          }}
          className="text-xl relative"
        >
          🔔
        </div>
        {notifications?.messages?.length > 0 && (
          <div
            className="bg-black absolute rounded-full h-6 w-6 flex justify-center items-center text-xs text-primary-500 font-semibold"
            style={
              notifications.messages.length > 0
                ? { top: "-4px", left: "-4px" }
                : {
                    top: "50%",
                    left: "50%",
                    zIndex: "-10",
                    transform: "translate(-50%, -50%)",
                  }
            }
          >
            {notifications.messages.length > 9
              ? "9+"
              : notifications.messages.length}
          </div>
        )}
      </div>

      <NotificationModal
        setError={setError}
        setNotifications={setNotifications}
        notifications={notifications}
        isOpen={isModalOpen}
        onClose={toggleModal}
        loading={loading}
        fetchUnseenNotifications={fetchUnseenNotifications}
      />
    </div>
  );
};

export default Notification;
