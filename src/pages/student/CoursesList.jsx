import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/student/Navbar.jsx'
import Footer from '../../components/student/Footer.jsx'
import CourseCard from '../../components/student/CourseCard.jsx'
import { AppContext } from '../../context/AppContext.jsx'
import { Search, X, SlidersHorizontal } from 'lucide-react'

const CoursesList = () => {
  const { courses, searchQuery, setSearchQuery } = useContext(AppContext);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync context query changes into local state
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const categories = ["Development", "Design", "Marketing", "Business"];

  const handleCategoryChange = (cat) => {
    setSelectedCategories((prev) => 
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Dynamic filter queries
  const filteredCourses = courses.filter((c) => {
    const matchesSearch = searchQuery 
      ? c.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesCategory = selectedCategories.length > 0 
      ? selectedCategories.includes(c.category)
      : true;

    return c.isPublished && matchesSearch && matchesCategory;
  });

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchQuery("");
    setLocalSearch("");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb pathing */}
        <div className="mb-6">
          <p className="text-xs text-gray-400 font-semibold mb-2">
            <span className="cursor-pointer hover:text-blue-600 transition-colors" onClick={() => window.location.href='/'}>Home</span> &gt; <span className="text-gray-600">Courses Catalog</span>
          </p>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Browse All Courses
          </h1>
          {searchQuery && (
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Showing results for "<span className="font-semibold text-blue-600">{searchQuery}</span>" ({filteredCourses.length} found)
            </p>
          )}
        </div>

        {/* Filters and Card Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-20 border border-gray-100 rounded-2xl p-5 space-y-6 bg-white">
              <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                <h3 className="font-bold text-gray-900 text-sm">Filters</h3>
                {(selectedCategories.length > 0 || searchQuery) && (
                  <button 
                    onClick={clearFilters}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Category selector */}
              <div>
                <h4 className="font-bold text-xs text-gray-400 uppercase tracking-wider mb-3">Category</h4>
                <div className="space-y-2.5">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleCategoryChange(cat)}
                        className="w-4.5 h-4.5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 focus:ring-1 cursor-pointer"
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Catalog Lists */}
          <div className="flex-grow">
            {/* Search Input bar */}
            <div className="flex gap-3 mb-6">
              <form 
                onSubmit={(e) => { e.preventDefault(); setSearchQuery(localSearch); }}
                className="flex items-center flex-grow bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-100 transition-all duration-300"
              >
                <Search className="w-4.5 h-4.5 text-gray-400 mr-2.5" />
                <input 
                  type="text" 
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  placeholder="Search courses, skills, instructors..." 
                  className="w-full text-sm placeholder-gray-400 bg-transparent border-none outline-none focus:outline-none focus:ring-0"
                />
                {localSearch && (
                  <button 
                    type="button" 
                    onClick={() => { setLocalSearch(""); setSearchQuery(""); }}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </form>

              {/* Mobile filter switcher */}
              <button 
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center gap-1.5 px-4.5 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 bg-white hover:bg-gray-50 cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
            </div>

            {/* Render items grid */}
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in">
                {filteredCourses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border border-dashed border-gray-200 rounded-3xl bg-gray-50/50">
                <p className="text-gray-400 font-bold text-lg mb-2">No Courses Found</p>
                <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">Try refining your search terms or unchecking category boxes to browse other areas.</p>
                <button 
                  onClick={clearFilters}
                  className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 shadow-md shadow-blue-100 transition-all cursor-pointer"
                >
                  Clear Filters & Search
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Drawer filter panel for mobile devices */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden animate-fade-in">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setShowMobileFilters(false)}></div>
          
          <div className="absolute top-0 right-0 bottom-0 max-w-xs w-full bg-white shadow-2xl p-6 flex flex-col animate-slide-in-right">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
              <h3 className="font-extrabold text-gray-900 text-lg">Filters</h3>
              <button onClick={() => setShowMobileFilters(false)} className="p-1 rounded-lg text-gray-400 hover:text-gray-600 cursor-pointer">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 space-y-6">
              <div>
                <h4 className="font-extrabold text-xs text-gray-400 uppercase tracking-wider mb-4">Category</h4>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-3 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleCategoryChange(cat)}
                        className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 focus:ring-1 cursor-pointer"
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 flex gap-3">
              <button 
                onClick={() => { clearFilters(); setShowMobileFilters(false); }}
                className="flex-1 py-2.5 border border-gray-200 text-gray-600 font-semibold text-sm rounded-xl hover:bg-gray-50 cursor-pointer"
              >
                Clear All
              </button>
              <button 
                onClick={() => setShowMobileFilters(false)}
                className="flex-1 py-2.5 bg-blue-600 text-white font-semibold text-sm rounded-xl hover:bg-blue-700 cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default CoursesList
