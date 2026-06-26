import React from 'react'
import { assets } from '../../assets/assets.js'

const Footer = () => {
  return (
    <footer className="border-t border-gray-100 bg-white py-4 px-6 text-center text-xs text-gray-400 font-semibold">
      <div className="flex items-center justify-center gap-2 mb-2">
        <img src={assets.logo} alt="Edemy" className="w-8 h-8 object-contain" />
      </div>
      &copy; {new Date().getFullYear()} Edemy Educator Portal. All rights reserved.
    </footer>
  )
}

export default Footer
