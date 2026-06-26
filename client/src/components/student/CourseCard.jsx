import React from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating.jsx'
import { Clock, BookOpen } from 'lucide-react'
import { getThumbnailThemeClass, isGradientThumbnail, getThumbnailUrl } from '../../utils/courseThumbnail.js'
import { formatCourseDuration } from '../../utils/formatDuration.js'

const CourseCard = ({ course }) => {
  const discountedPrice = (course.coursePrice * (1 - course.discount / 100)).toFixed(2);

  return (
    <Link 
      to={`/course/${course._id}`}
      className="group block border border-gray-100/90 rounded-2xl p-4 bg-white hover:-translate-y-1 hover:shadow-xl hover:border-blue-100/80 transition-all duration-300"
    >
      {/* Thumbnail */}
      <div 
        className={`w-full h-52 rounded-xl mb-4 relative overflow-hidden flex items-center justify-center course-thumbnail-frame ${
          isGradientThumbnail(course.courseThumbnail) ? getThumbnailThemeClass(course.courseThumbnail) : ""
        }`}
      >
        {!isGradientThumbnail(course.courseThumbnail) && course.courseThumbnail && (
          <img src={getThumbnailUrl(course.courseThumbnail)} alt={course.courseTitle} className="course-thumbnail-image" />
        )}
      </div>

      {/* Title */}
      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-1 text-base">
        {course.courseTitle}
      </h3>

      {/* Instructor */}
      <p className="text-xs text-gray-500 mb-2">By {course.instructor}</p>

      {/* Rating */}
      <div className="flex items-center gap-1.5 mb-3">
        <span className="text-sm font-bold text-amber-500">{course.rating}</span>
        <Rating rating={course.rating} />
        <span className="text-xs text-gray-400">({course.numRatings || 0})</span>
      </div>

      {/* Details (lectures, duration) */}
      <div className="flex items-center gap-4 text-xs text-gray-400 font-semibold border-t border-gray-50 pt-3 mb-3">
        <div className="flex items-center gap-1">
          <BookOpen className="w-3.5 h-3.5 text-gray-400" />
          <span>{course.lecturesCount || 0} lectures</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-gray-400" />
          <span>{formatCourseDuration(course.duration)}</span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-baseline justify-between mt-2">
        <div className="flex items-baseline gap-1.5">
          <span className="text-lg font-black text-gray-900">${discountedPrice}</span>
          {course.discount > 0 && (
            <span className="text-xs text-gray-400 line-through">${course.coursePrice.toFixed(2)}</span>
          )}
        </div>
        {course.discount > 0 && (
          <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">
            {course.discount}% OFF
          </span>
        )}
      </div>
    </Link>
  )
}

export default CourseCard
