import React from 'react'
import { Outlet } from 'react-router-dom'

function NoAuth() {
  return (
    <div>
        <h1>NoAth</h1>

        <Outlet/>
    </div>
  )
}

export default NoAuth