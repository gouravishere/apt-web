import Star from "../../../../assets/icons/star.svg";
import img1 from "../../../../assets/icons/img-1.svg";
import img2 from "../../../../assets/icons/img-2.svg";
import img3 from "../../../../assets/icons/img-3.svg";
import img4 from "../../../../assets/icons/img-4.svg";
import SimplifyTaxesBlue from "../../../../assets/icons/SimplifyTaxesBlue.svg";
import { useSelector } from "react-redux";

const StarText = ({ label }) => {
  return (
    <div className="flex space-x-2">
      <img src={Star} alt="Star" className="h-5 w-7" />
      <span className="font-medium text-gray-800">{label}</span>
    </div>
  );
};

const BigText = () => {
  return (
    <div className="mt-10">
      <h1 className="text-3xl font-bold tracking-wider">
        Simplify Taxes Across Globe <br /> with
        <span className="relative text-yellow-500 ml-5">
          Expert
        <img src={SimplifyTaxesBlue} alt="" className="absolute top-0 left-0" />
        </span>
        <span className="text-yellow-500 ml-5">Assistance</span>
      </h1>
      <p className="text-gray-600 mt-6">
        From income tax to corporate filings, we handle it all across India,
        UAE, Saudi Arabia, Qatar, Singapore, Oman and Kuwait with accuracy and
        care.
      </p>
    </div>
  );
};

const ImagesPeople = () => {
  return (
    <div className="mt-12">
      <div className="flex relative z-10">
        <img src={img1} className="z-10" />
        <img src={img2} className="z-20 -ml-5" />
        <img src={img3} className="z-30 -ml-5" />
        <img src={img4} className="z-40 -ml-5" />
      </div>
    </div>
  );
};

const JoinOthersNow = () => {
  return <div className="mt-5 font-medium">Join Others Now!</div>;
};

export default function SimplifyTaxes() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const starLabel = [
    { label: "Company incorporation" },
    { label: "Virtual CFO" },
    { label: "Global e-tax compliance" }, 
  ];

  return (
    <div className={`w-full ${isAuthenticated?'mt-40':'mt-16'} bg-gray-100 rounded-3xl overflow-hidden p-8`}>
      <div className="flex space-x-5">
        {starLabel.map((item, index) => (
          <StarText key={index} label={item.label} />
        ))}
      </div>
      <BigText />
      <ImagesPeople />
      <JoinOthersNow />
    </div>
  );
}
