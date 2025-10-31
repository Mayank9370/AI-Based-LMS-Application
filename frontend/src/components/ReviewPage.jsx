import React, { useEffect, useState } from 'react'
import ReviewCard from './ReviewCard'
import { useSelector } from 'react-redux';


function ReviewPage() {
  const [latestReview, setLatestReview] = useState([]);
  const { allReview } = useSelector(state => state.review)

  useEffect(() => {
    setLatestReview(allReview.slice(0, 6));
  }, [allReview])
  return (
    <div className='flex items-center justify-center flex-col'>
      <h1 className='border-2 border-pink-400 px-10 py-2 rounded-2xl bg-pink-50 font-semibold text-center mt-[30px] '>See what other say
      </h1>
      <h1 className='text-3xl font-bold mt-6'>Hear From Our Students </h1>

      <span className='lg:w-[50%] md:w-[80%] text-[15px] text-center mt-[20px] mb-[20px] px-[20px]'>We help students upskill & grow their career in the most comprehensive way possible.</span>
      <div className='w-[100%] min-[100vh] flex-col flex items-center  justify-center flex-wrap gap-[30px] lg:p-[50px] md:p-[30px] p-[10px] mb-[40px]
    '>
        {
          latestReview.map((item, index) => (
            <ReviewCard key={index} rating={item.rating} image={item.user.photoUrl} text={item.comment} name={item.user.name} role={item.user.role} />
            
          ))
        }
        <h1 className='text-white bg-black px-10 py-3 rounded-4xl hover:scale-105 transition-all duration-200'> Get Started</h1>
      </div>
      
    </div>
  )
}


export default ReviewPage
