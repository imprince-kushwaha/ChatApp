import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';
import ProfileInfo from '../components/ProfileInfo';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/userSlice';

const CheckPasswordPage = () => {
  const [formdata, setFormData] = useState({
    password: "",
    userId: ""
  })
  const navigate = useNavigate()
  const location = useLocation()
  // console.log("location", location)
  const dispatch=useDispatch()

  useEffect(() => {
    if (!location?.state?.name) {
      navigate('/email')
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value
      }
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    const URL = ` ${process.env.REACT_APP_BACKEND_URL}/api/password`
    try {
      const response = await axios({
        method: 'post',
        url: URL,
        data: {
          userId: location?.state?._id,
          password: formdata.password
        }, withCredentials: true
      })
      // console.log('response', response)

      toast.success(response.data.message)
      // after doing redux work 
      // if (response.data.success) {
      //   dispatch(setToken(response?.data?.token))
      //   localStorage.setItem('token',response?.data?.token)
      // }
      if (response.data.success) {
        dispatch(setToken(response?.data?.token))
        localStorage.setItem('token',response?.data?.token)
        setFormData({
          password: "",
        })
        navigate('/chat')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  return (
    <div>
      <Header />
      <div className='bg-gray-100 min-h-screen'>
        <h1 className='text-3xl font-bold text-center p-4 mb-4 '>Welcome to VibeTalks</h1>
        <div className="flex items-center justify-center">
          <form action="" className="w-full max-w-3xl mx-auto  bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>

            <div className='w-fit mx-auto mb-4 flex justify-center items-center flex-col'>
              {/* <PiUserCircleLight size={90} /> */}
              {/* <ProfileInfo width={90} height={90} name={location?.state?.name} imageUrl={location?.state?.profile_pic} /> */}
              <ProfileInfo width={90} height={90} name={location?.state?.name} imageUrl={location?.state?.profile_pic} />

              <h2 className='font-semibold text-lg'>{location?.state?.name}</h2>
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block font-medium text-base mb-2">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="Enter Your Password"
                value={formdata.password}
                onChange={handleChange}
                required
              />
            </div>


            <div className='flex items-center justify-center mb-4'>
              <button
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
                LogIn</button>
            </div>
            <p className='py-2 text-center'> <Link to={"/forgot_password"} className='font-semibold hover:text-blue-500'>Forgot Password?</Link></p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CheckPasswordPage
