const TabSwitcher = ({
  tabs,
  activeTab,
  setActiveTab,
  isVerticle = false,
  isGap = true,
  className,
  variant = "default",
  onClick,
  isFixedWidth = true,
}) => {
  let commonClasses = "p-4 rounded-lg border-b-2 flex-col cursor-pointer";
  if (className) {
    commonClasses = className;
  }

  let activeClass = "";
  let inActiveClass = "";

  switch (variant) {
    case "white":
      activeClass =
        "md:p-6 px-4 py-3 bg-white md:rounded-tl-2xl md:rounded-bl-2xl border-b-2 md:border-b-0 md:border-r-2 border-[#fedc60] flex-col justify-start items-start gap-2 inline-flex";
      inActiveClass =
        "md:p-6 px-4 py-3 rounded-tl-2xl md:rounded-bl-2xl md:border-r-2 border-[#e9edf1] flex-col justify-start items-start gap-2 inline-flex";
      break;
    default:
      activeClass = "md:p-6 px-4 py-3 bg-[#fdce00]/10 border-primary-500";
      inActiveClass = "md:p-6 px-4 py-3 bg-white border-b-2 border border-neutral-300";
  }

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div className={`flex ${isGap && "gap-4"} ${isVerticle && "flex-col"} pb-6 overflow-x-auto flex-nowrap `}>
      {tabs?.map((tabs, index) => {
        return (
          <div
            key={index}
            className={`${commonClasses} ${isFixedWidth ? "md:min-w-[130px]" : "" }  w-full cursor-pointer justify-center items-start gap-1 inline-flex ${
              activeTab === index ? activeClass : inActiveClass
            }`}
            onClick={() => {
              handleClick(tabs); 
              setActiveTab(index);
            }}
          >
            {tabs?.icon && (
              <div className="flex items-center gap-3">
                <img src={tabs.icon} alt="" />
                <div className="text-center text-nowrap text-neutral-900 text-xs md:text-base font-medium leading-normal">
                  {tabs?.title}
                </div>
              </div>
            )}
            {!tabs?.icon && (
              <div className="text-center text-nowrap text-xs text-neutral-900 md:text-base font-medium leading-normal">
                {tabs?.title}
              </div>
            )}
            {tabs?.description && (
              <div className="text-wrap text-slate-600 text-xs font-normal leading-[18px]">
                {tabs?.description}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TabSwitcher;
