import StepCard from "../../components/StepCard/StepCard";
import Icon1 from "../../assets/icons/user-password.svg";
import Icon2 from "../../assets/icons/PartnerNet2.svg";
import Icon3 from "../../assets/icons/PartnerNet3.svg";
import Heading from "../../components/Heading/Heading";

export default function PartnerNetwork() {
  const steps = [
    {
      icon: Icon1,
      title: "Sign Up",
      description:
        "Register through our partner portal and create your profile.",
    },
    {
      icon: Icon2,
      title: "Onboard Services",
      description:
        "Choose the services you want to offer and get listed on our platform.",
    },
    {
      icon: Icon3,
      title: "Start Delivering Solutions",
      description:
        "Connect with clients, deliver solutions, and grow your business.",
    },
  ];
  return (
    <div>
      <div className="my-28 flex justify-center text-center ">
        <Heading variant="threeXl" weight="medium">
          How to Join the <span className="bg-[#fddc5e] px-1">ezyfiling</span>{" "}
          Partner Network?{" "}
        </Heading>
      </div>
      <div className="relative">
        {/* Steps Section */}
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 bg-white  relative w-full sm:w-11/12 m-auto border-b-8  border-yellow-400 sm:border-none rounded-3xl overflow-hidden px-6 sm:px-0  z-40 shadow-xl">
          {steps.map((step, index) => (
            <>
              <StepCard
                key={index}
                icon={step.icon}
                title={step.title}
                description={step.description}
              />
            </>
          ))}
        </div>

        {/* Yellow Section with Dots */}

        <div className="relative hidden lg:visible md:visible  bottom-40 rounded-3xl lg:flex md:flex items-center w-full bg-primary-500 h-72">
          {/* Dotted Line */}

          <div className="absolute bottom-16 w-1/2 m-auto left-5 right-5 border-t-2 border-dashed border-primary-200"></div>

          {/* Step Numbers */}
          <div className="flex absolute bottom-8 justify-evenly  w-full p-2 md:p-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className="relative flex items-center justify-center w-12 h-12 bg-primary-200 text-black font-bold rounded-full"
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
