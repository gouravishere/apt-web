import { useState } from "react";

export default function TabsVertical({
  tabs,
  onTabChange,
  onClick,
  className,
}) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
    if (onTabChange) {
      onTabChange(index);
    }
  };

  const handleClick = (data) => {
    if (onClick) {
      onClick(data);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer text-sm sm:text-base whitespace-nowrap w-full h-24
            ${className}
                ${
                  activeTab === index
                    ? "border-b-4 border-[#FDCE00] bg-[#f9f6e2]"
                    : "bg-gray-50 shadow-lg"
                }`}
          onClick={() => {
            handleTabClick(index);
            handleClick(tab);
          }}
        >
          {tab.icon && (
            <img
              src={tab.icon}
              alt={tab.label}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full "
            />
          )}
          <span className="font-medium text-black text-wrap ">{tab.label}</span>
        </div>
      ))}
    </div>
  );
}
