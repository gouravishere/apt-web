import React from "react";
import SepratorWithHeading from "../SepratorWithHeading/SepratorWithHeading";
import Input from "../../../components/Input/Input";
import DropDown from "../../../components/DropDown/DropDown";

const Step3 = ({ formData, handleFormData, errors }) => {
  const options = [
    { name: "CA", label: "CA" },
    { name: "CS", label: "CS" },
    { name: "ICWA", label: "ICWA" },
    { name: "Lawyer", label: "Lawyer" },
    { name: "Tax Consultant", label: "Tax Consultant" },
    { name: "Other", label: "Other" },
  ];


  return (
    <div className="h-full flex flex-col w-full p-4 md:p-0 md:w-[672px] sm:gap-16 gap-8">
      <div className="flex flex-wrap gap-6 w-full">
        <SepratorWithHeading heading={"Experience and Expertise"} />
        <div className="w-full grid grid-cols-1 gap-6">
          {/* <div className="w-full"> */}
          <DropDown
            options={options}
            selectedValue={
              formData.qualificationType === "Other"
                ? "Other"
                : formData.qualification
            }
            onOptionSelect={(option) => {
              if (option.name?.toLowerCase() === "other") {
                handleFormData("qualification", "");
                handleFormData("qualificationType", "Other");
              } else {
                handleFormData("qualificationType", option.label);
                handleFormData("qualification", option.label);
              }
            }}
          />
          {formData?.qualificationType?.toLowerCase() === "other" && (
            <Input
              label="Qualification"
              placeholder="Enter your qualification "
              value={formData.qualification || ""}
              onChange={(e) => handleFormData("qualification", e.target.value)}
              required
              errorMessage={errors?.qualification}
            />
          )}

          <Input
            label="Years of Experience"
            type="number"
            placeholder="Enter years of experience"
            value={formData.yearsOfExperience || ""}
            onChange={(e) =>
              handleFormData("yearsOfExperience", e.target.value)
            }
            required
            errorMessage={errors?.yearsOfExperience}
          />
          <Input
            label="Previous Projects/Clients"
            placeholder="Enter details of previous projects/clients (optional)"
            value={formData.previousProjects || ""}
            onChange={(e) => handleFormData("previousProjects", e.target.value)}
            multiline
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};

export default Step3;
