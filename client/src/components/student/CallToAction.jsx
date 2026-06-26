import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext.jsx'
import { ArrowRight } from 'lucide-react'

const CallToAction = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userRole } = useContext(AppContext);

  return (
    <div className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl shadow-blue-100/50">
          {/* Subtle overlay styling */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),transparent_50%)]"></div>

          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Start Learning Skills That Matter Today
            </h2>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed mb-8">
              Join thousands of professionals mastering development, design, and business tactics. Get access to video lectures, quiz items, and project checklists.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/course-list"
                className="px-6 py-3 font-semibold text-blue-700 bg-white rounded-xl hover:bg-blue-50 transition-all duration-300 flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                Explore Courses
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button 
                onClick={() => {
                  if (isAuthenticated && userRole === 'educator') {
                    navigate('/educator');
                    return;
                  }

                  if (isAuthenticated) {
                    navigate('/signup?role=educator');
                    return;
                  }

                  navigate('/auth?role=educator&redirect=%2Feducator');
                }}
                className="px-6 py-3 font-semibold text-white bg-white/10 rounded-xl hover:bg-white/20 border border-white/20 transition-all duration-300 cursor-pointer"
              >
                Become an Instructor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CallToAction
