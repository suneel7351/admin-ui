import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/login/login'
import Dashboard from './layouts/Dashboard'
import NoAuth from './layouts/NoAuth'
import Root from './layouts/Root'
import Users from './pages/users/User'
import Tenants from './pages/tenants/Tenant'


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
                        element: <Users />
                    },
                    {
                        path: "/tenants",
                        element: <Tenants />
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