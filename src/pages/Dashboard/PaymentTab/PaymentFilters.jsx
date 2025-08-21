import React, { useState } from "react";
import Heading from "../../../components/Heading/Heading";
import Button from "../../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { CONSTANTS } from "../../PricingPage/PricingConstant";
import DropDown from "../../../components/DropDown/DropDown";
import { fetchPastTransactions } from "../../../redux/ServiceDetailsSlice/ServiceDetailsSlice";

const PaymentFilters = ({ isOpen, onClose, onApplyFilters, clearFilters }) => {
  const [sortBy, setSortBy] = useState(); // State for Sort By (Latest or Oldest)
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  const services = useSelector((state) => state?.Leads?.myServicesData?.data);
  const dispatch = useDispatch();

  // Handle Sort By change
  const handleSortByChange = (value) => {
    setSortBy(value);
  };

  const handleOptionClick = (serviceName) => {
    setSelectedOptions((prev) => {
      if (prev.name === serviceName.name) {
        return (prev = []);
      }
      return serviceName;
    });
  };

  // Apply filters and close modal
  const handleApplyFilters = () => {
    onApplyFilters({
      sortBy,
      selectedServices: selectedOptions,
      status: statusFilter,
    });
    onClose();
  };

  // First, define your status options
  const statusOptions = [
    { name: "All", label: "" },
    { name: "Completed", label: "COMPLETED" },
    { name: "Failed", label: "FAILED" },
    { name: "Pending", label: "PENDING" },
  ];

  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50"
      ></div>
      <div className="bg-white flex flex-col fixed translate-x-[-50%] left-1/2 top-1/2 z-[9999] translate-y-[-50%] p-6 rounded-lg w-[500px] shadow-lg">
        <Heading weight="medium" size="xl">
          Filters
        </Heading>
        {/* Sort By Section */}
        <div className="mt-8">
          <Heading weight="medium" size="lg">
            Sort By
          </Heading>
          <label className="block mt-4">
            <input
              type="radio"
              name="sortBy"
              value="latest"
              checked={sortBy === "latest"}
              onChange={() => handleSortByChange("latest")}
              className="mr-2"
            />
            Latest
          </label>
          <label className="block mt-2">
            <input
              type="radio"
              name="sortBy"
              value="oldest"
              checked={sortBy === "oldest"}
              onChange={() => handleSortByChange("oldest")}
              className="mr-2"
            />
            Oldest
          </label>
        </div>

        {/* Services Section */}
        <div className="mt-8">
          <Heading weight="medium" size="lg">
            Services
          </Heading>
          <div className="flex flex-wrap gap-4 mt-4">
            {services?.map((service) => (
              <div
                key={service.name}
                onClick={() => handleOptionClick(service)}
                className="cursor-pointer p-2 px-3 rounded-3xl border"
                style={{
                  backgroundColor:
                    selectedOptions.name === service.name
                      ? "#fff3cd"
                      : "#ffffff",
                }}
              >
                {CONSTANTS[service.name] || service.name}
              </div>
            ))}
          </div>
        </div>

        {/* Status Filter Section */}
        <div className="mt-8">
          <Heading weight="medium" size="lg" className={``}>
            Status
          </Heading>
          <DropDown
            options={statusOptions}
            onOptionSelect={(option) => {
              setStatusFilter(option);
            }}
            selectedValue={statusFilter.name}
            placeholder="Select Status"
            searchAble={false}
            className="w-full mt-4"
            borderRequired={true}
          />
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <Button
            className="mt-auto self-end"
            variant="outline"
            onClick={() => {
              setSortBy("");
              setSelectedOptions([]);
              setStatusFilter("all");
              dispatch(fetchPastTransactions({}));
              onClose();
              clearFilters();
            }}
          >
            Clear Filters
          </Button>
          <Button
            className="mt-auto self-end"
            variant="black"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </>
  );
};

export default PaymentFilters;
