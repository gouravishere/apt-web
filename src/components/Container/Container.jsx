import React from 'react'

const Container = ({children, className}) => {
  return (
    <div className={`w-full flex flex-col md:p-[32px] px-[12px] py-4 pt-8 justify-center items-center drop-shadow-2xl bg-white rounded-2xl gap-[56px] ${className}`}>
      {children}
    </div>
  )
}

export default Container