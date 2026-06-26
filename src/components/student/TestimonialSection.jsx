import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext.jsx'
import Rating from './Rating.jsx'

const TestimonialSection = () => {
  const { testimonials } = useContext(AppContext);

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
            What Our Graduates Say
          </h2>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            Real stories from students who transformed their careers and gained verified credentials.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test, index) => (
            <div 
              key={index} 
              className="border border-gray-100/90 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating */}
                <Rating rating={test.rating} className="mb-4" />
                {/* Feedback */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                  "{test.feedback}"
                </p>
              </div>

              {/* User details */}
              <div className="flex items-center gap-3 border-t border-gray-50 pt-4 mt-auto">
                <img 
                  src={test.avatar} 
                  alt={test.name} 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-sm text-gray-900">{test.name}</h4>
                  <p className="text-xs text-gray-400">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TestimonialSection
