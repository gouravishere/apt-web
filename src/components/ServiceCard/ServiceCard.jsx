import React from 'react'

const ServiceCard = ({heading, name, date}) => {
  return (
    <div className="w-full sms:max-w-[278px] h-36 px-6 pt-8 pb-6 bg-white rounded-2xl border border-neutral-300 flex-col justify-start items-start gap-5 inline-flex">
    <div className="self-stretch h-[25px] flex-col justify-start items-start gap-2 flex">
        <div className="self-stretch text-neutral-900 text-xl font-semibold font-['Poppins'] leading-[25px]">{heading}</div>
    </div>
    <div className="self-stretch h-[43px] flex-col justify-start items-start gap-1 flex">
        <div className="self-stretch text-neutral-900 text-sm font-normal font-['Poppins'] leading-[21px]">{name}</div>
        <div className="self-stretch text-slate-600 text-xs font-normal font-['Poppins'] leading-[18px]">Completed on {date}</div>
    </div>
</div>
  )
}

export default ServiceCard