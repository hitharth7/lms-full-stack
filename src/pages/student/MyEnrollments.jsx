import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext.jsx'
import Navbar from '../../components/student/Navbar.jsx'
import Footer from '../../components/student/Footer.jsx'
import { Line } from 'rc-progress'
import { BookOpen, CheckCircle } from 'lucide-react'

const MyEnrollments = () => {
  const navigate = useNavigate();
  const { getEnrolledCourses, getCourseProgressPercent } = useContext(AppContext);

  const enrolledCourses = getEnrolledCourses();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">
          My Enrollments
        </h1>

        {enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrolledCourses.map((course) => {
              const progress = getCourseProgressPercent(course._id);
              
              return (
                <div 
                  key={course._id}
                  className="flex flex-col sm:flex-row border border-gray-100 rounded-2xl p-4 bg-white hover:shadow-lg transition-shadow duration-300 gap-5 items-center sm:items-stretch"
                >
                  {/* Thumbnail */}
                  <div 
                    style={{ background: course.courseThumbnail }}
                    className="w-full sm:w-44 h-32 rounded-xl flex-shrink-0 flex items-center justify-center text-white p-3 text-center relative overflow-hidden font-bold text-sm tracking-tight"
                  >
                    <div className="absolute inset-0 bg-black/5 opacity-30"></div>
                    <span className="relative z-10 line-clamp-2">{course.courseTitle}</span>
                  </div>

                  {/* Course Details */}
                  <div className="flex-grow flex flex-col justify-between py-1">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50/60 border border-blue-100/50 px-2 py-0.5 rounded">
                        {course.category}
                      </span>
                      <h3 className="font-bold text-gray-900 text-base sm:text-lg line-clamp-1 mt-2 mb-1">
                        {course.courseTitle}
                      </h3>
                      <p className="text-xs text-gray-500 mb-3">By {course.instructor}</p>
                    </div>

                    {/* Progress Bar & Continue button */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center text-xs font-semibold text-gray-600 mb-1.5">
                          <span>Progress</span>
                          <span className="flex items-center gap-1">
                            {progress === 100 ? (
                              <span className="text-emerald-600 flex items-center gap-0.5"><CheckCircle className="w-3.5 h-3.5" /> Completed</span>
                            ) : (
                              <span>{progress}%</span>
                            )}
                          </span>
                        </div>
                        <Line 
                          percent={progress} 
                          strokeWidth="2.5" 
                          strokeColor={progress === 100 ? "#10b981" : "#2563eb"} 
                          trailColor="#f3f4f6" 
                          strokeLinecap="round"
                        />
                      </div>

                      <button 
                        onClick={() => navigate(`/player/${course._id}`)}
                        className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs cursor-pointer text-center transition-all ${
                          progress === 100 
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" 
                            : "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-50"
                        }`}
                      >
                        {progress === 100 ? "Review Lectures" : progress > 0 ? "Continue Learning" : "Start Learning"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24 border border-dashed border-gray-200 rounded-3xl bg-gray-50/50 max-w-2xl mx-auto">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-bold text-lg mb-2">You aren't enrolled in any courses yet</p>
            <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">Browse our catalogue of high-quality developer and designer lectures and begin learning.</p>
            <Link 
              to="/course-list"
              className="inline-flex items-center px-6 py-3 font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md shadow-blue-50 transition-all duration-300 cursor-pointer"
            >
              Browse Catalog
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default MyEnrollments
