import React from "react";
import Input from "../../../components/Input/Input";
import SepratorWithHeading from "../SepratorWithHeading/SepratorWithHeading";

const Step4 = ({ formData, handleFormData, errors }) => {
  return (
    <div className="h-full flex flex-col w-full p-4 md:p-0 md:w-[672px] sm:gap-16 gap-8">
      <div className="flex flex-wrap gap-6 w-full">
        <SepratorWithHeading heading={"Professional Certifications"} />
        <div className="w-full grid grid-cols-1 gap-6">
          <Input
            label="ICAI Membership Number"
            placeholder="Enter your ICAI membership number"
            value={formData.icaiNumber || ""}
            onChange={(e) => handleFormData("icaiNumber", e.target.value)}
            errorMessage={errors?.icaiNumber}
          />

          <Input
            label="ICSI Membership Number"
            placeholder="Enter your ICSI membership number"
            value={formData.icsiNumber || ""}
            onChange={(e) => handleFormData("icsiNumber", e.target.value)}
            errorMessage={errors?.icsiNumber}
          />

          <Input
            label="Legal Practice Certification Number"
            placeholder="Enter your legal practice certification number"
            value={formData.legalCertNumber || ""}
            onChange={(e) => handleFormData("legalCertNumber", e.target.value)}
            errorMessage={errors?.legalCertNumber}
          />
        </div>
      </div>
    </div>
  );
};

export default Step4;
