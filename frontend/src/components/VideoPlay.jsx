import React, { useRef } from "react";

const VideoPlay = () => {
  const videoRef = useRef(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <video
        ref={videoRef}
        width="540"
        height="260"
        className="rounded-lg shadow-md"
        src="https://www.pexels.com/download/video/4630091/" // 👉 your video file path
        controls={false} // hide default controls if you want custom buttons
      />

      <div className="flex gap-4">
        <button
          onClick={handlePlay}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all"
        >
          ▶ Play
        </button>
        <button
          onClick={handlePause}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-all"
        >
          ⏸ Pause
        </button>
      </div>
    </div> 
  );
};

export default VideoPlay;
