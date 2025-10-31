import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "https://media.istockphoto.com/id/1515913422/photo/a-data-analyst-using-technology-ai-for-working-tool-for-data-analysis-chatbot-chat-with-ai.jpg?s=2048x2048&w=is&k=20&c=8eruy8bG_f0KSDLSAMeF76eeZWJHk-Tg1PLCwMhx_Yw=",
  "https://images.unsplash.com/photo-1618365908648-e71bd5716cba?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  "https://media.istockphoto.com/id/2241149111/photo/entrepreneurs-analyze-data-and-user-interfaces-ui-ux-in-the-digital-world-develop-future.jpg?s=2048x2048&w=is&k=20&c=YFEKRXEoeT4HYwvz4N-XbtmFQJL2Jbic_BpoP9lYdbE=",
];

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);

  // Optional: auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-[400px] overflow-hidden ">
      {/* Image container */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Slide ${idx}`}
            className="w-full flex-shrink-0 object-cover h-[600px]"
          />
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/70"
      >
        <ChevronLeft className="text-white w-6 h-6" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/70"
      >
        <ChevronRight className="text-white w-6 h-6" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 w-full flex justify-center gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full ${
              current === idx ? "bg-white" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;