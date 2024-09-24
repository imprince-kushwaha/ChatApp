import {createBrowserRouter } from "react-router-dom"
import App from '../App';
import RegisterPage from "../pages/RegisterPage";
import CheckEmailPage from "../pages/CheckEmailPage";
import CheckPasswordPage from "../pages/CheckPasswordPage";
import Home from "../pages/Home";
import MessagePage from "../components/MessagePage";
import ForgotPassword from "../pages/ForgotPassword";
import ProtectedRoute from "../components/ProtectedRoute";


const isLoggedIn = () => {
    // Replace this with your actual logic to check if the user is logged in
    const token = localStorage.getItem('token');
    return !!token;
};

const router=createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"register",
                element:<RegisterPage/>
            },
            {
                path:"email",
                element:<CheckEmailPage/>
            },
            {
                path:"password",
                element:<CheckPasswordPage/>
            },
            {
                path:"forgot_password",
                element:<ForgotPassword/>
            },
            // {
            //     path:"user-details",
            //     element:<ForgotPassword/>
            // },
            {
                path:"",
                element:
                // <Home/>
                (
                    <ProtectedRoute isLoggedIn={isLoggedIn()}>
                        <Home />  {/* This is the chat page */}
                    </ProtectedRoute>
                )
                ,
                children:[{
                    path:":userId",
                    element:<MessagePage/>
                }]
            }
        ]
    }
])

export default router