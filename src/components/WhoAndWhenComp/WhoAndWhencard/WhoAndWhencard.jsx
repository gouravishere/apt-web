export default function WhoAndWhencard({icon,title,description}) {
    return (
        <div className="p-6 flex flex-col gap-5 rounded-3xl bg-white border border-gray-200">
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
        </div>
      );
}