import React, { useContext, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext.jsx'
import Navbar from '../../components/student/Navbar.jsx'
import Footer from '../../components/student/Footer.jsx'
import Rating from '../../components/student/Rating.jsx'
import { 
  Play, BookOpen, Clock, Calendar, Globe, Award, 
  ChevronDown, ChevronUp, Lock, CheckCircle2, ShieldCheck 
} from 'lucide-react'

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, enrollInCourse, isEnrolled } = useContext(AppContext);
  const [openChapters, setOpenChapters] = useState({ c1: true, d1: true, m1: true, py1: true, pm1: true });
  const [previewVideo, setPreviewVideo] = useState(null);

  const course = courses.find((c) => c._id === id);

  if (!course) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-md mx-auto text-center py-20 px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Course Not Found</h2>
          <p className="text-gray-500 mb-6">The course you are looking for might have been removed or does not exist.</p>
          <Link to="/" className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
            Back to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const toggleChapter = (chapId) => {
    setOpenChapters((prev) => ({
      ...prev,
      [chapId]: !prev[chapId]
    }));
  };

  const handleEnroll = () => {
    enrollInCourse(course._id);
    alert(`Enrolled successfully in: ${course.courseTitle}! You can now access the full course lectures.`);
  };

  const isPurchased = isEnrolled(course._id);
  const discountedPrice = (course.coursePrice * (1 - course.discount / 100)).toFixed(2);

  const formatDuration = (secs) => {
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    if (hrs > 0) {
      return `${hrs} hr ${mins} min`;
    }
    return `${mins} min`;
  };

  return (
    <div className="min-h-screen bg-white relative">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <p className="text-xs text-gray-400 font-semibold mb-4">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link> &gt; <Link to="/course-list" className="hover:text-blue-600 transition-colors">Courses</Link> &gt; <span className="text-gray-600">{course.category}</span>
        </p>

        {/* Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-8 relative items-start">
          
          {/* Left Column - Core Details */}
          <div className="flex-grow space-y-8 lg:max-w-3xl">
            <div className="space-y-4">
              <span className="inline-block bg-blue-50 text-blue-600 text-[10px] font-bold px-2.5 py-1 rounded border border-blue-100 uppercase tracking-widest">
                {course.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                {course.courseTitle}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-amber-500">{course.rating}</span>
                  <Rating rating={course.rating} />
                  <span className="text-gray-400">({course.numRatings || 0} ratings)</span>
                </div>
                <div className="h-4 w-px bg-gray-200"></div>
                <p>Created by <span className="font-semibold text-gray-800">{course.instructor}</span></p>
              </div>

              <div className="flex flex-wrap gap-4 text-xs text-gray-500 font-medium pt-2">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>Last updated June 2026</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span>English</span>
                </div>
              </div>
            </div>

            {/* What you will learn */}
            <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50/20">
              <h2 className="font-extrabold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                What You'll Learn
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm text-gray-600">
                <div className="flex gap-2">
                  <span className="text-blue-600 font-bold">&#10003;</span>
                  <span>Acquire high-demand professional industry skills.</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-blue-600 font-bold">&#10003;</span>
                  <span>Understand key theoretical and architectural principles.</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-blue-600 font-bold">&#10003;</span>
                  <span>Build high-quality hands-on projects for your resume.</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-blue-600 font-bold">&#10003;</span>
                  <span>Get verified completion credentials and course tools.</span>
                </div>
              </div>
            </div>

            {/* Content Accordions */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h2 className="font-extrabold text-xl text-gray-900">Course Content</h2>
                  <p className="text-xs text-gray-400 mt-1 font-semibold">
                    {course.chapters.length} sections &bull; {course.lecturesCount} lectures &bull; {formatDuration(course.duration)} total duration
                  </p>
                </div>
              </div>

              <div className="border border-gray-100 rounded-2xl overflow-hidden divide-y divide-gray-100">
                {course.chapters.map((chapter) => {
                  const isOpen = !!openChapters[chapter.chapterId];
                  return (
                    <div key={chapter.chapterId} className="bg-white">
                      <button 
                        onClick={() => toggleChapter(chapter.chapterId)}
                        className="w-full flex items-center justify-between p-4.5 text-left bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          {isOpen ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                          <span className="font-bold text-sm sm:text-base text-gray-800">{chapter.chapterTitle}</span>
                        </div>
                        <span className="text-xs text-gray-400 font-semibold">{chapter.chapterContent.length} lectures</span>
                      </button>

                      {isOpen && (
                        <div className="bg-white py-1">
                          {chapter.chapterContent.map((lecture) => (
                            <div key={lecture.lectureId} className="flex justify-between items-center px-6 py-3.5 hover:bg-gray-50/40 transition-colors">
                              <div className="flex items-center gap-3">
                                {lecture.isPreview ? (
                                  <button 
                                    onClick={() => setPreviewVideo(lecture.videoUrl)}
                                    className="w-6 h-6 rounded-full bg-blue-50 hover:bg-blue-100 flex items-center justify-center text-blue-600 cursor-pointer"
                                  >
                                    <Play className="w-3 h-3 fill-blue-600" />
                                  </button>
                                ) : (
                                  <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                    <Lock className="w-3 h-3" />
                                  </div>
                                )}
                                <span className={`text-sm ${lecture.isPreview ? "text-gray-800 font-medium" : "text-gray-400"}`}>
                                  {lecture.lectureTitle}
                                </span>
                              </div>
                              <div className="flex items-center gap-4">
                                {lecture.isPreview && (
                                  <button 
                                    onClick={() => setPreviewVideo(lecture.videoUrl)}
                                    className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                                  >
                                    Preview
                                  </button>
                                )}
                                <span className="text-xs text-gray-400 font-medium">{formatDuration(lecture.lectureDuration)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detailed description */}
            <div className="space-y-3">
              <h2 className="font-extrabold text-xl text-gray-900">Description</h2>
              <div 
                className="text-sm text-gray-600 leading-relaxed prose prose-blue max-w-none"
                dangerouslySetInnerHTML={{ __html: course.courseDescription }}
              ></div>
            </div>

            {/* Educator bio profile */}
            <div className="space-y-4 pt-6 border-t border-gray-100">
              <h2 className="font-extrabold text-xl text-gray-900">Instructor</h2>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg uppercase shadow-sm border border-blue-100">
                  {course.instructor.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-gray-900 text-base">{course.instructor}</h3>
                  <p className="text-xs text-gray-400 font-semibold">Verified Professional Educator</p>
                  <p className="text-sm text-gray-500 leading-relaxed mt-2">
                    Expert trainer specialized in delivering clarity over complexity. Passionate about empowering careers in software development, visual graphics, and analytical strategy setups.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Purchase panel */}
          <div className="w-full lg:w-80 lg:sticky lg:top-20 flex-shrink-0 border border-gray-100 rounded-3xl overflow-hidden bg-white shadow-xl">
            {/* Visual Thumbnail Gradient */}
            <div 
              style={{ background: course.courseThumbnail }}
              className="w-full h-48 relative overflow-hidden flex items-center justify-center text-white p-4"
            >
              <div className="absolute inset-0 bg-black/5 opacity-30"></div>
              <button 
                onClick={() => setPreviewVideo(course.chapters[0]?.chapterContent[0]?.videoUrl || "Ke90Tje7VS0")}
                className="relative z-10 w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/25 flex items-center justify-center text-white hover:scale-105 transition-transform duration-300 shadow-lg cursor-pointer"
              >
                <Play className="w-6 h-6 fill-white ml-0.5" />
              </button>
              <span className="absolute bottom-3 text-xs text-white/80 font-bold tracking-wide">Preview this course</span>
            </div>

            {/* Enroll trigger content */}
            <div className="p-6 space-y-6">
              <div>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-3xl font-black text-gray-900">${discountedPrice}</span>
                  {course.discount > 0 && (
                    <span className="text-base text-gray-400 line-through">${course.coursePrice.toFixed(2)}</span>
                  )}
                </div>
                {course.discount > 0 && (
                  <span className="inline-block mt-2 text-[10px] font-bold text-red-600 bg-red-50 border border-red-100 px-2.5 py-0.5 rounded">
                    Save {course.discount}% off the original price!
                  </span>
                )}
              </div>

              {isPurchased ? (
                <button
                  onClick={() => navigate(`/player/${course._id}`)}
                  className="w-full py-3.5 bg-emerald-600 text-white font-extrabold text-sm rounded-2xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-50 cursor-pointer block text-center"
                >
                  Go to Course Player
                </button>
              ) : (
                <button
                  onClick={handleEnroll}
                  className="w-full py-3.5 bg-blue-600 text-white font-extrabold text-sm rounded-2xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-50 cursor-pointer"
                >
                  Buy / Enroll Now
                </button>
              )}

              {/* Course items inclusions */}
              <div className="space-y-3.5 pt-4 border-t border-gray-50 text-xs text-gray-500 font-medium">
                <p className="text-gray-700 font-bold uppercase tracking-wider text-[10px] mb-1">This course includes:</p>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>{formatDuration(course.duration)} video playback</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>{course.lecturesCount} lectures content modules</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>Shareable course certification badge</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Full lifetime access to modules</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal Preview */}
      {previewVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xs" onClick={() => setPreviewVideo(null)}></div>
          
          <div className="relative bg-black rounded-3xl overflow-hidden w-full max-w-3xl aspect-video z-10 shadow-2xl animate-scale-in flex items-center justify-center">
            <iframe 
              src={`https://www.youtube.com/embed/${previewVideo}?autoplay=1`}
              title="Course Preview Lecture"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
            <button 
              onClick={() => setPreviewVideo(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white cursor-pointer text-xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default CourseDetails
