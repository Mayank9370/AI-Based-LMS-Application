import { RiLiveFill } from "react-icons/ri";
import { IoBookOutline } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { LiaCertificateSolid } from "react-icons/lia";

const LiveCard = () => {
  return (
    <div className="w-full flex gap-6 flex-wrap justify-center items-center py-10">

      <div className="flex flex-col items-center justify-center text-center border-2 border-gray-300 bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer w-60">
        <RiLiveFill className="text-6xl text-red-500 mb-3" />
        <h1 className="text-xl font-semibold text-gray-800 mb-1">Daily Live</h1>
        <p className="text-gray-500">Interactive Classes</p>
      </div>

      <div className="flex flex-col items-center justify-center border-2 border-gray-300 bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer w-60">
        <IoBookOutline className="text-6xl text-green-500 mb-3" />
        <h1 className="text-xl font-semibold text-gray-800 mb-1">1 millions+ </h1>
        <p className="text-gray-500"> Test, Assignment, series</p>
      </div>


     <div className="flex flex-col items-center justify-center border-2 border-gray-300 bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer w-60">
        <IoMdTime className="text-6xl text-purple-500 mb-3" />
        <h1 className="text-xl font-semibold text-gray-800 mb-1"> 24 x 7 </h1>
        <p className="text-gray-500"> Doubt solving sessions</p>
      </div>

     <div className="flex flex-col items-center justify-center border-2 border-gray-300 bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer w-60">
        <LiaCertificateSolid className="text-6xl text-blue-500 mb-3" />
        <h1 className="text-xl font-semibold text-gray-800 mb-1"> 100+ courses </h1>
        <p className="text-gray-500">Certificate</p>
      </div>

    </div>
  );
};

export default LiveCard;
