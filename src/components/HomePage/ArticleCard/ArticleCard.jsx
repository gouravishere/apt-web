import React from "react";

const ArticleCard = ({ imageSrc, title, date, duration, tags, name }) => {
  
  return (
    <div className="w-full max-w-xs bg-white border border-gray-200 rounded-lg p-[4px] overflow-hidden cursor-pointer">
      <img src={imageSrc} alt="Article" className="w-full h-48 rounded-2xl" />
      <div className="p-4 flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <div>
          <div className=" text-xs">
            <span>
              {name} • {date} •{" "}
            </span>
            <span>{isNaN(duration) ? "1 min" : duration}</span>
          </div>
          <div className="mt-2">
            <ul className="flex space-x-2 text-sm">
              {tags?.map((tag, index) => (
                <li
                  key={index}
                  className="border-gray-200 border text-xs px-3 py-1 rounded-full"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
