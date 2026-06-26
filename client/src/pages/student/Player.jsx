import React, { useContext, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext.jsx'
import YouTube from 'react-youtube'
import { Line } from 'rc-progress'
import { ArrowLeft, CheckCircle, ChevronDown, ChevronUp, Play, BookOpen, Clock } from 'lucide-react'
import { formatCourseDuration } from '../../utils/formatDuration.js'

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    courses,
    getCompletedLectures,
    toggleLectureCompletion,
    getCourseProgressPercent,
    isEnrolled,
    enrollmentsLoading,
  } = useContext(AppContext);

  const [activeLecture, setActiveLecture] = useState(null);
  const [openChapters, setOpenChapters] = useState({});
  const [activeTab, setActiveTab] = useState("overview");

  const course = courses.find((c) => c._id === id);
  const completedLectures = getCompletedLectures(id);

  // Once course is ready and enrollments loaded, run access check and set first lecture
  useEffect(() => {
    if (!course || enrollmentsLoading) return;

    if (!isEnrolled(course._id)) {
      alert("You must enroll in this course first to open the player.");
      navigate(`/course/${course._id}`);
      return;
    }

    // Select first lecture by default
    if (course.chapters.length > 0 && course.chapters[0].chapterContent.length > 0) {
      setActiveLecture(course.chapters[0].chapterContent[0]);
    }

    // Open all chapters by default for easy navigation
    const initialOpen = {};
    course.chapters.forEach((ch) => {
      initialOpen[ch.chapterId] = true;
    });
    setOpenChapters(initialOpen);
  }, [course, enrollmentsLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!course || !activeLecture) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Loading Course Lectures...</p>
        </div>
      </div>
    );
  }

  const toggleChapter = (chapId) => {
    setOpenChapters((prev) => ({
      ...prev,
      [chapId]: !prev[chapId]
    }));
  };

  const isLectureCompleted = (lectureId) => {
    return completedLectures.includes(lectureId);
  };

  const progress = getCourseProgressPercent(course._id);

  // opts for react-youtube
  const youtubeOpts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      rel: 0,
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Player Header */}
      <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 relative z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/my-enrollments')}
            className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-extrabold text-sm sm:text-base text-gray-900 line-clamp-1">
              {course.courseTitle}
            </h1>
            <p className="text-xs text-gray-400 font-medium">By {course.instructor}</p>
          </div>
        </div>

        {/* Progress Display */}
        <div className="flex items-center gap-3.5">
          <div className="hidden sm:block w-36">
            <Line
              percent={progress}
              strokeWidth="3"
              strokeColor={progress === 100 ? "#10b981" : "#2563eb"}
              trailColor="#f3f4f6"
              strokeLinecap="round"
            />
          </div>
          <span className="text-xs font-bold text-gray-700 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded-md">
            {progress}% Done
          </span>
        </div>
      </header>

      {/* Main Layout Splitter */}
      <div className="flex-grow flex flex-col lg:flex-row overflow-hidden">

        {/* Left Column (Video Frame + Info Tab) */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Video Container Aspect Frame */}
          <div className="w-full bg-black rounded-3xl overflow-hidden shadow-lg aspect-video relative z-0">
            <YouTube
              videoId={activeLecture.videoUrl}
              opts={youtubeOpts}
              className="w-full h-full"
              containerClassName="w-full h-full"
            />
          </div>

          {/* Video Info Section */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-xl font-extrabold text-gray-900 leading-tight">
                {activeLecture.lectureTitle}
              </h2>

              {/* Checkbox completed toggle */}
              <button
                onClick={() => toggleLectureCompletion(course._id, activeLecture.lectureId)}
                className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  isLectureCompleted(activeLecture.lectureId)
                    ? "bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <CheckCircle className={`w-4 h-4 ${isLectureCompleted(activeLecture.lectureId) ? "fill-emerald-600 text-white" : ""}`} />
                {isLectureCompleted(activeLecture.lectureId) ? "Completed" : "Mark Completed"}
              </button>
            </div>

            {/* Tab Selectors */}
            <div className="flex border-b border-gray-100 gap-6 text-sm font-semibold mb-6">
              {["overview", "qa", "notes"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 capitalize transition-all cursor-pointer ${
                    activeTab === tab
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab === "qa" ? "Q&A" : tab}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="text-sm text-gray-600 leading-relaxed min-h-[120px]">
              {activeTab === "overview" && (
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">About this Lecture</h3>
                  <p>In this lesson, we cover key techniques and concepts. Ensure you run the code local examples and follow along step-by-step.</p>
                  <p className="mt-4">Duration: {formatCourseDuration(activeLecture.lectureDuration)}.</p>
                </div>
              )}

              {activeTab === "qa" && (
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="font-bold text-xs text-gray-700">James Anderson &bull; 2 hours ago</p>
                    <p className="text-sm text-gray-600 mt-1">Should we wrap this component inside React.memo for production performance?</p>
                  </div>
                  <div className="p-3 bg-blue-50/50 rounded-xl pl-6 border-l-2 border-blue-500">
                    <p className="font-bold text-xs text-blue-700">Sarah Jenkins (Instructor) &bull; 1 hour ago</p>
                    <p className="text-sm text-gray-600 mt-1">Only if it is rendering frequently with the same props. Usually standard renders are extremely optimized in React 19.</p>
                  </div>
                </div>
              )}

              {activeTab === "notes" && (
                <div className="space-y-3">
                  <textarea
                    placeholder="Take notes for this lecture here..."
                    rows="3"
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 text-sm"
                  ></textarea>
                  <button
                    onClick={() => alert("Note saved successfully!")}
                    className="px-4 py-2 bg-blue-600 text-white font-semibold text-xs rounded-lg hover:bg-blue-700 transition-all cursor-pointer"
                  >
                    Save Notes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar (Lectures Index Navigator) */}
        <div className="w-full lg:w-80 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center gap-2 bg-gray-50/40">
            <BookOpen className="w-4.5 h-4.5 text-gray-400" />
            <span className="font-extrabold text-sm text-gray-800">Course Index Outline</span>
          </div>

          <div className="flex-grow overflow-y-auto divide-y divide-gray-100">
            {course.chapters.map((chapter) => {
              const isOpen = !!openChapters[chapter.chapterId];
              return (
                <div key={chapter.chapterId}>
                  <button
                    onClick={() => toggleChapter(chapter.chapterId)}
                    className="w-full flex items-center justify-between p-3.5 bg-gray-50/20 hover:bg-gray-50 text-left cursor-pointer"
                  >
                    <span className="font-bold text-xs sm:text-sm text-gray-700 line-clamp-1">{chapter.chapterTitle}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>

                  {isOpen && (
                    <div className="divide-y divide-gray-50">
                      {chapter.chapterContent.map((lecture) => {
                        const isActive = activeLecture.lectureId === lecture.lectureId;
                        const isDone = isLectureCompleted(lecture.lectureId);

                        return (
                          <button
                            key={lecture.lectureId}
                            onClick={() => setActiveLecture(lecture)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all cursor-pointer ${
                              isActive
                                ? "bg-blue-50/70 border-l-4 border-blue-600"
                                : "hover:bg-gray-50/50"
                            }`}
                          >
                            <div className="flex-shrink-0 flex items-center">
                              {isDone ? (
                                <CheckCircle className="w-4.5 h-4.5 text-emerald-500 fill-emerald-500 text-white" />
                              ) : (
                                <Play className={`w-4 h-4 ${isActive ? "text-blue-600 fill-blue-100" : "text-gray-300"}`} />
                              )}
                            </div>
                            <div className="flex-grow">
                              <p className={`text-xs font-semibold ${isActive ? "text-blue-600" : "text-gray-700"} line-clamp-2`}>
                                {lecture.lectureTitle}
                              </p>
                              <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-semibold mt-0.5">
                                <Clock className="w-3 h-3" />
                                <span>{formatCourseDuration(lecture.lectureDuration)}</span>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Player
