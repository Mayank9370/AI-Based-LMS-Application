import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAllReview } from '../redux/reviewSlice'
import axios from 'axios'

const getAllReviews = () => {

  const dispatch = useDispatch()
  const serverUrl = import.meta.env.VITE_SERVERURL


  useEffect(() => {
    const getAllReviews = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/review/allReview", { withCredentials: true })
        console.log(result.data)
        dispatch(setAllReview(result.data))

      } catch (error) {
        console.log(error)
      }
    }
    getAllReviews()
  }, [])

}

export default getAllReviews
