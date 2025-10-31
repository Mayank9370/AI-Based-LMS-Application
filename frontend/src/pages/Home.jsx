import React from "react";
import Nav from "../components/Nav";
import Logos from "../components/Logos";
import { useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import ExploreCourses from "../components/ExploreCourses";
import Cardspage from "../components/Cardspage";
import About from "../components/About";
import ReviewPage from "../components/ReviewPage";
import Footer from "../components/Footer";
import ImageSlider from "../components/ImageSlider";
import VideoPlay from "../components/VideoPlay";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Top Navigation and Hero Slider */}
      <div className="w-full border-gray-200">
        <Nav />
        <ImageSlider />
      </div>

      {/* Hero Section */}
      <section className="w-full min-h-[10vh] flex flex-col justify-center items-center text-center px-6 py-12 md:py-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
          Discover the <span className="text-blue-600">Perfect Course</span> for You
        </h1>
        <p className="mt-3 text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl">
          Unlock your potential and boost your career with <span className="font-medium text-gray-700">expert-led courses</span>, interactive learning, and real-world projects.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => navigate("/allcourses")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 shadow-md"
          >
            Explore All Courses
          </button>

          <button
            onClick={() => navigate("/searchwithai")}
            className="flex items-center gap-2 bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 shadow-md"
          >
            <IoSearchSharp className="text-2xl text-white" />
            Search with AI
          </button>
        </div>
      </section>


      <Cardspage />
      <Logos />
      <ReviewPage />
      <About />
      <Footer />

    </div>
  );
};

export default Home;
