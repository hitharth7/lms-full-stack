import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t border-gray-100 bg-white py-4 px-6 text-center text-xs text-gray-400 font-semibold">
      &copy; {new Date().getFullYear()} StudySphere Educator Portal. All rights reserved.
    </footer>
  )
}

export default Footer
