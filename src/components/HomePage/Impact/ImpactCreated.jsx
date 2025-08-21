import React, { useEffect, useState } from "react";
import StatCard from "../StatCard/StatCard";
import { stats } from "./dummyData";

const ImpactCreated = () => {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the screen size is mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile screen width threshold
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleViewAllClick = () => {
    setShowAll(true);
  };
  return (
    <div className="flex flex-col gap-20 my-24">
      <div className="text-[32px] font-medium text-center">
        Impact we have created
      </div>
      <div className=" flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(showAll || !isMobile ? stats : stats.slice(0, 3)).map(
            (stat, index) => (
              <div
                key={index}
                className={`relative ${
                  (index + 1) % 3 !== 0
                    ? "border-r border-gray-300 px-[56px]"
                    : ""
                }`}
              >
                <StatCard
                  number={stat.number}
                  title={stat.title}
                  description={stat.description}
                  bgColor={stat.bgColor}
                />
              </div>
            )
          )}
        </div>
        {isMobile && stats.length > 3 && !showAll && (
          <div className="text-center mt-4">
            <button
              className="px-6 py-3 rounded-full border bg-white text-sm font-medium"
              onClick={handleViewAllClick}
            >
              View All Services
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImpactCreated;
