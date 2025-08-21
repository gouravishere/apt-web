import TopBanner from "../../components/TopBanner/TopBanner";
import ServicesContent from "../../components/ServicesContent/ServicesContent";
import Testimonial from "../../components/HomePage/Testimonial/Testimonial";
import FAQs from "../../components/HomePage/FAQs/FAQs";
import WhoAndWhenComp from "../../components/WhoAndWhenComp/WhoAndWhenComp";
import Modal from "../../components/Modal/Modal";
import { useEffect, useState } from "react";
import PricingCompPlans from "../../components/PricingCompPlans/PricingCompPlans";
import Banner from "../../components/Banner/Banner";
import CardsWithConnector from "../../components/CardsWithConnector/CardsWithConnector";
import { ToastContainer, toast } from "react-toastify";
import {
  IndiaServices,
  UaeServices,
  DubaiServices,
  OmanServices,
  QatarServices,
  KuwaitServices,
  SingaporeServices,
  SERVICE_PATHS,
  SaudiServices,
} from "../../ServiceData";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import UploadFile from "../../components/UploadFile/UploadFile";
import Input from "../../components/Input/Input";
import DropDown from "../../components/DropDown/DropDown";
import { useDispatch, useSelector } from "react-redux";
import {
  createTicketSupport,
  getAllServices,
  uploadFiles,
} from "../../redux/CreateTicket/CreateTicket";
import { Helmet } from "react-helmet-async";
import ServiceBanner from "../../components/ServiceBanner/ServiceBanner";

const RaiseTicketForm = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [getId, setGetId] = useState("");
  const [files, setFiles] = useState([]);
  const [validate, setValidate] = useState({});
  const dispatch = useDispatch();
  const [resetFiles, setResetFiles] = useState(false);
  const options = useSelector((state) => state?.ticket?.options);
  const type = "SUPPORT";

  const handleOptionSelect = (selectedOption) => {
    setGetId(selectedOption.id);
  };

  const validateForm = () => {
    let error = {};

    if (!title) error.title = "This field can't be empty";
    if (!description) error.description = "This field can't be empty";
    if (!getId) error.queryTopic = "Please select a query topic";
    if (files.length === 0) error.upload = "Please upload at least one file";

    setValidate(error);
    return Object.keys(error).length === 0;
  };

  const raiseTicket = async () => {
    if (validateForm()) {
      try {
        const fileIds = await dispatch(uploadFiles({ files })).unwrap();
        dispatch(
          createTicketSupport({ title, description, type, getId, fileIds })
        );
        toast.success("Ticket submitted successfully!");
        setTitle("");
        setDescription("");
        setFiles([]);
        setResetFiles(true);
        onClose();
      } catch (error) {
        console.error("Error uploading files or creating ticket:", error);
      }
    }
  };

  useEffect(() => {
    dispatch(getAllServices());
  }, []);

  return (
    <div className="w-full flex flex-col">
      <div className="p-6 w-full flex flex-col gap-4 drop-shadow-sm">
        <Input
          label={"Title"}
          height={12}
          placeholder={"Add Title"}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          validateMsg={validate.title}
        />
        <div>
          <DropDown
            label={"Query Topic"}
            placeholder={"Select topic"}
            className="text-slate-400"
            options={options}
            onOptionSelect={handleOptionSelect}
            selected={getId}
            defaultValue={"Select an option"}
          />
          {validate.queryTopic && (
            <div className="text-red-500 text-sm">{validate.queryTopic}</div>
          )}
        </div>
        <Input
          label={"Description"}
          height={28}
          placeholder={"Enter text here"}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          validateMsg={validate.description}
        />
        <UploadFile
          onFilesSelected={setFiles}
          label="Upload File"
          description="File format should be PNG, JPEG, or PDF. File size should not exceed 2MB."
          isRequired={validate.upload}
          resetFiles={resetFiles}
          setResetFiles={setResetFiles}
        />
      </div>
      <div className="flex w-full justify-end items-center gap-4 py-4 px-6">
        <Button variant="outline" onClick={onClose}>
          Discard
        </Button>
        <Button variant="black" onClick={raiseTicket}>
          Raise Ticket
        </Button>
      </div>
    </div>
  );
};

export default function Service() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const buttonText =
    params.countryName === "india" && params.serviceName === "tax-filing"
      ? "File Now"
      : "Contact us";

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params]);

  const getServicesByCountry = (countryName) => {
    const country = countryName.toLowerCase();
    switch (country) {
      case "india":
        return IndiaServices;
      case "uae":
        return UaeServices;
      case "saudi":
        return SaudiServices;
      case "oman":
        return OmanServices;
      case "qatar":
        return QatarServices;
      case "kuwait":
        return KuwaitServices;
      case "singapore":
        return SingaporeServices;
      default:
        return IndiaServices;
    }
  };

  const countryServices = getServicesByCountry(params.countryName);
  const data = countryServices[SERVICE_PATHS[params.serviceName]];

  const handleButtonClick = () => {
    if (buttonText === "File Now") {
      navigate("/pricing");
    } else {
      handleOpenModal();
    }
  };

  return (
    <>
      <Helmet>
        <title>
          Our Services - Tax, GST, ROC Filing, FEMA & Business Consultancy | Ezyfiling
        </title>
        <meta
          name="description"
          content={`Explore Ezyfiling's wide range of services including ITR filing, GST, ROC Filing, FEMA compliance and business advisory.`}
        />
        <meta
          name="keywords"
          content="ITR services, GST filing, FEMA compliance, ROC Filing, business consultancy, ezyfiling services"
        />
      </Helmet>
      <div>
        <div>
          <ServiceBanner
            imageSrc={data.bannerIcon}
            headingText={data.bannerHeading}
            subheadingText={data.bannerDescription}
            buttonText={buttonText}
            onButtonClick={handleButtonClick}
          />
        </div>
        <div>
          <PricingCompPlans
            country={params.countryName}
            serviceName={data?.enum}
          />
        </div>
        <div className="px-5 md:px-24 pt-28">
          <ServicesContent
            heading={data.heading}
            text={data.benefitDescription}
          />
        </div>
        <CardsWithConnector
          heading={data.benefitHeading}
          data={data.bannerCardData}
        />

        <div>
          <WhoAndWhenComp
            cards={data.cardData}
            heading={"Who and when someone"}
            onClick={handleOpenModal}
          />
        </div>
        <Banner />
        <div>
          {/* <Testimonial /> */}
        </div>
        <div>
          <FAQs />
        </div>

        {isModalOpen && (
          <Modal
            onClose={handleCloseModal}
            heading={"Create Ticket"}
            children={<RaiseTicketForm onClose={handleCloseModal} />}
          />
        )}
        {/* <ToastContainer /> */}
      </div>
    </>
  );
}
