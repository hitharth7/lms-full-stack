import React from 'react'
import Navbar from '../../components/student/Navbar.jsx'
import Hero from '../../components/student/Hero.jsx'
import Companies from '../../components/student/Companies.jsx'
import CoursesSection from '../../components/student/CoursesSection.jsx'
import TestimonialSection from '../../components/student/TestimonialSection.jsx'
import CallToAction from '../../components/student/CallToAction.jsx'
import Footer from '../../components/student/Footer.jsx'

const Home = () => {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#e0f2fe_0%,#ffffff_38%)]">
      <Navbar />
      <Hero />
      <Companies />
      <CoursesSection />
      <TestimonialSection />
      <CallToAction />
      <Footer />
    </div>
  )
}

export default Home
