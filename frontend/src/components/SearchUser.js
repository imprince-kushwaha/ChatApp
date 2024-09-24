import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import Loading from './Loading';
import UserCard from './UserCard';
import toast from 'react-hot-toast';
import axios from 'axios';
import { IoMdClose } from "react-icons/io";

const SearchUser = ({ onClose }) => {
    const [searchUser, setSearchUser] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")

    const handleSearchUser = async () => {
        const URL = ` ${process.env.REACT_APP_BACKEND_URL}/api/search-user`
        try {
            setLoading(true)
            const response = axios.post(URL, {
                search: search
            })
            setLoading(false)
            setSearchUser((await response).data.data)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
    useEffect(() => {
        handleSearchUser()
    }, [search])
    // console.log("searchuser", searchUser)
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 p-2 z-10'>
            <div className='w-full max-w-lg mx-auto mt-20 '>
                {/* input search user */}
                <div className='bg-white rounded h-14 overflow-hidden flex'>
                    <input type='text' placeholder='Search User by name or email' className='w-full outline-none px-4 py-1 h-full' onChange={(e) => setSearch(e.target.value)} value={search} />
                    <div className='h-14 w-14 flex justify-center items-center'><IoSearch size={25} /></div>
                </div>
                {/* display search user */}
                <div className='bg-white mt-2 w-full p-4 rounded'>
                    {/* No user found */}
                    {
                        searchUser.length === 0 && !loading && (
                            <p className='text-center text-slate-500'>No user found!!!</p>
                        )
                    }
                    {
                        loading && (
                            <Loading />
                        )
                    }
                    {
                        searchUser.length !== 0 && !loading && (
                            searchUser.map((user, index) => {
                                return (
                                    <UserCard key={user._id} user={user} onClose={onClose} />
                                )
                            })
                        )
                    }
                </div>
            </div>
            <div className='absolute top-0 right-0 text-2xl lg:text-3xl hover:text-red-800 m-4' onClick={onClose}> <button><IoMdClose /></button> </div>
        </div>
    )
}

export default SearchUser
