import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext.jsx'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { Plus, Trash, Check, ArrowRight } from 'lucide-react'
import uniqid from 'uniqid'
import { thumbnailThemes } from '../../utils/courseThumbnail.js'

const AddCourse = () => {
  const navigate = useNavigate();
  const { addCourse } = useContext(AppContext);
  
  // Basic Info States
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Development");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [selectedThumbnail, setSelectedThumbnail] = useState("linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)");

  // Quill editor
  const editorRef = useRef(null);
  const [quill, setQuill] = useState(null);

  useEffect(() => {
    if (editorRef.current && !quill) {
      const q = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write a detailed course summary, requirements, and curriculum guides...',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['clean']
          ]
        }
      });
      setQuill(q);
    }
  }, [quill]);

  // Chapters curriculum state
  const [chapters, setChapters] = useState([]);
  const [activeChapterTitle, setActiveChapterTitle] = useState("");
  
  // Modal states for lecture
  const [activeChapForLec, setActiveChapForLec] = useState(null);
  const [lectureTitle, setLectureTitle] = useState("");
  const [lectureDuration, setLectureDuration] = useState("");
  const [lectureVideoId, setLectureVideoId] = useState("");
  const [lectureIsPreview, setLectureIsPreview] = useState(false);

  const handleAddChapter = () => {
    if (!activeChapterTitle.trim()) return;
    const newChap = {
      chapterId: `chap-${uniqid()}`,
      chapterTitle: activeChapterTitle.trim(),
      chapterContent: []
    };
    setChapters([...chapters, newChap]);
    setActiveChapterTitle("");
  };

  const handleRemoveChapter = (chapId) => {
    setChapters(chapters.filter((ch) => ch.chapterId !== chapId));
  };

  const handleAddLecture = (e) => {
    e.preventDefault();
    if (!lectureTitle.trim() || !lectureDuration || !lectureVideoId.trim()) return;

    const newLec = {
      lectureId: `lec-${uniqid()}`,
      lectureTitle: lectureTitle.trim(),
      lectureDuration: parseInt(lectureDuration) * 60, // store in seconds
      videoUrl: lectureVideoId.trim(),
      isPreview: lectureIsPreview
    };

    setChapters(chapters.map((ch) => {
      if (ch.chapterId === activeChapForLec) {
        return {
          ...ch,
          chapterContent: [...ch.chapterContent, newLec]
        };
      }
      return ch;
    }));

    // Reset
    setLectureTitle("");
    setLectureDuration("");
    setLectureVideoId("");
    setLectureIsPreview(false);
    setActiveChapForLec(null);
  };

  const handleRemoveLecture = (chapId, lecId) => {
    setChapters(chapters.map((ch) => {
      if (ch.chapterId === chapId) {
        return {
          ...ch,
          chapterContent: ch.chapterContent.filter((l) => l.lectureId !== lecId)
        };
      }
      return ch;
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !price || !quill) {
      alert("Please provide a course title, price, and description details.");
      return;
    }

    let lecturesCount = 0;
    let duration = 0;
    chapters.forEach((ch) => {
      lecturesCount += ch.chapterContent.length;
      ch.chapterContent.forEach((lec) => {
        duration += lec.lectureDuration;
      });
    });

    const descriptionHtml = quill.root.innerHTML;

    const courseData = {
      title: title.trim(),
      category,
      price: parseFloat(price),
      discount: parseFloat(discount) || 0,
      thumbnail: selectedThumbnail,
      description: descriptionHtml,
      duration,
      lecturesCount,
      chapters
    };

    addCourse(courseData);
    alert("Course created and published successfully!");
    navigate('/educator/my-courses');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Create & Build a Course</h1>
        <p className="text-sm text-gray-500 mt-1">Populate details and curriculum outlines to publish your curriculum to the catalogue.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Course essentials */}
        <div className="border border-gray-100 rounded-3xl p-6 bg-white shadow-sm space-y-6">
          <h3 className="font-extrabold text-gray-800 text-base border-b border-gray-50 pb-3">1. Course Essentials</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold uppercase text-gray-400">Course Title</label>
              <input 
                type="text" 
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Advanced Tailwind and React Animations"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-gray-400">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
              >
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Business">Business</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-gray-400">Course Card Theme</label>
              <div className="flex flex-wrap gap-2 pt-1">
                {thumbnailThemes.map((t) => (
                  <button
                    key={t.label}
                    type="button"
                    onClick={() => setSelectedThumbnail(t.value)}
                    title={t.label}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-sm transition-all cursor-pointer hover:scale-105 ${t.className} ${
                      selectedThumbnail === t.value ? "ring-4 ring-blue-100" : ""
                    }`}
                  >
                    {selectedThumbnail === t.value && <Check className="w-4 h-4 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-gray-400">Original Price ($)</label>
              <input 
                type="number" 
                required
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 99.99"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-gray-400">Discount Percent (%)</label>
              <input 
                type="number" 
                min="0"
                max="100"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="e.g. 15 (Optional)"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Detailed description */}
        <div className="border border-gray-100 rounded-3xl p-6 bg-white shadow-sm space-y-4">
          <h3 className="font-extrabold text-gray-800 text-base border-b border-gray-50 pb-3">2. Detailed Description</h3>
          <div ref={editorRef} className="min-h-[160px]"></div>
        </div>

        {/* Curriculum outline builder */}
        <div className="border border-gray-100 rounded-3xl p-6 bg-white shadow-sm space-y-6">
          <h3 className="font-extrabold text-gray-800 text-base border-b border-gray-50 pb-3">3. Curriculum sections builder</h3>

          <div className="flex gap-2.5">
            <input 
              type="text"
              value={activeChapterTitle}
              onChange={(e) => setActiveChapterTitle(e.target.value)}
              placeholder="e.g. Chapter 1: Introduction"
              className="flex-grow px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
            />
            <button
              type="button"
              onClick={handleAddChapter}
              className="px-4.5 bg-blue-50 text-blue-600 font-semibold text-sm rounded-xl hover:bg-blue-100 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Section
            </button>
          </div>

          <div className="space-y-4 pt-2">
            {chapters.length > 0 ? (
              chapters.map((ch, chIdx) => (
                <div key={ch.chapterId} className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-xs animate-fade-in">
                  <div className="bg-gray-50/50 p-4.5 flex justify-between items-center border-b border-gray-100">
                    <span className="font-bold text-sm text-gray-800">
                      {chIdx + 1}. {ch.chapterTitle}
                    </span>
                    <div className="flex gap-2.5">
                      <button
                        type="button"
                        onClick={() => setActiveChapForLec(ch.chapterId)}
                        className="px-3 py-1.5 bg-blue-600 text-white font-bold text-xs rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                      >
                        + Add Lecture
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveChapter(ch.chapterId)}
                        className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg cursor-pointer"
                      >
                        <Trash className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    {ch.chapterContent.length > 0 ? (
                      ch.chapterContent.map((lec, lecIdx) => (
                        <div key={lec.lectureId} className="flex justify-between items-center bg-gray-50/30 rounded-xl px-4 py-3 border border-gray-100/50">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-gray-700">
                              Lec {lecIdx + 1}: {lec.lectureTitle} ({Math.round(lec.lectureDuration / 60)} min)
                            </span>
                            {lec.isPreview && (
                              <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded uppercase">Preview</span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveLecture(ch.chapterId, lec.lectureId)}
                            className="text-gray-400 hover:text-red-500 rounded p-1 cursor-pointer"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-400 italic">No lectures added yet. Click "+ Add Lecture" above.</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 italic text-center py-6">No sections defined. Create a section using the input above to begin.</p>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button 
            type="submit"
            className="px-8 py-3.5 bg-blue-600 text-white font-extrabold text-sm rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-50 transition-all flex items-center gap-2 cursor-pointer"
          >
            Publish Course
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Add lecture modal */}
      {activeChapForLec && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs animate-fade-in" onClick={() => setActiveChapForLec(null)}></div>
          
          <form 
            onSubmit={handleAddLecture}
            className="relative bg-white rounded-3xl p-6 w-full max-w-md z-10 shadow-2xl space-y-4 animate-scale-in"
          >
            <div className="border-b border-gray-100 pb-3 flex justify-between items-center">
              <h4 className="font-extrabold text-gray-800 text-base">Add New Lecture</h4>
              <button 
                type="button" 
                onClick={() => setActiveChapForLec(null)}
                className="text-gray-400 hover:text-gray-600 text-xl cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Lecture Title</label>
              <input 
                type="text" 
                required
                value={lectureTitle}
                onChange={(e) => setLectureTitle(e.target.value)}
                placeholder="e.g. 01. Getting Started with CSS"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Duration (Minutes)</label>
              <input 
                type="number" 
                required
                min="1"
                value={lectureDuration}
                onChange={(e) => setLectureDuration(e.target.value)}
                placeholder="e.g. 15"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase">YouTube Video ID</label>
              <input 
                type="text" 
                required
                value={lectureVideoId}
                onChange={(e) => setLectureVideoId(e.target.value)}
                placeholder="e.g. Ke90Tje7VS0"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
              />
            </div>

            <label className="flex items-center gap-2.5 text-sm text-gray-600 cursor-pointer pt-1.5">
              <input 
                type="checkbox"
                checked={lectureIsPreview}
                onChange={(e) => setLectureIsPreview(e.target.checked)}
                className="w-4.5 h-4.5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
              />
              <span>Allow preview without buying course</span>
            </label>

            <div className="pt-2 flex gap-3">
              <button 
                type="button"
                onClick={() => setActiveChapForLec(null)}
                className="flex-1 py-2.5 border border-gray-200 text-gray-600 font-semibold text-xs rounded-xl hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex-1 py-2.5 bg-blue-600 text-white font-semibold text-xs rounded-xl hover:bg-blue-700 cursor-pointer"
              >
                Add Lecture
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default AddCourse
