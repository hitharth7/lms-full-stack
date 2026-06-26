import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { AppContext } from '../../context/AppContext.jsx'

const SearchBar = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useContext(AppContext);
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(localQuery);
    navigate(`/course-list`);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex items-center w-full max-w-2xl bg-white border border-gray-200/80 shadow-md shadow-gray-100/50 rounded-2xl p-1.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-300"
    >
      <div className="flex items-center pl-3 flex-grow">
        <Search className="w-5 h-5 text-gray-400 mr-2.5" />
        <input 
          type="text" 
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder="Search for courses, skills, or instructors..." 
          className="w-full text-base text-gray-800 placeholder-gray-400 bg-transparent border-none outline-none focus:ring-0 focus:outline-none"
        />
      </div>
      <button 
        type="submit" 
        className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 cursor-pointer"
      >
        Search
      </button>
    </form>
  )
}

export default SearchBar
