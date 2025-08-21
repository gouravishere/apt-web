import React from "react";
import { createPortal } from "react-dom";
import Heading from "../Heading/Heading";
import crossIcon from "../../assets/icons/close-circle.svg";

const Modal = ({ heading, children, onClose }) => {
  return createPortal(
    <div
      className="fixed z-[9999] top-0 left-0 w-screen h-screen flex sm:items-center items-end justify-center"
      role="dialog"
      aria-hidden="true"
    >
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed bg-black/30 inset-0 z-40"
        aria-label="Close modal"
      ></div>

      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-lg z-50 w-full sm:w-[500px] max-h-screen overflow-y-auto max-w-full">
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200">
          <Heading variant="xl" weight="medium">
            {heading}
          </Heading>
          <button onClick={onClose} aria-label="Close modal" className="p-2">
            <img src={crossIcon} alt="Close" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
