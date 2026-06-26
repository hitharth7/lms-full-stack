import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AppContext } from '../../context/AppContext.jsx'
import Navbar from '../../components/educator/Navbar.jsx'
import Sidebar from '../../components/educator/Sidebar.jsx'
import Footer from '../../components/educator/Footer.jsx'

const Educator = () => {
  const { userRole } = useContext(AppContext);

  if (userRole !== 'educator') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex-grow flex flex-col justify-between overflow-x-hidden min-h-[calc(100vh-4rem)]">
          <main className="p-6">
            <div className="max-w-6xl mx-auto animate-fade-in">
              <Outlet />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Educator
