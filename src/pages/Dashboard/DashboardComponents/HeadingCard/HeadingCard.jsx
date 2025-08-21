const HeadingCard = ({ heading, content }) => {
    return (
      <div className="flex-col justify-center items-start gap-1 inline-flex md:pl-16">
        <div className="text-nowrap text-slate-500 text-xs font-normal font-['Poppins'] leading-[18px]">
          {heading}
        </div>
        <div className="text-nowrap text-neutral-900 text-sm sm:text-base font-medium font-['Poppins'] leading-normal">
          {content}
        </div>
      </div>
    );
  };

export default HeadingCard