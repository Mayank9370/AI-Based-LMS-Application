import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-950 to-black text-gray-300 py-14 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-gray-800 pb-10">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-wide mb-3">
            Learn<span className="text-blue-500">AI</span>
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Empower your journey with hands-on learning. Transform your career through expert-led technology courses and innovative upskilling.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-blue-400 cursor-pointer" onClick={() => navigate("/")}>
              Home
            </li>
            <li className="hover:text-blue-400 cursor-pointer" onClick={() => navigate("/allcourses")}>
              Courses
            </li>
            <li className="hover:text-blue-400 cursor-pointer" onClick={() => navigate("/login")}>
              Login
            </li>
            <li className="hover:text-blue-400 cursor-pointer" onClick={() => navigate("/profile")}>
              My Profile
            </li>
          </ul>
        </div>

        {/* Explore Categories */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Top Categories</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-blue-400 cursor-pointer">Web Development</li>
            <li className="hover:text-blue-400 cursor-pointer">AI / Machine Learning</li>
            <li className="hover:text-blue-400 cursor-pointer">Data Science</li>
            <li className="hover:text-blue-400 cursor-pointer">UI / UX Design</li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Connect with Us</h3>
          <div className="flex items-center gap-4">
            <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition-all">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition-all">
              <FaInstagram />
            </a>
            <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition-all">
              <FaLinkedinIn />
            </a>
            <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition-all">
              <FaTwitter />
            </a>
          </div>
          <p className="text-gray-400 text-sm mt-4 leading-relaxed">
            Stay updated with our latest courses and learning paths.
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} LearnAI. All rights reserved.</p>
        <div className="flex gap-4 mt-3 sm:mt-0">
          <a href="#" className="hover:text-blue-400">Privacy Policy</a>
          <a href="#" className="hover:text-blue-400">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
