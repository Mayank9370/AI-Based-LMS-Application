import React, { useState } from 'react'
import google from '../assets/google2.png'
import axios from 'axios'
import { serverUrl } from '../App'
import { MdOutlineRemoveRedEye, MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../utils/Firebase'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async () => {
    if (!email || !password) {
      toast.warn("Please fill in all fields")
      return
    }
    setLoading(true)
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      )
      dispatch(setUserData(result.data))
      toast.success("Login Successfully")
      navigate("/")
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      const user = response.user
      const result = await axios.post(
        `${serverUrl}/api/auth/googlesignup`,
        {
          name: user.displayName,
          email: user.email,
          role: ""
        },
        { withCredentials: true }
      )
      dispatch(setUserData(result.data))
      toast.success("Login Successfully")
      navigate("/")
    } catch (error) {
      toast.error(error.response?.data?.message || "Google login failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Welcome Back</h1>
          <p className="text-gray-500 text-sm">Login to your account</p>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Email */}
          <div>
            <label htmlFor="email" className="block font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="you@example.com"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black/70"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="block font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type={show ? "text" : "password"}
              placeholder="********"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black/70 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute right-3 bottom-2 text-gray-500 cursor-pointer"
              onClick={() => setShow(!show)}
            >
              {show ? (
                <MdRemoveRedEye size={20} />
              ) : (
                <MdOutlineRemoveRedEye size={20} />
              )}
            </div>
          </div>

          {/* Login Button */}
          <button
            className="w-full py-2 mt-2 bg-blue-600 text-white rounded-md font-medium flex items-center justify-center"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <ClipLoader size={24} color="white" /> : "Login"}
          </button>

          {/* Forgot password */}
          <p
            className="text-right text-sm text-gray-600 cursor-pointer hover:underline"
            onClick={() => navigate("/forgotpassword")}
          >
            Forgot your password?
          </p>

          {/* Divider */}
          <div className="flex items-center my-2">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-2 text-gray-500 text-sm">or continue with</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={googleLogin}
            className="w-full py-2 border border-gray-300 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <img src={google} alt="Google" className="w-5 h-5" />
            <span className="text-gray-600 font-medium">Sign in with Google</span>
          </button>

          {/* Signup link */}
          <p className="text-center text-sm text-gray-600 mt-3">
            Don’t have an account?{" "}
            <span
              className="text-black font-medium underline cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
