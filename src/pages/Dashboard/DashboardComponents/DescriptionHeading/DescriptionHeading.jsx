

const DescriptionHeading = ({ heading, descripiton, isDescription= true }) => {
    return (
      <div className="w-full">
        <div className="text-neutral-900 text-xl font-medium font-['Poppins'] leading-[30px]">
          {heading}
        </div>
       {isDescription && <div className="text-slate-600 text-sm font-normal  font-['Poppins'] leading-[21px]">
          {descripiton}
        </div>}
      </div>
    );
  };

  export default DescriptionHeading