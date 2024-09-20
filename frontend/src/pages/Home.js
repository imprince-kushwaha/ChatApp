import React, { useEffect } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import axios from 'axios'
import Header from "../components/Header"
import { useDispatch, useSelector } from "react-redux"
import { logout, setUser } from "../redux/userSlice"
import SideBar from "../components/SideBar"
import logo from '../assets/logo.png'

const Home = () => {
    const user = useSelector(state => state.user)
    // console.log("redux user", user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const location = useLocation()

    const fetchUserDetails = async () => {
        try {
            const URL = ` ${process.env.REACT_APP_BACKEND_URL}/api/user-details`
            const response = await axios({
                url: URL,
                withCredentials: true
            })
            dispatch(setUser(response.data.data))
            if (response.data.data.logout) {
                dispatch(logout())

                navigate('/email')
            }
            // console.log("current user", response)
        } catch (error) {
            console.log("error", error)
        }
    }
    useEffect(() => {
        fetchUserDetails()
    }, [])

    const basePath = location.pathname === '/'
    return (
        <>
            <Header />
            <div className="grid grid-cols-6">
                <section className={` h-[90vh] ${!basePath && "hidden"} lg:block`}>
                    <SideBar />
                </section>

                {/* Message components */}
                <section className={`${basePath && "hidden"}`}>
                    <Outlet />
                </section>

                <div className={`justify-center items-center flex-col gap-2  ${!basePath ?"hidden" :"lg:flex"}`}>
                    <div>
                        <img src={logo} alt='Logo' width='250' />
                    </div>
                    <p className="text-lg text-slate-500">Select user to start chat</p>
                </div>
            </div>
        </>
    )
}

export default Home