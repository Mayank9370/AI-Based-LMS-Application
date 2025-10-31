import React from 'react'
import VideoPlayer from './VideoPlayer'

function About() {
  return (
    <div className='w-[100vw] lg:h-[40vh] min-h-[40vh] flex flex-wrap items-center justify-center gap-2 mb-[30px]'>

      <div className='lg:w-[100%] md:w-[100%] w-[100%] h-[100%] flex items-center flex-wrap gap-10 justify-center px-[35px] md:px-[80px]' >

        <div className="group relative flex flex-col items-center justify-center border-2 bg-amber-100 border-gray-300 p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer w-60 h-60 overflow-hidden">
          {/* Text Section */}
          <div className="flex flex-col items-center justify-center transform transition-all duration-500 ease-out group-hover:-translate-y-12">
            <h1 className="text-2xl font-semibold text-gray-800">1 Million+</h1>
            <p className="text-gray-500">Happy Users</p>
          </div>
          {/* Icon Animation */}
          <img
            src="https://img.icons8.com/?size=100&id=IBgUXg3MQlTW&format=png&color=000000"
            alt="User Icon"
            className="absolute bottom-0 opacity-0 group-hover:bottom-8 group-hover:opacity-100 transition-all duration-500 ease-out"
          />
        </div>

        <div className="group relative flex flex-col items-center justify-center border-2 bg-red-100 border-gray-300 p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer w-60 h-60 overflow-hidden">
          {/* Text Section */}
          <div className="flex flex-col items-center justify-center transform transition-all duration-500 ease-out group-hover:-translate-y-12">
            <h1 className="text-2xl font-semibold text-gray-800">1000+</h1>
            <p className="text-gray-500">Test Assignment</p>
          </div>
          {/* Icon Animation */}
          <img
            src="https://img.icons8.com/?size=100&id=FXMQoDW7KHma&format=png&color=000000"
            alt="User Icon"
            className="absolute bottom-0 opacity-0 group-hover:bottom-8 group-hover:opacity-100 transition-all duration-500 ease-out"
          />
        </div>

        <div className="group relative flex flex-col items-center justify-center border-2 bg-pink-100 border-gray-300 p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer w-60 h-60 overflow-hidden">
          {/* Text Section */}
          <div className="flex flex-col items-center justify-center transform transition-all duration-500 ease-out group-hover:-translate-y-12">
            <h1 className="text-2xl font-semibold text-gray-800">2000+</h1>
            <p className="text-gray-500">Lectures</p>
          </div>
          {/* Icon Animation */}
          <img
            src="https://img.icons8.com/?size=100&id=sXZdPkVp5RGY&format=png&color=000000"
            alt="User Icon"
            className="absolute bottom-0 opacity-0 group-hover:bottom-8 group-hover:opacity-100 transition-all duration-500 ease-out"
          />
        </div>

        <div className="group relative flex flex-col items-center justify-center border-2 bg-blue-100 border-gray-300 p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer w-60 h-60 overflow-hidden">
          {/* Text Section */}
          <div className="flex flex-col items-center justify-center transform transition-all duration-500 ease-out group-hover:-translate-y-12">
            <h1 className="text-2xl font-semibold text-gray-800">50000+</h1>
            <p className="text-gray-500">Notes</p>
          </div>
          {/* Icon Animation */}
          <img
            src="https://img.icons8.com/?size=100&id=D45ofLrj1Mp5&format=png&color=000000"
            alt="User Icon"
            className="absolute bottom-0 opacity-0 group-hover:bottom-8 group-hover:opacity-100 transition-all duration-500 ease-out"
          />
        </div>



      </div>

    </div>
  )
}

export default About
