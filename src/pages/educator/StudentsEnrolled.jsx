import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext.jsx'
import { Users } from 'lucide-react'

const StudentsEnrolled = () => {
  const { getEducatorMetrics } = useContext(AppContext);
  const { recentStudents } = getEducatorMetrics();

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Students Enrolled</h1>
        <p className="text-sm text-gray-500 mt-1">Review active student learning progress across all your courses.</p>
      </div>

      {/* Table grid layout */}
      {recentStudents.length > 0 ? (
        <div className="border border-gray-100 rounded-2xl bg-white shadow-sm overflow-hidden animate-fade-in">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <th className="px-6 py-4">Student Name</th>
                  <th className="px-6 py-4">Enrolled Course</th>
                  <th className="px-6 py-4">Join Date</th>
                  <th className="px-6 py-4">Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                {recentStudents.map((stud) => (
                  <tr key={stud.id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">{stud.name}</p>
                      <p className="text-xs text-gray-400">{stud.email}</p>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-700 max-w-sm truncate">
                      {stud.courseTitle}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-500">{stud.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-24 bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${stud.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-bold text-gray-700">{stud.progress}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-gray-200 rounded-3xl bg-gray-50/50 max-w-xl mx-auto">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-bold text-lg mb-2">No students enrolled yet</p>
          <p className="text-gray-400 text-sm">Once students purchase your courses, they will appear here with progress reports.</p>
        </div>
      )}
    </div>
  )
}

export default StudentsEnrolled
