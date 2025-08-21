import { useNavigate } from "react-router-dom";
import CircularProgress from "../components/CircularBar";
const Step7 = ({ setVisibleRegister, resetActionForm }) => {

  const navigate= useNavigate()

  return (
    <>
      <div className="p-2">
        <div>
          <CircularProgress
            setVisibleRegister={setVisibleRegister}
            resetActionForm={resetActionForm}
          />
        </div>
        <div className="text-6xl mt-4 font-semibold text-[#c5c5c5] text-center">
          THANK YOU
        </div>
        <div className="font-semibold text-xl text-[#051328] mt-8 text-center">
          Registration Successful!
        </div>
        <div className="text-[#475569] text-[16px] sm:max-w-full md:max-w-md text-center mt-2">
          Thank you for enrolling with us. we will notify you once your
          application verified by our team. And will intimate you once
          successfully registered.
        </div>
        <div className="flex w-full justify-center">
          <button
            className="rounded-lg border-2 border-black hover:border-gray-500 hover:text-gray-500 duration-100 py-2 px-3 mx-auto mt-7"
            onClick={() => {
              setVisibleRegister(false);
              navigate("/partnerpage");
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    </>
  );
};
export default Step7;
