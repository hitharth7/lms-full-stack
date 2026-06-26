import React from 'react'
import { assets } from '../../assets/assets.js'

const Companies = () => {
  const logos = [
    { src: assets.microsoft_logo, alt: 'Microsoft' },
    { src: assets.walmart_logo, alt: 'Walmart' },
    { src: assets.accenture_logo, alt: 'Accenture' },
    { src: assets.adobe_logo, alt: 'Adobe' },
    { src: assets.paypal_logo, alt: 'PayPal' }
  ];

  return (
    <div className="bg-white border-y border-gray-100/80 py-8 my-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-gray-400 mb-6">
          Trusted by learners working at world-class companies
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16 transition-all duration-500">
          {logos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="h-7 sm:h-8 w-auto object-contain transition-transform duration-300 hover:scale-110"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Companies
