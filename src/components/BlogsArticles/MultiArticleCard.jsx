import React from "react";
import { useNavigate } from "react-router-dom";
import ReactGA from "react-ga4";

const MultiArticleCard = ({
  imageUrl,
  title,
  name,
  date,
  tags,
  userImage,
  blog,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    const formattedTitle = blog.Title?.toLowerCase().replace(/\s+/g, "-"); // Replace spaces with hyphens
    ReactGA.event({
      category: "Blog Navigation",
      action: "Clicked on Blog",
      label: blog.Title,
    });
    navigate(`/blog/${formattedTitle}`, { state: blog });
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white gap-5 cursor-pointer items-center rounded-lg border border-gray-200 p-2 max-w-2xl"
    >
      {/* Image Section */}
      <div className="rounded-lg overflow-hidden">
        <img
          src={imageUrl}
          alt={"noImage"}
          className="w-full h-32 object-cover object-center "
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-col gap-3">
          {/* Title */}
          <h2 className="text-sm font-medium">{title}</h2>
        </div>

        <div className="flex flex-col gap-2">
          {/* Date and Read Time */}
          <div className="flex items-center text-neutral-700 text-xs">
            <div className="flex items-center gap-1.5">
              <span>{name}</span>
            </div>
            <span className="mx-1">•</span>
            <span>{date}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags?.map((tag, index) => (
              <span
                key={index}
                className="border border-neutral-200  px-3 py-1 rounded-full text-xs "
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiArticleCard;
