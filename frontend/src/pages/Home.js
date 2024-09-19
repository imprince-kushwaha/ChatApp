import React, { useEffect } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import axios from 'axios'
import Header from "../components/Header"
import { useDispatch, useSelector } from "react-redux"
import { logout, setUser } from "../redux/userSlice"
import SideBar from "../components/SideBar"

const Home = () => {
    const user = useSelector(state => state.user)
    // console.log("redux user", user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchUserDetails = async () => {
        try {
            const URL = ` ${process.env.REACT_APP_BACKEND_URL}/api/user-details`
            const response = await axios({
                url: URL,
                withCredentials: true
            })
            dispatch(setUser(response.data.data))
            if (response.data.logout) {
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
    return (
        <>
            <Header />
            <div className="grid grid-cols-6">
                <section className="bg-blue-200 h-[90vh]">
                    <SideBar/>
                </section>

                {/* Message components */}
                <section>
                    <Outlet />
                </section>
            </div>
        </>
    )
}

export default Home