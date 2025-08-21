import React from "react";
import { useNavigate } from "react-router-dom";

const GuideArticleCard = ({ imageUrl, title, tags, guide, serviceId }) => {
  const navigate = useNavigate();

  const formattedTitle = guide.title?.toLowerCase().replace(/\s+/g, "-");
  const handleClick = () => {
    navigate(`/guide/${formattedTitle}`, {
      state: { ...guide, serviceId: serviceId?.[0] },
    });
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white cursor-pointer rounded-lg border border-gray-200 shadow-sm p-1 sm:p-1 md:p-1 flex flex-col gap-3 sm:gap-4 w-full"
    >
      {/* Image Section */}
      <div className="rounded-lg overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-40 sm:h-48 md:h-56 object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-2 p-0">
        {/* Title */}
        <h2 className="text-sm sm:text-base font-semibold text-gray-700 leading-snug ml-4">
          {title}
        </h2>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 my-2 ml-4">
          {serviceId?.map((tag, index) => (
            <span
              key={index}
              className="border border-gray-300 px-2 py-1 rounded-full text-xs sm:text-sm text-gray-600"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuideArticleCard;
