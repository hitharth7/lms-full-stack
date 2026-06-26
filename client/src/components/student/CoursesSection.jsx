import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext.jsx'
import CourseCard from './CourseCard.jsx'
import { ArrowRight } from 'lucide-react'

const CoursesSection = () => {
  const { courses } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Development", "Design", "Marketing", "Business"];

  // Filter courses by category and check publication
  const filteredCourses = courses.filter((c) => {
    if (selectedCategory === "All") return c.isPublished;
    return c.category === selectedCategory && c.isPublished;
  });

  // Limit home page view to 4 items for layout balance
  const displayedCourses = filteredCourses.slice(0, 4);

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center md:text-left md:flex md:justify-between md:items-end mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
              Explore Our Popular Courses
            </h2>
            <p className="text-gray-500 max-w-xl text-sm sm:text-base leading-relaxed">
              Discover top-rated programs across tech, design, and commerce. Learn step-by-step from industry experts.
            </p>
          </div>
          <Link 
            to="/course-list" 
            className="hidden md:inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700 transition-all duration-300"
          >
            Show all courses
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2.5 justify-center md:justify-start mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4.5 py-2 rounded-full text-xs sm:text-sm font-semibold border transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100"
                  : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        {displayedCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            {displayedCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
            <p className="text-gray-400 font-medium">No courses available in this category yet.</p>
          </div>
        )}

        {/* Mobile View All Button */}
        <div className="mt-10 text-center md:hidden">
          <Link 
            to="/course-list" 
            className="inline-flex items-center gap-1.5 px-6 py-3 font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md shadow-blue-100 transition-all duration-300"
          >
            Show all courses
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CoursesSection
