import React, { useState } from 'react'
import Header from '../components/Header'
import { IoClose } from "react-icons/io5"
import { Link, useNavigate } from 'react-router-dom'
import uploadFileCloudinary from '../helpers/uploadFileCloudinary'
import axios from 'axios'
import toast from 'react-hot-toast';

const RegisterPage = () => {
    const [formdata, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        profile_pic: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const [uploadPhoto, setUploadPhoto] = useState("")

    const navigate=useNavigate()

    const handleUploadPhoto = async (e) => {
        const file = e.target.files[0]
        const uploadPhoto = await uploadFileCloudinary(file)
        // console.log("UploadPhoto",uploadPhoto)
        setUploadPhoto(file)

        setFormData((prevData) => {
            return {
                ...prevData,
                profile_pic: uploadPhoto?.url
            }
        })
    }
    // console.log("uploadphoto",uploadPhoto)
    const handleClearPhoto = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setUploadPhoto(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        const URL = ` ${process.env.REACT_APP_BACKEND_URL}/api/register`
        // console.log(process.env.REACT_APP_BACKEND_URL)
        try {
            const response = await axios.post(URL, formdata)
            console.log('response', response)

            toast.success(response?.data?.message)
            // if user created successfullly then formdata will be clear
            if (response.data.success) {
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    profile_pic: ""
                })
                navigate('/email')
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
            // console.log('error', error)
        }
        // console.log('Formdata', formdata)

    }
    return (
        <>
            <Header />
            <div className='bg-gray-100 min-h-screen'>
                <h1 className='text-3xl font-bold text-center p-4 mb-4 '>Welcome to VibeTalks</h1>
                <div className="flex items-center justify-center">
                    <form action="" className="w-full max-w-3xl mx-auto  bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block font-medium text-base mb-2"> Name</label>
                            <input
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter Name"
                                value={formdata.name}
                                onChange={handleChange}
                                required
                            />
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

                        <div className="mb-4">
                            <label htmlFor="profile_pic" className="block font-medium text-base mb-2">Photo
                                <div className='h-10 bg-gray-100 flex justify-center items-center hover:cursor-pointer rounded-lg'>
                                    <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>
                                        {
                                            uploadPhoto?.name ? uploadPhoto?.name : "Upload Profile Pic"
                                        }
                                        {/* Upload Profile Pic */}
                                    </p>
                                    {
                                        uploadPhoto?.name && (
                                            <button className='text-lg ml-2 hover:text-red-500' onClick={handleClearPhoto}><IoClose /></button>
                                        )
                                    }
                                </div>
                            </label>
                            <input
                                type="file"
                                name="profile_pic"
                                id="profile_pic"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 hidden"
                                onChange={handleUploadPhoto}
                            />
                        </div>
                        <div className='flex items-center justify-center mb-4'>
                            <button
                                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
                                Register</button>
                        </div>
                        <p className='py-2 text-center'>Already have Account? <Link to={"/email"} className='font-semibold hover:text-blue-500'>Login</Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RegisterPage


