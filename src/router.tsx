import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/login/login'
import Dashboard from './layouts/Dashboard'
import NoAuth from './layouts/NoAuth'


export const router = createBrowserRouter([
    {
        path: "",
        element: <Dashboard />,
        children: [
            {
                path: "/",
                element: <HomePage />
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
   
])