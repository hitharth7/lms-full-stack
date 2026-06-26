import React from 'react'
import SearchBar from './SearchBar.jsx'
import { Sparkles, Trophy, Video } from 'lucide-react'
import { assets } from '../../assets/assets.js'

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white/0 pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
      {/* Subtle radial gradient background */}
      <div className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-blue-50/40 to-transparent blur-3xl rounded-full opacity-60"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 animate-fade-in-up">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full text-sm sm:text-base font-semibold text-blue-600 bg-blue-50 border border-blue-100 mb-6">
          <Sparkles className="w-4 h-4" />
          <span>Interactive, Premium Education</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight max-w-4xl mx-auto leading-[1.15] mb-6">
          Empower your future with the courses designed to <span className="text-blue-600 relative inline-block">fit your choice<img src={assets.sketch} className="absolute left-0 w-full" style={{ bottom: '-35px' }} alt="sketch" /></span>.
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Explore interactive modules curated and taught by top industry professionals. Advance your career in web development, graphic design, marketing, or business strategy.
        </p>

        {/* Search Bar container */}
        <div className="flex justify-center mb-10">
          <SearchBar />
        </div>

        {/* Mini stats badges */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-12 text-sm text-gray-600 font-medium">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Video className="w-4.5 h-4.5" />
            </div>
            <span>100+ Interactive Lectures</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Trophy className="w-4.5 h-4.5" />
            </div>
            <span>Industry Certificates</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
