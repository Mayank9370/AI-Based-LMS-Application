import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { BookOpen } from 'lucide-react';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.user);
      const serverUrl  = import.meta.env.VITE_SERVERURL

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
      dispatch(setUserData(null));
      toast.success("Logged out successfully");
      setShowProfileDropdown(false);
      setIsOpen(false);
      navigate("/");
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
      toast.error("Logout failed");
    }
  };

  const navLinks = (
    <>
      {userData && (
        <div
          onClick={() => {
            navigate("/enrolledcourses");
            setIsOpen(false);
            setShowProfileDropdown(false);
          }}
          className="cursor-pointer hover:text-purple-600 transition px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          My Courses
        </div>
      )}

      {userData?.role === "educator" && (
        <div
          onClick={() => {
            navigate("/dashboard");
            setIsOpen(false);
            setShowProfileDropdown(false);
          }}
          className="cursor-pointer hover:text-purple-600 transition px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          Dashboard
        </div>
      )}

      {userData && (
        <div
          onClick={() => {
            navigate("/profile");
            setIsOpen(false);
            setShowProfileDropdown(false);
          }}
          className="cursor-pointer hover:text-purple-600 transition px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          My Profile
        </div>
      )}

      {!userData ? (
        <div
          onClick={() => {
            navigate("/login");
            setIsOpen(false);
          }}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg cursor-pointer text-center hover:bg-purple-700 transition font-semibold"
        >
          Login
        </div>
      ) : (
        <div
          className="bg-red-600 text-white px-6 py-2 rounded-lg cursor-pointer text-center hover:bg-red-700 transition font-semibold"
          onClick={handleLogout}
        >
          Logout
        </div>
      )}
    </>
  );

  return (
    <nav className="w-full h-16 flex fixed top-0 z-50 items-center justify-between px-4 sm:px-10 shadow-md bg-white">
      {/* Logo */}
      <div 
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <BookOpen size={40} strokeWidth={2} className='text-purple-600' />
        <span className="text-xl font-bold text-purple-600 hidden sm:block">EduLearn</span>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-6 text-lg font-semibold">
        {navLinks}
        
        {/* Profile Dropdown */}
        {userData && (
          <div className="relative">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-gray-300 cursor-pointer hover:border-purple-600 transition"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              {userData.photoUrl ? (
                <img
                  src={userData.photoUrl}
                  className="w-full h-full rounded-full object-cover"
                  alt="Profile"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-purple-600 text-white flex items-center justify-center text-lg font-semibold">
                  {userData?.name?.slice(0, 1).toUpperCase()}
                </div>
              )}
            </div>

            {showProfileDropdown && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                  onClick={() => {
                    navigate("/profile");
                    setShowProfileDropdown(false);
                  }}
                >
                  <div className="font-semibold">{userData.name}</div>
                  <div className="text-sm text-gray-600 capitalize">{userData.role}</div>
                </div>
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate("/profile");
                    setShowProfileDropdown(false);
                  }}
                >
                  My Profile
                </div>
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate("/enrolledcourses");
                    setShowProfileDropdown(false);
                  }}
                >
                  My Courses
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div
        className="lg:hidden cursor-pointer p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} className="text-purple-600" /> : <Menu size={28} className="text-purple-600" />}
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <BookOpen size={32} strokeWidth={2} className='text-purple-600' />
            <span className="text-xl font-bold text-purple-600">EduLearn</span>
          </div>
          <X
            size={28}
            className="cursor-pointer text-gray-600 hover:text-purple-600"
            onClick={() => setIsOpen(false)}
          />
        </div>

        {/* User Info */}
        {userData && (
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-purple-600">
                {userData.photoUrl ? (
                  <img
                    src={userData.photoUrl}
                    className="w-full h-full rounded-full object-cover"
                    alt="Profile"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-purple-600 text-white flex items-center justify-center text-xl font-semibold">
                    {userData?.name?.slice(0, 1).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <div className="font-semibold text-lg">{userData.name}</div>
                <div className="text-sm text-gray-600 capitalize">{userData.role}</div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <div className="flex-1 p-6 flex flex-col gap-4">
          {userData && (
            <>
              <div
                onClick={() => {
                  navigate("/profile");
                  setIsOpen(false);
                }}
                className="cursor-pointer hover:text-purple-600 transition px-4 py-3 rounded-lg hover:bg-gray-100 text-lg font-semibold border-l-4 border-transparent hover:border-purple-600"
              >
                My Profile
              </div>
              <div
                onClick={() => {
                  navigate("/enrolledcourses");
                  setIsOpen(false);
                }}
                className="cursor-pointer hover:text-purple-600 transition px-4 py-3 rounded-lg hover:bg-gray-100 text-lg font-semibold border-l-4 border-transparent hover:border-purple-600"
              >
                My Courses
              </div>
              {userData.role === "educator" && (
                <div
                  onClick={() => {
                    navigate("/dashboard");
                    setIsOpen(false);
                  }}
                  className="cursor-pointer hover:text-purple-600 transition px-4 py-3 rounded-lg hover:bg-gray-100 text-lg font-semibold border-l-4 border-transparent hover:border-purple-600"
                >
                  Dashboard
                </div>
              )}
            </>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex flex-col gap-3">
            {!userData ? (
              <div
                onClick={() => {
                  navigate("/login");
                  setIsOpen(false);
                }}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg cursor-pointer text-center hover:bg-purple-700 transition font-semibold text-lg"
              >
                Login
              </div>
            ) : (
              <div
                className="bg-red-600 text-white px-6 py-3 rounded-lg cursor-pointer text-center hover:bg-red-700 transition font-semibold text-lg"
                onClick={handleLogout}
              >
                Logout
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </nav>
  );
}

export default Nav;