import React from 'react'
import { Outlet } from 'react-router-dom'

function Dashboard() {
    return (
        <div>
            <h1>Hello</h1>
            <Outlet/>

        </div>
    )
}

export default Dashboard