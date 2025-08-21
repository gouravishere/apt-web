import React from "react";
import Button from "../../Button/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleChatbot } from "../../../redux/chatBotSlice/chatBotSlice";

const TaxCard = ({ icon, title, description, buttonText, onButtonClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clickHandler = () => {
    if (title === "Email us") {
      window.location.href = "mailto:support@ezyfiling.com";
    } else if (title === "Chat to support") {
      dispatch(toggleChatbot())
    } else {
      navigate(onButtonClick);
    }
  };
  return (
    <div className="p-6 flex items-start flex-col gap-5 rounded-3xl bg-white border border-gray-200">
      {/* Icon */}
      <div className="flex items-center justify-start">
        <img src={icon} alt={title} className="w-10 h-10" />
      </div>
      <div className="flex flex-col gap-2">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        {/* Description */}
        <p className=" text-neutral-700 font-normal text-sm">{description}</p>
        {/* Button */}
      </div>
      <Button size="sm" variant="outline" onClick={clickHandler}>
        {buttonText}
      </Button>
    </div>
  );
};

export default TaxCard;
