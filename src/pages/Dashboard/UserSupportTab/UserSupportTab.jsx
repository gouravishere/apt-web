import React, { useState, useEffect } from "react";

import DashBoardHeading from "../DashboardComponents/DashBoardHeading/DashboardHeading";
import CardContainer from "../DashboardComponents/CardContainer/CardContainer";
import Heading from "../../../components/Heading/Heading";
import Button from "../../../components/Button/Button";
import Table from "../../../components/Table/Table";
import TaxIcon from "../../../assets/icons/taxIcon.svg";
import LinkOpenerCard from "../../../components/LinkOpenerCard/LinkOpenerCard";
import { useNavigate } from "react-router-dom";
import Modal from "../../../components/Modal/Modal";
import Input from "../../../components/Input/Input";
import DropDown from "../../../components/DropDown/DropDown";
import UploadFile from "./CustomComponents/UploadMultipleFiles";
import axiosInstance from "../../../utils/axiosInstance";
import Snackbar from "../../../components/Snackbar/Snackbar";
import sms from "../../../assets/icons/smsIcon.svg";
import call from "../../../assets/icons/callIcon.svg";
import dayjs from "dayjs";
import { CONSTANTS } from "../../PricingPage/PricingConstant";

const tableHeaders = [
  { label: "Ticket ID", key: "ticketId" },
  { label: "Last Update", key: "lastUpdate" },
  { label: "Query Title", key: "queryTopic" },
  { label: "Status", key: "status" },
];

const getStatusRender = (status) => {
  switch (status) {
    case "OPEN":
      return <span className="text-yellow-500 font-medium">Pending</span>;
    case "ON_GOING":
      return <span className="text-yellow-500 font-medium">In Progress</span>;
    case "RESOLVED":
      return <span className="text-green-600 font-medium">Resolved</span>;
    case "CLOSED":
      return <span className="text-red-500 font-medium">Closed</span>;
    default:
      return <span className="text-green-600 font-medium">N/A</span>;
  }
};

const SupportCard = ({ image, label, descripiton, CTAtext, onClick }) => {
  return (
    <div className="w-full min-h-[255px] p-6 bg-white rounded-3xl border border-neutral-300 flex-col justify-start items-start gap-5 inline-flex">
      <div className="">
        <img src={image} alt="" />
      </div>

      <div className="text-neutral-900 text-xl font-semibold font-['Poppins'] leading-[25px]">
        {label}
      </div>
      <div className="text-slate-600 text-sm font-normal font-['Poppins'] leading-snug">
        {descripiton}
      </div>
      <div className="h-8">
        <Button onClick={onClick} variant="outline">
          {CTAtext}
        </Button>
      </div>
    </div>
  );
};

