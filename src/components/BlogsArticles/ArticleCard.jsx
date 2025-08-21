import React from "react";
import { useNavigate } from "react-router-dom";
import ReactGA from "react-ga4";

const ArticleCard = ({
  imageUrl,
  title,
  description,
  date,
  readTime,
  tags,
  blog,
  name,
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
      className="bg-white rounded-lg cursor-pointer h-full border border-gray-200 p-2"
    >
      {/* Image Section */}
      <div className="rounded-lg overflow-hidden">
        <img
          src={imageUrl}
          alt={"noImage"}
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          {/* Title */}
          <h2 className="text-2xl font-medium">{title}</h2>

          {/* Description */}
          <p className="text-neutral-700 text-xs font-normal">{description}</p>
        </div>

        <div className="flex flex-col gap-3">
          {/* Date and Read Time */}
          <div className="flex items-center text-neutral-700 text-xs">
            <span>{name}</span>
            <span>{date}</span>
            {readTime && (
              <>
                <span className="mx-1">•</span>
                <span>{readTime}</span>
              </>
            )}
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

export default ArticleCard;
