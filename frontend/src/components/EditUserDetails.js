import React, { useEffect, useRef, useState } from 'react'
import ProfileInfo from './ProfileInfo'
import uploadFileCloudinary from '../helpers/uploadFileCloudinary'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';

const EditUserDetails = ({ onClose, user }) => {
    const [formdata, setFormData] = useState({
        // _id:_id,
        // name: user?.user || "",
        // profile_pic: user?.profile_pic || ""
        name: user?.name,
        profile_pic: user?.profile_pic
    })
    const uploadPhotoRef = useRef()
    const dispatch=useDispatch()

    useEffect(() => {
        setFormData((prev) => {
            return {
                ...prev, ...user
            }
        })
        // console.log("user", user)
    }, [user])
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const handleOpenUploadingPhoto = (e) => {
        e.preventDefault()
        e.stopPropagation()
        uploadPhotoRef.current.click()
    }
    const handleUploadPhoto = async (e) => {
        const file = e.target.files[0]
        const uploadPhoto = await uploadFileCloudinary(file)

        setFormData((prevData) => {
            return {
                ...prevData,
                profile_pic: uploadPhoto?.url
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        try {
            const URL = `${process.env.REACT_APP_BACKEND_URL}/api/update-user`

            const response =await axios({
                method:'post',
                url:URL,
                data:formdata,
                withCredentials:true
            })
            // console.log('res',response)
            toast.success(response?.data?.message)
            if (response.data.message) {
                dispatch(setUser(response.data.data))
                onClose()
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-gray-600 bg-opacity-50 flex justify-center items-center'>
            <div className='bg-white p-4 m-1 w-full max-w-sm rounded'>
                <h2 className='font-semibold'>Profile Details</h2>
                <p>Edit User Details</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block font-medium text-base mb-2"> Name</label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                            type="text"
                            name="name"
                            id="name"
                            value={formdata.name}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div>
                        <div>Photo </div>
                        <div className=''>
                            <ProfileInfo width={40} height={40} imageUrl={formdata?.profile_pic} name={formdata?.name} />
                            <label htmlFor='profile_pic'>
                                <button className='font-semibold' onClick={handleOpenUploadingPhoto}>Change Photo</button>
                                <input type='file' id='profile_pic' className='hidden' onChange={handleUploadPhoto} ref={uploadPhotoRef} />
                            </label>
                        </div>
                    </div>
                    {/* A horizontal line */}
                    <div className='bg-slate-300 p-[0.5px] mt-4'></div>

                    <div className='flex gap-2 ml-auto mt-3 w-fit justify-between'>
                        <button onClick={onClose} className='bg-blue-300 px-4 py-1 rounded hover:bg-blue-500 text-white '>Cancel</button>
                        <button onClick={handleSubmit} className='bg-blue-300 px-4 py-1 rounded '>Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default React.memo(EditUserDetails)
