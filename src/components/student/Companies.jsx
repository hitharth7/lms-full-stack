import React from 'react'

const Companies = () => {
  return (
    <div className="bg-white border-y border-gray-100/80 py-8 my-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-gray-400 mb-6">
          Trusted by learners working at world-class companies
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16 opacity-50 grayscale hover:opacity-80 hover:grayscale-0 transition-all duration-500">
          <span className="font-extrabold text-xl sm:text-2xl text-gray-500 tracking-tight">Google</span>
          <span className="font-extrabold text-xl sm:text-2xl text-gray-500 tracking-tight">Microsoft</span>
          <span className="font-extrabold text-xl sm:text-2xl text-gray-500 tracking-tight">NETFLIX</span>
          <span className="font-extrabold text-xl sm:text-2xl text-gray-500 tracking-tight">stripe</span>
          <span className="font-extrabold text-xl sm:text-2xl text-gray-500 tracking-tight">HubSpot</span>
        </div>
      </div>
    </div>
  )
}

export default Companies
