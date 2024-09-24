import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import ProfileInfo from './ProfileInfo'
import { HiDotsVertical } from "react-icons/hi";
import { TfiAngleLeft } from "react-icons/tfi";
import { FiPlus } from "react-icons/fi";
import { FaImages } from "react-icons/fa";
import { IoMdVideocam } from "react-icons/io";
import uploadFileCloudinary from '../helpers/uploadFileCloudinary.js';
import { IoClose } from "react-icons/io5";
import Loading from './Loading.js';
import backgroundImage from '../assets/chat-background.jpg'
import { IoMdSend } from "react-icons/io";
import moment from 'moment';

const MessagePage = () => {
  const params = useParams()
  const socketConnection = useSelector(state => state?.user?.socketConnection)
  const user = useSelector(state => state?.user)
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    profile_pic: "",
    online: false,
    _id: ""
  })
  // console.log("params", params)
  const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false)
  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: ""
  })

  const [loading, setLoading] = useState(false)
  const [allMessage, setAllMessage] = useState([])
  const currentMessage = useRef(null)


  useEffect(() => {
    if (currentMessage.current) {
      currentMessage.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [allMessage])

  const handleUploadImageVideoOpen = () => {
    setOpenImageVideoUpload(prev => !prev)
  }
  const handleUploadImage = async (e) => {
    const file = e.target.files[0]
    setLoading(true)
    const uploadPhoto = await uploadFileCloudinary(file)
    setLoading(false)
    setOpenImageVideoUpload(false)

    setMessage(prev => {
      return {
        ...prev,
        imageUrl: uploadPhoto.url
      }
    })
  }
  const handleClearUploadImage = () => {
    setMessage(prev => {
      return {
        ...prev,
        imageUrl: ""
      }
    })
  }

  const handleUploadVideo = async (e) => {
    const file = e.target.files[0]
    setLoading(true)
    const uploadPhoto = await uploadFileCloudinary(file)
    setLoading(false)
    setOpenImageVideoUpload(false)

    setMessage(prev => {
      return {
        ...prev,
        videoUrl: uploadPhoto.url
      }
    })
  }
  const handleClearUploadVideo = () => {
    setMessage(prev => {
      return {
        ...prev,
        videoUrl: ""
      }
    })
  }

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit('message-page', params.userId)

      socketConnection.emit('seen', params.userId)

      socketConnection.on('message-user', (data) => {
        // console.log("user details socket", data)
        setDataUser(data)
      })

      socketConnection.on('message', (data) => {
        // console.log('message data', data)
        setAllMessage(data)


      })
    }
  }, [socketConnection, params?.userId, user])

  const handleOnType = (e) => {
    const { name, value } = e.target
    setMessage(prev => {
      return {
        ...prev,
        text: value
      }
    })
  }

  const handleSendMessage = (e) => {
    e.preventDefault()

    if (message.text || message.imageUrl || message.videoUrl) {
      if (socketConnection) {
        socketConnection.emit('new message', {
          sender: user?._id,
          receiver: params.userId,
          text: message.text,
          imageUrl: message.imageUrl,
          videoUrl: message.videoUrl,
          mssgByUserId: user?._id
        })
        setMessage(
          {
            text: "",
            imageUrl: "",
            videoUrl: ""
          }
        )
      }

    }
  }

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})` }} className='h-[calc(100%-5rem)] bg-no-repeat bg-cover'>
      <header className='sticky top-0 h-16 bg-sky-300 flex justify-between items-center px-4'>
        <div className='flex items-center gap-4 '>
          <Link to={"/"} className='lg:hidden'><TfiAngleLeft size={30} />
          </Link>
          <div>
            <ProfileInfo width={50} height={50} imageUrl={dataUser?.profile_pic} name={dataUser?.name} userId={dataUser?._id} />
          </div>
          <div>
            <h3 className='font-semibold text-lg my-0 text-ellipsis line-clamp-1'>{dataUser?.name}</h3>
            <p className='-my-2 text-sm'>
              {
                dataUser?.online ? <span className='text-green-600'>online</span> : <span className='text-red-600'>offline</span>
              }
              {/* {dataUser?.email} */}
            </p>
          </div>
        </div>
        <div>
          <button></button>
          <HiDotsVertical />
        </div>
      </header>
      {/* show all messages */}
      <section className='h-[calc(100vh-208px)] overflow-x-hidden overflow-y-scroll relative bg-slate-200 bg-opacity-50'>
        {/* show all msg */}
        <div className='flex flex-col gap-2 py-2 mx-2' ref={currentMessage}>
          {
            allMessage.map((msg, index) => {
              return (
                <div className={` p-1 py-2  rounded w-fit max-w-[280px] md:max-w-sm lg:max-w-md ${user._id === msg.mssgByUserId ? "ml-auto bg-teal-100" : "bg-white"} `}>
                  <div className='w-full'>
                    {
                      msg.imageUrl && (
                        <img src={msg?.imageUrl} className='w-full h-full object-scale-down' />
                      )
                    }
                    {
                      msg.videoUrl && (
                        <video src={msg?.videoUrl} className='w-full h-full object-scale-down' controls />
                      )
                    }
                  </div>
                  <p className='px-2'>{msg.text}</p>
                  <p className='text-xs ml-auto w-fit'>{moment(msg.createdAt).format('hh:mm')}</p>
                </div>
              )
            })
          }
        </div>

        {/*upload image preview  */}
        {
          message?.imageUrl && (
            <div className='w-full h-full sticky bottom-0 bg-slate-800 bg-opacity-30 flex justify-center items-center rou overflow-hidden'>
              <div className='w-fit p-2 absolute top-0 right-0 cursor-pointer' onClick={handleClearUploadImage}>
                <IoClose size={20} />
              </div>
              <div className='bg-white p-3'>
                <img src={message?.imageUrl} alt='upload immage' className='aspect-square w-full h-full max-w-sm m-2 object-scale-down' />
              </div>
            </div>
          )
        }

        {
          message.videoUrl && (
            <div className='w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rou overflow-hidden'>
              <div className='w-fit p-2 absolute top-0 right-0 cursor-pointer' onClick={handleClearUploadVideo}>
                <IoClose size={20} />
              </div>
              <div className='bg-white p-3'>
                <video src={message.videoUrl} className='aspect-square w-full h-full max-w-sm m-2 object-scale-down' controls muted autoPlay />
              </div>
            </div>
          )
        }

        {
          loading && (
            <div className='w-full h-fullflex justify-center items-center sticky bottom-0'>
              <Loading />
            </div>
          )
        }

      </section>

      {/* send message */}
      <section className='h-16 bg-gray-300 flex items-center p-4'>
        <div className='relative '>
          <button className='flex justify-center items-center w-11 h-11 rounded-full bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg hover:bg-gradient-to-r hover:from-green-700 hover:to-teal-800 transition duration-300' onClick={handleUploadImageVideoOpen}><FiPlus size={25} /></button>

          {/* video and image */}
          {
            openImageVideoUpload && (
              <div className='bg-white shadow-xl rounded-lg absolute bottom-14 w-40 p-3 transition duration-300 ease-in-out'>
                <form>
                  <label htmlFor='uploadImage' className='flex items-center p-2 gap-3 rounded-lg hover:bg-slate-100 transition duration-200 cursor-pointer'>
                    <div className='text-green-400'><FaImages size={20} /></div>
                    <p className='text-gray-600'>Image</p>
                  </label>
                  <label htmlFor='uploadVideo' className='flex items-center p-2 gap-3 hover:bg-slate-200 cursor-pointer'>
                    <div className='text-purple-400'><IoMdVideocam size={20} /></div>
                    <p className='text-gray-600'>Video</p>
                  </label>
                  <input type='file' id='uploadImage' onChange={handleUploadImage} className='hidden' />
                  <input type='file' id='uploadVideo' onChange={handleUploadVideo} className='hidden' />
                </form>
              </div>
            )
          }
        </div>

        {/* Input box */}
        <form className='w-full h-10 m-4 flex gap-2' onSubmit={handleSendMessage}>
          <input type='text' placeholder='Type Message Here...' className='py-1 px-4 outline-none w-full h-full bg-gray-200 rounded-md' value={message.text} onChange={handleOnType} />
          <button className='text-sky-500 hover:text-sky-700 flex items-center justify-center w-10 h-full'><IoMdSend size={25} /></button>
        </form>
      </section>

    </div>
  )
}

export default MessagePage
