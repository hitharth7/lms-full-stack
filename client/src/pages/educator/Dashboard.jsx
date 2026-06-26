import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext.jsx'
import { DollarSign, Users, BookOpen, Loader2 } from 'lucide-react'

const Dashboard = () => {
  const { fetchEducatorDashboard, educatorDashboard, educatorLoading } = useContext(AppContext);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    fetchEducatorDashboard().finally(() => setInitialized(true));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const metrics = educatorDashboard || { totalEarnings: 0, totalStudents: 0, coursesCreated: 0, recentStudents: [] };

  const statCards = [
    { name: "Total Earnings", value: `$${metrics.totalEarnings.toLocaleString()}`, description: "Across all courses", icon: DollarSign, color: "text-blue-600 bg-blue-50 border-blue-100" },
    { name: "Total Enrolled Students", value: metrics.totalStudents, description: "Active users count", icon: Users, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
    { name: "Courses Created", value: metrics.coursesCreated, description: "Published list catalog", icon: BookOpen, color: "text-purple-600 bg-purple-50 border-purple-100" },
  ];

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
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Educator Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Review your earnings stats and enrolled students progress metrics.</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {statCards.map((card) => (
          <div key={card.name} className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm flex items-center gap-5">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border ${card.color}`}>
              <card.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{card.name}</p>
              <h3 className="text-2xl font-extrabold text-gray-900 mt-1">{card.value}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Enrollments Table */}
      <div className="border border-gray-100 rounded-2xl bg-white shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-extrabold text-gray-900 text-base">Recent Enrollments</h3>
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">{metrics.recentStudents.length} entries</span>
        </div>

        {metrics.recentStudents.length > 0 ? (
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
                {metrics.recentStudents.map((stud) => (
                  <tr key={stud.id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">{stud.name}</p>
                      <p className="text-xs text-gray-400">{stud.email}</p>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-700 max-w-xs truncate">{stud.courseTitle}</td>
                    <td className="px-6 py-4 font-medium text-gray-500">{stud.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <progress className="educator-progress w-16" value={stud.progress} max="100" aria-label={`${stud.name} progress`} />
                        <span className="text-xs font-bold text-gray-700">{stud.progress}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400 text-sm">
            No student enrollments yet. Share your courses to get started.
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
