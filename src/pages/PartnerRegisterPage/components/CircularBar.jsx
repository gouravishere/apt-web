import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const CircularProgress = ({ progress = 0 }) => {
  const [strokeDashoffset, setStrokeDashoffset] = useState(440); // Initial offset (full circle)

  useEffect(() => {
    const radius = 70; // Circle radius
    const circumference = 2 * Math.PI * radius; // Circumference of the circle
    const offset = circumference - (progress / 100) * circumference; // Calculate stroke offset based on progress
    setStrokeDashoffset(offset);
  }, [progress]);

  return (
    <div className="relative flex justify-center items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width="100"
        height="100"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#4CAF50"
          stroke-width="5"
        />

        <path
          fill="none"
          stroke="#4CAF50"
          stroke-width="8"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M20 50 L40 70 L80 30"
        >
          <animate
            attributeName="stroke-dasharray"
            from="0, 100"
            to="100, 0"
            dur="0.5s"
            fill="freeze"
          />
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="0"
            dur="0.5s"
            fill="freeze"
          />
        </path>
      </svg>
    </div>
  );
};

const ProgressPage = ({ setVisibleRegister, resetActionForm }) => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    let timeElapsed = 0;
    const totalDuration = 10000;

    // Start the progress immediately after component mounts
    interval = setInterval(() => {
      if (timeElapsed < totalDuration) {
        timeElapsed += 100; // Increase time by 100ms
        const newProgress = Math.min((timeElapsed / totalDuration) * 100, 100);
        setProgress(newProgress);
      } else {
        clearInterval(interval);
        resetActionForm();
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="top-0 left-0 w-full h-full bg-opacity-50 flex justify-center items-center z-50">
      <CircularProgress progress={progress} />
    </div>
  );
};

export default ProgressPage;
