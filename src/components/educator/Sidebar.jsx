import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, PlusCircle, BookOpen, Users } from 'lucide-react'

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/educator", icon: LayoutDashboard, end: true },
    { name: "Add Course", path: "/educator/add-course", icon: PlusCircle },
    { name: "My Courses", path: "/educator/my-courses", icon: BookOpen },
    { name: "Students Enrolled", path: "/educator/student-enrolled", icon: Users },
  ];

  return (
    <div className="w-64 border-r border-gray-100 bg-white min-h-[calc(100vh-4rem)] flex flex-col justify-between py-6 flex-shrink-0">
      <div className="space-y-1.5 px-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.end}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isActive 
                  ? "bg-blue-50 text-blue-600" 
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>

      <div className="px-6 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
        StudySphere Educator
      </div>
    </div>
  )
}

export default Sidebar
