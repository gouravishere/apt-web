import React from "react";

const Accordion = ({
  heading,
  children,
  mainClass,
  containerClass,
  titleClass,
  childClass,
  isOpen,
  onToggle,
}) => {
  return (
    <div className={containerClass}>
      <div
        className={`flex justify-between rounded-t-lg items-center cursor-pointer ${mainClass}`}
        onClick={onToggle}
      >
        <h3 className={`${titleClass}`}>{heading}</h3>
        <button className="text-2xl">
          {isOpen ? <span>-</span> : <span>+</span>}
        </button>
      </div>
      {isOpen && <div className={`${childClass}`}>{children}</div>}
    </div>
  );
};

export default Accordion;
