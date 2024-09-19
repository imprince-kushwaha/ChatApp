import React, { useState } from 'react'
import Header from '../components/Header'
import { PiUserCircleLight } from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';


const CheckEmailPage = () => {

  const [formdata, setFormData] = useState({
    email: ""
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    const URL = ` ${process.env.REACT_APP_BACKEND_URL}/api/email`
    try {
      const response = await axios.post(URL, formdata)

      toast.success(response?.data?.message)
      // if user created successfullly then formdata will be clear
      if (response.data.success) {
        setFormData({
          email: ""
        })
        navigate('/password',{
          state:response?.data?.data
        })
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

            <div className='w-fit mx-auto mb-4'>
              <PiUserCircleLight size={90} />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-medium text-base mb-2">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="Enter Your Email"
                value={formdata.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className='flex items-center justify-center mb-4'>
              <button
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
                Proceed</button>
            </div>
            <p className='py-2 text-center'>New User? <Link to={"/register"} className='font-semibold hover:text-blue-500'>Register</Link></p>
          </form>
        </div>
      </div>
    </div>
  )

}
export default CheckEmailPage
