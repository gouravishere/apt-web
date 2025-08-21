import React from "react";
import SepratorWithHeading from "../SepratorWithHeading/SepratorWithHeading";
import IndiaFlag from "../../../assets/icons/indiaFlag.svg";
import UAEFlag from "../../../assets/icons/uaeFlag.svg";
import QatarFlag from "../../../assets/icons/qatarFlag.svg";
import ArabiaFlag from "../../../assets/icons/arabiaFlag.svg";
import KuwaitFlag from "../../../assets/icons/kuwaitFlag.svg";
import OmanFlag from "../../../assets/icons/OmanFLag.svg";
import SingaporeFlag from "../../../assets/icons/singaporeFlag.svg";
import RocWho1 from "../../../assets/icons/RocWho1.svg";
import SetupWho1 from "../../../assets/icons/SetupWho1.svg";
import SelectService1 from "../../../assets/icons/SelectService1.svg"
import SelectService2 from "../../../assets/icons/SelectService2.svg"
import SelectService3 from "../../../assets/icons/SelectService3.svg"
import SelectService4 from "../../../assets/icons/SelectService4.svg"
import { CONSTANTS } from "../../PricingPage/PricingConstant";

const CountryData = [
  { label: "INDIA", icon: IndiaFlag },
  { label: "UAE", icon: UAEFlag },
  { label: "SAUDI_ARABIA", icon: ArabiaFlag },
  { label: "QATAR", icon: QatarFlag },
  { label: "OMAN", icon: OmanFlag },
  { label: "KUWAIT", icon: KuwaitFlag },
  { label: "SINGAPORE", icon: SingaporeFlag },
];

const serviceData = [
  { label: "GST_FILING", icon: SelectService2 },
  { label: "FEMA_COMPLIANCE_SERVICE", icon: SelectService3 },
  { label: "ROC_SERVICE", icon: SelectService4 },
  { label: "ROC Filing Service", icon: RocWho1 },
  { label: "BUSINESS_ADVISORY_SERVICE", icon: SetupWho1 },
  { label: "ITR_SERVICE", icon: SelectService1 },
  { label: "TDS_FILING", icon: SetupWho1 },
];

const FlagCard = ({ img, label, selected, onClick }) => {
  return (
    <div
      className={`h-12 p-3 flex items-center gap-2 rounded-xl border ${selected ? "bg-primary-400" : "border-gray-300"
        } cursor-pointer`}
      onClick={onClick}
    >
      <img src={img} alt={label} />
      <div className="text-center text-[#051227] text-sm font-medium font-['Poppins'] leading-snug">
        {label}
      </div>
    </div>
  );
};

const ServiceCard = ({ label, img, selected, onClick }) => {

  return (
    <div
      className={`py-3 px-5 rounded-2xl border ${selected ? "bg-primary-400 text-black" : "border-gray-300 text-slate-600"
        } justify-center items-center gap-4 flex flex-col md:flex-row cursor-pointer relative group`} // Added `group` class
      onClick={onClick}
    >
      {/* Image with max width and height */}
      <img
        src={img}
        alt={label}
        className="max-w-[60px] max-h-[60px] object-contain" // Set max size for image
      />

      {/* Label with ellipsis */}
      <div
        className="w-full py-2 text-sm font-medium text-center md:text-left overflow-hidden text-ellipsis whitespace-nowrap"
      >
        {CONSTANTS[label] || label}

        {/* Custom Tooltip */}
        <div className="absolute bottom-full mb-2 left-0 w-auto max-w-xs p-2 text-xs text-white bg-black rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {CONSTANTS[label] || label}
        </div>
      </div>
    </div>
  );
};

const Step1 = ({ formData, handleFormData, countries, services }) => {


  const handleCountrySelect = (country) => {
    handleFormData("selectedCountries", country);
    if (formData?.selectedCountries !== country) handleFormData("selectedServices", []);
  };

  const handleServiceSelect = (service) => {
    const updatedServices = formData.selectedServices.includes(service)
      ? formData.selectedServices.filter((s) => s !== service)
      : [...formData.selectedServices, service];

    handleFormData("selectedServices", updatedServices);
  };

  return (
    <div className="h-full flex flex-col md:w-[672px] sm:gap-16 gap-8 p-4 md:p-0">
      <div className="flex flex-wrap gap-6 w-full">
        <SepratorWithHeading heading={"Which country you would be providing services"} />
        {countries.map((data, index) => (
          <FlagCard
            key={index}
            img={
              (() => {
                const country = CountryData.find((item) => item?.label === data?.identifier);
                return country ? country?.icon : '';
              })()
            }
            label={data.name}
            selected={formData.selectedCountries.includes(data.identifier)}
            onClick={() => handleCountrySelect(data.identifier)}
          />
        ))}
      </div>
      <div className="flex flex-col gap-6 w-full">
        <SepratorWithHeading heading={"What are your expertise"} />
        {formData?.selectedCountries.length === 0 && <p>select country to see services</p>}
        <div className="grid md:grid-cols-3 grid-cols-2 gap-6 w-full">
          {services.length > 0 ? services?.map((serviceItem, index) => (
            <React.Fragment key={index}>
              <ServiceCard
                key={index}
                label={serviceItem.name}
                img={
                  (() => {
                    const service = serviceData.find((item) => item?.label === serviceItem?.name);
                    return service ? service?.icon : SetupWho1;
                  })()
                }
                selected={formData.selectedServices.includes(serviceItem?.name)}
                onClick={() => handleServiceSelect(serviceItem.name)}
              />
            </React.Fragment>
          )) : <div className="text-nowrap">{formData?.selectedCountries && "No services available for selected country"}</div>}
        </div>
      </div>
    </div>
  );
};

export default Step1;
