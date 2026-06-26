import React from 'react'
import { Star } from 'lucide-react'

const Rating = ({ rating, className = "" }) => {
  const stars = [];
  const floor = Math.floor(rating);
  const remainder = rating - floor;

  for (let i = 1; i <= 5; i++) {
    if (i <= floor) {
      stars.push(
        <Star 
          key={i} 
          className="w-4.5 h-4.5 fill-amber-400 text-amber-400" 
        />
      );
    } else if (i === floor + 1 && remainder >= 0.3) {
      stars.push(
        <div key={i} className="relative inline-block w-4.5 h-4.5">
          <Star className="w-4.5 h-4.5 text-gray-300 fill-gray-200" />
          <div className="absolute top-0 left-0 overflow-hidden w-1/2 h-full">
            <Star className="w-4.5 h-4.5 text-amber-400 fill-amber-400" />
          </div>
        </div>
      );
    } else {
      stars.push(
        <Star 
          key={i} 
          className="w-4.5 h-4.5 text-gray-300 fill-gray-200" 
        />
      );
    }
  }

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {stars}
    </div>
  )
}

export default Rating
