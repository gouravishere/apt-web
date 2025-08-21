import { useState } from "react";

export default function CountryTabs({ tabs, onTabChange, className }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
    if (onTabChange) {
      onTabChange(index);
    }
  };

  return (
    <div className="flex overflow-x-auto gap-4 py-6 md:py-10 justify-start">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm sm:text-base whitespace-nowrap h-12 md:h-14
            ${className}
            ${activeTab === index ? "border-b-4 border-[#FDCE00] bg-[#f9f6e2]" : "bg-gray-50 shadow-lg"}
            flex-shrink-0`}
          onClick={() => handleTabClick(index)}
        >
          {tab.icon && (
            <img
              src={tab.icon}
              alt={tab.label}
              className="w-5 h-5 sm:w-7 sm:h-7 rounded-full"
            />
          )}
          <span className="font-medium text-black">{tab.label}</span>
        </div>
      ))}
    </div>
  );
}
