import React, { useEffect, useState } from 'react';
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa6";
import { TbLogout2 } from "react-icons/tb";
import ProfileInfo from './ProfileInfo';
import { useDispatch, useSelector } from 'react-redux';
import EditUserDetails from './EditUserDetails';
import SearchUser from './SearchUser';
import { FaImages } from "react-icons/fa";
import { IoMdVideocam } from "react-icons/io";
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../redux/userSlice';

const SideBar = () => {
    const user = useSelector(state => state?.user)
    const [editUser, setEditUser] = useState(false)
    const [alluser, setAllUSer] = useState([])
    const [openSearchUser, setOpenSearchUser] = useState(false)
    const socketConnection = useSelector(state => state?.user?.socketConnection)
    const dispatch=useDispatch()
    const navigate=useNavigate()

    useEffect(() => {
        if (socketConnection) {
            socketConnection.emit('sidebar', user?._id)

            socketConnection.on('conversation', (data) => {
                const conversationUserData = data.map((conversationUser, index) => {
                    if (conversationUser?.sender?._id === conversationUser?.receiver?._id) {
                        return {
                            ...conversationUser,
                            userDetails: conversationUser.sender
                        }
                    }
                    else if (conversationUser?.receiver?._id !== user?._id) {
                        return {
                            ...conversationUser,
                            userDetails: conversationUser.receiver
                        }
                    }
                    else {
                        return {
                            ...conversationUser,
                            userDetails: conversationUser.sender
                        }
                    }
                })
                setAllUSer(conversationUserData)
            })
        }
    }, [socketConnection, user])

    const handleLogout=()=>{
        dispatch(logout())
        navigate("/email")
        localStorage.clear()
    }

    return (
        <div className=' h-full flex'>
            <div className='w-16 bg-slate-300 h-full rounded-tr-lg rounded-br-lg py-4 text-slate-800 flex flex-col justify-between p-2'>
                <div>
                    <div className='w-12 h-12 flex justify-center items-center hover:bg-slate-200 rounded' title='Chat'>
                        <IoChatbubbleEllipsesSharp size={30} />
                    </div>
                    <div className='w-12 h-12 flex justify-center items-center hover:bg-slate-200 rounded' title='Add Friend' onClick={() => setOpenSearchUser(true)}>
                        <FaUserPlus size={30} />
                    </div>
                </div>
                <div>
                    <button className='w-12 h-12 flex justify-center items-center hover:bg-slate-200 rounded -ml-1' title='LogOut' onClick={handleLogout}>
                        <TbLogout2 size={30} />
                    </button>
                    <button className='w-12 h-12 flex justify-center items-center hover:bg-slate-200 rounded' title={user?.name}
                        onClick={() => setEditUser(true)}>
                        <ProfileInfo width={40} height={40} name={user.name} imageUrl={user?.profile_pic} userId={user?._id} />
                    </button>
                </div>
            </div>

            <div className='w-full'>
                {/* w-full */}
                <h2 className='text-xl font-bold p-4 text-slate-800 h-16'>Chats</h2>
                <div className='bg-slate-300 p-[0.5px]'></div>
                <div className='h-[calc(100%-68px)] overflow-x-hidden overflow-y-scroll'>
                    {
                        alluser.length === 0 && (
                            <div>
                                <p className='text-lg text-center text-slate-400'>Explore user to start the chat</p>
                            </div>
                        )
                    }
                    {
                        alluser.map((conv, index) => {
                            return (
                                <NavLink to={"/"+conv?.userDetails?._id} key={conv?._id} className='flex items-center gap-2 px-4 py-3 border border-transparent hover:border-green-400 rounded hover:bg-slate-100 cursor-pointer'>
                                    <div>
                                        <ProfileInfo imageUrl={conv?.userDetails?.profile_pic} name={conv?.userDetails?.name} width={50} height={50} />
                                    </div>
                                    <div>
                                        <h3 className='text-ellipsis line-clamp-1 font-semibold text-base '>{conv?.userDetails?.name}</h3>
                                        <div className='text-sm text-slate-500 flex items-center gap-1'>
                                            <div >
                                                {
                                                    conv?.lastMsg?.imageUrl && (
                                                        <div className='flex items-center gap-1'>
                                                            <span><FaImages /></span>
                                                            {!conv?.lastMsg?.text && <span>Image</span>}
                                                        </div>
                                                    )
                                                }

                                                {
                                                    conv?.lastMsg?.videoUrl && (
                                                        <div className='flex items-center gap-1'>
                                                            <span><IoMdVideocam /></span>
                                                            {!conv?.lastMsg?.text && <span>Video</span>}
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <p className='text-ellipsis line-clamp-1'>{conv?.lastMsg?.text}</p>
                                        </div>
                                    </div>
                                    {
                                        Boolean(conv?.unseenMsg)&&(
                                            <p className='text-xs w-6 h-6 flex justify-center items-center ml-auto p-1 bg-green-400 text-white font-semibold rounded-full'>{conv?.unseenMsg}</p>
                                        )
                                    }
                                </NavLink>
                            )
                        })
                    }
                </div>
            </div>
            {/* search user section */}
            {
                openSearchUser && (
                    <SearchUser onClose={() => setOpenSearchUser(false)} />
                )
            }
            {/* edit user details */}
            {
                editUser && (
                    <EditUserDetails onClose={() => setEditUser(false)} user={user} />
                )
            }
        </div>
    )
}

export default SideBar
