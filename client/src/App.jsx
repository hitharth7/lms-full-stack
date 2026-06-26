import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/student/Home.jsx'
import CoursesList from './pages/student/CoursesList.jsx'
import CourseDetails from './pages/student/CourseDetails.jsx'
import Auth from './pages/student/Auth.jsx'
import MyEnrollments from './pages/student/MyEnrollments.jsx'
import Player from './pages/student/Player.jsx'
import Payment from './pages/student/Payment.jsx'
import Educator from './pages/educator/Educator.jsx'
import Dashboard from './pages/educator/Dashboard.jsx'
import AddCourse from './pages/educator/AddCourse.jsx'
import MyCourses from './pages/educator/MyCourses.jsx'
import StudentsEnrolled from './pages/educator/StudentsEnrolled.jsx'
import RequireAuth from './components/RequireAuth.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />

        {/* Student Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/course-list" element={<CoursesList />} />
        <Route path="/course/:id" element={<CourseDetails />} />

        <Route element={<RequireAuth />}>
          <Route path="/payment/:id" element={<Payment />} />
          <Route path="/my-enrollments" element={<MyEnrollments />} />
          <Route path="/player/:id" element={<Player />} />

          {/* Educator Routes nested under Educator layout */}
          <Route path="/educator" element={<Educator />}>
            <Route index element={<Dashboard />} />
            <Route path="add-course" element={<AddCourse />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="student-enrolled" element={<StudentsEnrolled />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
