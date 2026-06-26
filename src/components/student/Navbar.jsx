import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext.jsx'
import { GraduationCap, LogOut, RefreshCw, Layers } from 'lucide-react'

const Navbar = () => {
  const navigate = useNavigate();
  const { userRole, changeUserRole, currentStudent, resetDatabase, enrolledCourseIds } = useContext(AppContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleReset = () => {
    resetDatabase();
    setDropdownOpen(false);
    navigate('/');
    // Reload state clean
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 border-b border-gray-100 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-100 group-hover:scale-105 transition-all duration-300">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
              Study<span className="text-blue-600">Sphere</span>
            </span>
          </Link>

          {/* Menu Actions */}
          <div className="flex items-center gap-5">
            {/* Educator shortcut portal button */}
            {userRole === 'student' ? (
              <button 
                onClick={() => {
                  changeUserRole('educator');
                  navigate('/educator');
                }}
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50/60 rounded-xl hover:bg-blue-100/80 transition-all duration-300 cursor-pointer"
              >
                <Layers className="w-4 h-4" />
                Educator Portal
              </button>
            ) : (
              <button 
                onClick={() => {
                  changeUserRole('student');
                  navigate('/');
                }}
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-emerald-600 bg-emerald-50/60 rounded-xl hover:bg-emerald-100/80 transition-all duration-300 cursor-pointer"
              >
                <Layers className="w-4 h-4" />
                Student View
              </button>
            )}

            {/* My Enrollments (only show for students) */}
            {userRole === 'student' && (
              <Link 
                to="/my-enrollments"
                className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors duration-300 relative py-2"
              >
                My Enrollments
                {enrolledCourseIds.length > 0 && (
                  <span className="absolute -top-1 -right-3 w-4.5 h-4.5 bg-blue-600 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                    {enrolledCourseIds.length}
                  </span>
                )}
              </Link>
            )}

            {/* User Avatar dropdown */}
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-50 transition-colors duration-300 border border-gray-100 cursor-pointer"
              >
                <img 
                  src={currentStudent.avatar} 
                  alt={currentStudent.name} 
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="hidden sm:inline text-sm font-semibold text-gray-700 pr-2 pl-1">{currentStudent.name}</span>
              </button>

              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-gray-100 shadow-xl py-2 z-20 animate-scale-in">
                    <div className="px-4 py-3 border-b border-gray-50">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Account Profile</p>
                      <p className="text-sm font-bold text-gray-800 truncate mt-0.5">{currentStudent.name}</p>
                      <p className="text-xs text-gray-500 truncate">{currentStudent.email}</p>
                    </div>

                    {/* Switch role option */}
                    <button
                      onClick={() => {
                        const target = userRole === 'student' ? 'educator' : 'student';
                        changeUserRole(target);
                        setDropdownOpen(false);
                        navigate(target === 'educator' ? '/educator' : '/');
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2.5 cursor-pointer"
                    >
                      <Layers className="w-4 h-4 text-gray-400" />
                      Switch to {userRole === 'student' ? 'Educator' : 'Student'}
                    </button>

                    {/* Reset mock database state */}
                    <button
                      onClick={handleReset}
                      className="w-full text-left px-4 py-2 text-sm text-amber-600 hover:bg-amber-50 flex items-center gap-2.5 cursor-pointer border-t border-gray-50"
                    >
                      <RefreshCw className="w-4 h-4 text-amber-500" />
                      Reset Demo Data
                    </button>

                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        alert("Log out is simulated for this static UI. You can switch portals or reset data.");
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2.5 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      Log out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