const RaiseTicketForm = ({
  onCancel,
  serviceData,
  setServiceData,
  setTicketCreated,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [file, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  useEffect(() => {
    const getServiceData = async () => {
      try {
        const response = await axiosInstance.get("services");
        if (response?.data?.success) {
          const services = response?.data?.data?.map((service) => ({
            name: CONSTANTS[service?.name] || service.name,
            label: service?.id,
          }));
          setServiceData(() => [...services]);
        }
      } catch (error) {
        setError(
          error?.response?.data?.message || "Failed to fetch Service Data!"
        );
      }
    };

    getServiceData();
  }, []);

  const handleOptionSelect = (selectedOption) => {
    setSelectedTopic(selectedOption.label);
  };

  const handleRaiseTicket = () => {
    if (!title || !description || !selectedTopic || !file) {
      setError("Please fill all the fields!.");
    } else {
      createTicket();
    }
  };

  //method to create ticket
  const createTicket = async () => {
    try {
      setSuccessMessage("Submitting...");
      const fileIds = file.map((fileItem) => fileItem?.uploadedData?.id);
      const response = await axiosInstance.post("tickets", {
        title: title,
        description: description,
        type: "SUPPORT",
        serviceId: selectedTopic,
        attachmentIds: fileIds,
      });
      if (response?.data?.success) {
        setSuccessMessage("Ticket Created Succesfully!");
        setTicketCreated(true);
        setTitle("");
        setDescription("");
        setSelectedTopic("");
        setFiles([]);
        setTimeout(() => {
          onCancel();
        }, 2000);
      }
    } catch (error) {
      setSuccessMessage("");
      setError(
        error?.response?.data?.message ||
          "Something went wrong . Please try again!"
      );
    }
  };

  const handleCloseModal = () => {
    setTitle("");
    setDescription("");
    setSelectedTopic("");
    setFiles([]);
    onCancel();
  };

  return (
    <div className="w-full flex flex-col">
      <div className="p-6 w-full flex flex-col gap-4 drop-shadow-sm">
        <Input
          label={"Title"}
          height={12}
          placeholder={"Add Title"}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required={true}
        />
        <DropDown
          label={"Query Topic"}
          placeholder={"Select topic"}
          className="text-slate-400"
          options={serviceData}
          onOptionSelect={handleOptionSelect}
          selected={selectedTopic}
          required={true}
        />
        <Input
          label={"Description"}
          height={28}
          placeholder={"Enter text here"}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required={true}
        />
        <UploadFile
          onFilesSelected={(files) => {
            setFiles(files);
          }}
          label="Upload File"
          description="File format should be PNG, JPEG, or PDF. File size should not exceed 2MB."
        />
      </div>
      <div className="flex w-full justify-end items-center gap-4 py-4 px-6">
        <Button onClick={handleCloseModal} variant="outline">
          Discard
        </Button>
        <Button onClick={handleRaiseTicket} variant="black">
          Raise Ticket
        </Button>
      </div>
      {error && (
        <Snackbar message={error} type="error" onClose={() => setError("")} />
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

const UserSupportTab = () => {
  const navigate = useNavigate();
  const [raiseTicketModal, setRaiseTicketModal] = useState(false);
  const [ticketsList, setTicketsList] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isTicketCreated, setTicketCreated] = useState(false);

  useEffect(() => {
    const getAllTickets = async () => {
      try {
        const response = await axiosInstance.get(`tickets/me`);
        if (response?.data?.success) {
          const tockets = response?.data?.data.map((item) => ({
            ticketId: item?.ticketNo,
            lastUpdate: dayjs(item?.updatedAt).format("DD MMM YYYY, h:mm A"),
            queryTopic: item?.title,
            status: getStatusRender(item?.status),
            id: item?._id,
          }));
          setTicketsList(tockets);
          setTicketCreated(false);
        }
      } catch (error) {
        console.error(
          error.response?.data?.message || "Failed to fetch plan groups"
        );
      }
    };
    getAllTickets();
  }, [isTicketCreated]);

  const handleMailUs = () => {
    const email = "support@ezyfiling.com"; // The email ID you want to send to
    const mailtoLink = `mailto:${email}`;
    window.location.href = mailtoLink;
  };

  const handleCallUs = () => {
    const phoneNumber = "+91 999 99 99999"; // The phone number you want to dial
    const telLink = `tel:${phoneNumber}`;
    window.location.href = telLink; // This will trigger the phone dialer
  };

  const handleImportantLinks = (url) => {
    navigate(url);
  };

  return (
    <div className="flex w-full flex-col gap-8">
      {raiseTicketModal && (
        <Modal
          onClose={() => setRaiseTicketModal(false)}
          heading={"Create Ticket"}
          children={
            <RaiseTicketForm
              serviceData={serviceData}
              setServiceData={setServiceData}
              setTicketCreated={setTicketCreated}
              isTicketCreated={isTicketCreated}
              onCancel={() => setRaiseTicketModal(false)}
            />
          }
        />
      )}
      {/* {console.log(object)} */}
      <DashBoardHeading heading={"User Support"} />
      <CardContainer className={"flex w-full flex-col gap-8"}>
        <div className="flex items-center justify-between w-full">
          <Heading variant="xl">My Tickets</Heading>
          <DropDown
            placeholder={"Select status"}
            className="max-w-[200px]"
            options={[
              { label: "All", name: "ALL" },
              { label: "Pending", name: "Pending" },
              { label: "Resolved", name: "Resolved" },
              { label: "Closed", name: "Closed" },
            ]}
            selectedValue={statusFilter}
            onOptionSelect={(option) => {
              setStatusFilter(option.name);
            }}
          />
        </div>

        <Table
          headers={tableHeaders}
          clickable={true}
          onClick={(e) => {
            navigate(`/dashboard/user-support/${e?.id}`);
          }}
          data={ticketsList?.filter((item) => {
            if (statusFilter === "ALL") {
              return true;
            }
            return (
              item?.status?.props?.children?.toLowerCase() ===
              statusFilter?.toLowerCase()
            );
          })}
        />
        {ticketsList?.filter((item) => {
          if (statusFilter === "ALL") {
            return true;
          }
          return (
            item?.status?.props?.children?.toLowerCase() ===
            statusFilter?.toLowerCase()
          );
        })?.length === 0 && (
          <Heading className={"mx-auto"} variant="xl">
            No Tickets Found
          </Heading>
        )}

        <Heading variant="xl">Contact Support</Heading>

        <div className="w-full grid gap-8 xl:grid-cols-3 md:grid-cols-2 grid-cols-1">
          <SupportCard
            onClick={() => {
              setRaiseTicketModal(true);
            }}
            image={TaxIcon}
            label={"Create Ticket"}
            descripiton={
              "Submit a ticket for any queries or issues related to our services."
            }
            CTAtext={"Raise Ticket"}
          />
          <SupportCard
            image={sms}
            label={"support@ezyfiling.com"}
            descripiton={
              "Please email us your concerns, including the relevant subject and details, for faster assistance."
            }
            CTAtext={"Mail Us"}
            onClick={handleMailUs}
          />
          <SupportCard
            image={call}
            label={"+91 63595 99999"}
            descripiton={
              "Connect with our customer executive for a quick and efficient response."
            }
            CTAtext={"Call Us"}
            onClick={handleCallUs}
          />
        </div>
        <Heading variant="xl">Important Links to consider</Heading>
        <div className="flex gap-4 flex-wrap items-center">
          <div
            className="cursor-pointer"
            onClick={() => {
              handleImportantLinks("/FAQs");
            }}
          >
            <LinkOpenerCard label={"FAQ's"} />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              handleImportantLinks("/guide");
            }}
          >
            <LinkOpenerCard label={"Guides"} />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              handleImportantLinks("/blog");
            }}
          >
            <LinkOpenerCard label={"Blogs & Articles"} />
          </div>
        </div>
      </CardContainer>
    </div>
  );
};

export default UserSupportTab;
