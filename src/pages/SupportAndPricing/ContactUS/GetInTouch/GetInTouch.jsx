import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTicketSupport,
  getAllServices,
  uploadFiles,
} from "../../../../redux/CreateTicket/CreateTicket";
import { ToastContainer, toast } from "react-toastify";
import Input from "../../../../components/Input/Input";
import DropDown from "../../../../components/DropDown/DropDown";
import UploadFile from "../../../../components/UploadFile/UploadFile";
import Button from "../../../../components/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import UploadFileForContact from "../uploadFileForContact/uploadFileForContact";

const GetText = () => {
  return (
    <div className="flex justify-center w-full mt-8">
      <div className="text-3xl font-medium space-x-3">
        <span>Get</span>
        <span className="relative">
          i
          <span className="absolute left-1 -translate-x-1 bg-yellow-500 rounded-full w-2 h-2.5"></span>
        </span>
        n<span>Touch</span>
      </div>
    </div>
  );
};

const GetDes = () => {
  return (
    <div>
      <div className="font-medium mt-5 text-slate-500 h-11 text-sm">
        Dive into expert opinions, emerging trends, success stories, and
        actionable insights for smarter financial decisions
      </div>
    </div>
  );
};

const GetForm = ({
  title,
  setTitle,
  description,
  setDescription,
  validate,
  options,
  setGetId,
  resetDropdown,
  value,
  setResetDropdown,
  setValue,
}) => {
  const handleOptionSelect = (option) => {
    setValue(option);
    setGetId(option.id);
  };

  return (
    <div className="space-y-3 mt-8">
      <Input
        label={"Title"}
        placeholder={"Add Title"}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        validate={(value) => (value === "" ? "This field can't be empty" : "")}
        validateMsg={validate.title}
      />
      <div>
        <DropDown
          selectedValue={value?.name}
          label={"Query Topic"}
          placeholder={"Select topic"}
          className="text-slate-400"
          options={options}
          onOptionSelect={handleOptionSelect}
          resetDropdown={resetDropdown}
          setResetDropdown={setResetDropdown}
          defaultValue={"Select an option"}
        />
        {validate.queryTopic && (
          <div className="text-red-500 text-sm">{validate.queryTopic}</div>
        )}
      </div>
      <Input
        label={"Description"}
        placeholder={"Enter text here"}
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        size="large"
        validate={(value) => (value === "" ? "This field can't be empty" : "")}
        validateMsg={validate.description}
      />
    </div>
  );
};

export default function GetInTouch() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [validate, setValidate] = useState({});
  const [getId, setGetId] = useState("");
  const dispatch = useDispatch();
  const [resetFiles, setResetFiles] = useState(false);
  const [resetDropdown, setResetDropdown] = useState(false);
  const ticketOptions = useSelector((state) => state?.ticket?.options);
  const type = "SUPPORT";
  const [selectedFiles, setSelectedFiles] = useState([]);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (location.state?.path.includes("/contact")) {
      setSelectedFiles(location.state?.selectedFiles);
      setTitle(location.state?.title);
      setDescription(location.state?.description);
      setFiles(location.state?.files);
      setGetId(location.state?.getId);
      setValue(location.state?.value);
    }
    navigate({ state: null });
  }, []);

  // Validation function
  const validateInputs = () => {
    let error = {};

    if (!title) error.title = "This field can't be empty";
    if (!description) error.description = "This field can't be empty";
    if (files.length === 0) error.upload = true;
    if (!getId) error.queryTopic = "Please select a query topic";

    setValidate(error);
    return Object.keys(error).length === 0;
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      submitHandler();
    }
  };

  const submitHandler = async () => {
    if (!isAuthenticated) {
      alert("Please login to submit a ticket");
      navigate("/login", {
        state: { path: "/contact-us", title, description, files, getId, value, selectedFiles },
      });
      return;
    }

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
      setResetDropdown(true);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);

  return (
    <div className="lg:ml-36">
      <GetText />
      <GetDes />
      <GetForm
        selectedValue={getId}
        title={title}
        setValue={setValue}
        value={value}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        validate={validate}
        options={ticketOptions}
        setGetId={setGetId}
        resetDropdown={resetDropdown}
        setResetDropdown={setResetDropdown}
      />
      <div className="mt-6">
        <UploadFileForContact
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          onFilesSelected={(e) => {
            setFiles(e);
          }}
          label="Upload File"
          description="File format should be PNG, JPEG, or PDF. File size should not exceed 2MB."
          isRequired={validate.upload}
          resetFiles={resetFiles}
          setResetFiles={setResetFiles}
        />
      </div>
      <div className="flex justify-center mt-8">
        <Button variant="black" onClick={handleSubmit}>
          Submit Now
        </Button>
      </div>
    {/* <ToastContainer /> */}
    </div>
  );
}
