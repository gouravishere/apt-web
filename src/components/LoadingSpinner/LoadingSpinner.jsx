import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed bg-white top-0 left-0 z-[999] h-screen w-screen flex justify-center items-center">
      <svg
        className="loaderClasses"
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
      >
        <circle
          cx="20"
          cy="20"
          r="18"
          stroke="url(#gradient)"
          strokeWidth="4"
          strokeDasharray="113"
          strokeDashoffset="0"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="113"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40">
            <stop offset="20%" stopColor="#fedc60" stopOpacity="1" />
            <stop offset="100%" stopColor="#fedc60" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default LoadingSpinner;
