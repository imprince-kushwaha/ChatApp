import React, { useState } from 'react';
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa6";
import { TbLogout2 } from "react-icons/tb";
import ProfileInfo from './ProfileInfo';
import { useSelector } from 'react-redux';
import EditUserDetails from './EditUserDetails';
import SearchUser from './SearchUser';

const SideBar = () => {
    const user = useSelector(state => state?.user)
    const [editUser, setEditUser] = useState(false)
    const [alluser, setAllUSer] = useState([])
    const [openSearchUser, setOpenSearchUser] = useState(false)
    return (
        <div className='w-full h-full flex'>
            <div className='w-12 bg-slate-300 h-full rounded-tr-lg rounded-br-lg py-4 text-slate-800 flex flex-col justify-between'>
                <div>
                    <div className='w-12 h-12 flex justify-center items-center hover:bg-slate-200 rounded' title='Chat'>
                        <IoChatbubbleEllipsesSharp size={30} />
                    </div>
                    <div className='w-12 h-12 flex justify-center items-center hover:bg-slate-200 rounded' title='Add Friend' onClick={() => setOpenSearchUser(true)}>
                        <FaUserPlus size={30} />
                    </div>
                </div>
                <div>
                    <button className='w-12 h-12 flex justify-center items-center hover:bg-slate-200 rounded -ml-1' title='LogOut'>
                        <TbLogout2 size={30} />
                    </button>
                    <button className='w-12 h-12 flex justify-center items-center hover:bg-slate-200 rounded' title={user?.name}
                        onClick={() => setEditUser(true)}>
                        {/* <ProfileInfo width={40} height={40} name={user.name} imageUrl={user?.profile_pic}/> */}
                        <ProfileInfo width={40} height={40} name={user.name} imageUrl={user?.profile_pic} />

                        {/* <div>

                        </div> */}
                    </button>
                </div>
            </div>

            <div className='w-full '>
                <h2 className='text-xl font-bold p-4 text-slate-800 h-16'>Message</h2>
                <div className='bg-slate-300 p-[0.5px]'></div>
                <div className='h-[calc(90vh-65px)] overflow-x-hidden overflow-y-scroll'>
                    {
                        alluser.length === 0 && (
                            <div>
                                <p className='text-lg text-center text-slate-400'>Explore user to start the chat</p>
                            </div>
                        )
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
