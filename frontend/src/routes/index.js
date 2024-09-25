import { createBrowserRouter } from "react-router-dom"
import App from '../App';
import FirstPage from "../components/FirstPage";
import RegisterPage from "../pages/RegisterPage";
import CheckEmailPage from "../pages/CheckEmailPage";
import CheckPasswordPage from "../pages/CheckPasswordPage";
import Home from "../pages/Home";
import MessagePage from "../components/MessagePage";
import ForgotPassword from "../pages/ForgotPassword";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <FirstPage />
            },
            {
                path: "register",
                element: <RegisterPage />
            },
            {
                path: "email",
                element: <CheckEmailPage />
            },
            {
                path: "password",
                element: <CheckPasswordPage />
            },
            {
                path: "forgot_password",
                element: <ForgotPassword />
            },
            // {
            //     path:"user-details",
            //     element:<ForgotPassword/>
            // },
            {
                path: "/chat",
                element: <Home />
                ,
                children: [{
                    path: ":userId",
                    element: <MessagePage />
                }]
            }
        ]
    }
])

export default router