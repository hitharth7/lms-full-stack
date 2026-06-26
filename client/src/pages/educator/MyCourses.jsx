import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext.jsx'
import { BookOpen, Plus, ExternalLink, Loader2 } from 'lucide-react'
import { getThumbnailThemeClass, isGradientThumbnail, getThumbnailUrl } from '../../utils/courseThumbnail.js'

const MyCourses = () => {
  const { fetchEducatorDashboard, educatorDashboard, educatorLoading } = useContext(AppContext);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    fetchEducatorDashboard().finally(() => setInitialized(true));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const myCourses = educatorDashboard?.myCourses || [];

  if (!initialized || educatorLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">My Courses</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and review metrics for all courses you've created.</p>
        </div>
        <Link
          to="/educator/add-course"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 text-white font-semibold text-sm rounded-xl hover:bg-blue-700 shadow-md shadow-blue-50 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Create Course
        </Link>
      </div>

      {/* Courses List Table */}
      {myCourses.length > 0 ? (
        <div className="border border-gray-100 rounded-2xl bg-white shadow-sm overflow-hidden animate-fade-in">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <th className="px-6 py-4">Course</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Enrolled Students</th>
                  <th className="px-6 py-4">Total Earnings</th>
                  <th className="px-6 py-4">Curriculum</th>
                  <th className="px-6 py-4 text-right">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                {myCourses.map((course) => {
                  const finalPrice = (course.coursePrice * (1 - course.discount / 100)).toFixed(2);

                  return (
                    <tr key={course._id} className="hover:bg-gray-50/30 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-3">
                        {/* Mini Thumbnail */}
                        <div
                          className={`w-16 h-11 rounded-lg flex-shrink-0 flex items-center justify-center relative overflow-hidden course-thumbnail-frame ${
                            isGradientThumbnail(course.courseThumbnail) ? getThumbnailThemeClass(course.courseThumbnail) : ""
                          }`}
                        >
                          {!isGradientThumbnail(course.courseThumbnail) && course.courseThumbnail && (
                            <img src={getThumbnailUrl(course.courseThumbnail)} alt={course.courseTitle} className="course-thumbnail-image" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 line-clamp-1">{course.courseTitle}</p>
                          <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">
                            {course.category}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-900">
                        ${finalPrice}
                        {course.discount > 0 && (
                          <span className="text-[10px] text-gray-400 font-medium block line-through">
                            ${course.coursePrice.toFixed(2)}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-700">{course.enrolledCount ?? 0}</td>
                      <td className="px-6 py-4 font-extrabold text-gray-900">${(course.earnings ?? 0).toFixed(2)}</td>
                      <td className="px-6 py-4 font-medium text-gray-500">
                        {course.chapters?.length ?? 0} sections &bull; {course.lecturesCount ?? 0} lectures
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          to={`/course/${course._id}`}
                          className="inline-flex p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Course Page"
                        >
                          <ExternalLink className="w-4.5 h-4.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-gray-200 rounded-3xl bg-gray-50/50 max-w-xl mx-auto">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-bold text-lg mb-2">You haven't created any courses yet</p>
          <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">Publish your first learning course and start sharing your expertise with students.</p>
          <Link
            to="/educator/add-course"
            className="inline-flex items-center px-5 py-2.5 font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md shadow-blue-50 transition-all cursor-pointer"
          >
            Create Your First Course
          </Link>
        </div>
      )}
    </div>
  )
}

export default MyCourses
