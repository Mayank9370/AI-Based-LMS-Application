import React from "react";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
const ReviewCard = ({ text, name, image, rating, role }) => {
  return (
    <div className="bg-pink-50 px-14 py-10 rounded-xl border-2 border-black hover:bg-white shadow-md hover:shadow-lg transition-all duration-300 max-w-sm w-full">
      {/* ⭐ Rating Stars */}
      <div className="flex items-center mb-3 text-yellow-400 text-sm">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <span key={i}>
              {i < rating ? <FaStar /> : <FaRegStar />}
            </span>
          ))}
      </div>

      {/* 💬 Review Text */}
      <p className="text-black font-bold text-2xl mb-5">{`"` + text +`"`}</p>

      {/* 👤 Reviewer Info */}
      <div className="flex items-center gap-3">
        <img
          src={image}
          alt={name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold text-gray-800 text-sm">{name}</h4>
          <p className="text-xs text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
