import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext.jsx'
import { Home } from 'lucide-react'
import { assets } from '../../assets/assets.js'

const Navbar = () => {
  const { currentStudent } = useContext(AppContext);

  return (
    <nav className="h-16 border-b border-gray-100 bg-white sticky top-0 z-30 flex items-center justify-between px-6">
      {/* Brand logo + Educator tag */}
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src={assets.logo}
            alt="Edemy"
            className="w-9 h-9 object-contain rounded-xl"
          />
        </Link>
        <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-100 uppercase tracking-widest">
          Educator
        </span>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-4">
        <Link 
          to="/"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all cursor-pointer"
        >
          <Home className="w-4 h-4" />
          Home
        </Link>

        {/* Educator profile info */}
        <div className="flex items-center gap-2 border-l border-gray-100 pl-4">
          <img 
            src={currentStudent.avatar} 
            alt="Educator" 
            className="w-8 h-8 rounded-full object-cover border border-gray-100"
          />
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-gray-800 leading-tight">{currentStudent.name}</p>
            <p className="text-[10px] text-gray-400 font-semibold">Instructor Account</p>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
