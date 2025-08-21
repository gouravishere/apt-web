import React from "react";

const SliderInput = ({
  min = 100000,
  max = 100000000,
  value,
  onChange,
  onInput,
}) => {
  const calculateGradient = () => {
    return `linear-gradient(to right, #facc15 0%, #facc15 ${
      ((value - min) / (max - min)) * 100
    }%, #e5e7eb ${((value - min) / (max - min)) * 100}%, #e5e7eb 100%)`;
  };

  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      onInput={onInput}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-500 focus:outline-none "
      style={{
        background: calculateGradient(),
      }}
    />
  );
};

export default SliderInput;
