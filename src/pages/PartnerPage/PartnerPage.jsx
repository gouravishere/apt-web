import TopBanner from "../../components/TopBanner/TopBanner";
import ServicesContent from "../../components/ServicesContent/ServicesContent";
import BannerImage from "../../assets/icons/partnerBanner.svg";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import PartnerNetwork from "./PartnerNetwork";
import WhoCanPartner from "./WhoCanPartner";
import Banner from "./Banner";
import ServicesOffer from "./ServicesOffer";
import CardsWithConnector from "../../components/CardsWithConnector/CardsWithConnector";
import DummyData from "./DummyData";
import DropDown from "../../components/DropDown/DropDown";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import UploadFile from "../../components/UploadFile/UploadFile";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import ReactGA from "react-ga4";
import Navbar from "../../components/Navbar/Navbar";
import ServiceBanner from "../../components/ServiceBanner/ServiceBanner";

const RaiseTicketForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");

  const options = [
    { label: "option1", name: "option1" },
    { label: "option2", name: "option2" },
    { label: "option3", name: "option3" },
  ];

  // Handle dropdown selection
  const handleOptionSelect = (selectedOption) => {
    setSelectedTopic(selectedOption.name);
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
        />
        <DropDown
          label={"Query Topic"}
          placeholder={"Select topic"}
          className="text-slate-400"
          options={options}
          onOptionSelect={handleOptionSelect}
          selected={selectedTopic}
        />
        <Input
          label={"Description"}
          height={28}
          placeholder={"Enter text here"}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <UploadFile
          // onFilesSelected={setFiles}
          label="Upload File"
          description="File format should be PNG, JPEG, or PDF. File size should not exceed 2MB."
        />
      </div>
      <div className="flex w-full justify-end items-center gap-4 py-4 px-6">
        <Button variant="outline">Discard</Button>
        <Button variant="black">Raise Ticket</Button>
      </div>
    </div>
  );
};

export default function PartnerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div>
        <ServiceBanner
          imageSrc={BannerImage}
          headingText="Partner with ezyfiling: Empower Businesses, Enable Global Growth"
          subheadingText="ezyfiling streamlines tax processes with tech-driven services for accurate filings, timely submissions, and maximum savings—supporting your business growth without compliance worries."
          buttonText="Register with us"
          onButtonClick={() => {
            ReactGA.event({
              category: "Partner",
              action: "Register With Us",
            });
            navigate("/partner");
          }}
        />
      </div>
      <div className="px-5 md:px-24 pt-28">
        <ServicesContent
          heading={"Why Partner with ezyfiling?"}
          text={`At ezyfiling, we are on a mission to simplify compliance and business solutions for individuals and organizations. Our platform offers a one-stop solution for Tax Filing, GST Compliance, FEMA Regulations, ROC Filing Services, Business Setup, and Consultancy. We invite professionals, consultants, and service providers to join us as partners and become a crucial part of this ecosystem.

By partnering with ezyfiling, you gain access to our cutting-edge portal, empowering you to deliver efficient, reliable, and innovative solutions to your clients. Together, we can create meaningful impact, ensure compliance, and foster growth for businesses of all sizes.`}
        />
      </div>
      <PartnerNetwork />
      <CardsWithConnector
        heading={"Benefits of Partnering with ezyfiling"}
        data={DummyData}
        mobileViewData={3}
        desktopViewData={6}
      />
      <WhoCanPartner />
      <ServicesOffer />
      <Banner path="/partner" />
      <div className="mt-20"></div>
      {isModalOpen && (
        <Modal
          onClose={() => handleCloseModal}
          heading={"Create Ticket"}
          children={<RaiseTicketForm />}
        />
      )}
    </div>
  );
}
