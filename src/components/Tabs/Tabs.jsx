import React, { useState } from "react";

const Tabs = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
    if (onTabChange) {
      onTabChange(index);
    }
  };

  return (
    <div>
      {/* Tab Headers */}
      <div className="overflow-x-auto pb-6">
        <div className="flex items-center gap-4 w-max mx-auto">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg cursor-pointer text-sm sm:text-base whitespace-nowrap
                ${
                  activeTab === index
                    ? "border-b-4 border-[#FDCE00] bg-[#f9f6e2]"
                    : "bg-gray-50 shadow-lg"
                }`}
              onClick={() => handleTabClick(index)}
            >
              {tab.icon && (
                <img
                  src={tab.icon}
                  alt={tab.label}
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                />
              )}
              <span className="font-medium text-black">{tab.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-8 w-full m-auto">
        {tabs[activeTab]?.content && (
          <div className="text-sm sm:text-base">{tabs[activeTab].content}</div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
