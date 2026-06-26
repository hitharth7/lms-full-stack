import React from 'react'

const Loading = ({ type = "spinner" }) => {
  if (type === "card") {
    return (
      <div className="border border-gray-100 rounded-2xl p-4 shadow-sm animate-pulse bg-white">
        <div className="w-full h-44 bg-gray-200 rounded-xl mb-4"></div>
        <div className="h-4 bg-gray-200 rounded-md w-3/4 mb-3"></div>
        <div className="h-3 bg-gray-200 rounded-md w-1/2 mb-4"></div>
        <div className="flex gap-2 mb-4">
          <div className="h-3.5 bg-gray-200 rounded w-1/4"></div>
          <div className="h-3.5 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="h-5 bg-gray-200 rounded-md w-1/3 mt-2"></div>
      </div>
    );
  }

  if (type === "page") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium animate-pulse">Loading Academy...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-8">
      <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default Loading
