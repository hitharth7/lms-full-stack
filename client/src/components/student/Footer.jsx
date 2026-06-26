import React from 'react'
import { Heart } from 'lucide-react'
import { assets } from '../../assets/assets.js'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={assets.logo} alt="Edemy" className="edemy-footer-logo object-contain rounded-xl" />
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Empowering learners worldwide to acquire new skills, build credentials, and advance their professional careers.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <img src={assets.facebook_icon} alt="Facebook" className="w-5 h-5 object-contain" />
              </a>
              <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <img src={assets.twitter_icon} alt="Twitter" className="w-5 h-5 object-contain" />
              </a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <img src={assets.instagram_icon} alt="Instagram" className="w-5 h-5 object-contain" />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <span className="text-sm font-black text-sky-700">in</span>
              </a>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">Explore</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Courses Catalog</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Popular Subjects</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Learning Paths</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Certificates</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">About Us</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Become an Instructor</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Help Center</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">Stay Updated</h4>
            <p className="text-sm text-gray-500">Subscribe to our newsletter for weekly articles and course announcements.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed! Thank you."); }} className="flex gap-2">
              <input 
                type="email" 
                required
                placeholder="Enter your email" 
                className="w-full px-3.5 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600"
              />
              <button 
                type="submit" 
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors duration-300 cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} Edemy Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for learning.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
