import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/login/login'
import Dashboard from './layouts/Dashboard'
import NoAuth from './layouts/NoAuth'
import Root from './layouts/Root'
import User from './pages/users/User'


export const router = createBrowserRouter([
    {
        path:"/",
        element:<Root/>,
        children:[
            {
                path: "",
                element: <Dashboard />,
                children: [
                    {
                        path: "/",
                        element: <HomePage />
                    },
                    {
                        path: "/users",
                        element: <User />
                    },
                ]
            },
            {
                path: "/auth",
                element:<NoAuth/>,
                children:[
                    {
                        path: "login",
                        element: <LoginPage />
                    }
                ]
            },
        ]
    }
   
   
])