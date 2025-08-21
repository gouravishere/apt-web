import React, { useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { breadCrumbPath } from "../../utils/breadCrumbPaths";

const Breadcrumb = ({ excludePaths = [], isId = true }) => {
  const router = useNavigate();
  const location = useLocation();
  const params = useParams();

  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment); // Split the path into segments


  // Generate breadcrumb items
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    ...pathSegments.map((segment, index) => {
      const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
      const matchedItem = breadCrumbPath.find((item) =>
        item.href.includes(segment)
      );
      const label = matchedItem ? matchedItem.label : segment;

      // Check if the segment should be excluded
      const shouldExclude =
        excludePaths.includes(segment) ||
        (!isId && Object.values(params).includes(segment));

      return shouldExclude ? null : { label, href: path }; // Skip rendering excluded items
    }),
  ].filter(Boolean); // Remove null items (excluded paths)

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on load
  }, []);

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex space-x-2 text-xs font-normal text-gray-600">
        {breadcrumbItems?.map((link, index) => (
          <li key={index} className="flex items-center">
            <button
              onClick={() => link.href && router(link.href)}
              className={`${
                link.href
                  ? "text-neutral-700 hover:underline"
                  : "text-neutral-900 cursor-default"
              } ${index === breadcrumbItems.length - 1 ? "font-bold" : ""}`}
            >
              {link.label}
            </button>
            {index < breadcrumbItems.length - 1 && (
              <span className="mx-2 text-gray-400">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
