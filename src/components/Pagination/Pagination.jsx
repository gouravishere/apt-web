import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // First page
        i === totalPages || // Last page
        (i >= currentPage - 1 && i <= currentPage + 1) // Nearby pages
      ) {
        pageNumbers.push(
          <button
            key={i}
            className={`px-3 py-1 mx-1 text-xs rounded-full ${
              currentPage === i
                ? "border border-black font-semibold"
                : "border border-[#64748B] text-[#64748B]"
            }`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        );
      } else if (
        (i === currentPage - 2 || i === currentPage + 2) &&
        totalPages > 5
      ) {
        pageNumbers.push(
          <span key={`dots-${i}`} className="px-2">
            ...
          </span>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center mt-6">
      <button
        className="px-3 py-2 mx-1 text-[#64748B] text-sm border rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        className="px-3 py-2 mx-1 text-[#64748B] text-sm border rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
