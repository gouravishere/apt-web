import { formatIndianCurrencyZero } from "../../utils";

const StarightLine = () => {
    return <div className="h-[2px] bg-gray-500 mt-7 mb-4 mx-5"></div>;
};

const ListFeature = ({ features }) => {
    return (
        <ul className="mx-5 mt-3 list-disc pl-5">
            {features.map((feature, index) => (
                <li key={index} className="my-4">
                    {Object.values(feature)[0]}
                </li>
            ))}
        </ul>
    );
};

const Pricing=({price})=>{
    return <div className="mx-5">
        <div className="text-3xl font-semibold">
        <span className="inline-block  rounded-full text-3xl text-gray-700">₹</span>
            {formatIndianCurrencyZero(price)} /-</div>
        <div>+taxes</div>
    </div>
}

const Button=({buttonText, onClick})=>{
    return <div>
         <button
         onClick={onClick}
        className=" px-6 py-3 text-sm font-medium w-fit border border-black rounded-full hover:bg-[#FDCE00] transition"
      >
        {buttonText}
      </button>
    </div>
}
export default function PricingCard({icon,heading,description,features,prices,buttonText}) {
    return (
      <div>
        <div className="bg-white w-full rounded-3xl shadow-lg p-6 border">
         <div>
            <img alt="" src={icon} className="ml-5 mt-2"/>
         </div>
         <div className="font-medium text-2xl mx-5 mt-5">
            {heading}
         </div>
         <div className="mx-5 text-sm mt-2">
            {description}
         </div>
         <StarightLine/>
         <div className="mx-5 text-lg text-slate-400 mt-6">
            Key Features
         </div>
        <div>
        <ListFeature features={features}/>
        </div>
        <StarightLine/>
        <div className="flex justify-between">
            <Pricing price={prices}/>
            <Button buttonText={buttonText}/>
        </div>
        </div>
      </div>
    );
  }
  