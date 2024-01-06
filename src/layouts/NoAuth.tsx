import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store'

function NoAuth() {
    const { user } = useAuthStore()
    if (user !== null) return <Navigate replace={true} to={"/"} />
  return (
    <div>
             <Outlet/>
    </div>
  )
}

export default NoAuth